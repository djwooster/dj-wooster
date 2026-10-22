const tasks = [
  {
    number: "03",
    label: "Check Vitals",
    desc: "Record & submit biometric readings to care team",
  },
  {
    number: "04",
    label: "Calendar",
    desc: "View upcoming visits & scheduled appointments",
  },
  {
    number: "05",
    label: "Virtual Visit",
    desc: "Join video call with doctor or nurse",
  },
  {
    number: "06",
    label: "Daily Survey",
    desc: "Complete daily health & symptom check-in",
  },
]

export default function UserFlowDiagram() {
  return (
    <div className="w-full border border-black/10 bg-black/[0.02] p-6 md:p-10">
      <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-black/50 mb-8">
        Patient User Flow
      </p>

      {/* Entry: Onboarding → Home Dashboard */}
      <div className="flex items-stretch gap-3 mb-10 max-w-sm">
        <div className="flex-1 border border-black/15 p-4">
          <span className="text-[10px] font-mono text-black/25 block mb-2">01</span>
          <p className="text-[11px] font-bold tracking-widest uppercase">Onboarding</p>
          <p className="text-[10px] text-black/40 mt-1 leading-relaxed">
            Welcome · Device pairing · Account setup
          </p>
        </div>

        <div className="flex items-center text-black/20 text-sm px-1">→</div>

        <div className="flex-1 border border-black bg-black text-white p-4">
          <span className="text-[10px] font-mono text-white/25 block mb-2">02</span>
          <p className="text-[11px] font-bold tracking-widest uppercase">Home</p>
          <p className="text-[10px] text-white/40 mt-1 leading-relaxed">
            Daily tasks & care episode overview
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
        {tasks.map((task) => (
          <div key={task.number} className="border border-black/15 p-4">
            <span className="text-[10px] font-mono text-black/25 block mb-2">
              {task.number}
            </span>
            <p className="text-[11px] font-bold tracking-widest uppercase">
              {task.label}
            </p>
            <p className="text-[10px] text-black/40 mt-1 leading-relaxed">
              {task.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
