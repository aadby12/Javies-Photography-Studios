import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { KidsExperience } from "@/components/KidsExperience";
import { FeaturedStories } from "@/components/FeaturedStories";
import { About } from "@/components/About";
import { BookingExperience } from "@/components/BookingExperience";
import { Packages } from "@/components/Packages";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <PortfolioGallery
        id="portfolio"
        eyebrow="Portfolio"
        title="A body of work that speaks"
        description="An editorial collection across children, family, maternity, portraits, events, corporate, weddings, videography, and drone — the visual heart of Javies Studios."
      />
      <KidsExperience />
      <FeaturedStories />
      <About />
      <BookingExperience />
      <Packages />
      <PortfolioGallery
        id="gallery"
        eyebrow="Gallery"
        title="An editorial gallery"
        description="Large-format imagery in a masonry layout — designed to feel curated, not crowded."
      />
      <Testimonials />
      <Contact />
    </>
  );
}
