export const siteConfig = {
  name: "Javies Photography Studios",
  shortName: "Javies",
  tagline: "Your Moments. Beautifully Told.",
  description:
    "Photography and visual storytelling for life's most important moments. Professional photography and videography studio based in Accra, Ghana.",
  phone: "0245103261",
  phoneInternational: "+233245103261",
  whatsapp: "233245103261",
  email: "hello@javiesphotography.com", // editable placeholder
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
  url: "https://javiesphotography.com", // editable placeholder
  avenor: {
    credit: "Website redesign concept crafted by Avenor Tech.",
  },
} as const;

export const navLinks = [
  { label: "Work", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Stories", href: "#stories" },
  { label: "About", href: "#about" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
] as const;

export type ServiceId =
  | "children"
  | "family"
  | "maternity"
  | "portraits"
  | "events"
  | "drone"
  | "corporate"
  | "videography";

export const services: {
  id: ServiceId;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    id: "children",
    title: "Children",
    description: "Creative children's portrait sessions that capture wonder, personality, and joy.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    imageAlt: "Child portrait photography session",
  },
  {
    id: "family",
    title: "Family",
    description: "Family photography focused on connection, warmth, and lasting memories.",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
    imageAlt: "Family photography session",
  },
  {
    id: "maternity",
    title: "Maternity",
    description: "Elegant maternity photography celebrating this beautiful season of life.",
    image:
      "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=800&q=80",
    imageAlt: "Maternity photography session",
  },
  {
    id: "portraits",
    title: "Portraits",
    description: "Professional and creative portraits that reveal who you are.",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
    imageAlt: "Professional portrait photography",
  },
  {
    id: "events",
    title: "Events",
    description: "Photography and visual coverage for celebrations and gatherings.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    imageAlt: "Event photography coverage",
  },
  {
    id: "drone",
    title: "Drone",
    description: "Professional aerial photography and videography from above.",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
    imageAlt: "Aerial drone photography",
  },
  {
    id: "corporate",
    title: "Corporate",
    description: "Professional photography for businesses and organizations.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    imageAlt: "Corporate photography session",
  },
  {
    id: "videography",
    title: "Videography",
    description: "Cinematic visual storytelling through moving images.",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    imageAlt: "Cinematic videography",
  },
];

export type PortfolioCategory =
  | "all"
  | "children"
  | "family"
  | "maternity"
  | "portraits"
  | "events"
  | "corporate"
  | "weddings"
  | "videography"
  | "drone";

export const portfolioCategories: { id: PortfolioCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "children", label: "Children" },
  { id: "family", label: "Family" },
  { id: "maternity", label: "Maternity" },
  { id: "portraits", label: "Portraits" },
  { id: "events", label: "Events" },
  { id: "corporate", label: "Corporate" },
  { id: "weddings", label: "Weddings" },
  { id: "videography", label: "Videography" },
  { id: "drone", label: "Drone" },
];

export type PortfolioItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: Exclude<PortfolioCategory, "all">;
  aspect: "portrait" | "landscape" | "square" | "wide";
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "p1",
    src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=85",
    alt: "Child laughing in natural light",
    caption: "Joy in the ordinary",
    category: "children",
    aspect: "portrait",
  },
  {
    id: "p2",
    src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=85",
    alt: "Family embracing outdoors",
    caption: "Together, always",
    category: "family",
    aspect: "landscape",
  },
  {
    id: "p3",
    src: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=1200&q=85",
    alt: "Expectant mother in soft light",
    caption: "Waiting with grace",
    category: "maternity",
    aspect: "portrait",
  },
  {
    id: "p4",
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=85",
    alt: "Editorial portrait of a woman",
    caption: "Quiet confidence",
    category: "portraits",
    aspect: "portrait",
  },
  {
    id: "p5",
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=85",
    alt: "Celebration event atmosphere",
    caption: "The night unfolds",
    category: "events",
    aspect: "wide",
  },
  {
    id: "p6",
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=85",
    alt: "Corporate team collaboration",
    caption: "Built with purpose",
    category: "corporate",
    aspect: "landscape",
  },
  {
    id: "p7",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85",
    alt: "Wedding couple in golden light",
    caption: "A promise kept",
    category: "weddings",
    aspect: "portrait",
  },
  {
    id: "p8",
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=85",
    alt: "Cinematic film production moment",
    caption: "Stories in motion",
    category: "videography",
    aspect: "wide",
  },
  {
    id: "p9",
    src: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=85",
    alt: "Aerial cityscape at dusk",
    caption: "From above",
    category: "drone",
    aspect: "landscape",
  },
  {
    id: "p10",
    src: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1200&q=85",
    alt: "Children playing together",
    caption: "Little adventurers",
    category: "children",
    aspect: "square",
  },
  {
    id: "p11",
    src: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1200&q=85",
    alt: "Family walking hand in hand",
    caption: "Generations of love",
    category: "family",
    aspect: "portrait",
  },
  {
    id: "p12",
    src: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&q=85",
    alt: "Maternity silhouette",
    caption: "New beginnings",
    category: "maternity",
    aspect: "landscape",
  },
  {
    id: "p13",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=85",
    alt: "Men's portrait in studio light",
    caption: "Presence",
    category: "portraits",
    aspect: "portrait",
  },
  {
    id: "p14",
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=85",
    alt: "Event guests celebrating",
    caption: "Moments that matter",
    category: "events",
    aspect: "square",
  },
  {
    id: "p15",
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&q=85",
    alt: "Wedding ceremony detail",
    caption: "Sacred details",
    category: "weddings",
    aspect: "square",
  },
  {
    id: "p16",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85",
    alt: "Corporate conference atmosphere",
    caption: "Leadership in focus",
    category: "corporate",
    aspect: "wide",
  },
  {
    id: "p17",
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&q=85",
    alt: "Creative portrait with soft tones",
    caption: "Soft strength",
    category: "portraits",
    aspect: "portrait",
  },
  {
    id: "p18",
    src: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1200&q=85",
    alt: "Child in a creative concept session",
    caption: "Imagination unbound",
    category: "children",
    aspect: "landscape",
  },
];

