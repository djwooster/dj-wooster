"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion"
import ReviewStatus, { WalkiesIcon } from "@/components/landing/ReviewStatus"
import { IPhone, iosFont } from "@/components/landing/IPhone"
import { cn } from "@/lib/utils"

/*
  The payoff, in one sequence: the review card walks to Ready for Distribution, Apple's
  notification lands, then on an iPhone someone finds the app in the App Store and taps Get.
*/

// 0–3 review stages · 4 touch on Get · 5 spinner · 6 download ring · 7 Open
const STEP_MS = [1300, 1400, 1600, 2000, 800, 900, 1700, 2800]
const IOS_BLUE = "#0a84ff"

export default function LaunchMoment() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-120px" })
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)
  const s = reduced ? 7 : step

  useEffect(() => {
    if (!inView || reduced) return
    const t = setTimeout(() => setStep((n) => (n + 1) % STEP_MS.length), STEP_MS[step])
    return () => clearTimeout(t)
  }, [step, inView, reduced])

  return (
    <div ref={ref} className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12">
      <ReviewStatus stage={Math.min(s, 3)} />
      <div className="mx-auto">
        <IPhone>
          <AppStoreListing step={s} />
        </IPhone>
      </div>
    </div>
  )
}

/* ─── App Store product page ─────────────────────────────────────────────── */

function AppStoreListing({ step }: { step: number }) {
  const getState = step <= 4 ? "get" : step === 5 ? "waiting" : step === 6 ? "downloading" : "open"
  return (
    <div className="flex h-full flex-col bg-white text-black" style={{ fontFamily: iosFont }}>
      <div className="flex items-center justify-between px-4 pt-[56px] pb-2 text-[17px]" style={{ color: IOS_BLUE }}>
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 12 20" className="h-[17px] w-[10px]" aria-hidden>
            <path d="M10 2 2 10l8 8" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Search
        </span>
      </div>

      <div className="flex gap-4 px-4 pt-2">
        <WalkiesIcon className="size-[112px] rounded-[26px]" />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-[21px] leading-tight font-semibold tracking-[-0.01em]">Walkies</span>
          <span className="text-[14px] leading-snug text-black/50">Dog walks, booked in a tap</span>
          <div className="relative mt-auto flex items-center justify-between">
            <GetButton state={getState} />
            <svg viewBox="0 0 20 24" className="h-[22px] w-[18px]" style={{ color: IOS_BLUE }} aria-hidden>
              <path d="M10 2v13M5.5 6.5 10 2l4.5 4.5M4 10H3v12h14V10h-1" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {/* Touch indicator on Get */}
            <AnimatePresence>
              {step === 4 && (
                <motion.span
                  aria-hidden
                  className="absolute top-1/2 left-[37px] -mt-5 -ml-5 size-10 rounded-full border border-black/20 bg-black/15"
                  initial={{ opacity: 0, x: 40, y: 70 }}
                  animate={{ opacity: [0, 1, 1, 0], x: 0, y: 0, scale: [1, 1, 0.75, 1.3] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, times: [0, 0.4, 0.6, 1] }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="mx-4 mt-5 grid grid-cols-3 border-y border-black/10 py-2.5 text-center">
        {[
          { top: "1 RATING", mid: "5.0", bot: "★★★★★" },
          { top: "AGES", mid: "4+", bot: "Years Old" },
          { top: "DEVELOPER", mid: "You", bot: "Walkies" },
        ].map((c, i) => (
          <span key={c.top} className={cn("flex flex-col gap-0.5", i > 0 && "border-l border-black/10")}>
            <span className="text-[9px] font-medium tracking-wide text-black/40">{c.top}</span>
            <span className="text-[17px] font-bold text-black/55">{c.mid}</span>
            <span className="text-[10px] text-black/40">{c.bot}</span>
          </span>
        ))}
      </div>

      {/* Screenshots */}
      <div className="mt-4 flex gap-2.5 overflow-hidden pl-4">
        {[0, 1, 2].map((i) => (
          <span key={i} className="flex h-[250px] w-[118px] shrink-0 flex-col gap-2 rounded-[16px] bg-[#f2f2f7] p-2.5 pt-5">
            <span className="text-[11px] font-bold">{["Walkers nearby", "Book in a tap", "Live on a map"][i]}</span>
            <span className="h-14 rounded-[8px] bg-[#e8e6e1]" />
            {[0, 1, 2].map((r) => (
              <span key={r} className="flex items-center gap-1.5 rounded-[6px] bg-white p-1.5">
                <span className="size-4 rounded-full bg-black/10" />
                <span className="h-1.5 flex-1 rounded-full bg-black/10" />
              </span>
            ))}
            <span className="mt-auto h-6 rounded-[6px] bg-black" />
          </span>
        ))}
      </div>
    </div>
  )
}

function GetButton({ state }: { state: "get" | "waiting" | "downloading" | "open" }) {
  const R = 13
  const C = 2 * Math.PI * R
  return (
    <span className="relative flex h-[30px] w-[74px] items-center">
      <AnimatePresence mode="popLayout" initial={false}>
        {(state === "get" || state === "open") && (
          <motion.span
            key={state}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="flex h-[30px] w-[74px] items-center justify-center rounded-full text-[15px] font-bold text-white"
            style={{ background: IOS_BLUE }}
          >
            {state === "get" ? "Get" : "Open"}
          </motion.span>
        )}
        {(state === "waiting" || state === "downloading") && (
          <motion.span
            key="ring"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="relative ml-[22px] flex size-[30px] items-center justify-center"
          >
            <svg viewBox="0 0 30 30" className={cn("absolute inset-0 size-full -rotate-90", state === "waiting" && "animate-spin")}>
              <circle cx="15" cy="15" r={R} fill="none" stroke="#d1d1d6" strokeWidth="2.5" />
              {state === "waiting" ? (
                <circle cx="15" cy="15" r={R} fill="none" stroke="#8e8e93" strokeWidth="2.5" strokeDasharray={`${C * 0.25} ${C}`} strokeLinecap="round" />
              ) : (
                <motion.circle
                  cx="15"
                  cy="15"
                  r={R}
                  fill="none"
                  stroke={IOS_BLUE}
                  strokeWidth="2.5"
                  strokeDasharray={C}
                  initial={{ strokeDashoffset: C }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.6, ease: [0.4, 0, 0.6, 1] }}
                />
              )}
            </svg>
            {state === "downloading" && <span className="size-[9px] rounded-[2px]" style={{ background: IOS_BLUE }} />}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
