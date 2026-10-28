import { SectionLabel, TwoToneHeading } from "@/components/ui/primitives"
import Reveal from "@/components/home/Reveal"
import { cn } from "@/lib/utils"

// Numbered label + two-tone heading, with an optional link on the right
export default function SectionIntro({
  number,
  label,
  lead,
  rest,
  aside,
  className,
}: {
  number: string
  label: string
  lead: string
  rest?: string
  aside?: React.ReactNode
  className?: string
}) {
  return (
    <Reveal onScroll className={cn("mb-12 flex flex-col gap-6 md:mb-16", className)}>
      <SectionLabel number={number}>{label}</SectionLabel>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <TwoToneHeading lead={lead} rest={rest} size="md" className="max-w-3xl" />
        {aside}
      </div>
    </Reveal>
  )
}
