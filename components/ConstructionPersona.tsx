const painPoints = [
  "Forgets to clock out after long shifts — loses pay",
  "Hunts through emails to find pay stubs on tax day",
  "Called HR twice to fix time-entry errors last year",
]

const goals = [
  "Clock in and out in seconds, even wearing gloves",
  "Check earnings without calling anyone",
  "Know exactly when his next paycheck lands",
]

export default function ConstructionPersona() {
  return (
    <div className="w-full border border-black/10 bg-black/[0.02] p-6 md:p-10">
      <p className="text-[10px] tracking-[0.3em] uppercase text-black/25 mb-8">
        User Persona
      </p>

      {/* Identity row */}
      <div className="flex items-start gap-5 mb-8">
        <div className="flex-shrink-0 w-12 h-12 border border-black/15 flex items-center justify-center">
          <span className="text-xl font-bold text-black/30 leading-none">M</span>
        </div>
        <div>
          <p className="text-[13px] font-bold tracking-widest uppercase leading-none mb-1">
            Marcus T.
          </p>
          <p className="text-[10px] text-black/40 leading-relaxed">
            Site Foreman · Age 34 · Hourly
          </p>
          <p className="text-[10px] text-black/40 leading-relaxed">
            Rotates across 3–4 job sites per month
          </p>
        </div>
      </div>

      {/* Pull quote */}
      <div className="border-l-2 border-black/15 pl-4 mb-8">
        <p className="text-[11px] leading-relaxed text-black/60 italic">
          &ldquo;I just need to clock in and get to work. I don&rsquo;t have time to figure
          out the app every morning.&rdquo;
        </p>
      </div>

      {/* Pain points + Goals */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-black/25 mb-4">
            Pain Points
          </p>
          <ul className="space-y-3">
            {painPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[10px] font-mono text-black/20 flex-shrink-0 pt-[1px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[10px] text-black/50 leading-relaxed">{point}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-black/25 mb-4">
            Goals
          </p>
          <ul className="space-y-3">
            {goals.map((goal, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[10px] font-mono text-black/20 flex-shrink-0 pt-[1px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[10px] text-black/50 leading-relaxed">{goal}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
