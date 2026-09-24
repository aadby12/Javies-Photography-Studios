export const siteConfig = {
  name: "Javies Photography Studio",
  shortName: "Javies",
  tagline: "Photography Studio · Accra, Ghana",
  description:
    "Javies Photography Studio — professional photography for portraits, celebrations, events and special moments in Accra, Ghana.",
  phone: "0245103261",
  phoneInternational: "+233245103261",
  whatsapp: "233245103261",
  address: {
    street: "C&G House, Dome Road, Westlands",
    city: "Accra",
    country: "Ghana",
    full: "C&G House, Dome Road, Westlands, Accra",
  },
  instagram: {
    handle: "@javiesphotography_studios",
    url: "https://www.instagram.com/javiesphotography_studios/",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=C%26G+House+Dome+Road+Westlands+Accra",
  url: "https://javies-photography-studios.vercel.app",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
] as const;

export type ServiceId =
  | "maternity"
  | "newborn"
  | "milestone"
  | "family"
  | "traditional"
  | "portrait"
  | "christmas";

export const services: {
  id: ServiceId;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    id: "maternity",
    title: "Maternity",
    description: "Studio and outdoor maternity sessions.",
    image: "/images/service-maternity.jpg",
    imageAlt: "Maternity studio session by Javies Photography Studio",
  },
  {
    id: "newborn",
    title: "Newborn",
    description: "Gentle newborn and baby sessions.",
    image: "/images/service-newborn.jpg",
    imageAlt: "Newborn portrait by Javies Photography Studio",
  },
  {
    id: "milestone",
    title: "Milestone",
    description: "Birthday and kids milestone sessions.",
    image: "/images/service-milestone.jpg",
    imageAlt: "Kids milestone session by Javies Photography Studio",
  },
  {
    id: "family",
    title: "Family",
    description: "Family portraits in studio.",
    image: "/images/service-family.jpg",
    imageAlt: "Family portrait by Javies Photography Studio",
  },
  {
    id: "traditional",
    title: "Traditional",
    description: "Cultural and traditional attire sessions.",
    image: "/images/service-traditional.jpg",
    imageAlt: "Traditional Ghanaian portrait by Javies Photography Studio",
  },
  {
    id: "portrait",
    title: "Portrait",
    description: "Individual and couple portraits.",
    image: "/images/service-portrait.jpg",
    imageAlt: "Couple portrait by Javies Photography Studio",
  },
  {
    id: "christmas",
    title: "Christmas",
    description: "Festive seasonal family sessions.",
    image: "/images/service-christmas.jpg",
    imageAlt: "Christmas family session by Javies Photography Studio",
  },
];

export type GalleryCategory =
  | "all"
  | "maternity"
  | "newborn"
  | "milestone"
  | "family"
  | "traditional"
  | "christmas"
  | "portrait";

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "maternity", label: "Maternity" },
  { id: "newborn", label: "Newborn" },
  { id: "milestone", label: "Milestone" },
  { id: "family", label: "Family" },
  { id: "traditional", label: "Traditional" },
  { id: "christmas", label: "Christmas" },
  { id: "portrait", label: "Portrait" },
];

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: Exclude<GalleryCategory, "all">;
  aspect: "portrait" | "landscape" | "square" | "wide";
};

