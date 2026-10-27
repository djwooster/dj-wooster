"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

/*
  A live member call, in a real call app's dark palette: a member's app shared on screen,
  DJ talking (speaking ring and waveform), members' tiles, a raised hand, chat arriving,
  and reactions floating up. Members and messages are illustrative.
*/

const call = { bg: "#0f0f10", panel: "#1c1c1e", tile: "#232326", text: "#f2f2f2", dim: "#9a9a9f", line: "rgba(255,255,255,0.08)" }

const members = [
  { name: "Maya R.", initials: "MR", tone: "linear-gradient(150deg,#4b4a47,#2a2927)" },
  { name: "Chris O.", initials: "CO", tone: "linear-gradient(150deg,#3f4548,#24282a)" },
  { name: "Lena W.", initials: "LW", tone: "linear-gradient(150deg,#4a4550,#28252c)" },
  { name: "Sam T.", initials: "ST", tone: "linear-gradient(150deg,#46493f,#272924)" },
]

const chat = [
  { who: "Chris O.", text: "how do I fix the build error on EAS?" },
  { who: "Lena W.", text: "my login screen works!!" },
  { who: "Maya R.", text: "submitting to review tonight" },
  { who: "Sam T.", text: "the Live Activity tip saved me hours" },
]

const reactions = ["👏", "🔥", "🎉", "👏", "🙌"]

function useTick(ms: number, run: boolean) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    const id = setInterval(() => setN((v) => v + 1), ms)
    return () => clearInterval(id)
  }, [ms, run])
  return n
}

