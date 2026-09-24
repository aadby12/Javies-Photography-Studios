import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PortfolioGallery } from "@/components/PortfolioGallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photography gallery — maternity, newborn, milestone, family and traditional sessions by Javies Photography Studio, Accra.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="Our work" />
      <PortfolioGallery showHeading={false} />
    </>
  );
}
