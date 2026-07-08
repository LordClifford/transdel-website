import { createClient } from "@/lib/supabase/server";
import { SiteContentEditor } from "./editor";

export default async function SiteContentPage() {
  const supabase = await createClient();
  const { data: entries } = await supabase
    .from("site_content")
    .select("*")
    .order("page")
    .order("section")
    .order("key");

  const grouped: Record<string, Record<string, { id: string; key: string; value: string }[]>> = {};
  for (const e of entries ?? []) {
    if (!grouped[e.page]) grouped[e.page] = {};
    if (!grouped[e.page][e.section]) grouped[e.page][e.section] = [];
    grouped[e.page][e.section].push({ id: e.id, key: e.key, value: e.value });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Site Content</h3>
      </div>
      <SiteContentEditor grouped={grouped} />
    </div>
  );
}
