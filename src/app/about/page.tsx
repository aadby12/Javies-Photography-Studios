import type { Metadata } from "next";
import { About } from "@/components/About";
import { ContactCta } from "@/components/ContactCta";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Javies Photography Studio — professional photography in Accra, Ghana.",
};

export default function AboutPage() {
  return (
    <div className="pt-20 md:pt-24">
      <About />
      <ContactCta />
    </div>
  );
}
