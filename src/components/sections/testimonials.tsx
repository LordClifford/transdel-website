"use client";

import { Section, SectionHeader, FadeIn } from "@/components/ui";
import type { Testimonial } from "@/types/database";

type TestimonialsProps = {
  testimonials?: Pick<Testimonial, "client_name" | "client_title" | "company" | "content" | "rating">[];
};

function Stars({ rating }: { rating: number | null }) {
  if (!rating) return null;
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials({ testimonials }: TestimonialsProps = {}) {
  const items = testimonials ?? [];
  if (items.length === 0) return null;

  return (
    <Section>
      <FadeIn>
        <SectionHeader
          title="What Our Clients Say"
          subtitle="Hear from businesses and organizations we've worked with across Ghana."
        />
      </FadeIn>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <FadeIn key={i} delay={i * 0.05}>
            <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <svg className="mb-4 h-8 w-8 text-brand-100" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="flex-1 text-sm leading-relaxed text-gray-600">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="mt-4 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.client_name}</p>
                    {(t.client_title || t.company) && (
                      <p className="text-xs text-gray-500">
                        {[t.client_title, t.company].filter(Boolean).join(", ")}
                      </p>
                    )}
                  </div>
                  <Stars rating={t.rating} />
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
