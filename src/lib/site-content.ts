import { createClient } from "@/lib/supabase/server";

type ContentMap = Record<string, string>;

export async function getSiteContent(page?: string): Promise<Record<string, Record<string, ContentMap>>> {
  const supabase = await createClient();
  let query = supabase.from("site_content").select("page, section, key, value");
  if (page) query = query.eq("page", page);
  const { data } = await query;

  const result: Record<string, Record<string, ContentMap>> = {};
  for (const row of data ?? []) {
    if (!result[row.page]) result[row.page] = {};
    if (!result[row.page][row.section]) result[row.page][row.section] = {};
    result[row.page][row.section][row.key] = row.value;
  }
  return result;
}
