import { siteConfig } from "@/lib/site-data";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "PhotographyBusiness"],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phoneInternational,
    email: siteConfig.email,
    image: `${siteConfig.url}/images/hero-family.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: "GH",
    },
    sameAs: [siteConfig.instagram.url],
    areaServed: {
      "@type": "City",
      name: "Accra",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