export default function LiveCall() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-120px" })
  const reduced = useReducedMotion()
  const live = inView && !reduced
  const beat = useTick(2200, live)
  const wave = useTick(140, live)
  const seconds = useTick(1000, live)

  const messages = reduced ? chat.slice(0, 2) : [0, 1].map((k) => chat[(beat + k) % chat.length])
  const handUp = !reduced && beat % 4 === 1
  const elapsed = 24 * 60 + 18 + seconds
  const clock = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-[18px] border shadow-[0_50px_100px_-50px_rgba(0,0,0,0.7)]"
      style={{ background: call.bg, borderColor: call.line, color: call.text }}
    >
      {/* Title bar */}
      <div className="flex h-11 items-center justify-between gap-3 border-b px-4" style={{ borderColor: call.line }}>
        <span className="flex items-center gap-2 text-[12px]">
          <span className="flex items-center gap-1.5 rounded-full bg-[#ff453a]/15 px-2 py-0.5 font-mono text-[11px] text-[#ff6961]">
            <span className="size-1.5 animate-pulse rounded-full bg-[#ff453a]" />
            REC {clock}
          </span>
          <span className="hidden font-medium sm:inline">Ship Your App · Live build call</span>
        </span>
        <span className="flex items-center gap-3 font-mono text-[11px]" style={{ color: call.dim }}>
          <span className="hidden sm:inline">[TODO: Wed 12:00 PM PT]</span>
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
              <circle cx="6" cy="5.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M1.5 13.5c.6-2.4 2.3-3.5 4.5-3.5s3.9 1.1 4.5 3.5M11 3.2a2.5 2.5 0 0 1 0 4.6M12.5 10.3c1 .5 1.7 1.6 2 3.2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            128
          </span>
        </span>
      </div>

      <div className="grid gap-2 p-2 md:grid-cols-[minmax(0,1fr)_200px]">
        {/* Shared screen: a member's app on the simulator */}
        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[12px]" style={{ background: call.panel }}>
          <span className="absolute top-3 left-3 rounded-[6px] bg-black/50 px-2 py-1 text-[11px] backdrop-blur" style={{ color: call.text }}>
            Maya R. is sharing her screen
          </span>
          <SharedApp />

          {/* Chat, arriving */}
          <div className="absolute bottom-3 left-3 flex w-[min(260px,60%)] flex-col gap-1.5">
            <AnimatePresence initial={false} mode="popLayout">
              {messages.map((m) => (
                <motion.div
                  key={`${m.who}-${m.text}`}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className="rounded-[10px] bg-black/60 px-2.5 py-1.5 text-[12px] leading-snug backdrop-blur"
                >
                  <span className="font-semibold">{m.who}</span> <span style={{ color: "#d6d6da" }}>{m.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Reactions floating up */}
          {!reduced && (
            <div aria-hidden className="pointer-events-none absolute right-6 bottom-4 h-40 w-10">
              <AnimatePresence>
                <motion.span
                  key={beat}
                  className="absolute bottom-0 left-1/2 text-[22px]"
                  initial={{ opacity: 0, y: 0, x: "-50%", scale: 0.6 }}
                  animate={{ opacity: [0, 1, 1, 0], y: -140, x: ["-50%", "-20%", "-70%", "-40%"], scale: 1 }}
                  transition={{ duration: 2.1, ease: "easeOut" }}
                >
                  {reactions[beat % reactions.length]}
                </motion.span>
              </AnimatePresence>
            </div>
          )}

          {/* DJ, picture-in-picture on small screens */}
          <div className="absolute top-3 right-3 w-[120px] md:hidden">
            <HostTile wave={wave} live={live} compact />
          </div>
        </div>

        {/* Speaker column */}
        <div className="hidden flex-col gap-2 md:flex">
          <HostTile wave={wave} live={live} />
          <div className="grid grid-cols-2 gap-2">
            {members.map((m, i) => (
              <div key={m.name} className="relative flex aspect-square items-center justify-center rounded-[10px]" style={{ background: m.tone }}>
                <span className="text-[15px] font-semibold text-white/85">{m.initials}</span>
                <span className="absolute bottom-1.5 left-1.5 text-[10px] text-white/80">{m.name}</span>
                <AnimatePresence>
                  {handUp && i === 1 && (
                    <motion.span
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 18 }}
                      className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full bg-[#ffd60a] text-[13px]"
                    >
                      ✋
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <div className="flex h-9 items-center justify-center rounded-[10px] text-[12px]" style={{ background: call.tile, color: call.dim }}>
            +124 more
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex h-14 items-center justify-center gap-2 border-t px-4" style={{ borderColor: call.line }}>
        {["mic", "cam", "share", "react"].map((c) => (
          <span key={c} className="flex size-9 items-center justify-center rounded-full" style={{ background: call.tile }}>
            <ControlGlyph kind={c} />
          </span>
        ))}
        <span className="ml-2 flex h-9 items-center rounded-full bg-[#ff453a] px-4 text-[13px] font-semibold text-white">Leave</span>
      </div>
    </div>
  )
}

function HostTile({ wave, live, compact }: { wave: number; live: boolean; compact?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[10px] ring-2 ring-[#30d158] transition-shadow",
        live && "shadow-[0_0_0_4px_rgba(48,209,88,0.18)]",
      )}
      style={{ background: "linear-gradient(150deg,#55524d,#2b2926)" }}
    >
      <span className={cn("font-semibold text-white/90", compact ? "text-[14px]" : "text-[20px]")}>DJ</span>
      <span className="absolute bottom-1.5 left-2 flex items-center gap-1.5 text-[10px] text-white/90">
        <span className="flex h-3 items-end gap-[2px]" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-[2px] rounded-full bg-[#30d158] transition-[height] duration-150"
              style={{ height: live ? `${30 + ((wave * (i + 3) * 37) % 70)}%` : "40%" }}
            />
          ))}
        </span>
        DJ Wooster{!compact && " · Host"}
      </span>
    </div>
  )
}

// The member's app on screen: a simulator window with their app's login screen
function SharedApp() {
  return (
    <div className="flex h-[78%] items-center gap-6">
      <div className="flex aspect-[9/19] h-full flex-col rounded-[22px] border-[5px] border-[#2c2c2e] bg-[#faf7f2] p-3 pt-6 text-black">
        <span className="mx-auto mb-4 h-2 w-10 rounded-full bg-black" />
        <span className="mb-1 text-[13px] font-bold">Bloom</span>
        <span className="mb-3 text-[9px] text-black/50">Plant care, on schedule</span>
        <span className="mb-1.5 h-6 rounded-[6px] border border-black/10 bg-white" />
        <span className="mb-3 h-6 rounded-[6px] border border-black/10 bg-white" />
        <span className="flex h-6 items-center justify-center rounded-[6px] bg-[#1f3d2b] text-[9px] font-semibold text-white">Sign in</span>
        <span className="mt-auto text-center text-[8px] text-black/40">Continue with Apple</span>
      </div>
      <div className="hidden h-full w-[180px] flex-col gap-1.5 rounded-[8px] bg-black/40 p-3 font-mono text-[9px] leading-relaxed text-[#cfcfd4] lg:flex">
        <span className="text-[#7bc47f]">✓ Build succeeded</span>
        <span>› Metro waiting on exp://192.168…</span>
        <span>› Opening on iPhone 16 Pro</span>
        <span className="text-[#d97757]">✻ Claude: added Sign in with Apple</span>
      </div>
    </div>
  )
}

function ControlGlyph({ kind }: { kind: string }) {
  const s = { stroke: "#f2f2f2", strokeWidth: 1.4, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  return (
    <svg viewBox="0 0 20 20" className="size-[18px]" aria-hidden>
      {kind === "mic" && (
        <>
          <rect x="7.5" y="3" width="5" height="9" rx="2.5" {...s} />
          <path d="M4.5 10a5.5 5.5 0 0 0 11 0M10 15.5V17" {...s} />
        </>
      )}
      {kind === "cam" && (
        <>
          <rect x="2.5" y="5.5" width="11" height="9" rx="2" {...s} />
          <path d="m13.5 9 4-2.5v7l-4-2.5" {...s} />
        </>
      )}
      {kind === "share" && (
        <>
          <rect x="2.5" y="4" width="15" height="10" rx="1.5" {...s} />
          <path d="M10 11.5V7M7.8 9 10 6.8 12.2 9M7 17h6" {...s} />
        </>
      )}
      {kind === "react" && (
        <>
          <circle cx="10" cy="10" r="7" {...s} />
          <path d="M7 11.5c.8 1.2 1.8 1.8 3 1.8s2.2-.6 3-1.8M7.5 8h.01M12.5 8h.01" {...s} />
        </>
      )}
    </svg>
  )
}