export const galleryItems: GalleryItem[] = [
  { id: "g-mat-01", src: "/images/gallery-maternity-01.jpg", alt: "Maternity session with mother and toddler", caption: "Maternity", category: "maternity", aspect: "landscape" },
  { id: "g-mat-02", src: "/images/gallery-maternity-02.jpg", alt: "Outdoor maternity portrait", caption: "Maternity", category: "maternity", aspect: "portrait" },
  { id: "g-mat-03", src: "/images/gallery-maternity-03.jpg", alt: "Maternity couple outdoors", caption: "Maternity", category: "maternity", aspect: "landscape" },
  { id: "g-mat-04", src: "/images/gallery-maternity-04.jpg", alt: "Maternity couple studio embrace", caption: "Maternity", category: "maternity", aspect: "portrait" },
  { id: "g-mat-05", src: "/images/gallery-maternity-05.jpg", alt: "Maternity portrait", caption: "Maternity", category: "maternity", aspect: "portrait" },
  { id: "g-mat-06", src: "/images/gallery-maternity-06.jpg", alt: "Maternity session", caption: "Maternity", category: "maternity", aspect: "portrait" },
  { id: "g-mat-07", src: "/images/gallery-maternity-07.jpg", alt: "Maternity studio portrait", caption: "Maternity", category: "maternity", aspect: "portrait" },
  { id: "g-nb-01", src: "/images/gallery-newborn-01.jpg", alt: "Sleeping newborn in white wrap", caption: "Newborn", category: "newborn", aspect: "portrait" },
  { id: "g-nb-02", src: "/images/gallery-newborn-02.jpg", alt: "Newborn baby portrait", caption: "Newborn", category: "newborn", aspect: "portrait" },
  { id: "g-nb-03", src: "/images/gallery-newborn-03.jpg", alt: "Twins newborn session", caption: "Newborn", category: "newborn", aspect: "square" },
  { id: "g-nb-04", src: "/images/gallery-newborn-04.jpg", alt: "Newborn twins studio", caption: "Newborn", category: "newborn", aspect: "portrait" },
  { id: "g-nb-05", src: "/images/gallery-newborn-05.jpg", alt: "Baby milestone portrait", caption: "Newborn", category: "newborn", aspect: "portrait" },
  { id: "g-nb-06", src: "/images/gallery-newborn-06.jpg", alt: "Three-month baby session", caption: "Newborn", category: "newborn", aspect: "portrait" },
  { id: "g-nb-07", src: "/images/gallery-newborn-07.jpg", alt: "Newborn studio portrait", caption: "Newborn", category: "newborn", aspect: "portrait" },
  { id: "g-nb-08", src: "/images/gallery-newborn-08.jpg", alt: "Seven-month baby session", caption: "Newborn", category: "newborn", aspect: "portrait" },
  { id: "g-nb-09", src: "/images/gallery-newborn-09.jpg", alt: "Baby portrait session", caption: "Newborn", category: "newborn", aspect: "portrait" },
  { id: "g-nb-10", src: "/images/gallery-newborn-10.jpg", alt: "Baby studio session", caption: "Newborn", category: "newborn", aspect: "portrait" },
  { id: "g-ms-01", src: "/images/gallery-milestone-01.jpg", alt: "Twin girls in traditional kente", caption: "Milestone", category: "milestone", aspect: "portrait" },
  { id: "g-ms-02", src: "/images/gallery-milestone-02.jpg", alt: "First birthday traditional session", caption: "Milestone", category: "milestone", aspect: "portrait" },
  { id: "g-ms-03", src: "/images/gallery-milestone-03.jpg", alt: "Second birthday themed session", caption: "Milestone", category: "milestone", aspect: "portrait" },
  { id: "g-ms-04", src: "/images/gallery-milestone-04.jpg", alt: "Kids milestone portrait", caption: "Milestone", category: "milestone", aspect: "portrait" },
  { id: "g-ms-05", src: "/images/gallery-milestone-05.jpg", alt: "Birthday milestone session", caption: "Milestone", category: "milestone", aspect: "portrait" },
  { id: "g-ms-06", src: "/images/gallery-milestone-06.jpg", alt: "Fifth birthday session", caption: "Milestone", category: "milestone", aspect: "portrait" },
  { id: "g-ms-07", src: "/images/gallery-milestone-07.jpg", alt: "Kids birthday portrait", caption: "Milestone", category: "milestone", aspect: "portrait" },
  { id: "g-ms-08", src: "/images/gallery-milestone-08.jpg", alt: "Second birthday session", caption: "Milestone", category: "milestone", aspect: "portrait" },
  { id: "g-ms-09", src: "/images/gallery-milestone-09.jpg", alt: "Milestone studio session", caption: "Milestone", category: "milestone", aspect: "portrait" },
  { id: "g-ms-10", src: "/images/gallery-milestone-10.jpg", alt: "First birthday studio session", caption: "Milestone", category: "milestone", aspect: "landscape" },
  { id: "g-ms-11", src: "/images/gallery-milestone-11.jpg", alt: "Kids milestone portrait", caption: "Milestone", category: "milestone", aspect: "portrait" },
  { id: "g-ms-12", src: "/images/gallery-milestone-12.jpg", alt: "Kids birthday portrait", caption: "Milestone", category: "milestone", aspect: "portrait" },
  { id: "g-ms-13", src: "/images/gallery-milestone-13.jpg", alt: "First birthday session", caption: "Milestone", category: "milestone", aspect: "portrait" },
  { id: "g-ms-14", src: "/images/gallery-milestone-14.jpg", alt: "Kids milestone session", caption: "Milestone", category: "milestone", aspect: "portrait" },
  { id: "g-fam-01", src: "/images/gallery-family-01.jpg", alt: "Candid family moment in studio", caption: "Family", category: "family", aspect: "landscape" },
  { id: "g-fam-02", src: "/images/gallery-family-02.jpg", alt: "Family studio portrait", caption: "Family", category: "family", aspect: "landscape" },
  { id: "g-fam-03", src: "/images/gallery-family-03.jpg", alt: "Family of five studio portrait", caption: "Family", category: "family", aspect: "landscape" },
  { id: "g-fam-04", src: "/images/gallery-family-04.jpg", alt: "Family with baby", caption: "Family", category: "family", aspect: "portrait" },
  { id: "g-tr-01", src: "/images/gallery-traditional-01.jpg", alt: "Mother and child in kente and gold", caption: "Traditional", category: "traditional", aspect: "portrait" },
  { id: "g-tr-02", src: "/images/gallery-traditional-02.jpg", alt: "Girl in traditional kente attire", caption: "Traditional", category: "traditional", aspect: "portrait" },
  { id: "g-tr-03", src: "/images/gallery-traditional-03.jpg", alt: "Traditional attire portrait", caption: "Traditional", category: "traditional", aspect: "portrait" },
  { id: "g-tr-04", src: "/images/gallery-traditional-04.jpg", alt: "Traditional kids session", caption: "Traditional", category: "traditional", aspect: "portrait" },
  { id: "g-tr-05", src: "/images/gallery-traditional-05.jpg", alt: "Traditional first birthday on throne", caption: "Traditional", category: "traditional", aspect: "landscape" },
  { id: "g-tr-06", src: "/images/gallery-traditional-06.jpg", alt: "Traditional attire milestone", caption: "Traditional", category: "traditional", aspect: "portrait" },
  { id: "g-tr-07", src: "/images/gallery-traditional-07.jpg", alt: "Traditional portrait session", caption: "Traditional", category: "traditional", aspect: "portrait" },
  { id: "g-tr-08", src: "/images/gallery-traditional-08.jpg", alt: "Traditional kids portrait", caption: "Traditional", category: "traditional", aspect: "portrait" },
  { id: "g-tr-09", src: "/images/gallery-traditional-09.jpg", alt: "Traditional attire session", caption: "Traditional", category: "traditional", aspect: "portrait" },
  { id: "g-tr-10", src: "/images/gallery-traditional-10.jpg", alt: "Traditional baby portrait", caption: "Traditional", category: "traditional", aspect: "portrait" },
  { id: "g-tr-11", src: "/images/gallery-traditional-11.jpg", alt: "Traditional first birthday", caption: "Traditional", category: "traditional", aspect: "portrait" },
  { id: "g-ch-01", src: "/images/gallery-christmas-01.jpg", alt: "Christmas family session", caption: "Christmas", category: "christmas", aspect: "landscape" },
  { id: "g-ch-02", src: "/images/gallery-christmas-02.jpg", alt: "Festive Christmas portrait", caption: "Christmas", category: "christmas", aspect: "portrait" },
  { id: "g-ch-03", src: "/images/gallery-christmas-03.jpg", alt: "Christmas studio session", caption: "Christmas", category: "christmas", aspect: "portrait" },
  { id: "g-ch-04", src: "/images/gallery-christmas-04.jpg", alt: "Holiday family portrait", caption: "Christmas", category: "christmas", aspect: "portrait" },
  { id: "g-po-01", src: "/images/gallery-portrait-01.jpg", alt: "Formal couple portrait", caption: "Portrait", category: "portrait", aspect: "portrait" },
];

