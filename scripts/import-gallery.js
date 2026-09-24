/**
 * Import all unique client photos into public/images/gallery
 * and generate src/lib/gallery-data.ts
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");

const SOURCE = "C:\\Users\\USER\\Downloads\\WEBSITE";
const OUT_DIR = path.join(process.cwd(), "public", "images", "gallery");
const HERO_DIR = path.join(process.cwd(), "public", "images");
const DATA_OUT = path.join(process.cwd(), "src", "lib", "gallery-data.ts");

const CATEGORY_MAP = {
  Chrismas: "christmas",
  Family: "family",
  MATERNITY: "maternity",
  MILESTONE: "milestone",
  NEWBORN: "newborn",
  PORTRAIT: "portrait",
  TRADITIONAL: "traditional",
};

const SKIP_NAMES = new Set([
  "kids-milestone.jpg",
  "maternity.jpg", // flyer in milestone folder
]);

function sanitizeBase(name) {
  return name
    .replace(/\.[^.]+$/, "")
    .normalize("NFKD")
    .replace(/[^\w\s\-@()&]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
    .slice(0, 80);
}

function isLikelyDuplicateName(filename) {
  const n = filename.toLowerCase();
  return (
    n.includes(" - copy") ||
    n.includes("-copy") ||
    /\(\d+\)\s*\(\d+\)/.test(n) || // Zoie@1 (15) (1).jpg
    /\(\d+\)\.jpg$/.test(n) && n.includes("(1).jpg")
  );
}

function normalizeKey(filename) {
  // Strip copy / (1) suffixes for pairing with originals
  return filename
    .toLowerCase()
    .replace(/\s*-\s*copy/g, "")
    .replace(/\s*\(1\)|\s*\(2\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function hashFile(buf) {
  return crypto.createHash("sha1").update(buf).digest("hex");
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Clear previous gallery exports (keep hero/service/featured in parent)
  for (const f of fs.readdirSync(OUT_DIR)) {
    fs.unlinkSync(path.join(OUT_DIR, f));
  }

  const galerie = path.join(SOURCE, "Galerie");
  const candidates = [];

  for (const [folder, category] of Object.entries(CATEGORY_MAP)) {
    const dir = path.join(galerie, folder);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!/\.jpe?g$/i.test(file)) continue;
      if (SKIP_NAMES.has(file.toLowerCase())) continue;
      candidates.push({
        abs: path.join(dir, file),
        file,
        category,
        folder,
      });
    }
  }

  // Root Ankomaa if not already in Family
  const rootAnk = path.join(SOURCE, "Ankomaa@1 (41).jpg");
  if (fs.existsSync(rootAnk)) {
    candidates.push({
      abs: rootAnk,
      file: "Ankomaa@1 (41).jpg",
      category: "family",
      folder: "root",
    });
  }

  // Prefer non-copy versions: sort so originals come first
  candidates.sort((a, b) => {
    const aDup = isLikelyDuplicateName(a.file) ? 1 : 0;
    const bDup = isLikelyDuplicateName(b.file) ? 1 : 0;
    if (aDup !== bDup) return aDup - bDup;
    return a.file.localeCompare(b.file);
  });

  const seenHash = new Set();
  const seenNormKey = new Set();
  const items = [];
  let skippedDup = 0;
  let skippedTiny = 0;
  let skippedError = 0;

  for (const c of candidates) {
    let buf;
    try {
      buf = fs.readFileSync(c.abs);
    } catch {
      skippedError++;
      continue;
    }

    // Skip tiny compressed / broken files under 25KB
    if (buf.length < 25_000) {
      skippedTiny++;
      continue;
    }

    const hash = await hashFile(buf);
    if (seenHash.has(hash)) {
      skippedDup++;
      continue;
    }

    const norm = `${c.category}::${normalizeKey(c.file)}`;
    // If we already have non-copy version of same key, skip copies
    if (seenNormKey.has(norm) && isLikelyDuplicateName(c.file)) {
      skippedDup++;
      continue;
    }
    // Also skip if exact same normalized name already imported
    if (seenNormKey.has(norm)) {
      skippedDup++;
      continue;
    }

    let meta;
    try {
      meta = await sharp(buf).rotate().metadata();
    } catch {
      skippedError++;
      continue;
    }

    const w = meta.width || 1;
    const h = meta.height || 1;
    const ratio = w / h;

    const base = sanitizeBase(c.file) || `img-${hash.slice(0, 8)}`;
    const outName = `${c.category}-${base}-${hash.slice(0, 6)}.jpg`;
    const outPath = path.join(OUT_DIR, outName);

    // High quality web export — preserve composition, mild resize only
    try {
      await sharp(buf)
        .rotate()
        .resize({
          width: 2400,
          height: 2400,
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: 88, mozjpeg: true })
        .toFile(outPath);
    } catch {
      skippedError++;
      continue;
    }

    seenHash.add(hash);
    seenNormKey.add(norm);

    items.push({
      id: hash.slice(0, 12),
      src: `/images/gallery/${outName}`,
      alt: `${c.category} photography by Javies Photography Studio`,
      caption: c.category.charAt(0).toUpperCase() + c.category.slice(1),
      category: c.category,
      width: w,
      height: h,
      ratio: Number(ratio.toFixed(4)),
    });
  }

  // Sort: category then filename
  items.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.src.localeCompare(b.src);
  });

  const categories = [
    { id: "all", label: "All" },
    ...["maternity", "newborn", "milestone", "family", "traditional", "christmas", "portrait"]
      .filter((id) => items.some((i) => i.category === id))
      .map((id) => ({
        id,
        label: id.charAt(0).toUpperCase() + id.slice(1),
      })),
  ];

  const ts = `/* Auto-generated by scripts/import-gallery.js — do not edit by hand */
export type GalleryCategory =
  | "all"
  | "maternity"
  | "newborn"
  | "milestone"
  | "family"
  | "traditional"
  | "christmas"
  | "portrait";

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: Exclude<GalleryCategory, "all">;
  width: number;
  height: number;
  ratio: number;
};

export const galleryCategories: { id: GalleryCategory; label: string }[] = ${JSON.stringify(categories, null, 2)};

export const galleryItems: GalleryItem[] = ${JSON.stringify(items, null, 2)};
`;

  fs.writeFileSync(DATA_OUT, ts);

  const byCat = {};
  for (const i of items) {
    byCat[i.category] = (byCat[i.category] || 0) + 1;
  }

  console.log("\n=== IMPORT SUMMARY ===");
  console.log("Candidates:", candidates.length);
  console.log("Imported unique:", items.length);
  console.log("Skipped duplicates:", skippedDup);
  console.log("Skipped tiny (<25KB):", skippedTiny);
  console.log("Skipped errors:", skippedError);
  console.log("By category:", byCat);
  console.log("Wrote", DATA_OUT);
  console.log("Out dir size MB:", (
    fs.readdirSync(OUT_DIR).reduce((s, f) => s + fs.statSync(path.join(OUT_DIR, f)).size, 0) / 1e6
  ).toFixed(1));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
