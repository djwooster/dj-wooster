import { work } from "@/lib/work"
import { priceNote, startHref } from "@/lib/site"
import Hero from "@/components/home/Hero"
import WorkFeature from "@/components/home/WorkFeature"
import SectionIntro from "@/components/home/SectionIntro"
import StartBlock from "@/components/home/StartBlock"
import Connected from "@/components/home/Connected"
import { IsoPhone, IsoWebApp, IsoWebsite } from "@/components/motifs/Isometric"
import Reveal from "@/components/home/Reveal"
import Button from "@/components/ui/Button"
import { CircleArrow, Section, TwoToneHeading } from "@/components/ui/primitives"

const services = [
  {
    Art: IsoWebsite,
    title: "Websites",
    body: "Sites that load fast, rank, and turn visitors into inquiries, bookings and sales.",
    examples: ["Marketing and portfolio sites", "Booking and inquiry flows", "Search, analytics and structured data built in"],
  },
  {
    Art: IsoWebApp,
    title: "Web apps",
    body: "Dashboards, portals and internal tools built around how your team actually works.",
    examples: ["Client and customer portals", "Reporting dashboards", "Internal tools that replace spreadsheets"],
  },
  {
    Art: IsoPhone,
    title: "iOS apps",
    body: "iPhone apps built in React Native and taken all the way through App Store review.",
    examples: ["Subscriptions and in-app purchase", "Notifications and Live Activities", "App Store listing and submission"],
  },
]

// Timelines are placeholders until DJ confirms them
const process = [
  { title: "Call", time: "[TODO: 30 min]", body: "We talk through the business, the problem and what a win looks like. No charge." },
  { title: "Scope", time: "[TODO: 1 week]", body: "You get a written plan with screens, a fixed price and a launch date." },
  { title: "Build", time: "[TODO: 3–8 weeks]", body: "You see working software every week, not a status report." },
  { title: "Launch", time: "[TODO: launch week]", body: "It goes live, you get the keys, and I stay on to fix what comes up." },
]

const reasons = [
  {
    title: "Design and engineering in one head",
    body: "The person who designs a screen also builds it, so nothing gets lost in a handoff.",
  },
  {
    title: "You talk to the person building it",
    body: "No account managers. Every call and every message is with me.",
  },
  {
    title: "Owner-level thinking",
    body: "I run my own products, so I build for revenue and real users, not for a portfolio.",
  },
  {
    title: "Fast without cutting corners",
    body: "Modern tools make me fast. Experience decides what not to build.",
  },
]

export default function Home() {
  return (
    <main>
      <Hero />

      {/* 01 · Selected work: one section per project */}
      <Section id="work">
        <SectionIntro number="01" label="Work" lead="Selected work." rest="Live products and client builds, each one designed and built end to end." />
        <div className="flex flex-col gap-28 md:gap-40 lg:gap-48">
          {work.map((item, i) => (
            <WorkFeature key={item.slug} item={item} index={i} />
          ))}
        </div>
        <Reveal onScroll className="mt-20 flex flex-col gap-5 rounded-panel border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between md:mt-28 md:p-8">
          <TwoToneHeading as="p" lead="Need something like this?" rest="Websites, web apps and iOS apps." size="sm" />
          <div className="flex shrink-0 flex-wrap items-center gap-4">
            <span className="label-mono text-ink-2">{priceNote}</span>
            <Button href={startHref("home-work")} variant="solid" arrow trackAs="work-start">
              Start a project
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* 02 · What I build */}
      <Section id="services">
        <SectionIntro number="02" label="Services" lead="What I build." rest="Find your project in one of three." />
        <div className="grid gap-px overflow-hidden rounded-panel border border-line bg-line md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} onScroll delay={i * 0.06} className="flex flex-col gap-8 bg-bg p-6 md:p-8">
              <div className="flex h-44 items-center justify-center">
                <s.Art />
              </div>
              <span className="w-fit rounded-[6px] bg-surface px-2 py-1 font-mono text-12 text-ink-2 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="-mt-4 flex flex-col gap-3">
                <h3 className="headline text-20 text-ink md:text-28">{s.title}</h3>
                <p className="text-16 text-ink-2">{s.body}</p>
              </div>
              <ul className="mt-auto flex flex-col gap-2.5 border-t border-line pt-6">
                {s.examples.map((e) => (
                  <li key={e} className="flex items-start gap-2.5 text-14 text-ink">
                    <CircleArrow dir="right" className="mt-0.5 shrink-0" />
                    {e}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 03 · What the pieces add up to */}
      <Section id="results">
        <SectionIntro
          number="03"
          label="Results"
          lead="Everything connected."
          rest="Payments, bookings, email and AI, wired into one product and pointed at results."
        />
        <Reveal onScroll>
          <Connected />
        </Reveal>
      </Section>

      {/* 04 · How it works */}
      <Section id="process">
        <SectionIntro
          number="04"
          label="Process"
          lead="How it works."
          rest="I design and build with modern AI tools, so you get fully custom work in weeks instead of months, without cutting corners."
        />
        <ol className="grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <Reveal as="li" key={step.title} onScroll delay={i * 0.06} className="flex flex-col gap-10 bg-bg p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-28 leading-none text-ink tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="label-mono text-[11px] text-ink-2">{step.time}</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="headline text-20 text-ink">{step.title}</h3>
                <p className="text-14 text-ink-2">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* 05 · Why one person */}
      <Section id="about">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <SectionIntro
              number="05"
              label="About"
              lead="One person, start to finish."
              rest="Why not an agency."
              className="mb-0 md:mb-0"
            />
            {/* Strangers from ads need a face: portrait goes here */}
            <div className="flex aspect-[4/3] items-end rounded-panel border border-line bg-surface p-5">
              <div className="flex flex-col gap-1">
                <span className="text-14 font-medium text-ink">DJ Wooster</span>
                <span className="label-mono text-[11px] text-ink-2">[TODO: portrait] · Designer and developer</span>
              </div>
            </div>
            <p className="text-14 text-ink-2">[TODO: one-line bio: years of experience, where, who for]</p>
          </div>
          <ul className="grid gap-px self-start overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} onScroll delay={i * 0.06} className="flex flex-col gap-3 bg-bg p-6 md:min-h-56">
                <span className="font-mono text-12 text-ink-2 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div className="mt-auto flex flex-col gap-2">
                  <h3 className="headline text-20 text-ink">{r.title}</h3>
                  <p className="text-14 text-ink-2">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <StartBlock from="home-closing" />
    </main>
  )
}
