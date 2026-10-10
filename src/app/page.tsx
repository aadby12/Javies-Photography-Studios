import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { BookingExperience } from "@/components/BookingExperience";
import { ContactCta } from "@/components/ContactCta";
import { StudioReel } from "@/components/StudioReel";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <Suspense fallback={null}>
        <BookingExperience />
      </Suspense>
      <ContactCta />
      <StudioReel />
    </>
  );
}
