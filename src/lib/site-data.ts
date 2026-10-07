export const siteConfig = {
  name: "Javies Photography Studio",
  shortName: "Javies",
  tagline: "Photography Studio · Accra, Ghana",
  description:
    "Javies Photography Studio — professional photography for portraits, celebrations, events and special moments in Accra, Ghana.",
  phone: "0245103261",
  phoneInternational: "+233245103261",
  whatsapp: "233245103261",
  email: "javiesstudios@gmail.com",
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
  youtube: {
    url: "https://www.youtube.com/@javiesstudios/videos",
    videoId: "oHrCNndSOdg",
    title: "Another project wrapped for Kelele clothing.",
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
  width: number;
  height: number;
}[] = [
  {
    id: "maternity",
    title: "Maternity",
    description: "Studio and outdoor maternity sessions.",
    image: "/images/service-maternity-full.jpg",
    imageAlt: "Outdoor maternity session by Javies Photography Studio",
    width: 2000,
    height: 2500,
  },
  {
    id: "newborn",
    title: "Newborn",
    description: "Gentle newborn and baby sessions.",
    image: "/images/service-newborn.jpg",
    imageAlt: "Newborn baby portrait by Javies Photography Studio",
    width: 1920,
    height: 2400,
  },
  {
    id: "milestone",
    title: "Milestone",
    description: "Birthday and kids milestone sessions.",
    image: "/images/service-milestone.jpg",
    imageAlt: "Jungle-themed second birthday session by Javies Photography Studio",
    width: 1920,
    height: 2400,
  },
  {
    id: "family",
    title: "Family",
    description: "Family portraits in studio.",
    image: "/images/service-family-nursery.jpg",
    imageAlt: "Parents with their baby during a family studio session by Javies Photography Studio",
    width: 1919,
    height: 2400,
  },
  {
    id: "traditional",
    title: "Traditional",
    description: "Cultural and traditional attire sessions.",
    image: "/images/service-traditional.jpg",
    imageAlt: "Traditional attire portrait by Javies Photography Studio",
    width: 1920,
    height: 2400,
  },
  {
    id: "portrait",
    title: "Portrait",
    description: "Individual and couple portraits.",
    image: "/images/service-portrait.jpg",
    imageAlt: "Couple portrait by Javies Photography Studio",
    width: 2000,
    height: 1497,
  },
  {
    id: "christmas",
    title: "Christmas",
    description: "Festive seasonal family sessions.",
    image: "/images/service-christmas.jpg",
    imageAlt: "Christmas studio session by Javies Photography Studio",
    width: 2000,
    height: 1497,
  },
];

export const featuredWork = [
  {
    src: "/images/featured-traditional-kente.jpg",
    alt: "Mother and child in traditional kente",
    category: "Traditional",
    width: 1920,
    height: 2400,
  },
  {
    src: "/images/featured-twins-kente.jpg",
    alt: "Twin girls in traditional attire",
    category: "Milestone",
    width: 1920,
    height: 2400,
  },
  {
    src: "/images/featured-newborn.jpg",
    alt: "Sleeping newborn portrait",
    category: "Newborn",
    width: 1807,
    height: 2400,
  },
  {
    src: "/images/featured-maternity-outdoor-full.jpg",
    alt: "Outdoor maternity portrait",
    category: "Maternity",
    width: 2000,
    height: 2500,
  },
  {
    src: "/images/featured-princess.jpg",
    alt: "Girl in traditional kente and crown",
    category: "Traditional",
    width: 1807,
    height: 2400,
  },
  {
    src: "/images/featured-milestone-5.jpg",
    alt: "Fifth birthday studio session",
    category: "Milestone",
    width: 1920,
    height: 2400,
  },
  {
    src: "/images/featured-twins-newborn.jpg",
    alt: "Newborn twins session",
    category: "Newborn",
    width: 1919,
    height: 2400,
  },
  {
    src: "/images/featured-milestone-baffour.jpg",
    alt: "First birthday traditional milestone",
    category: "Milestone",
    width: 1920,
    height: 2400,
  },
  {
    src: "/images/featured-maternity-couple.jpg",
    alt: "Maternity couple portrait",
    category: "Maternity",
    width: 2000,
    height: 1497,
  },
  {
    src: "/images/featured-traditional-jeslyn.jpg",
    alt: "Traditional attire portrait",
    category: "Traditional",
    width: 1920,
    height: 2400,
  },
  {
    src: "/images/featured-newborn-naseda.jpg",
    alt: "Styled baby studio portrait",
    category: "Newborn",
    width: 2000,
    height: 1600,
  },
  {
    src: "/images/featured-milestone-bedrich.jpg",
    alt: "Kids birthday milestone session",
    category: "Milestone",
    width: 1921,
    height: 2400,
  },
];

/** 2026 rate card. Figures are taken from the studio price PDF only. */
export const rateCard = {
  currency: "GHc",
  groups: [
    {
      id: "kids",
      name: "Kids milestone",
      detail: "Ages 1–10",
      note: "Twins add GHc 500.",
      tiers: [
        {
          name: "Little Stars",
          price: "GHc 500",
          includes: [
            "20-minute session",
            "1 studio setup",
            "1 outfit, provided by the parent",
            "20+ digital images",
            "5 retouched images",
          ],
        },
        {
          name: "Joy",
          price: "GHc 700",
          includes: [
            "30-minute session",
            "2 studio setups",
            "2 outfits, provided by the parent",
            "40+ digital images",
            "10 retouched images",
          ],
        },
        {
          name: "Charm",
          price: "GHc 800",
          includes: [
            "45-minute session",
            "3 studio setups",
            "3 outfits, provided by the parent",
            "60+ digital images",
            "15 retouched images",
          ],
        },
        {
          name: "Charm Love",
          price: "GHc 1,200",
          includes: [
            "50-minute session",
            "2 studio setups",
            "2 outfits, provided by the parent",
            "Parents can join in one outfit",
            "80+ digital images",
            "15 retouched images",
          ],
        },
        {
          name: "Memories",
          price: "GHc 1,500",
          includes: [
            "1-hour session",
            "3 studio setups",
            "3 outfits, provided by the parent",
            "Parents can join in one outfit",
            "100+ digital images",
            "20 retouched images",
          ],
        },
      ],
    },
    {
      id: "newborn",
      name: "Newborn",
      detail: "0–8 weeks",
      note: "Twins add GHc 500.",
      tiers: [
        {
          name: "Newborn",
          price: "GHc 800",
          includes: [
            "45 minutes to 1 hour",
            "2 outfits or wraps",
            "Wraps, accessories, props, and setup included",
            "10 retouched digital images",
          ],
        },
        {
          name: "Newborn with family",
          price: "GHc 1,200",
          includes: [
            "2-hour session",
            "2 outfits or wraps",
            "Wraps, accessories, props, and setup included",
            "Group portraits with parents and siblings",
            "15 retouched digital images",
          ],
        },
      ],
    },
    {
      id: "cake",
      name: "Cake smash",
      detail: "Studio",
      note: "Twins add GHc 500. The cake is not included — you may bring your own.",
      tiers: [
        {
          name: "Cake smash",
          price: "GHc 800",
          includes: [
            "45-minute session",
            "1 themed setup",
            "1 outfit change",
            "Up to 30 digital pictures",
            "10 retouched images",
          ],
        },
      ],
    },
    {
      id: "portrait",
      name: "Senior and corporate portraits",
      detail: "Headshots and personal portraits",
      note: "An extra outfit change is GHc 400.",
      tiers: [
        {
          name: "Package One",
          price: "GHc 1,000",
          includes: [
            "45-minute session",
            "2 backgrounds",
            "2 outfits",
            "50+ digital images",
            "10 retouched images",
          ],
        },
        {
          name: "Package Two",
          price: "GHc 1,200",
          includes: [
            "1-hour session",
            "3 backgrounds",
            "3 outfits",
            "80+ digital images",
            "15 retouched images",
          ],
        },
        {
          name: "Package Three",
          price: "GHc 2,500",
          includes: [
            "1 hour 30 minutes",
            "3 backgrounds",
            "3 outfits",
            "80+ digital images",
            "15 retouched images",
            "Complimentary 12×16 canvas",
          ],
        },
      ],
    },
    {
      id: "events",
      name: "Events",
      detail: "Naming ceremonies and kids’ birthday parties",
      note: "Photography and video are booked separately.",
      tiers: [
        {
          name: "Photography One",
          price: "GHc 1,500",
          includes: ["1–3 hours", "Edited soft copies via Google Drive"],
        },
        {
          name: "Photography Two",
          price: "GHc 2,000",
          includes: [
            "1–3 hours",
            "Edited soft copies via Google Drive and a pen drive",
            "50 printed images",
          ],
        },
        {
          name: "Photography Three",
          price: "GHc 3,500",
          includes: [
            "1–3 hours",
            "Edited soft copies on a pen drive",
            "11.5×8.5 (22.5×8.5) matt photobook",
          ],
        },
        {
          name: "Video",
          price: "GHc 2,000",
          includes: ["1–4 hours", "1–3 minute thriller on a pen drive"],
        },
        {
          name: "Video and full film",
          price: "GHc 3,000",
          includes: ["1–4 hours", "1–3 minute thriller and the full video on a pen drive"],
        },
      ],
    },
  ],
  frames: [
    { size: "5×7", price: "GHc 150" },
    { size: "10×12", price: "GHc 200" },
    { size: "12×16", price: "GHc 550" },
    { size: "16×20", price: "GHc 850" },
    { size: "20×24", price: "GHc 950" },
    { size: "24×36", price: "GHc 1,050" },
  ],
  callOut:
    "Private or out-of-studio sessions add a GHc 1,000 call-out fee on top of the package. That fee covers Tema and Accra. Sessions outside Accra are quoted separately. Clients who book or refer more than once in a year qualify for the studio loyalty discount.",
  terms: [
    "Sessions are by appointment. Arriving more than 30 minutes late can mean a fee or a cancelled appointment.",
    "A 50% deposit confirms the booking. The balance is due on the day of the shoot.",
    "Please come with no more than 3 adults.",
    "Cancel 2 weeks or more ahead for a full refund. Inside 2 weeks, the deposit is non-refundable.",
    "You may reschedule once, with at least 5 days’ notice.",
    "Edited images are delivered within 10 working days. Express delivery is GHc 300 for 5 days, GHc 500 for 3 days, and GHc 1,500 for under 3 days.",
    "Javies Studios may use the photographs for the website, rate card, and social media. Exclusive ownership can be agreed with the studio before the session.",
  ],
} as const;

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
  imageAlt: "Traditional studio portrait by Javies Photography Studio",
  width: 1920,
  height: 2400,
};

export const heroSlides = [
  {
    id: "collage",
    src: "/images/hero/collage-white.jpg",
    alt: "Circular collage of children's sessions by Javies Photography Studio",
    objectPosition: "center center",
    layout: "poster",
    tone: "light",
  },
  {
    id: "milan",
    src: "/images/hero/milan.jpg",
    alt: "Baby in a mustard knitted set, studio session by Javies Photography Studio",
    objectPosition: "center center",
  },
  {
    id: "maternity",
    src: "/images/hero/maternity.jpg",
    alt: "Maternity studio session in pink by Javies Photography Studio",
    objectPosition: "center 35%",
  },
  {
    id: "prints",
    src: "/images/hero/prints.jpg",
    alt: "Framed family prints styled in the studio by Javies Photography Studio",
    objectPosition: "center center",
  },
] as const;
