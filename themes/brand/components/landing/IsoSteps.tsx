import { Box, FACE, GUIDE, Platform, STROKE, iso, line, pts, type P } from "@/components/motifs/Isometric"
import { cn } from "@/lib/utils"

// The course path as a staircase: four platforms, each a step higher, each holding
// the thing you have at that stage. Same hairline family as the homepage services art.

export const STEP_HEIGHTS = [9, 18, 27, 36]

function Frame({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 -24 240 194" aria-hidden className={cn("h-auto w-full max-w-[240px] text-ink-2", className)}>
      {children}
    </svg>
  )
}

/** 01 · The idea: a stack of notes with a pencil across it */
export function IsoIdea({ className }: { className?: string }) {
  const h = STEP_HEIGHTS[0]
  return (
    <Frame className={className}>
      <Platform h={h} />
      {[0, 1, 2].map((i) => (
        <Box key={i} x={-30 + i * 2} y={-34 - i * 3} z={h + i * 3} w={56} d={64} h={2} />
      ))}
      {[0, 10, 20, 30].map((d, i) => (
        <line key={d} {...line([-20, -30 + d, h + 8], [i === 3 ? 4 : 18, -30 + d, h + 8])} {...STROKE} strokeLinecap="round" />
      ))}
      {/* Pencil */}
      <polygon points={pts([[-36, 30, h + 9], [30, 4, h + 9], [32, 9, h + 9], [-34, 35, h + 9]])} {...FACE} />
      <polygon points={pts([[30, 4, h + 9], [40, 2, h + 9], [32, 9, h + 9]])} {...STROKE} fill="currentColor" className="text-ink" />
    </Frame>
  )
}

/** 02 · Design: a phone lying flat with a wireframe on its screen */
export function IsoDesign({ className }: { className?: string }) {
  const h = STEP_HEIGHTS[1]
  const [x0, y0, w, d] = [-24, -42, 48, 84]
  const top = h + 5
  const rect = (x: number, y: number, rw: number, rd: number) =>
    pts([[x, y, top], [x + rw, y, top], [x + rw, y + rd, top], [x, y + rd, top]])
  return (
    <Frame className={className}>
      <Platform h={h} />
      <Box x={x0} y={y0} z={h} w={w} d={d} h={5} />
      <polygon points={rect(x0 + 4, y0 + 4, w - 8, d - 8)} {...STROKE} fill="none" />
      <line {...line([-6, y0 + 9, top], [6, y0 + 9, top])} {...STROKE} strokeWidth={2.5} strokeLinecap="round" className="text-ink" />
      <polygon points={rect(-16, -26, 32, 22)} {...STROKE} fill="none" className="text-ink" />
      <line {...line([-16, -26, top], [16, -4, top])} {...GUIDE} />
      <polygon points={rect(-16, 2, 32, 8)} {...STROKE} fill="none" />
      <polygon points={rect(-16, 14, 32, 8)} {...STROKE} fill="none" />
      <polygon points={rect(-16, 28, 32, 6)} {...STROKE} className="fill-current text-ink" />
    </Frame>
  )
}

/** 03 · Build: a terminal window standing on the platform */
export function IsoBuild({ className }: { className?: string }) {
  const h = STEP_HEIGHTS[2]
  const y = 6
  const [x0, x1, z0, z1] = [-40, 40, h, h + 64]
  const plane = (x: number, z: number): P => [x, y, z]
  return (
    <Frame className={className}>
      <Platform h={h} />
      <Box x={x0} y={y - 4} z={z0} w={x1 - x0} d={4} h={z1 - z0} />
      <line {...line(plane(x0, z1 - 10), plane(x1, z1 - 10))} {...STROKE} />
      {[x0 + 6, x0 + 11, x0 + 16].map((x) => {
        const [cx, cy] = iso(plane(x, z1 - 5))
        return <ellipse key={x} cx={cx} cy={cy} rx="1.5" ry="1.7" {...STROKE} fill="none" />
      })}
      {/* Prompt chevron, cursor and output lines */}
      <polyline points={pts([plane(x0 + 7, z1 - 17), plane(x0 + 12, z1 - 21), plane(x0 + 7, z1 - 25)])} {...STROKE} fill="none" className="text-ink" />
      <line {...line(plane(x0 + 16, z1 - 25), plane(x0 + 24, z1 - 25))} {...STROKE} strokeWidth={2} className="text-ink" />
      {[33, 41, 49].map((d, i) => (
        <line key={d} {...line(plane(x0 + 7, z1 - d), plane(x1 - 8 - i * 14, z1 - d))} {...STROKE} strokeLinecap="round" />
      ))}
    </Frame>
  )
}

/** 04 · Ship: the app icon standing on the top step, with its rating */
export function IsoShip({ className }: { className?: string }) {
  const h = STEP_HEIGHTS[3]
  const y = 0
  const [x0, x1, z0, z1] = [-30, 30, h + 4, h + 64]
  const plane = (x: number, z: number): P => [x, y + 6, z]
  const r = 10
  // Rounded icon outline sampled in its own plane
  const outline: P[] = []
  const corners: [number, number, number][] = [
    [x1 - r, z1 - r, 0],
    [x0 + r, z1 - r, Math.PI / 2],
    [x0 + r, z0 + r, Math.PI],
    [x1 - r, z0 + r, (3 * Math.PI) / 2],
  ]
  for (const [cx, cz, start] of corners) {
    for (let i = 0; i <= 6; i++) {
      const a = start + (i / 6) * (Math.PI / 2)
      outline.push(plane(cx + r * Math.cos(a), cz + r * Math.sin(a)))
    }
  }
  const back = outline.map(([x, , z]) => [x, y + 2, z] as P)
  return (
    <Frame className={className}>
      <Platform h={h} />
      <polygon points={pts(back)} {...FACE} />
      <polygon points={pts(outline)} {...FACE} className="fill-surface text-ink" />
      {/* App Store-style "A" made of three strokes */}
      <line {...line(plane(-12, z0 + 14), plane(0, z1 - 12))} {...STROKE} strokeWidth={2} strokeLinecap="round" className="text-ink" />
      <line {...line(plane(0, z1 - 12), plane(12, z0 + 14))} {...STROKE} strokeWidth={2} strokeLinecap="round" className="text-ink" />
      <line {...line(plane(-16, z0 + 22), plane(16, z0 + 22))} {...STROKE} strokeWidth={2} strokeLinecap="round" className="text-ink" />
      {/* Five rating dots on the platform in front */}
      {[-24, -12, 0, 12, 24].map((x) => {
        const [cx, cy] = iso([x + 14, 30, h])
        return <ellipse key={x} cx={cx} cy={cy} rx="2.6" ry="1.5" className="fill-ink" />
      })}
    </Frame>
  )
}
