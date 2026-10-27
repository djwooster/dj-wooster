import { priceNote, primaryCta, startHref } from "@/lib/site"
import Button from "@/components/ui/Button"
import { Container, Crosshair, DisplayText } from "@/components/ui/primitives"
import DotField from "@/components/motifs/DotField"
import HeroReel from "@/components/home/HeroReel"
import Reveal from "@/components/home/Reveal"

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Section art behind the build: halftone in light, nothing in dark so the frame stays crisp */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-full max-w-[760px] [mask-image:radial-gradient(closest-side,black,transparent)] dark:hidden"
      >
        <DotField variant="halftone" cols={64} rows={56} gap={12} focus={[0.62, 0.4]} ripple className="text-ink-3/50" />
      </div>

      <Container className="relative pt-14 pb-14 md:pt-24 md:pb-20">
        <Crosshair className="absolute top-8 left-0 -translate-x-1/2 max-sm:left-4" />
        <Crosshair className="absolute top-8 right-0 translate-x-1/2 max-sm:right-4" />

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="flex flex-col gap-7">
            <Reveal>
              <p className="text-20 leading-none tracking-tight text-ink sm:text-28">
                <DisplayText text="DESIGN. BUILD. SHIP." />
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="headline text-40 text-ink md:text-[3rem] md:leading-[1.05]">
                Built for your business.
                <span className="block text-ink-2">Shipped in weeks.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="max-w-md text-16 text-ink-2 md:text-20">
                Custom websites and apps, designed and engineered end to end, without the agency timeline.
              </p>
            </Reveal>
            <Reveal delay={0.18} className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button href={startHref("home-hero")} size="lg" arrow trackAs="hero-start">
                  {primaryCta.label}
                </Button>
                <Button href="/#work" variant="secondary" size="lg" trackAs="hero-work">
                  See the work
                </Button>
              </div>
              <span className="label-mono text-ink-2">{priceNote}</span>
            </Reveal>
          </div>

          <Reveal delay={0.24}>
            <HeroReel />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
