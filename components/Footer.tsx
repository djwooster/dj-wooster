"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 px-6 md:px-12 pt-20 pb-10">
      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-20"
      >
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-[0.88]">
          Let&apos;s make
          <br />
          something great.
        </h2>
        <a
          href="mailto:contact@djwooster.com"
          className="inline-flex items-center gap-3 mt-10 text-xs tracking-widest uppercase group"
        >
          <span className="border-b border-black pb-0.5 group-hover:pr-4 transition-all duration-300">
            contact@djwooster.com
          </span>
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </a>
      </motion.div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-black/10">
        <p className="text-xs tracking-widest uppercase text-black/30">
          © 2025 DJ Wooster
        </p>

        <nav className="flex gap-8">
          {[
            { label: "Work", href: "/#work" },
            { label: "Process", href: "/#process" },
            { label: "About", href: "/#about" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs tracking-widest uppercase text-black/40 hover:text-black transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-8">
          {[
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/djwooster/",
              openInNewTab: true,
            },
            // { label: "Dribbble", href: "#" },
            // { label: "Instagram", href: "#" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs tracking-widest uppercase text-black/40 hover:text-black transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
