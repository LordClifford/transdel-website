"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSiteContent } from "@/components/admin/actions";

type Props = {
  grouped: Record<string, Record<string, { id: string; key: string; value: string }[]>>;
};

export function SiteContentEditor({ grouped }: Props) {
  const router = useRouter();
  const [activePage, setActivePage] = useState<string>(Object.keys(grouped)[0] ?? "");
  const [changes, setChanges] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const pages = Object.keys(grouped);
  const sections = activePage ? grouped[activePage] : {};

  function handleChange(id: string, value: string) {
    setChanges((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const entries: { page: string; section: string; key: string; value: string }[] = [];
      for (const entry of Object.values(grouped).flatMap((s) =>
        Object.entries(s).flatMap(([section, keys]) => keys),
      )) {
        if (changes[entry.id] !== undefined) {
          const page = Object.keys(grouped).find((p) =>
            Object.keys(grouped[p]).some((s) =>
              grouped[p][s].some((k) => k.id === entry.id),
            ),
          );
          const section = Object.keys(grouped[page ?? ""]).find((s) =>
            grouped[page ?? ""][s].some((k) => k.id === entry.id),
          );
          if (page && section) {
            entries.push({ page, section, key: entry.key, value: changes[entry.id] });
          }
        }
      }
      if (entries.length > 0) {
        await saveSiteContent(entries);
      }
      setChanges({});
      setMessage("Saved successfully.");
      router.refresh();
    } catch (err) {
      setMessage("Error saving: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex gap-2 border-b border-gray-200">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => { setActivePage(page); setChanges({}); setMessage(null); }}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activePage === page
                ? "border-brand-700 text-brand-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {Object.entries(sections).map(([section, keys]) => (
          <div key={section} className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-6 py-3">
              <h4 className="font-medium text-gray-900 capitalize">{section.replace(/_/g, " ")}</h4>
            </div>
            <div className="space-y-4 p-6">
              {keys.map((entry) => (
                <div key={entry.id}>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-gray-500">
                    {entry.key.replace(/_/g, " ")}
                  </label>
                  {entry.value.length > 80 ? (
                    <textarea
                      rows={3}
                      defaultValue={entry.value}
                      onChange={(e) => handleChange(entry.id, e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
                    />
                  ) : (
                    <input
                      defaultValue={entry.value}
                      onChange={(e) => handleChange(entry.id, e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {message && (
        <div className={`mt-4 rounded-lg p-3 text-sm ${message === "Saved successfully." ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
          {message}
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={saving || Object.keys(changes).length === 0}
          className="rounded-lg bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
