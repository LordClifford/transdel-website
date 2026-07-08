import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const RATE_LIMIT_WINDOW_MS = 60_000;

function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, company, service_interest, project_details, preferred_date } = body;

  if (!name || !email || !phone || !service_interest || !project_details) {
    return NextResponse.json(
      { error: "Name, email, phone, service interest, and project details are required." },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const ip = getClientIp(req);

  if (ip !== "unknown") {
    const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const { count } = await supabase
      .from("quotations")
      .select("*", { count: "exact", head: true })
      .eq("submitter_ip", ip)
      .gte("created_at", since);

    if (count && count > 2) {
      return NextResponse.json(
        { error: "You've submitted too many quotes recently. Please wait about a minute and try again." },
        { status: 429 },
      );
    }
  }

  const { error } = await supabase.from("quotations").insert({
    name,
    email,
    phone,
    company: company || null,
    service_interest,
    project_details,
    preferred_date: preferred_date || null,
    submitter_ip: ip,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
