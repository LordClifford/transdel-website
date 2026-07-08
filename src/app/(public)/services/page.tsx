import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Section, SectionHeader, FadeIn, Stagger, StaggerItem, buttonVariants } from "@/components/ui";

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("published", true)
    .order("order_index");

  return (
    <Section>
      <FadeIn>
        <SectionHeader
          title="Our Services"
          subtitle="Comprehensive technology solutions tailored to your needs."
        />
      </FadeIn>
      <Stagger className="space-y-20">
        {(services ?? []).map((s, i) => (
          <StaggerItem key={s.slug}>
            <div id={s.slug} className="scroll-mt-24">
              <div
                className={`grid gap-8 md:gap-12 lg:grid-cols-2 ${i % 2 === 1 ? "" : ""}`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-gray-600">
                    {s.full_description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {(s.features ?? []).map((f: string) => (
                      <li key={f} className="flex items-start gap-3">
                        <svg
                          className="mt-0.5 h-5 w-5 shrink-0 text-brand-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-600">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?service=${s.slug}`}
                    className={buttonVariants({ className: "mt-8" })}
                  >
                    Request This Service
                  </Link>
                </div>
                <div
                  className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 p-12 ${i % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div className="text-center">
                    <div className="text-6xl font-bold text-brand-200">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-2 text-sm font-medium uppercase tracking-widest text-brand-400">
                      Service
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
