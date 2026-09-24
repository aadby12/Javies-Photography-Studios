import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { ServicesPreview } from "@/components/ServicesPreview";
import { BookingExperience } from "@/components/BookingExperience";
import { ContactCta } from "@/components/ContactCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <ServicesPreview />
      <BookingExperience />
      <ContactCta />
    </>
  );
}
