import { cn } from "@/lib/utils"

// Isometric hairline cube with subdivided faces — background art for dark sections.

type Pt = [number, number]
const add = (a: Pt, b: Pt, t = 1): Pt => [a[0] + b[0] * t, a[1] + b[1] * t]
const r = (n: number) => Math.round(n * 100) / 100

export default function WireframeCube({
  size = 120,
  divisions = 4,
  className,
}: {
  size?: number
  divisions?: number
  className?: string
}) {
  const c30 = Math.cos(Math.PI / 6)
  const o: Pt = [0, 0] // front corner
  const upLeft: Pt = [-size * c30, -size / 2]
  const upRight: Pt = [size * c30, -size / 2]
  const down: Pt = [0, size]

  // Each face: origin + two edge vectors
  const faces: [Pt, Pt][] = [
    [upLeft, upRight], // top
    [upLeft, down], // left
    [upRight, down], // right
  ]

  const lines: [Pt, Pt][] = []
  for (const [u, v] of faces) {
    for (let i = 0; i <= divisions; i++) {
      const t = i / divisions
      lines.push([add(o, u, t), add(add(o, u, t), v)])
      lines.push([add(o, v, t), add(add(o, v, t), u)])
    }
  }

  const pad = 2
  const vb = `${r(-size * c30 - pad)} ${r(-size - pad)} ${r(size * c30 * 2 + pad * 2)} ${r(size * 2 + pad * 2)}`

  return (
    <svg viewBox={vb} aria-hidden className={cn("text-ink-3", className)} width={size * c30 * 2} height={size * 2}>
      <g stroke="currentColor" strokeWidth="0.75" fill="none" vectorEffect="non-scaling-stroke">
        {lines.map(([a, b], i) => (
          <line key={i} x1={r(a[0])} y1={r(a[1])} x2={r(b[0])} y2={r(b[1])} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  )
}
