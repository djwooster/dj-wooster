"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect } from "react"
import { EASE, scrollToSection } from "@/lib/motion"

const links = [
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "mailto:hello@djwooster.com" },
]

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="fixed inset-0 z-50 bg-black flex flex-col"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5">
        <Link
          href="/"
          onClick={onClose}
          className="text-sm font-medium tracking-[0.2em] uppercase text-white"
        >
          DJ Wooster
        </Link>
        <button
          onClick={onClose}
          className="text-white p-1"
          aria-label="Close menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 flex flex-col justify-center px-6">
        {links.map((link, i) => (
          <motion.div
            key={link.label}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{
              delay: i * 0.07 + 0.2,
              duration: 0.5,
              ease: EASE,
            }}
          >
            <Link
              href={link.href}
              onClick={(e) => { scrollToSection(e, link.href); onClose() }}
              className="group flex items-center justify-between py-5 border-b border-white/10 hover:border-white/30 transition-colors duration-200"
            >
              <span className="text-5xl font-black text-white tracking-tight group-hover:translate-x-3 transition-transform duration-300">
                {link.label}
              </span>
              <span className="text-white/30 text-2xl group-hover:text-white transition-colors duration-200">
                →
              </span>
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Bottom status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="px-6 pb-12 flex items-center justify-between"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">
          Available for work
        </span>
        <span className="text-white/30 text-xs tracking-widest uppercase">
          2025
        </span>
      </motion.div>
    </motion.div>
  )
}
