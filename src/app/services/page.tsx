import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServicesPreview } from "@/components/ServicesPreview";
import { Packages } from "@/components/Packages";

export const metadata: Metadata = {
  title: "Services & Packages",
  description:
    "Maternity, newborn, milestone, cake smash, family, events, product and portrait photography packages at Javies Photography Studio, Accra.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Services & packages" />
      <ServicesPreview />
      <Packages />
    </>
  );
}
