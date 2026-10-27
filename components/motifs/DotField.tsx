import { cn } from "@/lib/utils"

// Generated dot patterns used as section art. Deterministic (seeded), so server and client match.
//   halftone — dot size falls off from a focal point
//   cloud    — dithered cloud: dots appear where a soft noise field is dense
//   grid     — uniform dot grid

type Variant = "halftone" | "cloud" | "grid"

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const round = (n: number) => Math.round(n * 100) / 100

export default function DotField({
  variant = "halftone",
  cols = 48,
  rows = 24,
  gap = 10,
  focus = [0.7, 0.35],
  seed = 7,
  ripple = false,
  className,
}: {
  variant?: Variant
  cols?: number
  rows?: number
  gap?: number
  /** Focal point as fractions of width/height (halftone + cloud) */
  focus?: [number, number]
  seed?: number
  /** Gentle opacity wave outward from the focus. Hero only; off under reduced motion */
  ripple?: boolean
  className?: string
}) {
  const w = cols * gap
  const h = rows * gap
  const maxR = gap * 0.42
  const rand = mulberry32(seed)
  const [fx, fy] = [focus[0] * w, focus[1] * h]
  const reach = Math.hypot(Math.max(fx, w - fx), Math.max(fy, h - fy))

  // A few soft blobs around the focus make the cloud feel organic
  const blobs = Array.from({ length: 4 }, () => ({
    x: fx + (rand() - 0.5) * w * 0.5,
    y: fy + (rand() - 0.5) * h * 0.6,
    s: (0.18 + rand() * 0.18) * Math.max(w, h),
  }))

  const dots: { x: number; y: number; r: number }[] = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * gap + gap / 2
      const y = row * gap + gap / 2
      if (variant === "grid") {
        dots.push({ x, y, r: gap * 0.12 })
      } else if (variant === "halftone") {
        const t = 1 - Math.hypot(x - fx, y - fy) / reach
        const r = maxR * Math.pow(Math.max(t, 0), 1.6)
        if (r > 0.35) dots.push({ x, y, r })
      } else {
        const density = Math.min(
          1,
          blobs.reduce((sum, b) => sum + Math.exp(-((x - b.x) ** 2 + (y - b.y) ** 2) / (2 * b.s * b.s)), 0),
        )
        if (rand() < density * 0.85) dots.push({ x, y, r: gap * (0.14 + density * 0.16) })
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className={cn("block h-full w-full text-ink-3", className)}
    >
      <g fill="currentColor">
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={round(d.x)}
            cy={round(d.y)}
            r={round(d.r)}
            className={ripple ? "animate-dot-ripple" : undefined}
            style={ripple ? { animationDelay: `${round((Math.hypot(d.x - fx, d.y - fy) / reach) * 4)}s` } : undefined}
          />
        ))}
      </g>
    </svg>
  )
}
