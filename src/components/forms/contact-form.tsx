"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      company: form.get("company"),
      message: form.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setSaving(false);

    if (!res.ok) {
      const { error: msg } = await res.json();
      if (res.status === 429) {
        setError(msg || "Please wait a moment before sending another message.");
      } else {
        setError(msg || "Something went wrong. Please try again.");
      }
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="text-3xl">&#10003;</div>
        <h3 className="mt-4 text-lg font-semibold text-green-800">
          Message Sent!
        </h3>
        <p className="mt-2 text-green-600">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
            Name *
          </label>
          <input
            id="name"
            name="name"
            required
            disabled={saving}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700 disabled:opacity-50"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={saving}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700 disabled:opacity-50"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            disabled={saving}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700 disabled:opacity-50"
          />
        </div>
        <div>
          <label htmlFor="company" className="mb-1 block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            id="company"
            name="company"
            disabled={saving}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700 disabled:opacity-50"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          disabled={saving}
          rows={5}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700 disabled:opacity-50"
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <Button type="submit" size="lg" disabled={saving}>
        {saving ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
