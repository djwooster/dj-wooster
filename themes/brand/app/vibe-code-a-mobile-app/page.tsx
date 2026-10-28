import type { Metadata } from "next"
import { getCourse } from "@/lib/courses"
import { Container, Crosshair, CircleArrow, Section, SectionLabel, TwoToneHeading } from "@/components/ui/primitives"
import SectionIntro from "@/components/home/SectionIntro"
import Reveal from "@/components/home/Reveal"
import VideoPlayer from "@/components/VideoPlayer"
import CourseCta from "@/components/landing/CourseCta"
import NotesCard from "@/components/landing/NotesCard"
import BuildLive from "@/components/landing/BuildLive"
import LaunchMoment from "@/components/landing/LaunchMoment"
import LiveCall from "@/components/landing/LiveCall"
import { IsoBuild, IsoDesign, IsoIdea, IsoShip } from "@/components/landing/IsoSteps"
import DotField from "@/components/motifs/DotField"
import Pictogram from "@/components/motifs/Pictogram"

// Ad landing page for Ship Your App with Claude Code. Unlisted: noindex, out of the nav and sitemap.
export const metadata: Metadata = {
  title: "Vibe code a real iPhone app",
  description:
    "A self-paced course with live calls three times a week. Build your iPhone app with Claude Code and get it into the App Store.",
  robots: { index: false, follow: false },
}

const course = getCourse("ship-your-app")!
const SOURCE = "lp-vibe"
const calls = course.format?.liveCalls ?? "3× a week"

const tried = [
  {
    title: "You watched the tutorials",
    body: "They end at a to-do list. Your idea has accounts, payments and real people using it.",
  },
  {
    title: "You priced a developer",
    body: "Five figures and months of meetings, for an idea nobody has tried yet.",
  },
  {
    title: "You asked AI to build it",
    body: "It got you most of the way, then broke in ways you couldn't see, let alone fix.",
  },
]

// Draft lessons, grouped by stage, built from the FocusMode launch path
const path = [
  { stage: "Idea", Art: IsoIdea, lessons: ["Find the version 1 worth building", "Turn the idea into screens and a plan"] },
  { stage: "Design", Art: IsoDesign, lessons: ["Screens that feel native to iPhone", "Explore layouts fast with Claude"] },
  {
    stage: "Build",
    Art: IsoBuild,
    lessons: [
      "Set up Claude Code, Expo and the simulator",
      "Steer Claude Code like a senior engineer",
      "Accounts, data and the feature that makes it yours",
      "Subscriptions and in-app purchases",
    ],
  },
  { stage: "Ship", Art: IsoShip, lessons: ["TestFlight on your own phone", "Listing, screenshots and privacy answers", "Submit, pass review, launch"] },
]

const callFormats = [
  { title: "Q&A", body: "Bring any question, at any stage. Nothing is too basic." },
  { title: "App reviews", body: "Share your screen and get unstuck live, with everyone learning from it." },
  { title: "Live builds", body: "Watch me build real features start to finish, mistakes included." },
  { title: "Every call recorded", body: "Missed one? It's in the course the same day." },
]

const included = [
  "The full self-paced course, start to App Store",
  `Live calls with me, ${calls}`,
  "A private community of people shipping their apps",
  "Prompts, checklists and the App Store submission playbook",
  "[TODO: confirm what's included, and access length]",
]

const forYou = [
  "You have an app idea you keep coming back to",
  "You've never written code, or you've only dabbled",
  "You'd rather learn at your own pace, with help when you're stuck",
  "You want it live in the App Store, not just on your laptop",
]

const notForYou = [
  "You want an app built for you while you watch",
  "You're after a get-rich-quick app scheme",
  "You need Android first (this course is iPhone)",
]

const faq = [
  {
    q: "Do I need to know how to code?",
    a: "No. Claude Code writes the code. You learn to describe what you want, read what comes back, and fix it when it breaks. That's the skill, and it's what the course teaches.",
  },
  {
    q: "It's self-paced. What if I get stuck?",
    a: `Bring it to a live call. I'm on ${calls}, and helping you get unstuck is the whole point of them. The community is there in between.`,
  },
  {
    q: "Do I need a Mac?",
    a: "[TODO: Mac requirement, and when an Apple Developer account ($99/year) is needed]",
  },
  {
    q: "How much time does it take?",
    a: "[TODO: typical hours per week, and how long most people take to ship]",
  },
  {
    q: "Is there a payment plan?",
    a: "[TODO: payment plan details]",
  },
  {
    q: "Is there a refund?",
    a: "[TODO: refund policy]",
  },
]

