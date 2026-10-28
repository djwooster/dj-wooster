"use client"

import { motion } from "framer-motion"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

// What the pieces of a build add up to. Not a tech stack: each input is a capability
// a client recognises, and they converge on the results they get.

type Glyph = "card" | "person" | "mail" | "calendar" | "search" | "chart" | "bell" | "doc" | "grid" | "bars" | "clock"

const inputs: { label: string; glyph: Glyph }[] = [
  { label: "Payments", glyph: "card" },
  { label: "Accounts and sign-in", glyph: "person" },
  { label: "Email and texts", glyph: "mail" },
  { label: "Online booking", glyph: "calendar" },
  { label: "Search and SEO", glyph: "search" },
  { label: "Analytics", glyph: "chart" },
  { label: "Notifications", glyph: "bell" },
  { label: "AI that reads documents", glyph: "doc" },
]

const results: { title: string; body: string; glyph: Glyph }[] = [
  { title: "Customers serve themselves", body: "They book, pay and sign in without a phone call.", glyph: "grid" },
  { title: "You see what's working", body: "Every lead, sale and session traced to where it came from.", glyph: "bars" },
  { title: "Hours back every week", body: "Reminders, reports and follow-ups run on their own.", glyph: "clock" },
]

const ROW = 56
const H = inputs.length * ROW
const W = 280
const NODE_X = 84
const paths = inputs.map((_, i) => {
  const y = ROW * i + ROW / 2
  const e = H / 2 - 126 + (i * 252) / (inputs.length - 1)
  return { y, e, d: `M0 ${y} H${NODE_X} C${NODE_X + 110} ${y}, ${W - 110} ${e}, ${W - 6} ${e}` }
})

export default function Connected() {
  return (
    <div>
      {/* Desktop: inputs → lines → result card */}
      <div className="hidden items-center lg:grid lg:grid-cols-[minmax(0,1fr)_280px_minmax(0,1.15fr)]">
        <ul className="flex flex-col">
          {inputs.map((input) => (
            <li key={input.label} className="flex items-center gap-4" style={{ height: ROW }}>
              <GlyphCircle glyph={input.glyph} />
              <span className="text-16 text-ink">{input.label}</span>
            </li>
          ))}
        </ul>

        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden className="overflow-visible text-ink-2">
          {paths.map((p, i) => (
            <g key={i}>
              <path id={`connected-${i}`} d={p.d} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
              <motion.path
                d={p.d}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.1, delay: i * 0.06, ease: EASE }}
              />
              <circle cx={NODE_X} cy={p.y} r="3.5" className="fill-bg" stroke="currentColor" />
              <path d={`M${W - 11} ${p.e - 4} L${W - 5} ${p.e} L${W - 11} ${p.e + 4}`} fill="none" stroke="currentColor" />
              {/* A pulse travels each line; hidden under reduced motion */}
              <circle r="2.5" className="fill-ink motion-reduce:hidden">
                <animateMotion dur="3.6s" begin={`${1.2 + i * 0.45}s`} repeatCount="indefinite">
                  <mpath href={`#connected-${i}`} />
                </animateMotion>
              </circle>
            </g>
          ))}
        </svg>

        <ResultCard />
      </div>

      {/* Mobile and tablet: inputs as a grid, one connector, then the card */}
      <div className="flex flex-col items-center lg:hidden">
        <ul className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
          {inputs.map((input) => (
            <li key={input.label} className="flex items-center gap-3 rounded-full border border-line bg-surface p-1.5 pr-4">
              <GlyphCircle glyph={input.glyph} small />
              <span className="text-14 text-ink">{input.label}</span>
            </li>
          ))}
        </ul>
        <div aria-hidden className="flex flex-col items-center py-2 text-ink-2">
          <span className="h-10 w-px bg-current" />
          <svg viewBox="0 0 10 6" className="h-1.5 w-2.5">
            <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" />
          </svg>
        </div>
        <ResultCard className="w-full" />
      </div>
    </div>
  )
}

function ResultCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-panel border border-ink bg-surface shadow-[0_24px_48px_-32px_rgba(0,0,0,0.3)]", className)}>
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <span className="label-mono text-ink">Your product</span>
        <span className="label-mono text-[11px] text-ink-2">Results</span>
      </div>
      <ul>
        {results.map((r) => (
          <li key={r.title} className="flex items-center gap-4 border-b border-line px-5 py-5 last:border-0">
            <GlyphCircle glyph={r.glyph} dashed />
            <span className="flex flex-col gap-1">
              <span className="text-16 font-medium text-ink">{r.title}</span>
              <span className="text-14 text-ink-2">{r.body}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function GlyphCircle({ glyph, small, dashed }: { glyph: Glyph; small?: boolean; dashed?: boolean }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border bg-surface text-ink",
        small ? "size-8" : "size-11",
        dashed ? "border-dashed border-ink-2" : "border-line",
      )}
    >
      <svg viewBox="0 0 20 20" fill="none" aria-hidden className={small ? "size-4" : "size-5"}>
        <GlyphPath glyph={glyph} />
      </svg>
    </span>
  )
}

function GlyphPath({ glyph }: { glyph: Glyph }) {
  const s = { stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  switch (glyph) {
    case "card":
      return (
        <>
          <rect x="2.5" y="5" width="15" height="10" rx="2" {...s} />
          <path d="M2.5 8.5h15M5.5 12h3" {...s} />
        </>
      )
    case "person":
      return (
        <>
          <circle cx="10" cy="7" r="3" {...s} />
          <path d="M4.5 16.5c.8-3 3-4.5 5.5-4.5s4.7 1.5 5.5 4.5" {...s} />
        </>
      )
    case "mail":
      return (
        <>
          <rect x="2.5" y="4.5" width="15" height="11" rx="2" {...s} />
          <path d="m3 5.5 7 5.5 7-5.5" {...s} />
        </>
      )
    case "calendar":
      return (
        <>
          <rect x="3" y="4.5" width="14" height="12" rx="2" {...s} />
          <path d="M3 8.5h14M7 3v3M13 3v3" {...s} />
          <circle cx="12.5" cy="12.5" r="1" fill="currentColor" />
        </>
      )
    case "search":
      return (
        <>
          <circle cx="9" cy="9" r="5" {...s} />
          <path d="m13 13 3.5 3.5" {...s} />
        </>
      )
    case "chart":
      return <path d="M3 16.5h14M5.5 14V10M9 14V6M12.5 14V8.5M16 14V4.5" {...s} />
    case "bell":
      return (
        <>
          <path d="M5 13.5V9a5 5 0 0 1 10 0v4.5l1.5 1.5h-13z" {...s} />
          <path d="M8.5 17.5h3" {...s} />
        </>
      )
    case "doc":
      return (
        <>
          <path d="M5 2.5h6.5L15 6v11.5H5z" {...s} />
          <path d="M11.5 2.5V6H15M7.5 10h5M7.5 13h3" {...s} />
        </>
      )
    case "grid":
      return (
        <>
          {[4, 8.75, 13.5].flatMap((x) =>
            [4, 8.75, 13.5].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="2.75" height="2.75" rx="0.5" {...s} />),
          )}
        </>
      )
    case "bars":
      return (
        <>
          <rect x="3" y="3" width="14" height="14" rx="1.5" {...s} />
          <path d="M3 10h14M10 3v14M3 6.5h14M3 13.5h14M6.5 3v14M13.5 3v14" {...s} strokeWidth={0.8} />
        </>
      )
    case "clock":
      return (
        <>
          <circle cx="10" cy="10" r="7" {...s} />
          <path d="M10 6v4l2.5 2" {...s} />
        </>
      )
  }
}
