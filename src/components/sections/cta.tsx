"use client";

import Link from "next/link";
import { Section, FadeIn, buttonVariants } from "@/components/ui";

type CTAProps = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
};

export function CTA({ title, subtitle, buttonText }: CTAProps = {}) {
  return (
    <Section className="text-center">
      <FadeIn>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {title ?? "Ready to Get Started?"}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {subtitle ?? "Tell us about your project and we'll provide a free, no-obligation quote within 24 hours."}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/contact"
              className={buttonVariants({ size: "lg" })}
            >
              {buttonText ?? "Request a Quote"}
            </Link>
            <a
              href="https://wa.me/233557410369"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
