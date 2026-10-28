import type { PictogramKind } from "@/lib/products"
import { cn } from "@/lib/utils"

// Braun-style product marks: circles, rectangles and lines only, one accent dot each.
// Drawn on a 64×64 grid with 1.25 hairlines. New products get a new mark in the same family.

const STROKE = { stroke: "currentColor", strokeWidth: 1.25, fill: "none" } as const

function FocusModeMark() {
  const ticks = Array.from({ length: 24 }, (_, i) => i * 15)
  return (
    <>
      <circle cx="32" cy="32" r="27" {...STROKE} />
      {ticks.map((deg) => (
        <line
          key={deg}
          x1="32"
          y1={deg % 90 === 0 ? 7.5 : 9}
          x2="32"
          y2="11.5"
          {...STROKE}
          strokeWidth={deg % 90 === 0 ? 1.25 : 0.9}
          transform={`rotate(${deg} 32 32)`}
        />
      ))}
      {/* Knob turns on hover */}
      <g className="origin-center transition-transform duration-500 ease-out-soft [transform-box:view-box] group-hover:rotate-[75deg]">
        <circle cx="32" cy="32" r="14.5" {...STROKE} />
        <line x1="32" y1="32" x2="32" y2="21.5" {...STROKE} strokeLinecap="round" />
        <circle cx="32" cy="21" r="2.25" className="fill-(--mark-accent)" />
      </g>
      <circle cx="32" cy="32" r="1.5" fill="currentColor" />
    </>
  )
}

function ReIqMark() {
  const windows: [number, number][] = []
  for (let row = 0; row < 4; row++) for (let col = 0; col < 3; col++) windows.push([20 + col * 9, 16 + row * 9])
  return (
    <>
      <rect x="14" y="9" width="36" height="45" rx="1.5" {...STROKE} />
      {windows.map(([x, y], i) =>
        i === 4 ? (
          <rect key={i} x={x} y={y} width="6" height="6" rx="0.75" className="fill-(--mark-accent)" />
        ) : (
          <rect key={i} x={x} y={y} width="6" height="6" rx="0.75" {...STROKE} strokeWidth={1} />
        ),
      )}
      <line x1="6" y1="54" x2="58" y2="54" {...STROKE} />
    </>
  )
}

function SourceIqMark() {
  const rows = [7, 5, 3, 1]
  return (
    <>
      {rows.map((count, r) =>
        Array.from({ length: count }, (_, i) => {
          const x = 32 + (i - (count - 1) / 2) * 7
          return <circle key={`${r}-${i}`} cx={x} cy={11 + r * 10} r="1.9" fill="currentColor" />
        }),
      )}
      <line x1="32" y1="44" x2="32" y2="50" {...STROKE} />
      <circle cx="32" cy="55" r="3.25" className="fill-(--mark-accent)" />
    </>
  )
}

function CoastGalleryMark() {
  return (
    <>
      {/* A framed work hung on a wire, lit from above, with the saved-piece dot */}
      <path d="M24 9 32 17 40 9" {...STROKE} strokeLinejoin="round" />
      <circle cx="32" cy="7.5" r="1.5" fill="currentColor" />
      <rect x="13" y="17" width="38" height="30" rx="1.5" {...STROKE} />
      <rect x="18" y="22" width="28" height="20" rx="0.75" {...STROKE} strokeWidth={0.9} />
      <path d="M18 37c5-6 9-6 14-2s9 3 14-3" {...STROKE} strokeWidth={0.9} />
      <line x1="6" y1="55" x2="58" y2="55" {...STROKE} />
      <circle cx="48" cy="55" r="3.25" className="fill-(--mark-accent)" />
    </>
  )
}

const marks: Record<PictogramKind, () => React.JSX.Element> = {
  focusmode: FocusModeMark,
  "re-iq": ReIqMark,
  sourceiq: SourceIqMark,
  "coast-gallery": CoastGalleryMark,
}

export default function Pictogram({
  kind,
  size = 64,
  accent = true,
  className,
  title,
}: {
  kind: PictogramKind
  size?: number
  /** Off renders the accent dot in ink — use when another accent owns the viewport */
  accent?: boolean
  className?: string
  title?: string
}) {
  const Mark = marks[kind]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn("text-ink", className)}
      style={{ "--mark-accent": accent ? "var(--accent)" : "currentColor" } as React.CSSProperties}
    >
      <Mark />
    </svg>
  )
}
