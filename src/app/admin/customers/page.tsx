import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CustomerList } from "./customer-list";

export default async function AdminCustomersPage() {
  const supabase = await createClient();
  const { data: customers } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "customer")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Customers</h3>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        {customers && customers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-gray-500">
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Phone</th>
                  <th className="px-6 py-3 font-medium">Company</th>
                  <th className="px-6 py-3 font-medium">Joined</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <CustomerList customers={customers ?? []} />
            </table>
          </div>
        ) : (
          <p className="p-6 text-sm text-gray-400">No customers yet.</p>
        )}
      </div>
    </div>
  );
}
