"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";
import { EASE, scrollToSection } from "@/lib/motion";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "mailto:hello@djwooster.com" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`fixed top-0 left-0 right-0 z-40 px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "py-4 bg-white/95 backdrop-blur-md border-b border-black/10"
            : "py-6 bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-medium tracking-[0.-25em] uppercase hover:opacity-60 transition-opacity"
        >
          DJ Wooster
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm tracking-widest uppercase hover:opacity-40 transition-opacity duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden flex flex-col gap-[5px] p-1 group"
          aria-label="Open menu"
        >
          <span className="block w-6 h-px bg-black transition-all group-hover:w-4" />
          <span className="block w-4 h-px bg-black transition-all group-hover:w-6" />
          <span className="block w-6 h-px bg-black" />
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && <MobileMenu onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
