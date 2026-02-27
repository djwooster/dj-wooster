const branches = [
  {
    number: "03",
    label: "Clock In / Out",
    desc: "Select work site · Punch in or out · Confirm timestamp",
  },
  {
    number: "04",
    label: "Pay History",
    desc: "Browse pay periods · View earnings & deduction detail",
  },
  {
    number: "05",
    label: "Benefits",
    desc: "Review coverage · Check enrollment status & plan info",
  },
  {
    number: "06",
    label: "Documents",
    desc: "Download pay stubs · Access W-2s by tax year",
  },
]

export default function WorkforceFlowDiagram() {
  return (
    <div className="w-full border border-black/10 bg-black/[0.02] p-6 md:p-10">
      <p className="text-[10px] tracking-[0.3em] uppercase text-black/25 mb-8">
        Employee User Flow
      </p>

      {/* Entry: Login → Home Dashboard */}
      <div className="flex items-stretch gap-3 mb-10 max-w-sm">
        <div className="flex-1 border border-black/15 p-4">
          <span className="text-[10px] font-mono text-black/25 block mb-2">01</span>
          <p className="text-[11px] font-bold tracking-widest uppercase">Login</p>
          <p className="text-[10px] text-black/40 mt-1 leading-relaxed">
            SSO or credentials · Biometric unlock
          </p>
        </div>

        <div className="flex items-center text-black/20 text-sm px-1">→</div>

        <div className="flex-1 border border-black bg-black text-white p-4">
          <span className="text-[10px] font-mono text-white/25 block mb-2">02</span>
          <p className="text-[11px] font-bold tracking-widest uppercase">Home</p>
          <p className="text-[10px] text-white/40 mt-1 leading-relaxed">
            Pay summary · Next pay date · Quick actions
          </p>
        </div>
      </div>

      {/* Branching label */}
      <div className="flex items-center gap-4 mb-6">
        <p className="text-[10px] tracking-[0.2em] uppercase text-black/25 whitespace-nowrap">
          From Home
        </p>
        <div className="flex-1 h-px bg-black/10" />
      </div>

      {/* 4 task branches */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {branches.map((branch) => (
          <div key={branch.number} className="border border-black/15 p-4">
            <span className="text-[10px] font-mono text-black/25 block mb-2">
              {branch.number}
            </span>
            <p className="text-[11px] font-bold tracking-widest uppercase">
              {branch.label}
            </p>
            <p className="text-[10px] text-black/40 mt-1 leading-relaxed">
              {branch.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
