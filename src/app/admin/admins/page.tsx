import { createClient } from "@/lib/supabase/server";
import { AdminsManager } from "./manager";

export default async function AdminsPage() {
  const supabase = await createClient();
  const { data: admins } = await supabase
    .from("profiles")
    .select("*")
    .in("role", ["admin", "super_admin"])
    .order("created_at");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Admin Accounts</h3>
      </div>
      <AdminsManager admins={admins ?? []} />
    </div>
  );
}
