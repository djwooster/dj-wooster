import type { Metadata } from "next"
import { Suspense } from "react"
import { priceNote, site } from "@/lib/site"
import StartForm from "@/components/StartForm"
import { Container, Crosshair, SectionLabel } from "@/components/ui/primitives"
import Reveal from "@/components/home/Reveal"

export const metadata: Metadata = {
  title: "Start a project",
  description: "Tell me about your website, web app or iOS app. I reply within one business day. Projects from $15K.",
}

const next = [
  { title: "I read it and reply", body: "Within one business day, with a link to book a call." },
  { title: "We talk it through", body: "A short call about the business, the problem and what a win looks like." },
  { title: "You get a plan", body: "Screens, a fixed price and a launch date, in writing." },
]

export default function StartPage() {
  return (
    <main>
      <Container className="relative pt-14 pb-16 md:pt-24 md:pb-28">
        <Crosshair className="absolute top-8 left-0 -translate-x-1/2 max-sm:left-4" />
        <Crosshair className="absolute top-8 right-0 translate-x-1/2 max-sm:right-4" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="flex flex-col gap-8 lg:col-span-5">
            <SectionLabel dir="right">Start a project</SectionLabel>
            <h1 className="headline text-40 text-ink md:text-[3rem] md:leading-[1.05]">
              Tell me what you need.
              <span className="block text-ink-2">I&apos;ll take it from there.</span>
            </h1>
            <span className="label-mono text-ink-2">{priceNote}</span>

            <ol className="flex flex-col border-t border-line">
              {next.map((step, i) => (
                <li key={step.title} className="flex gap-4 border-b border-line py-5">
                  <span className="font-mono text-14 text-ink tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-16 font-medium text-ink">{step.title}</span>
                    <span className="text-14 text-ink-2">{step.body}</span>
                  </div>
                </li>
              ))}
            </ol>

            <p className="text-14 text-ink-2">
              Rather email?{" "}
              <a href={`mailto:${site.email}`} className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                {site.email}
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="rounded-panel border border-line bg-bg p-5 sm:p-8">
              <Suspense>
                <StartForm />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </Container>
    </main>
  )
}
