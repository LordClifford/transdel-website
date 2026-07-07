import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ServicesOverview, AboutPreview, CTA } from "@/components/sections";

export const metadata: Metadata = {
  title: "Transdel Set-Up Services — Security & IT Solutions in Ghana",
  description:
    "Professional CCTV installation, access control, network infrastructure, and IT support services across Accra and all regions of Ghana.",
  openGraph: {
    title: "Transdel Set-Up Services — Security & IT Solutions in Ghana",
    description:
      "Professional CCTV installation, access control, network infrastructure, and IT support services across Accra and all regions of Ghana.",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <AboutPreview />
      <CTA />
    </>
  );
}
