"use client"

import { motion } from "framer-motion"
import { SPRING } from "@/lib/motion"

// The idea that's been waiting: an iPhone Notes-style note, dated years back
const lines = [
  { text: "App idea!!", strong: true },
  { text: "Booking app for dog walkers in my area" },
  { text: "– owners see walks live on a map" },
  { text: "– pay in the app, tip after" },
  { text: "Ask Sam if he knows a developer?", muted: true },
]

const edits = ["Edited Mar 2023", "Edited Jan 2024", "Edited Aug 2025"]

export default function NotesCard() {
  return (
    <div className="mx-auto w-full max-w-[360px] rounded-[28px] border border-line bg-surface p-6 shadow-[0_32px_64px_-40px_rgba(0,0,0,0.35)]">
      <div className="mb-5 flex items-center justify-between text-14 text-ink-2">
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
            <path d="m10 3-5 5 5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          Notes
        </span>
        <span aria-hidden>•••</span>
      </div>
      <p className="mb-4 text-center font-mono text-[11px] text-ink-2">{edits[edits.length - 1]} · 9:12 PM</p>
      <ul className="flex flex-col gap-2">
        {lines.map((line, i) => (
          <motion.li
            key={line.text}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...SPRING, delay: 0.1 + i * 0.12 }}
            className={line.strong ? "headline text-20 text-ink" : line.muted ? "text-16 text-ink-2" : "text-16 text-ink"}
          >
            {line.text}
          </motion.li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-4">
        {edits.map((e) => (
          <span key={e} className="label-mono rounded-full border border-line px-2 py-1 text-[10px] text-ink-2">
            {e}
          </span>
        ))}
      </div>
    </div>
  )
}
