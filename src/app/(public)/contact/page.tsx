import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactContent } from "./contact-content";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Transdel Set-Up Services. Request a quote, ask a question, or schedule a consultation for security systems and IT solutions in Ghana.",
};

export default async function ContactPage() {
  const content = await getSiteContent("contact");
  const info = content.contact?.contact_info ?? {};

  return (
    <Suspense>
      <ContactContent info={info} />
    </Suspense>
  );
}
