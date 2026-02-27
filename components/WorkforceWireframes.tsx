import React from "react"

// ─── Primitives ───────────────────────────────────────────────────────────────

function Bar({ className }: { className: string }) {
  return <div className={className} />
}

function Row({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex items-center justify-between">
      <Bar className={`h-[3px] bg-black/15 ${left}`} />
      <Bar className={`h-[3px] bg-black/15 ${right}`} />
    </div>
  )
}

function SectionLabel({ className = "" }: { className?: string }) {
  return <Bar className={`h-[3px] bg-black/25 w-10 ${className}`} />
}

// ─── Phone shell ──────────────────────────────────────────────────────────────

function PhoneFrame({
  nav,
  children,
  activeTab = 0,
}: {
  nav: React.ReactNode
  children: React.ReactNode
  activeTab?: number
}) {
  return (
    <div
      className="w-full max-w-[200px] mx-auto border border-black/25 bg-white flex flex-col"
      style={{ height: "380px" }}
    >
      {/* Status bar */}
      <div className="h-3 flex-shrink-0 bg-black/[0.03] flex items-center justify-between px-2.5">
        <Bar className="w-5 h-[2px] bg-black/20" />
        <Bar className="w-4 h-[2px] bg-black/20" />
      </div>

      {/* Nav bar */}
      <div className="h-7 flex-shrink-0 border-b border-black/8 flex items-center justify-between px-2.5">
        {nav}
      </div>

      {/* Screen content */}
      <div className="flex-1 overflow-hidden px-2.5 py-2">{children}</div>

      {/* Tab bar */}
      <div className="h-5 flex-shrink-0 border-t border-black/8 flex items-center justify-around px-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-1 h-1 ${i === activeTab ? "bg-black/50" : "bg-black/15"}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Screen 1: Home ───────────────────────────────────────────────────────────

function HomeScreen() {
  return (
    <PhoneFrame
      activeTab={0}
      nav={
        <>
          <div className="flex flex-col gap-[3px]">
            <Bar className="w-3 h-[2px] bg-black/30" />
            <Bar className="w-3 h-[2px] bg-black/30" />
            <Bar className="w-3 h-[2px] bg-black/30" />
          </div>
          <div className="w-5 h-5 rounded-full border border-black/20 bg-black/5" />
        </>
      }
    >
      {/* Greeting */}
      <Bar className="w-20 h-[3px] bg-black/15 mb-2" />

      {/* Pay card */}
      <div className="border border-black/15 p-2 mb-2">
        <Bar className="w-12 h-[2px] bg-black/15 mb-1.5" />
        <Bar className="w-16 h-3 bg-black/20 mb-1" />
        <Row left="w-10" right="w-12" />
        <div className="mt-1.5">
          <Row left="w-8" right="w-10" />
        </div>
        <div className="mt-1.5 pt-1.5 border-t border-black/8">
          <Bar className="w-14 h-[2px] bg-black/10" />
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-1 mb-2.5">
        {["Clock In", "Pay", "Benefits"].map((label) => (
          <div
            key={label}
            className="border border-black/15 flex flex-col items-center justify-center gap-1 py-1.5"
          >
            <div className="w-3 h-3 bg-black/8 rounded-full" />
            <Bar className="w-6 h-[2px] bg-black/12" />
          </div>
        ))}
      </div>

      {/* Recent list */}
      <SectionLabel className="mb-2" />
      <div className="space-y-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-black/12 rounded-full" />
              <Bar className={`h-[2px] bg-black/12 ${i === 0 ? "w-16" : "w-12"}`} />
            </div>
            <Bar className="w-8 h-[2px] bg-black/10" />
          </div>
        ))}
      </div>
    </PhoneFrame>
  )
}

// ─── Screen 2: Clock In ───────────────────────────────────────────────────────

