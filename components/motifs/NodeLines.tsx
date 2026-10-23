"use client"

import { motion } from "framer-motion"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

// Node-line diagram: thin elbow lines, dot nodes, small mono pill labels.
// Coordinates are in a width×height viewBox; labels are HTML positioned by percentage.

export interface DiagramNode {
  id: string
  x: number
  y: number
  label?: string
  /** Where the pill sits relative to the node */
  labelSide?: "top" | "bottom" | "left" | "right"
  accent?: boolean
}

export interface DiagramEdge {
  from: string
  to: string
  /** "elbow" routes vertical → horizontal → vertical; "straight" draws a direct line */
  shape?: "elbow" | "straight"
}

const labelOffset: Record<NonNullable<DiagramNode["labelSide"]>, string> = {
  top: "-translate-x-1/2 -translate-y-[calc(100%+10px)]",
  bottom: "-translate-x-1/2 translate-y-[10px]",
  left: "-translate-x-[calc(100%+12px)] -translate-y-1/2",
  right: "translate-x-[12px] -translate-y-1/2",
}

function edgePath(a: DiagramNode, b: DiagramNode, shape: DiagramEdge["shape"]) {
  if (shape === "straight") return `M${a.x} ${a.y} L${b.x} ${b.y}`
  const midY = (a.y + b.y) / 2
  return `M${a.x} ${a.y} V${midY} H${b.x} V${b.y}`
}

export default function NodeLines({
  nodes,
  edges,
  width = 800,
  height = 320,
  className,
}: {
  nodes: DiagramNode[]
  edges: DiagramEdge[]
  width?: number
  height?: number
  className?: string
}) {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))

  return (
    <div className={cn("relative w-full", className)} style={{ aspectRatio: `${width} / ${height}` }}>
      <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <g fill="none" stroke="currentColor" strokeWidth="1" className="text-line">
          {edges.map((e, i) => (
            <motion.path
              key={`${e.from}-${e.to}`}
              d={edgePath(byId[e.from], byId[e.to], e.shape)}
              className="stroke-ink-3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
            />
          ))}
        </g>
        {nodes.map((n, i) => (
          <motion.circle
            key={n.id}
            cx={n.x}
            cy={n.y}
            r={n.accent ? 4.5 : 3.5}
            className={n.accent ? "fill-accent" : "fill-bg stroke-ink"}
            strokeWidth={n.accent ? 0 : 1.25}
            vectorEffect="non-scaling-stroke"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.1 + i * 0.06 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
      </svg>

      {nodes
        .filter((n) => n.label)
        .map((n, i) => (
          <motion.span
            key={n.id}
            className={cn(
              "label-mono absolute flex h-6 items-center rounded-full border border-line bg-surface px-2.5 text-[11px] whitespace-nowrap text-ink-2",
              labelOffset[n.labelSide ?? "bottom"],
            )}
            style={{ left: `${(n.x / width) * 100}%`, top: `${(n.y / height) * 100}%` }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
          >
            {n.label}
          </motion.span>
        ))}
    </div>
  )
}
