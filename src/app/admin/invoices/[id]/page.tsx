"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Invoice } from "@/types/database";

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Invoice & { profiles: { full_name: string | null; email: string; company: string | null; phone: string | null } } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("invoices")
      .select("*, profiles(full_name, email, company, phone)")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (data) setInvoice(data as any);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-sm text-gray-400">Loading...</p>;
  if (!invoice) return <p className="text-sm text-red-500">Invoice not found</p>;

  const statusColors: Record<string, string> = {
    draft: "bg-gray-50 text-gray-500",
    sent: "bg-blue-50 text-blue-700",
    paid: "bg-green-50 text-green-700",
    overdue: "bg-red-50 text-red-600",
    cancelled: "bg-gray-50 text-gray-400",
  };

  const items = invoice.items ?? [];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="no-print mb-4 flex items-center justify-between">
        <Link href="/admin/invoices" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
          &larr; Back to Invoices
        </Link>
        <div className="flex items-center gap-2">
          <Link href={`/admin/invoices/${id}/edit`}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            Edit
          </Link>
          <button onClick={() => window.print()}
            className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-800">
            Download PDF
          </button>
        </div>
      </div>

      <div id="invoice" className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between border-b border-gray-100 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">INVOICE</h1>
            <p className="mt-1 text-sm text-gray-500">{invoice.number}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Status</p>
            <span className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${statusColors[invoice.status] ?? "bg-gray-50 text-gray-500"}`}>
              {invoice.status}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Bill To</p>
            <p className="mt-1 font-medium text-gray-900">{invoice.profiles?.full_name ?? "Unknown"}</p>
            {invoice.profiles?.company && <p className="text-sm text-gray-600">{invoice.profiles.company}</p>}
            <p className="text-sm text-gray-600">{invoice.profiles?.email}</p>
            {invoice.profiles?.phone && <p className="text-sm text-gray-600">{invoice.profiles.phone}</p>}
          </div>
          <div className="text-right sm:text-right">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between sm:justify-end gap-4">
                <span className="text-gray-500">Issued:</span>
                <span className="text-gray-900">{invoice.issued_date ? new Date(invoice.issued_date).toLocaleDateString() : "—"}</span>
              </div>
              <div className="flex justify-between sm:justify-end gap-4">
                <span className="text-gray-500">Due:</span>
                <span className="text-gray-900">{new Date(invoice.due_date).toLocaleDateString()}</span>
              </div>
              {invoice.paid_at && (
                <div className="flex justify-between sm:justify-end gap-4">
                  <span className="text-gray-500">Paid:</span>
                  <span className="text-gray-900">{new Date(invoice.paid_at).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <table className="mt-8 w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
              <th className="pb-3 pr-4">Description</th>
              <th className="pb-3 w-20 text-right">Qty</th>
              <th className="pb-3 w-28 text-right">Unit Price</th>
              <th className="pb-3 w-28 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.length > 0 ? items.map((item, i) => (
              <tr key={i}>
                <td className="py-3 pr-4 text-gray-900">{item.description}</td>
                <td className="py-3 text-right text-gray-700">{item.quantity}</td>
                <td className="py-3 text-right text-gray-700">GHS {Number(item.unit_price).toLocaleString()}</td>
                <td className="py-3 text-right font-medium text-gray-900">GHS {Number(item.total).toLocaleString()}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-400">No line items</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="ml-auto mt-6 w-64 space-y-1.5 border-t border-gray-100 pt-4 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>GHS {Number(invoice.subtotal).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Tax</span>
            <span>GHS {Number(invoice.tax).toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-1.5 text-base font-bold text-gray-900">
            <span>Total</span>
            <span>GHS {Number(invoice.total).toLocaleString()}</span>
          </div>
        </div>

        {invoice.notes && (
          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Notes</p>
            <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">{invoice.notes}</p>
          </div>
        )}
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice, #invoice * {
            visibility: visible;
          }
          #invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none;
            border-radius: 0;
            box-shadow: none;
            padding: 1.5in 0.75in;
          }
          .no-print {
            display: none !important;
          }
          @page {
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
