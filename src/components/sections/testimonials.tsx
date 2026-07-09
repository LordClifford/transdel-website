"use client";

import { motion } from "framer-motion";
import { SectionHeader, FadeIn } from "@/components/ui";
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
    <section className="relative overflow-hidden px-4 py-16 md:px-6 md:py-24 lg:px-8 lg:py-32">
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute left-[5%] top-[10%] text-brand-600/19"
          animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m0-4.5v-2.25m0 4.5h9m-9 0H5.25m11.25 0h2.25M7.5 14.25h9m-9 0V12m9 2.25V12M7.5 14.25v-2.25m9 2.25v-2.25M12 21a9 9 0 100-18 9 9 0 000 18z" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute right-[8%] top-[20%] text-brand-600/19"
          animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute bottom-[15%] left-[12%] text-brand-600/19"
          animate={{ y: [0, -18, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V12m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute bottom-[25%] right-[15%] text-brand-600/19"
          animate={{ y: [0, 22, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <svg width="130" height="130" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l4.179 2.25m0-4.5l-4.179 2.25m0 4.5l4.179 2.25m-4.179-2.25L2.25 12m4.179 2.25L2.25 15m0-3l4.179-2.25M15.75 9.75L12 12l3.75 2.25m0-4.5l3.75 2.25m0-4.5L12 12m3.75 2.25L12 15m3.75-2.25L21.75 12M12 15l-3.75-2.25M12 15l3.75-2.25M12 9.75L8.25 12M12 9.75l3.75 2.25" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute left-[45%] top-[5%] text-brand-600/19"
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl">
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
      </div>
    </section>
  );
}
