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
  manifest: "/site.webmanifest",
  icons: [
    { rel: "icon", url: "/favicon.ico", sizes: "any" },
    { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  ],
  appleWebApp: {
    capable: true,
    title: "Transdel",
    statusBarStyle: "default",
  },
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
