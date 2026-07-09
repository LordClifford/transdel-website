"use client";

import Link from "next/link";
import { Section, SectionHeader, FadeIn } from "@/components/ui";

const defaultServices: ServiceItem[] = [
  { title: "CCTV Installation", description: "High-definition surveillance systems for homes, businesses, and institutions with remote monitoring capabilities.", slug: "cctv-installation" },
  { title: "Access Control", description: "Biometric, card-based, and smart lock systems to secure your premises with granular access management.", slug: "access-control" },
  { title: "Network Infrastructure", description: "Structured cabling, WiFi deployment, and enterprise networking for reliable, high-speed connectivity.", slug: "network-infrastructure" },
  { title: "Workstation Setup", description: "End-to-end workstation deployment including hardware configuration, software installation, and ergonomic setup.", slug: "workstation-setup" },
  { title: "IT Support", description: "On-site and remote IT support with fast response times and proactive system monitoring.", slug: "it-support" },
  { title: "Preventive Maintenance", description: "Scheduled inspections and maintenance to keep your systems running reliably and extend equipment life.", slug: "preventive-maintenance" },
];

const icons = [
  "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0",
  "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
  "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
];

type ServiceItem = { title: string; description: string; slug: string; image?: string | null };

type ServicesOverviewProps = {
  services?: ServiceItem[];
};

export function ServicesOverview({ services }: ServicesOverviewProps = {}) {
  const items = services ?? defaultServices;

  return (
    <Section>
      <FadeIn>
        <SectionHeader
          title="Our Services"
          subtitle="Comprehensive technology solutions tailored to your needs — from security systems to IT infrastructure."
        />
      </FadeIn>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((s, i) => (
          <FadeIn key={s.slug} delay={i * 0.05}>
            <Link
              href={`/services/${s.slug}`}
              className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 h-40 w-full overflow-hidden rounded-lg bg-gray-100">
                {s.image ? (
                  <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-brand-700">
                    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icons[i % icons.length]} />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {s.title}
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-gray-600">
                {s.description}
              </p>
            </Link>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
