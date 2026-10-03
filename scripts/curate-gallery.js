/**
 * Import new client photos, keep one shot per person in each gallery
 * section, and hide cross-section repeats from the All view.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");

const OUT_DIR = path.join(process.cwd(), "public", "images", "gallery");
const DATA_OUT = path.join(process.cwd(), "src", "lib", "gallery-data.ts");

const NEW_SOURCES = [
  ["C:\\Users\\DELL\\Pictures\\MILSTONE", "milestone"],
  ["C:\\Users\\DELL\\Pictures\\FAMILY", "family"],
  ["C:\\Users\\DELL\\Pictures\\Newborn", "newborn"],
  ["C:\\Users\\DELL\\Pictures\\MATERNITY", "maternity"],
  ["C:\\Users\\DELL\\Pictures\\Portrait", "portrait"],
];

const CATEGORY_ORDER = [
  "milestone",
  "family",
  "newborn",
  "maternity",
  "portrait",
  "traditional",
  "christmas",
];

/** Same person, another pose. Kept the stronger frame from that session. */
const SKIP_FILES = new Set([
  "244a8702.jpg",
  "christmas-img_9759-452337.jpg",
  "christmas-jpsi0595-8bdd60.jpg",
  "milestone-244a8702-b87101.jpg",
  "milestone-244a8768-51d9a3.jpg",
  "milestone-jpsi9001-3805e3.jpg",
  "newborn-244a0656-d2a26d.jpg",
  "newborn-244a0675-3d38df.jpg",
  "newborn-244a6498-796819.jpg",
  "newborn-244a6585-6c22f8.jpg",
  "newborn-244a8723-572237.jpg",
  "newborn-244a8783-5bd3c3.jpg",
  "newborn-_u0a4116-dcfa22.jpg",
  "newborn-jpsi1354-55f152.jpg",
  "newborn-jpsi1358-e48c57.jpg",
  "newborn-jpsi1400-d60652.jpg",
  "newborn-jpsi1416-87e384.jpg",
  "maternity-_c7a0102-314d66.jpg",
  "maternity-javi1451-3cdcd1.jpg",
]);

const CATEGORY_LABEL = {
  milestone: "Milestone",
  family: "Family",
  newborn: "Newborn",
  maternity: "Maternity",
  portrait: "Portrait",
  traditional: "Traditional",
  christmas: "Christmas",
};

const STOP = new Set([
  "maternity",
  "maternitry",
  "newborn",
  "new",
  "born",
  "session",
  "copy",
  "hd",
  "img",
  "family",
  "portrait",
  "milestone",
  "christmas",
  "traditional",
  "solos",
  "and",
  "the",
  "ms",
  "yrs",
]);

function peopleFromFilename(filename) {
  let base = path.basename(filename, path.extname(filename));
  base = base.replace(
    /^(christmas|family|maternity|milestone|newborn|portrait|traditional)-/i,
    ""
  );
  base = base.replace(/-[0-9a-f]{6}$/i, "");

  const compact = base.replace(/[^a-z0-9]/gi, "");
  if (/^(javi|jpsi|img|c7a|u0a|244a|d51a|mg|avi)\d/i.test(compact)) return [];
  if (/^\d+$/.test(compact)) return [];

  const cleaned = base
    .replace(/@/g, " ")
    .replace(/\([^)]*\)/g, " ")
    .replace(/[~_]+/g, " ")
    .replace(/\b\d+\s*(ms|yrs|m|y)\b/gi, " ")
    .replace(/\b\d+\b/g, " ")
    .replace(/[^a-zA-Z&]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  if (!cleaned) return [];

  const chunks = cleaned.split(/\s*(?:&| and )\s*/);
  const people = [];
  for (const chunk of chunks) {
    const words = chunk.split(" ").filter((word) => word && !STOP.has(word));
    const name = words.join(" ").trim().replace(/^baby\s+/, "");
    if (name.length >= 3) people.push(name);
  }
  return [...new Set(people)];
}

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