export const featuredStories = [
  {
    id: "family-story",
    title: "A Family Story",
    subtitle: "Connection across generations",
    category: "Family",
    hero: {
      src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1600&q=85",
      alt: "Family gathered in warm light",
      caption: "The gathering",
    },
    frames: [
      {
        src: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1000&q=85",
        alt: "Family portrait",
        caption: "Portrait",
        label: "Portrait",
      },
      {
        src: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1000&q=85",
        alt: "Family interaction",
        caption: "Interaction",
        label: "Family interaction",
      },
      {
        src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1000&q=85",
        alt: "Intimate detail",
        caption: "Details",
        label: "Details",
      },
      {
        src: "https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=1000&q=85",
        alt: "Final family moment",
        caption: "The close",
        label: "Final image",
      },
    ],
  },
  {
    id: "maternity-story",
    title: "A Maternity Story",
    subtitle: "Anticipation, held gently",
    category: "Maternity",
    hero: {
      src: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=1600&q=85",
      alt: "Maternity hero portrait",
      caption: "Becoming",
    },
    frames: [
      {
        src: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1000&q=85",
        alt: "Maternity portrait",
        caption: "Portrait",
        label: "Portrait",
      },
      {
        src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1000&q=85",
        alt: "Partner connection",
        caption: "Connection",
        label: "Family interaction",
      },
      {
        src: "https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=1000&q=85",
        alt: "Maternity detail",
        caption: "Details",
        label: "Details",
      },
      {
        src: "https://images.unsplash.com/photo-1544126592-807ade215a0b?w=1000&q=85",
        alt: "Final maternity frame",
        caption: "The close",
        label: "Final image",
      },
    ],
  },
  {
    id: "events-story",
    title: "An Event Story",
    subtitle: "Celebration, remembered",
    category: "Events",
    hero: {
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=85",
      alt: "Event celebration hero",
      caption: "The evening",
    },
    frames: [
      {
        src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1000&q=85",
        alt: "Guest portrait at event",
        caption: "Portrait",
        label: "Portrait",
      },
      {
        src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000&q=85",
        alt: "Guests interacting",
        caption: "Interaction",
        label: "Family interaction",
      },
      {
        src: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1000&q=85",
        alt: "Event detail shot",
        caption: "Details",
        label: "Details",
      },
      {
        src: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1000&q=85",
        alt: "Final event moment",
        caption: "The close",
        label: "Final image",
      },
    ],
  },
  {
    id: "corporate-story",
    title: "A Corporate Story",
    subtitle: "Brand, people, presence",
    category: "Corporate",
    hero: {
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=85",
      alt: "Corporate workplace hero",
      caption: "The workplace",
    },
    frames: [
      {
        src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1000&q=85",
        alt: "Executive portrait",
        caption: "Portrait",
        label: "Portrait",
      },
      {
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=85",
        alt: "Team collaboration",
        caption: "Collaboration",
        label: "Family interaction",
      },
      {
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=85",
        alt: "Office detail",
        caption: "Details",
        label: "Details",
      },
      {
        src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&q=85",
        alt: "Final corporate frame",
        caption: "The close",
        label: "Final image",
      },
    ],
  },
  {
    id: "children-story",
    title: "A Children's Story",
    subtitle: "Wonder, frozen in time",
    category: "Children",
    hero: {
      src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1600&q=85",
      alt: "Children photography hero",
      caption: "Wonder",
    },
    frames: [
      {
        src: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1000&q=85",
        alt: "Child portrait",
        caption: "Portrait",
        label: "Portrait",
      },
      {
        src: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1000&q=85",
        alt: "Kids playing together",
        caption: "Play",
        label: "Family interaction",
      },
      {
        src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1000&q=85",
        alt: "Childhood detail",
        caption: "Details",
        label: "Details",
      },
      {
        src: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1000&q=85",
        alt: "Final children's frame",
        caption: "The close",
        label: "Final image",
      },
    ],
  },
];

