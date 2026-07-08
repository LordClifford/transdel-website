import Image from "next/image";
import { Section, SectionHeader, FadeIn, Stagger, StaggerItem } from "@/components/ui";
import { getSiteContent } from "@/lib/site-content";

export default async function AboutPage() {
  const content = await getSiteContent("about");
  const about = content.about ?? {};

  const heroTitle = about.hero?.title ?? "About Transdel Set-Up Services";
  const heroSubtitle = about.hero?.subtitle ?? "Your trusted partner for security systems and IT infrastructure in Ghana.";
  const introParagraphs = [
    about.intro?.paragraph_1 ?? "Transdel Set-Up Services was founded to bridge the gap between growing demand for reliable technology infrastructure and the need for professional, accountable service delivery in Ghana.",
    about.intro?.paragraph_2 ?? "Over the years, we have completed hundreds of projects across Accra and all regions of Ghana — from CCTV installations for small businesses to complete network infrastructure for large institutions.",
    about.intro?.paragraph_3 ?? "Whether you are securing your premises, setting up a new office, or upgrading your IT infrastructure, we deliver results that work.",
  ];

  let values: { title: string; description: string }[];
  try { values = JSON.parse(about.values?.items ?? "[]"); } catch { values = []; }
  if (values.length === 0) {
    values = [
      { title: "Reliability", description: "We show up on time, deliver on promises, and stand behind every installation. Our clients trust us because we earn it — every day." },
      { title: "Quality", description: "We use only proven equipment and follow industry best practices. No shortcuts, no compromises — just work that lasts." },
      { title: "Transparency", description: "Clear pricing, honest timelines, and open communication. You always know what to expect before we start." },
      { title: "Support", description: "Our relationship doesn't end at installation. We provide ongoing maintenance, fast support, and genuine care for every client." },
    ];
  }

  let whyUs: { title: string; desc: string }[];
  try { whyUs = JSON.parse(about.why_us?.items ?? "[]"); } catch { whyUs = []; }
  if (whyUs.length === 0) {
    whyUs = [
      { title: "Local Expertise", desc: "Deep understanding of the Ghanaian market, infrastructure conditions, and regulatory requirements." },
      { title: "End-to-End Service", desc: "From consultation and design to installation, training, and ongoing support — we handle it all." },
      { title: "Proven Track Record", desc: "Hundreds of successful projects across multiple sectors including education, healthcare, retail, and government." },
      { title: "Fast Response", desc: "We respond to inquiries within 24 hours and prioritize urgent support requests from existing clients." },
    ];
  }

  return (
    <>
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn direction="left">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {heroTitle}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                {heroSubtitle}
              </p>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-600">
                {introParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.2}>
            <div className="overflow-hidden rounded-xl">
              <Image
                src="https://images.pexels.com/photos/30688593/pexels-photo-30688593.jpeg"
                alt="Transdel Set-Up Services team"
                width="800"
                height="450"
                className="h-auto w-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section dark>
        <FadeIn>
          <SectionHeader title={about.values?.title ?? "Our Values"} centered />
        </FadeIn>
        <Stagger className="grid gap-8 md:grid-cols-2">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="rounded-xl border border-gray-700 bg-white/5 p-6 transition-transform hover:scale-[1.02]">
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {v.title}
                </h3>
                <p className="leading-relaxed text-gray-300">
                  {v.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <FadeIn>
          <SectionHeader title={about.why_us?.title ?? "Why Choose Us?"} centered />
        </FadeIn>
        <div className="mx-auto max-w-3xl space-y-8">
          <Stagger>
            {whyUs.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex gap-4">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-700" />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>
    </>
  );
}
