import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://transdelsetups.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Transdel Set-Up Services",
    template: "%s | Transdel Set-Up Services",
  },
  description:
    "Enterprise-grade security systems, IT infrastructure, and technology solutions across Ghana.",
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_GH",
    siteName: "Transdel Set-Up Services",
    title: "Transdel Set-Up Services",
    description:
      "Enterprise-grade security systems, IT infrastructure, and technology solutions across Ghana.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transdel Set-Up Services",
    description:
      "Enterprise-grade security systems, IT infrastructure, and technology solutions across Ghana.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans">{children}</body>
    </html>
  );
}
