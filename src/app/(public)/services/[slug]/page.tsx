import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Section, FadeIn, buttonVariants } from "@/components/ui";
import { CTA } from "@/components/sections";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: service } = await supabase
    .from("services")
    .select("title, description")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!service) return { title: "Service Not Found" };

  return {
    title: service.title,
    description:
      service.description ??
      `Professional ${service.title.toLowerCase()} services by Transdel Set-Up Services in Ghana.`,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!service) notFound();

  return (
    <>
      <Section>
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <Link
              href="/services"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:underline"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Services
            </Link>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {service.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              {service.full_description}
            </p>
          </FadeIn>

          <div className="mt-8">
            <div className="overflow-hidden rounded-xl">
              <Image
                src={service.image ?? "https://images.pexels.com/photos/3205735/pexels-photo-3205735.jpeg"}
                alt={service.title}
                width="800"
                height="450"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          <FadeIn delay={0.1}>
            <div className="mt-12">
              <h2 className="text-xl font-semibold">Key Features</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {(service.features ?? []).map((f: string) => (
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
            </div>
          </FadeIn>

          {(service.benefits ?? []).length > 0 && (
            <FadeIn delay={0.2}>
              <div className="mt-12">
                <h2 className="text-xl font-semibold">Benefits</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {(service.benefits ?? []).map((b: string) => (
                    <li
                      key={b}
                      className="rounded-lg border border-gray-200 p-4 text-sm text-gray-600"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.3}>
            <div className="mt-12 flex gap-4">
              <Link
                href={`/contact?service=${service.slug}`}
                className={buttonVariants({ size: "lg" })}
              >
                Request This Service
              </Link>
              <Link
                href="/contact"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                Contact Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>
      <CTA />
    </>
  );
}
