import { cn } from "@/lib/utils"

// Isometric hairline objects, one per service: a platform with the thing on top.
// Drawn in world units (x right-back, y left-back, z up) and projected to a 240×170 view.

export type P = [number, number, number]

const OX = 120
const OY = 100
export const iso = ([x, y, z]: P): [number, number] => [OX + (x - y) * 0.866, OY + (x + y) * 0.5 - z]
export const pts = (list: P[]) => list.map((p) => iso(p).map((n) => n.toFixed(1)).join(",")).join(" ")
export const line = (a: P, b: P) => {
  const [x1, y1] = iso(a)
  const [x2, y2] = iso(b)
  return { x1, y1, x2, y2 }
}

export const STROKE = { stroke: "currentColor", strokeWidth: 1, strokeLinejoin: "round" as const, vectorEffect: "non-scaling-stroke" as const }
export const FACE = { ...STROKE, className: "fill-surface" }
export const GUIDE = { stroke: "currentColor", strokeWidth: 1, strokeDasharray: "1 3", className: "text-ink-3" }

/** A box with its three visible faces filled, so later shapes occlude earlier ones */
export function Box({ x, y, z, w, d, h }: { x: number; y: number; z: number; w: number; d: number; h: number }) {
  const [x2, y2, z2] = [x + w, y + d, z + h]
  return (
    <g>
      <polygon points={pts([[x2, y, z], [x2, y2, z], [x2, y2, z2], [x2, y, z2]])} {...FACE} />
      <polygon points={pts([[x, y2, z], [x2, y2, z], [x2, y2, z2], [x, y2, z2]])} {...FACE} />
      <polygon points={pts([[x, y, z2], [x2, y, z2], [x2, y2, z2], [x, y2, z2]])} {...FACE} />
    </g>
  )
}

/** The shared platform, with dotted construction guides running off its corners. Objects sit at z = h */
export function Platform({ h = 9 }: { h?: number }) {
  const s = 56
  return (
    <g>
      {(
        [
          [[s, -s, 0], [s + 26, -s, 0]],
          [[s, -s, 0], [s, -s - 26, 0]],
          [[-s, s, 0], [-s - 26, s, 0]],
          [[-s, s, 0], [-s, s + 26, 0]],
          [[s, s, 0], [s + 22, s, 0]],
          [[s, s, 0], [s, s + 22, 0]],
        ] as [P, P][]
      ).map(([a, b], i) => (
        <line key={i} {...line(a, b)} {...GUIDE} />
      ))}
      <Box x={-s} y={-s} z={0} w={s * 2} d={s * 2} h={h} />
      {/* Inset groove on the top face */}
      <polygon points={pts([[-s + 6, -s + 6, h], [s - 6, -s + 6, h], [s - 6, s - 6, h], [-s + 6, s - 6, h]])} {...STROKE} fill="none" className="text-ink-3" />
      {/* Two indicator lights on the front edge */}
      {[18, 26].map((y) => {
        const [cx, cy] = iso([s, y, Math.min(4.5, h / 2)])
        return <ellipse key={y} cx={cx} cy={cy} rx="1.8" ry="2.2" {...STROKE} fill="none" />
      })}
    </g>
  )
}

function Frame({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 240 170" aria-hidden className={cn("h-auto w-full max-w-[260px] text-ink-2", className)}>
      {children}
    </svg>
  )
}

