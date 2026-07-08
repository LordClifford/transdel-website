import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ServicesOverview, AboutPreview, CTA, Testimonials, ProjectsOverview } from "@/components/sections";
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

  const [servicesRes, testimonialsRes, projectsRes] = await Promise.all([
    supabase.from("services").select("title, short_description, slug").eq("published", true).order("order_index"),
    supabase.from("testimonials").select("client_name, client_title, company, content, rating").eq("published", true).order("created_at", { ascending: false }),
    supabase.from("projects").select("title, slug, description, category, images").eq("published", true).order("created_at", { ascending: false }).limit(6),
  ]);

  const hero = content.home?.hero ?? {};
  const about = content.home?.about_preview ?? {};
  const cta = content.home?.cta ?? {};
  const serviceItems = (servicesRes.data ?? []).map((s) => ({
    title: s.title,
    description: s.short_description,
    slug: s.slug,
  }));

  return (
    <>
      <Hero
        title={hero.title}
        subtitle={hero.subtitle}
        ctaText={hero.cta_text}
        backgroundImages={[hero.bg_image_1, hero.bg_image_2, hero.bg_image_3].filter(Boolean)}
      />
      <ServicesOverview services={serviceItems} />
      <Testimonials testimonials={testimonialsRes.data ?? []} />
      <ProjectsOverview projects={projectsRes.data ?? []} />
      <AboutPreview title={about.title} body={about.body} ctaText={about.cta_text} />
      <CTA title={cta.title} subtitle={cta.subtitle} buttonText={cta.button_text} />
    </>
  );
}
