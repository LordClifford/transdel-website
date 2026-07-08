"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createAdminUser, deleteAdminUser, updateAdminRole } from "@/components/admin/actions";
import type { Profile } from "@/types/database";

type Props = { admins: Profile[] };

export function AdminsManager({ admins }: Props) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleCreate(formData: FormData) {
    setError(null);
    try {
      await createAdminUser(formData);
      setShowForm(false);
      formRef.current?.reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Remove admin "${name || id}"? They will lose all admin access.`)) return;
    try {
      await deleteAdminUser(id);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    }
  }

  async function handleRoleChange(id: string, role: string) {
    try {
      await updateAdminRole(id, role);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{admins.length} admin account{admins.length !== 1 ? "s" : ""}</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-800"
        >
          {showForm ? "Cancel" : "Add Admin"}
        </button>
      </div>

      {showForm && (
        <form
          ref={formRef}
          action={handleCreate}
          className="rounded-xl border border-gray-200 bg-white p-6 space-y-4"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Full Name *</label>
            <input
              name="full_name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email *</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Password *</label>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            />
          </div>
          {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
          <button
            type="submit"
            className="rounded-lg bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Create Admin Account
          </button>
        </form>
      )}

      <div className="rounded-xl border border-gray-200 bg-white">
        {admins.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-gray-500">
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Role</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {admins.map((a) => (
                  <tr key={a.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{a.full_name ?? "—"}</td>
                    <td className="px-6 py-4 text-gray-600">{a.email}</td>
                    <td className="px-6 py-4">
                      {a.role === "super_admin" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                          Super Admin
                        </span>
                      ) : (
                        <select
                          defaultValue={a.role}
                          onChange={(e) => handleRoleChange(a.id, e.target.value)}
                          className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
                        >
                          <option value="admin">Admin</option>
                          <option value="editor">Editor</option>
                        </select>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {a.role !== "super_admin" && (
                        <button
                          onClick={() => handleDelete(a.id, a.full_name ?? a.email)}
                          className="text-sm text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-6 text-sm text-gray-400">No admin accounts found.</p>
        )}
      </div>
    </div>
  );
}
