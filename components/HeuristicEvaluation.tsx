const evaluations = [
  {
    number: "01",
    heuristic: "Flexibility & Efficiency",
    severity: 4,
    finding: "Routine tasks required 12+ steps across disconnected flows",
  },
  {
    number: "02",
    heuristic: "Consistency & Standards",
    severity: 3,
    finding: "Widespread component drift from the org design system",
  },
  {
    number: "03",
    heuristic: "Aesthetic & Minimalist Design",
    severity: 3,
    finding: "Information density far exceeded what clinical tasks required",
  },
  {
    number: "04",
    heuristic: "Recognition Rather Than Recall",
    severity: 2,
    finding: "Navigation relied on memorized paths — no clear wayfinding",
  },
  {
    number: "05",
    heuristic: "User Control & Freedom",
    severity: 2,
    finding: "No clear exit points or back-tracking in multi-step flows",
  },
  {
    number: "06",
    heuristic: "Error Prevention",
    severity: 2,
    finding: "No confirmation patterns before destructive or irreversible actions",
  },
]

const severityLabels: Record<number, string> = {
  1: "Cosmetic",
  2: "Minor",
  3: "Major",
  4: "Critical",
}

function SeverityDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-[3px]">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-[7px] h-[7px] ${i <= level ? "bg-black/70" : "bg-black/10"}`}
          />
        ))}
      </div>
      <span className="text-[9px] tracking-widest uppercase text-black/30 hidden md:inline">
        {severityLabels[level]}
      </span>
    </div>
  )
}

export default function HeuristicEvaluation() {
  return (
    <div className="w-full border border-black/10 bg-black/[0.02] p-6 md:p-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-black/50">
          Heuristic Evaluation
        </p>
        <p className="text-[10px] tracking-widest uppercase text-black/25">
          Nielsen's 10 Heuristics
        </p>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[28px_1fr_auto] md:grid-cols-[28px_1fr_140px_1fr] gap-x-6 pb-3 border-b border-black/10">
        <span />
        <span className="text-[9px] tracking-[0.25em] uppercase text-black/25">Heuristic</span>
        <span className="text-[9px] tracking-[0.25em] uppercase text-black/25">Severity</span>
        <span className="text-[9px] tracking-[0.25em] uppercase text-black/25 hidden md:block">Finding</span>
      </div>

      {/* Rows */}
      {evaluations.map((row) => (
        <div
          key={row.number}
          className="grid grid-cols-[28px_1fr_auto] md:grid-cols-[28px_1fr_140px_1fr] gap-x-6 py-4 border-b border-black/[0.06] items-start"
        >
          <span className="text-[10px] font-mono text-black/25 pt-[1px]">
            {row.number}
          </span>
          <p className="text-[11px] font-bold tracking-widest uppercase text-black/70 leading-snug">
            {row.heuristic}
          </p>
          <SeverityDots level={row.severity} />
          <p className="text-[10px] text-black/45 leading-relaxed hidden md:block">
            {row.finding}
          </p>
        </div>
      ))}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-5 mt-6 pt-5 border-t border-black/[0.06]">
        {[1, 2, 3, 4].map((level) => (
          <div key={level} className="flex items-center gap-2">
            <div className="flex gap-[3px]">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-[5px] h-[5px] ${i <= level ? "bg-black/60" : "bg-black/10"}`}
                />
              ))}
            </div>
            <span className="text-[9px] tracking-widest uppercase text-black/25">
              {severityLabels[level]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
