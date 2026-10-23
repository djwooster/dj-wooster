import { cn } from "@/lib/utils"

/* ─── Layout ─────────────────────────────────────────────────────────────── */

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6", className)}>{children}</div>
}

// Major section: visible hairline on top, crosshairs at the corners, 64px mobile / 96–128px desktop
export function Section({
  id,
  className,
  children,
  crosshairs = true,
}: {
  id?: string
  className?: string
  children: React.ReactNode
  crosshairs?: boolean
}) {
  return (
    <section id={id} className={cn("border-t border-line", className)}>
      <Container className="relative py-16 md:py-24 lg:py-32">
        {crosshairs && (
          <>
            <Crosshair className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 max-sm:left-4" />
            <Crosshair className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 max-sm:right-4" />
          </>
        )}
        {children}
      </Container>
    </section>
  )
}

/* ─── Marks ──────────────────────────────────────────────────────────────── */

export function Crosshair({ className, size = 11 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 11 11" aria-hidden className={cn("text-ink-3", className)}>
      <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

/* ─── SectionLabel: ↘ 01 · PRODUCTS ──────────────────────────────────────── */

type ArrowDir = "down-right" | "right" | "up-right" | "down"
const arrowRotation: Record<ArrowDir, number> = { right: 0, "down-right": 45, down: 90, "up-right": -45 }

export function CircleArrow({ dir = "down-right", className }: { dir?: ArrowDir; className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={cn("size-4", className)}>
      <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1" />
      <g transform={`rotate(${arrowRotation[dir]} 8 8)`}>
        <path d="M5 8h6M8.5 5.5 11 8l-2.5 2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

export function SectionLabel({
  number,
  children,
  dir = "down-right",
  className,
}: {
  number?: string
  children: React.ReactNode
  dir?: ArrowDir
  className?: string
}) {
  return (
    <span
      className={cn(
        "label-mono inline-flex h-7 w-fit items-center gap-2 rounded-full border border-line bg-surface pr-3 pl-1.5 text-ink-2",
        className,
      )}
    >
      <CircleArrow dir={dir} className="text-ink" />
      {number && <span className="text-ink">{number}</span>}
      {number && <span aria-hidden>·</span>}
      <span>{children}</span>
    </span>
  )
}

/* ─── TwoToneHeading: ink phrase + gray continuation ─────────────────────── */

const headingSizes = {
  sm: "text-20 md:text-28",
  md: "text-28 md:text-40",
  lg: "text-40 md:text-64",
  xl: "text-40 sm:text-64 lg:text-96",
}

export function TwoToneHeading({
  as: Tag = "h2",
  lead,
  rest,
  size = "md",
  className,
}: {
  as?: "h1" | "h2" | "h3"
  lead: string
  rest?: string
  size?: keyof typeof headingSizes
  className?: string
}) {
  return (
    <Tag className={cn("headline text-ink", headingSizes[size], className)}>
      {lead}
      {rest && <span className="text-ink-2"> {rest}</span>}
    </Tag>
  )
}

/* ─── Stat: big numeral + mono caption ───────────────────────────────────── */

export function Stat({
  value,
  caption,
  display = false,
  className,
}: {
  value: string
  caption: string
  display?: boolean
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <span
        className={cn(
          "tabular-nums text-ink",
          display ? "font-display text-64 leading-none font-bold md:text-96" : "headline text-40 md:text-64",
        )}
      >
        {value}
      </span>
      <span className="label-mono text-ink-2">{caption}</span>
    </div>
  )
}

/* ─── StatusChip: LIVE / IN REVIEW / BETA ────────────────────────────────── */

export type ChipStatus = "live" | "in-review" | "beta" | "waitlist" | "open" | "closed" | "soon"

const chipLabel: Record<ChipStatus, string> = {
  live: "Live",
  "in-review": "In review",
  beta: "Beta",
  waitlist: "Waitlist",
  open: "Enrolling",
  closed: "Closed",
  soon: "Coming next",
}

export function StatusChip({ status, note, className }: { status: ChipStatus; note?: string; className?: string }) {
  // Color only where it carries meaning: live/open = positive, in review = pulsing, rest neutral
  const dot =
    status === "live" || status === "open" ? (
      <span className="size-1.5 rounded-full bg-positive" />
    ) : status === "in-review" || status === "waitlist" ? (
      <span className="relative flex size-1.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-ink-2 opacity-60" />
        <span className="relative size-1.5 rounded-full bg-ink-2" />
      </span>
    ) : (
      <span className="size-1.5 rounded-full border border-ink-2" />
    )

  return (
    <span
      className={cn(
        "label-mono inline-flex h-6 items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 text-[11px] text-ink-2",
        className,
      )}
    >
      {dot}
      {chipLabel[status]}
      {note && <span className="text-ink-2">· {note}</span>}
    </span>
  )
}

/* ─── Card surface ───────────────────────────────────────────────────────── */

export function Card({
  className,
  children,
  inverse,
}: {
  className?: string
  children: React.ReactNode
  inverse?: boolean
}) {
  return (
    <div className={cn("rounded-card border border-line", inverse ? "inverse" : "bg-surface", className)}>
      {children}
    </div>
  )
}
