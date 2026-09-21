import { siteConfig } from "@/lib/site-data";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "PhotographyBusiness"],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phoneInternational,
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: "GH",
    },
    geo: {
      "@type": "GeoCoordinates",
      addressCountry: "GH",
    },
    sameAs: [siteConfig.instagram.url],
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: "Accra",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photography Services",
      itemListElement: [
        "Children Photography",
        "Family Photography",
        "Maternity Photography",
        "Portrait Photography",
        "Event Photography",
        "Corporate Photography",
        "Videography",
        "Drone Photography",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
