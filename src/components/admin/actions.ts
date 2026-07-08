"use server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { revalidatePath } from "next/cache";

export async function updateInquiryStatus(id: string, status: string) {
  const supabase = await createClient();
  await supabase.from("inquiries").update({ status }).eq("id", id);
  revalidatePath("/admin/inquiries");
}

export async function updateQuotationStatus(id: string, status: string) {
  const supabase = await createClient();
  const { data: q } = await supabase
    .from("quotations")
    .select("name, email, service_interest")
    .eq("id", id)
    .single();

  await supabase.from("quotations").update({ status }).eq("id", id);

  if (q && process.env.BREVO_API_KEY) {
    const { sendQuotationStatusEmail } = await import("@/lib/email");
    sendQuotationStatusEmail({
      to: q.email,
      name: q.name,
      service: q.service_interest,
      status,
    }).catch((err) => console.error("sendQuotationStatusEmail failed:", err));
  }

  revalidatePath("/admin/quotations");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/admin/projects");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/admin/testimonials");
}

export async function deleteService(id: string) {
  const supabase = await createClient();
  await supabase.from("services").delete().eq("id", id);
  revalidatePath("/admin/services");
}

export async function updateInvoiceStatus(id: string, status: string) {
  const supabase = await createClient();
  const update: Record<string, any> = { status };
  if (status === "paid") update.paid_at = new Date().toISOString();
  await supabase.from("invoices").update(update).eq("id", id);
  revalidatePath("/admin/invoices");
}

export async function deleteInvoice(id: string) {
  const supabase = await createClient();
  await supabase.from("invoices").delete().eq("id", id);
  revalidatePath("/admin/invoices");
}

export async function saveSiteContent(entries: { page: string; section: string; key: string; value: string }[]) {
  const supabase = await createClient();
  for (const entry of entries) {
    await supabase.from("site_content").upsert(
      { page: entry.page, section: entry.section, key: entry.key, value: entry.value },
      { onConflict: "page, section, key" },
    );
  }
  revalidatePath("/admin/site-content");
  revalidatePath("/", "layout");
}

export async function createAdminUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("full_name") as string;

  const serviceClient = createServiceClient();
  const { data: authUser, error } = await serviceClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });

  if (error) throw new Error(error.message);

  const supabase = await createClient();
  const { error: profileError } = await supabase.from("profiles").insert({
    id: authUser.user.id,
    email,
    full_name: fullName,
    role: "admin",
  });

  if (profileError) throw new Error(profileError.message);

  revalidatePath("/admin/admins");
}

export async function deleteAdminUser(id: string) {
  const supabase = await createClient();
  const { data: targetProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", id)
    .single();

  if (targetProfile?.role === "super_admin") {
    throw new Error("Cannot delete a super admin.");
  }

  await supabase.from("profiles").delete().eq("id", id);

  const serviceClient = createServiceClient();
  await serviceClient.auth.admin.deleteUser(id);

  revalidatePath("/admin/admins");
}

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file || file.size === 0) throw new Error("No file provided");

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `public/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const serviceClient = createServiceClient();
  const { data: uploadData, error: uploadError } = await serviceClient.storage
    .from("site-images")
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (uploadError) throw new Error(uploadError.message);

  const { data: { publicUrl } } = serviceClient.storage
    .from("site-images")
    .getPublicUrl(uploadData.path);

  return publicUrl;
}

export async function updateAdminRole(id: string, role: string) {
  const supabase = await createClient();
  const { data: targetProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", id)
    .single();

  if (targetProfile?.role === "super_admin") {
    throw new Error("Cannot change a super admin's role.");
  }

  await supabase.from("profiles").update({ role }).eq("id", id);
  revalidatePath("/admin/admins");
}
