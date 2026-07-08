import { Suspense } from "react";
import { ContactContent } from "./contact-content";
import { getSiteContent } from "@/lib/site-content";

export default async function ContactPage() {
  const content = await getSiteContent("contact");
  const info = content.contact?.contact_info ?? {};

  return (
    <Suspense>
      <ContactContent info={info} />
    </Suspense>
  );
}
