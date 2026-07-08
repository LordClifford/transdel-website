"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Profile } from "@/types/database";

export function CustomerList({ customers }: { customers: Profile[] }) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  async function handleDelete(userId: string, name: string) {
    if (!confirm(`Delete customer "${name}"? This cannot be undone.`)) return;
    setDeleting(userId);

    const res = await fetch(`/api/admin/customers?userId=${userId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to delete customer");
      setDeleting(null);
      return;
    }

    router.refresh();
  }

  return (
    <tbody className="divide-y divide-gray-50">
      {customers.map((c) => (
        <tr key={c.id} className="transition-colors hover:bg-gray-50">
          <td className="px-6 py-4 font-medium text-gray-900">
            {c.full_name ?? "—"}
          </td>
          <td className="px-6 py-4 text-gray-600">{c.email}</td>
          <td className="px-6 py-4 text-gray-600">{c.phone ?? "—"}</td>
          <td className="px-6 py-4 text-gray-600">{c.company ?? "—"}</td>
          <td className="px-6 py-4 text-gray-600">
            {new Date(c.created_at).toLocaleDateString()}
          </td>
          <td className="px-6 py-4">
            <button
              onClick={() => handleDelete(c.id, c.full_name ?? c.email)}
              disabled={deleting === c.id}
              className="text-sm text-red-600 transition-colors hover:text-red-800 disabled:opacity-50"
            >
              {deleting === c.id ? "Deleting..." : "Delete"}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
