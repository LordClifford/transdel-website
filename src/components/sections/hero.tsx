"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui";

type HeroProps = {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  backgroundImages?: string[];
};

export function Hero({ title, subtitle, ctaText, backgroundImages }: HeroProps = {}) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = backgroundImages?.length ? backgroundImages : [];

  useEffect(() => {
    if (images.length < 2) return;
    const interval = setInterval(() => setImgIndex((i) => (i + 1) % images.length), 7000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4 text-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {images.map((img, i) => (
          <motion.div
            key={img}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === imgIndex ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50/85 via-white/75 to-brand-100/85" />
        <motion.div
          className="absolute left-[10%] top-[15%] text-brand-700/10"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute right-[15%] top-[25%] text-brand-700/10"
          animate={{ y: [0, 25, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15V3m0 0l-3 3m3-3l3 3" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute bottom-[20%] left-[20%] text-brand-700/10"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            {title ?? <>Security &amp; IT Infrastructure<span className="text-brand-700"> You Can Trust</span></>}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-600"
        >
          {subtitle ?? "Transdel Set-Up Services delivers enterprise-grade security systems, network infrastructure, and IT solutions across Ghana."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Link href="/contact" className={buttonVariants({ size: "lg" })}>
            {ctaText ?? "Get a Free Quote"}
          </Link>
          <Link
            href="/services"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            Our Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
