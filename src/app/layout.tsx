import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { JsonLd } from "@/components/JsonLd";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Javies Photography Studio | Photography in Accra, Ghana",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Javies Photography Studio",
    "Photography Studio Accra",
    "Photographer Accra",
    "Maternity Photography Accra",
    "Newborn Photography Accra",
    "Kids Photography Accra",
    "Family Photography Accra",
    "Portrait Photography Accra",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Javies Photography Studio | Photography in Accra, Ghana",
    description: siteConfig.description,
    images: [
      {
        url: "/images/hero-family.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Javies Photography Studio | Photography in Accra, Ghana",
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans bg-warm-white text-ink antialiased">
        <JsonLd />
        <Header />
        <main className="pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileStickyCta />
      </body>
    </html>
  );
}
