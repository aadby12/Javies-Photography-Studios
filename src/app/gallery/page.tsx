import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PortfolioGallery } from "@/components/PortfolioGallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photography gallery — maternity, newborn, milestone, family and traditional sessions by Javies Photography Studio, Accra.",
};

type GalleryPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const { category } = await searchParams;

  return (
    <>
      <PageHero eyebrow="Gallery" title="Our work" />
      <PortfolioGallery showHeading={false} initialCategory={category} />
    </>
  );
}