export const featuredWork = [
  { src: "/images/featured-traditional-kente.jpg", alt: "Mother and child in traditional kente", category: "Traditional" },
  { src: "/images/featured-twins-kente.jpg", alt: "Twin girls in traditional attire", category: "Milestone" },
  { src: "/images/featured-newborn.jpg", alt: "Sleeping newborn portrait", category: "Newborn" },
  { src: "/images/featured-maternity-outdoor.jpg", alt: "Outdoor maternity portrait", category: "Maternity" },
  { src: "/images/featured-princess.jpg", alt: "Girl in traditional kente and crown", category: "Traditional" },
  { src: "/images/featured-family-candid.jpg", alt: "Family candid in studio", category: "Family" },
  { src: "/images/featured-milestone-5.jpg", alt: "Fifth birthday studio session", category: "Milestone" },
  { src: "/images/featured-twins-newborn.jpg", alt: "Newborn twins session", category: "Newborn" },
  { src: "/images/featured-maternity-couple.jpg", alt: "Maternity couple portrait", category: "Maternity" },
  { src: "/images/featured-christmas.jpg", alt: "Christmas family session", category: "Christmas" },
  { src: "/images/hero-traditional.jpg", alt: "Traditional first birthday session", category: "Traditional" },
  { src: "/images/featured-portrait-couple.jpg", alt: "Formal couple portrait", category: "Portrait" },
];