export const kidsExperience = {
  title: "Little Moments. Forever Memories.",
  description:
    "A warm, playful space for children's portraiture — birthday sessions, family moments, and creative concepts — crafted with the same care as every Javies story.",
  images: [
    {
      src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&q=85",
      alt: "Kids portrait",
      label: "Kids portraits",
    },
    {
      src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=900&q=85",
      alt: "Birthday session",
      label: "Birthday sessions",
    },
    {
      src: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=900&q=85",
      alt: "Family moments with children",
      label: "Family moments",
    },
    {
      src: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=900&q=85",
      alt: "Creative kids concept",
      label: "Creative concepts",
    },
  ],
};

export const packages = [
  {
    id: "essential",
    name: "Essential Session",
    description: "A focused session for portraits, maternity, or small family groups.",
    highlights: ["Studio or outdoor", "Guided posing", "Curated gallery delivery"],
  },
  {
    id: "signature",
    name: "Signature Story",
    description: "An extended storytelling session designed for families and milestones.",
    highlights: ["Multiple locations", "Story-led coverage", "Premium edit set"],
  },
  {
    id: "event",
    name: "Event Coverage",
    description: "Full visual documentation for celebrations, corporate, and gatherings.",
    highlights: ["Timeline planning", "Photo + optional video", "Same-week highlights"],
  },
  {
    id: "commercial",
    name: "Commercial & Brand",
    description: "Polished imagery for businesses, campaigns, and organizational needs.",
    highlights: ["Brand-aligned direction", "Usage-ready files", "Team & product options"],
  },
];

export const aboutContent = {
  title: "The Vision Behind Javies Studios",
  lead: "Javies Photography Studios is a professional photography and videography studio based in Accra, Ghana — dedicated to capturing life's most meaningful moments with warmth, creativity, and care.",
  body: [
    // Editable placeholders — replace with verified brand copy
    "[Editable] At Javies, every session is an opportunity to tell a visual story — whether it's a child's laughter, a family's quiet connection, or a brand's defining presence.",
    "[Editable] From our studio at C&G House on Dome Road in Westlands, we welcome families, couples, individuals, and organizations seeking photography that feels both elevated and deeply human.",
    "[Editable] Our approach blends professional craft with a welcoming atmosphere, so every client feels seen, comfortable, and proud of the images they take home.",
  ],
  values: [
    { title: "Professional", description: "Reliable craft and clear communication at every step." },
    { title: "Creative", description: "Thoughtful direction that brings each story to life." },
    { title: "Warm", description: "A welcoming experience from first message to final gallery." },
    { title: "Premium", description: "Presentation and quality that honor your moments." },
  ],
};

/** Development-only editable placeholders — replace with real client testimonials */
export const testimonialPlaceholders = [
  {
    id: "t1",
    quote:
      "[Editable placeholder] Replace with a real client reflection about their family session experience.",
    name: "[Client Name]",
    context: "Family Session",
    isPlaceholder: true,
  },
  {
    id: "t2",
    quote:
      "[Editable placeholder] Replace with a real maternity or portrait client testimonial.",
    name: "[Client Name]",
    context: "Maternity Session",
    isPlaceholder: true,
  },
  {
    id: "t3",
    quote:
      "[Editable placeholder] Replace with a real corporate or event client reflection.",
    name: "[Client Name]",
    context: "Corporate Coverage",
    isPlaceholder: true,
  },
];

export const bookingServices = [
  { id: "children", label: "Children" },
  { id: "family", label: "Family" },
  { id: "maternity", label: "Maternity" },
  { id: "portrait", label: "Portrait" },
  { id: "event", label: "Event" },
  { id: "corporate", label: "Corporate" },
  { id: "videography", label: "Videography" },
  { id: "drone", label: "Drone" },
] as const;

export const locationOptions = [
  "Studio — C&G House, Westlands",
  "Outdoor / Location of choice",
  "Client venue / Event space",
  "To be discussed",
] as const;