function ClockInScreen() {
  return (
    <PhoneFrame
      activeTab={1}
      nav={
        <>
          <div className="w-2 h-2 border-l-[2px] border-b-[2px] border-black/30 -rotate-45" />
          <Bar className="w-14 h-[3px] bg-black/20" />
          <div className="w-2" />
        </>
      }
    >
      {/* Location badge */}
      <div className="flex items-center gap-1.5 mb-4">
        <div className="w-2 h-2 rounded-full border border-black/25 flex-shrink-0" />
        <Bar className="w-24 h-[3px] bg-black/15" />
      </div>

      {/* Big clock-in button */}
      <div className="flex flex-col items-center gap-2 mt-1 mb-5">
        <div className="w-20 h-20 border-2 border-black/30 flex items-center justify-center">
          <Bar className="w-10 h-[3px] bg-black/25" />
        </div>
        <Bar className="w-16 h-[2px] bg-black/12" />
      </div>

      {/* Divider + recent */}
      <div className="border-t border-black/8 pt-2">
        <SectionLabel className="mb-2" />
        <div className="space-y-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <Bar className={`h-[2px] bg-black/12 ${i === 0 ? "w-20" : "w-16"}`} />
              <Bar className="w-8 h-[2px] bg-black/10" />
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}

// ─── Screen 3: Pay Detail ─────────────────────────────────────────────────────

function PayDetailScreen() {
  return (
    <PhoneFrame
      activeTab={2}
      nav={
        <>
          <div className="w-2 h-2 border-l-[2px] border-b-[2px] border-black/30 -rotate-45" />
          <Bar className="w-12 h-[3px] bg-black/20" />
          <div className="w-3 h-3 border border-black/25 flex items-center justify-center">
            <Bar className="w-1.5 h-[2px] bg-black/25" />
          </div>
        </>
      }
    >
      {/* Earnings */}
      <SectionLabel className="mb-2" />
      <div className="space-y-1.5 mb-2">
        <Row left="w-10" right="w-10" />
        <Row left="w-8" right="w-8" />
        <div className="flex items-center justify-between pt-1 border-t border-black/8">
          <Bar className="w-10 h-[3px] bg-black/30" />
          <Bar className="w-12 h-[3px] bg-black/30" />
        </div>
      </div>

      {/* Deductions */}
      <div className="border-t border-black/8 pt-2 mb-2">
        <SectionLabel className="mb-2" />
        <div className="space-y-1.5">
          <Row left="w-10" right="w-8" />
          <Row left="w-12" right="w-8" />
        </div>
      </div>

      {/* Net pay */}
      <div className="border-t border-black/8 pt-2">
        <div className="bg-black px-2 py-2 flex items-center justify-between">
          <Bar className="w-10 h-[3px] bg-white/50" />
          <Bar className="w-12 h-[3px] bg-white/80" />
        </div>
      </div>

      {/* Download */}
      <div className="mt-2 border border-black/20 flex items-center justify-center py-1.5 gap-1.5">
        <Bar className="w-10 h-[2px] bg-black/25" />
        <div className="w-2 h-2 border border-black/25 flex items-end justify-center pb-[1px]">
          <Bar className="w-[2px] h-1 bg-black/25" />
        </div>
      </div>
    </PhoneFrame>
  )
}

// ─── Design insights ──────────────────────────────────────────────────────────

const insights = [
  {
    number: "01",
    title: "2-tap clock-in",
    desc: "Field workers clock in without unlocking or navigating — site confirmed on open.",
  },
  {
    number: "02",
    title: "Pay above the fold",
    desc: "Gross, net, and next pay date visible without scrolling on every device size.",
  },
  {
    number: "03",
    title: "Progressive disclosure",
    desc: "Pay detail expands from the history list — no separate navigation path needed.",
  },
  {
    number: "04",
    title: "Download on demand",
    desc: "Stubs and W-2s are surfaced inline rather than buried in a documents section.",
  },
]

// ─── Export ───────────────────────────────────────────────────────────────────

export default function WorkforceWireframes() {
  return (
    <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-start">
      {/* Wireframes */}
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-black/25 mb-8">
          Wireframes
        </p>
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          <div className="flex flex-col gap-3">
            <HomeScreen />
            <p className="text-[10px] tracking-[0.2em] uppercase text-black/35 text-center">
              Home
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <ClockInScreen />
            <p className="text-[10px] tracking-[0.2em] uppercase text-black/35 text-center">
              Clock In
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <PayDetailScreen />
            <p className="text-[10px] tracking-[0.2em] uppercase text-black/35 text-center">
              Pay Detail
            </p>
          </div>
        </div>
      </div>

      {/* Design insights */}
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-black/25 mb-8">
          Key Decisions
        </p>
        <div className="space-y-6">
          {insights.map((item) => (
            <div key={item.number} className="flex gap-3">
              <span className="text-xs font-mono text-black/20 flex-shrink-0 pt-[1px]">
                {item.number}
              </span>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-black mb-1.5">
                  {item.title}
                </p>
                <p className="text-xs text-black/50 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
