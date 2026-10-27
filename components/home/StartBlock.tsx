import { priceNote, primaryCta, startHref } from "@/lib/site"
import Button from "@/components/ui/Button"
import { Crosshair, SectionLabel, TwoToneHeading } from "@/components/ui/primitives"
import DotField from "@/components/motifs/DotField"
import Reveal from "@/components/home/Reveal"

// Closing CTA: full-width inverse block. `from` records which page the inquiry started on.
export default function StartBlock({ from }: { from: string }) {
  return (
    <section id="start" className="inverse relative overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 [mask-image:linear-gradient(to_left,black,transparent)] md:block"
      >
        <DotField variant="halftone" cols={60} rows={50} gap={12} focus={[0.75, 0.5]} className="text-ink-3/80" />
      </div>
      <div className="relative mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 md:py-24 lg:py-32">
        <Crosshair className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 max-sm:left-4" />
        <Crosshair className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 max-sm:right-4" />
        <Reveal onScroll className="flex max-w-2xl flex-col gap-8">
          <SectionLabel dir="right">Start a project</SectionLabel>
          <TwoToneHeading lead="Have something in mind?" rest="Tell me about it. I'll reply within one business day." size="lg" />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button href={startHref(from)} size="lg" arrow trackAs={`start-block-${from}`}>
              {primaryCta.label}
            </Button>
            <span className="label-mono text-ink-2">{priceNote}</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
