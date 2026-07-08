"use client";

import Link from "next/link";
import { Section, SectionHeader, FadeIn } from "@/components/ui";
import type { Project } from "@/types/database";

type ProjectsOverviewProps = {
  projects?: Pick<Project, "title" | "slug" | "description" | "category" | "images">[];
};

export function ProjectsOverview({ projects }: ProjectsOverviewProps = {}) {
  const items = projects ?? [];
  if (items.length === 0) return null;

  return (
    <Section dark>
      <FadeIn>
        <SectionHeader
          title="Featured Projects"
          subtitle="A selection of projects we've delivered across security, networking, and IT infrastructure."
        />
      </FadeIn>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <FadeIn key={p.slug} delay={i * 0.05}>
            <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-700 bg-white/5 transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="aspect-video w-full overflow-hidden bg-gray-800">
                {p.images?.[0] ? (
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-600">
                    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-2 inline-block w-fit rounded-full bg-brand-700/20 px-2.5 py-0.5 text-xs font-medium text-brand-300">
                  {p.category}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-accent-400">
                  {p.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-gray-400">
                  {p.description}
                </p>
                <Link
                  href="/contact"
                  className="mt-4 text-sm font-medium text-accent-400 hover:underline"
                >
                  Get a similar quote &rarr;
                </Link>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