export default function VibeCodeLanding() {
  return (
    <main>
      {/* Hero: promise, CTA, then the video */}
      <section className="relative overflow-hidden">
        <Container className="relative pt-14 pb-16 md:pt-24 md:pb-24">
          <Crosshair className="absolute top-8 left-0 -translate-x-1/2 max-sm:left-4" />
          <Crosshair className="absolute top-8 right-0 translate-x-1/2 max-sm:right-4" />

          <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
            <Reveal className="flex flex-wrap items-center justify-center gap-2">
              <span className="label-mono inline-flex h-6 items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 text-[11px] text-ink-2">
                <span className="size-1.5 rounded-full bg-positive" />
                Self-paced · Start today
              </span>
              <span className="label-mono inline-flex h-6 items-center rounded-full border border-line bg-surface px-2.5 text-[11px] text-ink-2">
                Live calls with DJ {calls}
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="headline text-40 text-ink md:text-[3rem] md:leading-[1.05]">
                Vibe code a real iPhone app.
                <span className="block text-ink-2">Then get it into the App Store.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="max-w-xl text-16 text-ink-2 md:text-20">
                A course for people with an app idea and no engineering team. Build it with Claude Code at your own
                pace, with me on a live call {calls} whenever you get stuck.
              </p>
            </Reveal>
            <Reveal delay={0.18} className="w-full">
              <CourseCta course={course} source={`${SOURCE}:hero`} align="center" />
            </Reveal>
          </div>

          <Reveal delay={0.26} className="mx-auto mt-14 max-w-[1000px] md:mt-20">
            <VideoPlayer src="[TODO: hero video URL]" title="Watch: what you'll build" trackAs={`${SOURCE}:video`} />
          </Reveal>

          <div className="mx-auto mt-6 grid max-w-[1000px] grid-cols-3 gap-px overflow-hidden rounded-card border border-line bg-line">
            {[
              { value: "Today", label: "Start anytime" },
              { value: calls, label: "Live calls with DJ" },
              { value: "1 app", label: "Yours, live" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1.5 bg-bg px-4 py-4 text-center md:py-5">
                <span className="headline text-16 text-ink md:text-20">{s.value}</span>
                <span className="label-mono text-[11px] text-ink-2">{s.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 01 · Vibe coding, shown */}
      <Section id="build">
        <SectionIntro
          number="01"
          label="Vibe coding"
          lead="Describe it. Watch it build."
          rest="Plain English in, a working iPhone app out. This is what you'll be doing by the end of week one."
        />
        <Reveal onScroll>
          <BuildLive />
        </Reveal>
      </Section>

      {/* 02 · The idea that's been waiting */}
      <Section id="idea">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <SectionIntro
              number="02"
              label="The idea"
              lead="It's been in your notes app for years."
              rest="You don't need a better idea. You need a way to finish this one."
              className="mb-0 md:mb-0"
            />
            <Reveal onScroll>
              <p className="max-w-lg text-16 text-ink-2">
                Every few months you open the note, add a line, and close it again. Not because the idea is bad, but
                because there&apos;s never been a path from the note to the App Store that didn&apos;t need a
                developer, an agency, or a year.
              </p>
            </Reveal>
          </div>
          <Reveal onScroll delay={0.08} className="lg:col-span-6">
            <NotesCard />
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-panel border border-line bg-line md:mt-24 md:grid-cols-3">
          {tried.map((t, i) => (
            <Reveal as="li" key={t.title} onScroll delay={i * 0.06} className="flex flex-col gap-3 bg-bg p-6 md:p-8">
              <span className="font-mono text-12 text-ink-2">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="headline text-20 text-ink">{t.title}</h3>
              <p className="text-14 text-ink-2">{t.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 03 · The moment: Apple says yes, someone taps Get */}
      <section id="moment" className="inverse relative overflow-hidden border-t border-line">
        <div aria-hidden className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(closest-side,black,transparent)]">
          <DotField variant="halftone" cols={100} rows={70} gap={12} focus={[0.6, 0.55]} className="h-full w-full text-ink-3/70" />
        </div>
        <Container className="relative py-16 md:py-24 lg:py-32">
          <Reveal onScroll className="mb-12 flex max-w-2xl flex-col gap-6 md:mb-16">
            <SectionLabel number="03">The moment</SectionLabel>
            <TwoToneHeading lead="Picture the email from Apple." rest="Then someone you've never met taps Get." size="lg" />
            <p className="max-w-lg text-16 text-ink-2">
              Ready for Distribution. Your app, live, with your name under it. Everything in the course points at this.
            </p>
          </Reveal>
          <Reveal onScroll delay={0.08}>
            <LaunchMoment />
          </Reveal>
        </Container>
      </section>

      {/* 04 · The path, as a staircase */}
      <Section id="path">
        <SectionIntro
          number="04"
          label="The path"
          lead="Four steps, at your pace."
          rest="Start tonight. Every lesson ends with something working on your phone."
        />
        <ol className="grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {path.map((p, i) => (
            <Reveal as="li" key={p.stage} onScroll delay={i * 0.08} className="flex flex-col gap-6 bg-bg p-6">
              <div className="flex h-48 items-end justify-center">
                <p.Art />
              </div>
              <span className="w-fit rounded-[6px] bg-surface px-2 py-1 font-mono text-12 text-ink-2 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="headline -mt-3 text-20 text-ink md:text-28">{p.stage}</h3>
              <ul className="flex flex-col gap-2.5 border-t border-line pt-5">
                {p.lessons.map((l) => (
                  <li key={l} className="flex items-start gap-2.5 text-14 text-ink">
                    <CircleArrow dir="right" className="mt-0.5 shrink-0" />
                    {l}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
        <p className="label-mono mt-4 text-[11px] text-ink-2">[TODO: confirm lessons]</p>
      </Section>

      {/* 05 · Live calls */}
      <Section id="calls">
        <SectionIntro
          number="05"
          label="Live calls"
          lead="You won't be stuck on your own."
          rest={`Self-paced doesn't mean alone. I'm live with members ${calls}, and I'll do whatever it takes to get your app shipped.`}
        />
        <Reveal onScroll>
          <LiveCall />
        </Reveal>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {callFormats.map((c, i) => (
            <Reveal as="li" key={c.title} onScroll delay={i * 0.06} className="flex flex-col gap-2 bg-bg p-6">
              <h3 className="headline text-20 text-ink">{c.title}</h3>
              <p className="text-14 text-ink-2">{c.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 06 · Who's teaching */}
      <Section id="proof">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal onScroll className="order-2 lg:order-1 lg:col-span-5">
            <div className="relative flex aspect-[4/5] flex-col items-center justify-center gap-6 overflow-hidden rounded-panel border border-line bg-surface">
              <div aria-hidden className="absolute inset-0 [mask-image:radial-gradient(closest-side,black,transparent)]">
                <DotField variant="halftone" cols={40} rows={50} gap={12} focus={[0.5, 0.45]} seed={5} className="h-full w-full text-ink-3/60" />
              </div>
              <span className="relative flex size-32 items-center justify-center rounded-[30px] border border-line bg-bg">
                <Pictogram kind="focusmode" size={76} accent={false} />
              </span>
              <span className="label-mono relative text-ink">FocusMode for iPhone</span>
              <span className="label-mono absolute bottom-4 left-4 text-[11px] text-ink-2">[TODO: portrait or App Store screenshot]</span>
            </div>
          </Reveal>
          <div className="order-1 flex flex-col gap-6 lg:order-2 lg:col-span-7">
            <SectionIntro
              number="06"
              label="Your teacher"
              lead="I'm DJ. I design and build with AI every day."
              rest="And I just took my own app from idea to App Store review."
              className="mb-0 md:mb-0"
            />
            <Reveal onScroll className="flex flex-col gap-6">
              <p className="max-w-xl text-16 text-ink-2">
                I&apos;m a product designer who has worked for multi-billion-dollar organizations
                [TODO: company names], and I use AI and Claude Code every day in that work. FocusMode is my own iPhone
                app: a focus timer with a Live Activity on the Lock Screen, voice-first notes and Pro subscriptions. I
                built it with Claude Code, and I&apos;ll show you every step, including the parts that went wrong, so
                you can skip them.
              </p>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
                {[
                  { k: "Day job", v: "Product designer" },
                  { k: "FocusMode", v: "Submitted Oct 22, 2026" },
                  { k: "Built with", v: "Claude Code" },
                ].map((s) => (
                  <div key={s.k} className="flex flex-col gap-1.5 bg-bg p-4">
                    <dt className="label-mono text-[11px] text-ink-2">{s.k}</dt>
                    <dd className="text-14 text-ink">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 07 · Who it's for */}
      <Section id="fit">
        <SectionIntro number="07" label="Fit" lead="Who it's for." rest="And who it isn't." />
        <div className="grid gap-3 md:grid-cols-2">
          <Reveal onScroll className="rounded-panel border border-line bg-surface p-6 md:p-8">
            <span className="label-mono text-ink">For you if</span>
            <ul className="mt-6 flex flex-col gap-4">
              {forYou.map((item) => (
                <li key={item} className="flex items-start gap-3 text-16 text-ink">
                  <CircleArrow dir="right" className="mt-1 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal onScroll delay={0.06} className="rounded-panel border border-line p-6 md:p-8">
            <span className="label-mono text-ink-2">Not for you if</span>
            <ul className="mt-6 flex flex-col gap-4">
              {notForYou.map((item) => (
                <li key={item} className="flex items-start gap-3 text-16 text-ink-2">
                  <span aria-hidden className="mt-[11px] h-px w-4 shrink-0 bg-ink-2" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 08 · The offer */}
      <Section id="join">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <SectionIntro
              number="08"
              label="Join"
              lead={course.title}
              rest="Everything you need to go from the note to the App Store."
              className="mb-0 md:mb-0"
            />
            <Reveal onScroll className="hidden justify-center lg:flex">
              <IsoShip className="max-w-[280px]" />
            </Reveal>
          </div>
          <Reveal onScroll className="lg:col-span-7">
            <div className="rounded-panel border border-ink bg-surface p-6 shadow-[0_32px_64px_-40px_rgba(0,0,0,0.35)] md:p-10">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
                <div className="flex items-baseline gap-3">
                  <span className="headline text-64 leading-none text-ink tabular-nums">${course.earlyBird?.price ?? course.price}</span>
                  {course.earlyBird && (
                    <span className="headline text-28 text-ink-2 line-through decoration-1 tabular-nums">${course.price}</span>
                  )}
                </div>
                {course.earlyBird && (
                  <span className="label-mono text-right text-[11px] text-ink-2">
                    Early-bird price
                    <br />
                    Until {course.earlyBird.until}
                  </span>
                )}
              </div>
              <ul className="flex flex-col gap-3 py-6">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-16 text-ink">
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="mt-1 size-4 shrink-0">
                      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <CourseCta course={course} source={`${SOURCE}:offer`} />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 09 · FAQ */}
      <Section id="faq">
        <SectionIntro number="09" label="FAQ" lead="Questions." rest="The ones people ask before they join." />
        <div className="flex flex-col border-t border-line">
          {faq.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-16 text-ink md:text-20 [&::-webkit-details-marker]:hidden">
                {item.q}
                <span aria-hidden className="relative size-4 shrink-0">
                  <span className="absolute top-1/2 left-0 h-px w-4 bg-ink" />
                  <span className="absolute top-0 left-1/2 h-4 w-px bg-ink transition-transform duration-200 ease-out-soft group-open:rotate-90" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-16 text-ink-2">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Closing */}
      <section className="inverse relative overflow-hidden border-t border-line">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 [mask-image:linear-gradient(to_left,black,transparent)] md:block">
          <DotField variant="halftone" cols={60} rows={50} gap={12} focus={[0.75, 0.5]} className="text-ink-3/80" />
        </div>
        <Container className="relative py-16 md:py-24 lg:py-32">
          <Reveal onScroll className="flex max-w-2xl flex-col gap-8">
            <TwoToneHeading lead="A few weeks from now, it could be in review." rest="Or it could still be in your notes app." size="lg" />
            <CourseCta course={course} source={`${SOURCE}:closing`} />
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
