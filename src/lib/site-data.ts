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