/** Package details — fill with client-verified pricing. Do not invent prices. */
export const packages = [
  {
    id: "maternity",
    name: "Maternity Session",
    description: "Studio or outdoor maternity photography.",
    image: "/images/service-maternity.jpg",
    includes: [
      "[Editable] Session duration",
      "[Editable] Number of edited photos",
      "[Editable] Outfit / styling notes",
      "[Editable] Digital gallery delivery",
    ],
    price: "[Editable] Price on request",
  },
  {
    id: "newborn",
    name: "Newborn Session",
    description: "Gentle newborn and baby photography.",
    image: "/images/service-newborn.jpg",
    includes: [
      "[Editable] Session duration",
      "[Editable] Number of edited photos",
      "[Editable] Props / wraps included",
      "[Editable] Digital gallery delivery",
    ],
    price: "[Editable] Price on request",
  },
  {
    id: "milestone",
    name: "Milestone Session",
    description: "Birthday and kids milestone photography.",
    image: "/images/service-milestone.jpg",
    includes: [
      "[Editable] Session duration",
      "[Editable] Number of edited photos",
      "[Editable] Theme / setup notes",
      "[Editable] Digital gallery delivery",
    ],
    price: "[Editable] Price on request",
  },
  {
    id: "family",
    name: "Family Session",
    description: "Family portraits in studio.",
    image: "/images/service-family.jpg",
    includes: [
      "[Editable] Session duration",
      "[Editable] Number of people",
      "[Editable] Number of edited photos",
      "[Editable] Digital gallery delivery",
    ],
    price: "[Editable] Price on request",
  },
  {
    id: "traditional",
    name: "Traditional Session",
    description: "Cultural and traditional attire photography.",
    image: "/images/service-traditional.jpg",
    includes: [
      "[Editable] Session duration",
      "[Editable] Number of edited photos",
      "[Editable] Studio setup notes",
      "[Editable] Digital gallery delivery",
    ],
    price: "[Editable] Price on request",
  },
];

export const bookingServices = [
  { id: "maternity", label: "Maternity" },
  { id: "newborn", label: "Newborn" },
  { id: "milestone", label: "Milestone" },
  { id: "family", label: "Family" },
  { id: "traditional", label: "Traditional" },
  { id: "portrait", label: "Portrait" },
  { id: "christmas", label: "Christmas" },
] as const;

export const aboutContent = {
  title: "About Javies",
  lead: "Javies Photography Studio is based in Accra, Ghana — creating portraits for families, maternity, newborns, milestones, and traditional sessions.",
  location: "C&G House, Dome Road, Westlands, Accra",
  image: "/images/about-studio.jpg",
  imageAlt: "Family studio portrait by Javies Photography Studio",
};

export const heroImage = {
  src: "/images/hero-traditional.jpg",
  alt: "Traditional milestone studio session by Javies Photography Studio, Accra",
  objectPosition: "center right",
};