/** Websites: a browser window standing on the platform */
export function IsoWebsite({ className }: { className?: string }) {
  const y = 6
  const [x0, x1, z0, z1] = [-38, 38, 9, 78]
  const plane = (x: number, z: number): P => [x, y, z]
  return (
    <Frame className={className}>
      <Platform />
      {/* Window, with a little depth; details sit on its front face */}
      <Box x={x0} y={y - 4} z={z0} w={x1 - x0} d={4} h={z1 - z0} />
      <line {...line(plane(x0, z1 - 10), plane(x1, z1 - 10))} {...STROKE} />
      {[x0 + 6, x0 + 11, x0 + 16].map((x) => {
        const [cx, cy] = iso(plane(x, z1 - 5))
        return <ellipse key={x} cx={cx} cy={cy} rx="1.5" ry="1.7" {...STROKE} fill="none" />
      })}
      {/* Hero image block and text lines */}
      <polygon points={pts([plane(x0 + 6, z1 - 16), plane(x0 + 34, z1 - 16), plane(x0 + 34, z0 + 10), plane(x0 + 6, z0 + 10)])} {...STROKE} fill="none" />
      <line {...line(plane(x0 + 6, z1 - 16), plane(x0 + 34, z0 + 10))} {...GUIDE} />
      {[0, 8, 16].map((d, i) => (
        <line key={d} {...line(plane(x0 + 40, z1 - 20 - d), plane(x1 - 6 - i * 7, z1 - 20 - d))} {...STROKE} strokeLinecap="round" />
      ))}
      <polygon points={pts([plane(x0 + 40, z0 + 18), plane(x0 + 58, z0 + 18), plane(x0 + 58, z0 + 10), plane(x0 + 40, z0 + 10)])} {...STROKE} fill="none" className="text-ink" />
    </Frame>
  )
}

/** Web apps: a bar chart of solid columns rising from the platform */
export function IsoWebApp({ className }: { className?: string }) {
  const bars = [
    { x: -40, y: -14, h: 22 },
    { x: -20, y: -14, h: 38 },
    { x: 0, y: -14, h: 30 },
    { x: 20, y: -14, h: 56 },
  ]
  return (
    <Frame className={className}>
      <Platform />
      {/* Axis lines on the platform */}
      <line {...line([-46, 10, 9], [42, 10, 9])} {...STROKE} className="text-ink-3" />
      <line {...line([-46, -30, 9], [-46, 10, 9])} {...STROKE} className="text-ink-3" />
      {bars.map((b, i) => (
        <g key={i} className={i === bars.length - 1 ? "text-ink" : undefined}>
          <Box x={b.x} y={b.y} z={9} w={14} d={14} h={b.h} />
        </g>
      ))}
      {/* Trend line floating above */}
      <polyline points={pts(bars.map((b) => [b.x + 7, b.y + 7, 9 + b.h + 14] as P))} {...STROKE} fill="none" strokeDasharray="2 3" />
    </Frame>
  )
}

/** iOS apps: a phone lying on the platform with a ring on its screen */
export function IsoPhone({ className }: { className?: string }) {
  const [x0, y0, w, d, z] = [-24, -42, 48, 84, 9]
  const top = z + 5
  const ring = (r: number) =>
    pts(Array.from({ length: 48 }, (_, i) => {
      const a = (i / 48) * Math.PI * 2
      return [r * Math.cos(a), -8 + r * Math.sin(a), top] as P
    }))
  return (
    <Frame className={className}>
      <Platform />
      <Box x={x0} y={y0} z={z} w={w} d={d} h={5} />
      {/* Screen inset and island */}
      <polygon points={pts([[x0 + 4, y0 + 4, top], [x0 + w - 4, y0 + 4, top], [x0 + w - 4, y0 + d - 4, top], [x0 + 4, y0 + d - 4, top]])} {...STROKE} fill="none" />
      <line {...line([-6, y0 + 9, top], [6, y0 + 9, top])} {...STROKE} strokeWidth={2.5} strokeLinecap="round" className="text-ink" />
      <polygon points={ring(15)} {...STROKE} fill="none" className="text-ink" />
      <polygon points={ring(19)} {...GUIDE} fill="none" />
      <line {...line([-12, 26, top], [12, 26, top])} {...STROKE} strokeLinecap="round" />
      <line {...line([-8, 32, top], [8, 32, top])} {...STROKE} strokeLinecap="round" />
    </Frame>
  )
}
