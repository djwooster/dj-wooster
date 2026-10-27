import type { WorkItem } from "@/lib/work"
import Button from "@/components/ui/Button"
import { CircleArrow, StatusChip, TwoToneHeading } from "@/components/ui/primitives"
import Reveal from "@/components/home/Reveal"
import Pictogram from "@/components/motifs/Pictogram"
import DotField from "@/components/motifs/DotField"
import { cn } from "@/lib/utils"

// One project: highlights on one side, its visual on the other. Sides alternate.
export default function WorkFeature({ item, index }: { item: WorkItem; index: number }) {
  const flip = index % 2 === 1
  const hasUrl = item.url?.startsWith("http")

  return (
    <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
      <Reveal onScroll className={cn("flex flex-col gap-6 lg:col-span-5", flip && "lg:order-2")}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="label-mono text-ink-2">
            <span className="text-ink">{String(index + 1).padStart(2, "0")}</span> <span aria-hidden>·</span> {item.kind}
          </span>
          <StatusChip status={item.status} note={item.statusNote} />
        </div>
        <TwoToneHeading as="h3" lead={`${item.name}.`} rest={item.summary} size="sm" />
        <p className="text-16 text-ink-2">{item.problem}</p>
        <ul className="flex flex-col gap-3 border-t border-line pt-6">
          {item.built.map((line) => (
            <li key={line} className="flex items-start gap-3 text-14 text-ink">
              <CircleArrow dir="right" className="mt-0.5 shrink-0" />
              {line}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="label-mono text-ink-2">{item.platforms.join(" · ")}</span>
          {hasUrl && (
            <Button href={item.url!} variant="secondary" size="sm" arrow trackAs={`work-visit-${item.slug}`}>
              Visit {item.name}
            </Button>
          )}
        </div>
      </Reveal>

      <Reveal onScroll delay={0.08} className={cn("min-w-0 lg:col-span-7", flip && "lg:order-1")}>
        <WorkVisual item={item} index={index} />
      </Reveal>
    </article>
  )
}

// Placeholder visual while each project's animation is designed: the project's mark on a halftone field
function WorkVisual({ item, index }: { item: WorkItem; index: number }) {
  return (
    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-panel border border-line bg-surface">
      <div aria-hidden className="absolute inset-0 [mask-image:radial-gradient(closest-side,black,transparent)]">
        <DotField variant="halftone" cols={56} rows={42} gap={12} focus={[0.5, 0.5]} seed={index + 3} className="h-full w-full text-ink-3/60" />
      </div>
      <div className="relative flex flex-col items-center gap-5">
        <span className="flex size-36 items-center justify-center rounded-[32px] border border-line bg-bg">
          <Pictogram kind={item.pictogram} size={80} accent={false} />
        </span>
        <span className="label-mono text-ink">{item.name}</span>
      </div>
      <span className="label-mono absolute bottom-4 left-4 text-[11px] text-ink-2">[TODO: project visual]</span>
      <span className="label-mono absolute right-4 bottom-4 text-[11px] text-ink-2">{item.platforms.join(" · ")}</span>
    </div>
  )
}