async function dHash(input) {
  const { data } = await sharp(input)
    .rotate()
    .resize(9, 8, { fit: "fill" })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let hash = 0n;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const left = data[y * 9 + x];
      const right = data[y * 9 + x + 1];
      if (left > right) hash |= 1n << BigInt(y * 8 + x);
    }
  }
  return hash;
}

function hamming(a, b) {
  let x = a ^ b;
  let count = 0;
  while (x) {
    count += Number(x & 1n);
    x >>= 1n;
  }
  return count;
}

function compareShots(a, b) {
  if (b.people.length !== a.people.length) return b.people.length - a.people.length;
  if (a.isCopy !== b.isCopy) return a.isCopy ? 1 : -1;
  return b.area - a.area;
}

function selectUnique(items) {
  const named = items.filter((item) => item.people.length > 0).sort(compareShots);
  const anon = items.filter((item) => item.people.length === 0).sort((a, b) => b.area - a.area);
  const used = new Set();
  const picked = [];
  const dropped = [];

  for (const item of named) {
    const overlap = item.people.filter((person) => used.has(person));
    if (overlap.length) {
      dropped.push({ item, reason: overlap.join(", ") });
      continue;
    }
    item.people.forEach((person) => used.add(person));
    picked.push(item);
  }

  for (const item of anon) {
    const near = picked.find((other) => hamming(other.dhash, item.dhash) <= 10);
    if (near) {
      dropped.push({ item, reason: `near-duplicate of ${path.basename(near.abs)}` });
      continue;
    }
    picked.push(item);
  }

  return { picked, dropped };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const candidates = [];

  for (const file of fs.readdirSync(OUT_DIR)) {
    if (!/\.jpe?g$/i.test(file)) continue;
    if (SKIP_FILES.has(file.toLowerCase())) continue;
    const category = CATEGORY_ORDER.find((id) => file.startsWith(`${id}-`));
    if (!category) continue;
    candidates.push({
      abs: path.join(OUT_DIR, file),
      file,
      category,
      source: "existing",
      isCopy: /copy/i.test(file),
    });
  }

  for (const [dir, category] of NEW_SOURCES) {
    if (!fs.existsSync(dir)) {
      console.warn("Missing folder:", dir);
      continue;
    }
    for (const file of fs.readdirSync(dir)) {
      if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
      if (SKIP_FILES.has(file.toLowerCase())) continue;
      candidates.push({
        abs: path.join(dir, file),
        file,
        category,
        source: "new",
        isCopy: /copy/i.test(file),
      });
    }
  }

  const records = [];
  const seenSha = new Set();
  let skippedExact = 0;
  let skippedError = 0;

  for (const candidate of candidates) {
    let buf;
    try {
      buf = fs.readFileSync(candidate.abs);
    } catch {
      skippedError++;
      continue;
    }
    if (buf.length < 25_000) continue;

    const sha = crypto.createHash("sha1").update(buf).digest("hex");
    if (seenSha.has(sha)) {
      skippedExact++;
      continue;
    }
    seenSha.add(sha);

    let meta;
    let hash;
    try {
      meta = await sharp(buf).rotate().metadata();
      hash = await dHash(buf);
    } catch {
      skippedError++;
      continue;
    }

    records.push({
      ...candidate,
      sha,
      width: meta.width || 1,
      height: meta.height || 1,
      area: (meta.width || 1) * (meta.height || 1),
      people: peopleFromFilename(candidate.file),
      dhash: hash,
      includeInAll: true,
    });
  }

  const selected = [];
  const droppedByCategory = [];

  for (const category of CATEGORY_ORDER) {
    const { picked, dropped } = selectUnique(records.filter((item) => item.category === category));
    selected.push(...picked);
    for (const drop of dropped) {
      droppedByCategory.push({ category, ...drop });
    }
  }

  const allPool = [...selected].sort(compareShots);
  const usedAll = new Set();
  const allHashes = [];
  const hiddenFromAll = [];

  for (const item of allPool) {
    if (item.people.length) {
      const overlap = item.people.filter((person) => usedAll.has(person));
      if (overlap.length) {
        item.includeInAll = false;
        hiddenFromAll.push({ item, reason: overlap.join(", ") });
        continue;
      }
      item.people.forEach((person) => usedAll.add(person));
      item.includeInAll = true;
      allHashes.push(item.dhash);
      continue;
    }

    const near = allHashes.find((hash) => hamming(hash, item.dhash) <= 10);
    if (near !== undefined) {
      item.includeInAll = false;
      hiddenFromAll.push({ item, reason: "near-duplicate in another section" });
      continue;
    }
    item.includeInAll = true;
    allHashes.push(item.dhash);
  }

  const keepPaths = new Set();

  for (const item of selected) {
    if (item.source === "existing") {
      keepPaths.add(path.resolve(item.abs));
      item.outName = path.basename(item.abs);
      item.src = `/images/gallery/${item.outName}`;
      continue;
    }

    const base = sanitizeBase(item.file) || `img-${item.sha.slice(0, 8)}`;
    const outName = `${item.category}-${base}-${item.sha.slice(0, 6)}.jpg`;
    const outPath = path.join(OUT_DIR, outName);
    await sharp(item.abs)
      .rotate()
      .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(outPath);

    const exported = await sharp(outPath).metadata();
    item.width = exported.width || item.width;
    item.height = exported.height || item.height;
    item.outName = outName;
    item.src = `/images/gallery/${outName}`;
    keepPaths.add(path.resolve(outPath));
  }

  let removedFiles = 0;
  for (const file of fs.readdirSync(OUT_DIR)) {
    const abs = path.resolve(OUT_DIR, file);
    if (!/\.jpe?g$/i.test(file)) continue;
    if (!keepPaths.has(abs)) {
      fs.unlinkSync(abs);
      removedFiles++;
    }
  }

  selected.sort((a, b) => {
    const categoryDelta = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
    if (categoryDelta !== 0) return categoryDelta;
    return a.src.localeCompare(b.src);
  });

  const items = selected.map((item) => ({
    id: item.sha.slice(0, 12),
    src: item.src,
    alt: `${item.category} photography by Javies Photography Studio`,
    caption: CATEGORY_LABEL[item.category],
    category: item.category,
    width: item.width,
    height: item.height,
    ratio: Number((item.width / item.height).toFixed(4)),
    includeInAll: item.includeInAll,
  }));

  const categories = [
    { id: "all", label: "All" },
    ...CATEGORY_ORDER.filter((id) => items.some((item) => item.category === id)).map((id) => ({
      id,
      label: CATEGORY_LABEL[id],
    })),
  ];

  const ts = `/* Auto-generated by scripts/curate-gallery.js — do not edit by hand */
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
  includeInAll: boolean;
};

export const galleryCategories: { id: GalleryCategory; label: string }[] = ${JSON.stringify(categories, null, 2)};

export const galleryItems: GalleryItem[] = ${JSON.stringify(items, null, 2)};
`;

  fs.writeFileSync(DATA_OUT, ts);

  const byCat = {};
  const allByCat = {};
  for (const item of items) {
    byCat[item.category] = (byCat[item.category] || 0) + 1;
    if (item.includeInAll) allByCat[item.category] = (allByCat[item.category] || 0) + 1;
  }

  console.log("\n=== CURATION SUMMARY ===");
  console.log("Candidates:", candidates.length);
  console.log("Readable unique files:", records.length);
  console.log("Skipped exact file duplicates:", skippedExact);
  console.log("Skipped errors:", skippedError);
  console.log("Kept in sections:", items.length);
  console.log("Shown in All:", items.filter((item) => item.includeInAll).length);
  console.log("Removed extra files:", removedFiles);
  console.log("Section counts:", byCat);
  console.log("All counts:", allByCat);
  console.log("\nDropped extra poses:");
  for (const drop of droppedByCategory) {
    console.log(
      `- ${drop.category}: ${drop.item.file} (same as ${drop.reason})`
    );
  }
  console.log("\nHidden from All because the person already appears:");
  for (const hidden of hiddenFromAll) {
    console.log(`- ${hidden.item.category}: ${hidden.item.file} (${hidden.reason})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
