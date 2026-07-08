import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ServicesOverview, AboutPreview, CTA } from "@/components/sections";
import { getSiteContent } from "@/lib/site-content";
import { createClient } from "@/lib/supabase/server";

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

export default async function Home() {
  const content = await getSiteContent("home");
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("title, short_description, slug")
    .eq("published", true)
    .order("order_index");

  const hero = content.home?.hero ?? {};
  const about = content.home?.about_preview ?? {};
  const cta = content.home?.cta ?? {};
  const serviceItems = (services ?? []).map((s) => ({
    title: s.title,
    description: s.short_description,
    slug: s.slug,
  }));

  return (
    <>
      <Hero title={hero.title} subtitle={hero.subtitle} ctaText={hero.cta_text} />
      <ServicesOverview services={serviceItems} />
      <AboutPreview title={about.title} body={about.body} ctaText={about.cta_text} />
      <CTA title={cta.title} subtitle={cta.subtitle} buttonText={cta.button_text} />
    </>
  );
}
