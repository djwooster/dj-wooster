import type { Metadata } from "next"
import { products } from "@/lib/products"
import { courses } from "@/lib/courses"
import Button from "@/components/ui/Button"
import {
  Card,
  Container,
  Crosshair,
  Section,
  SectionLabel,
  Stat,
  StatusChip,
  TwoToneHeading,
} from "@/components/ui/primitives"
import ThemeToggle from "@/components/ThemeToggle"
import Pictogram from "@/components/motifs/Pictogram"
import DotField from "@/components/motifs/DotField"
import WireframeCube from "@/components/motifs/WireframeCube"
import NodeLines from "@/components/motifs/NodeLines"
import ProductCard from "@/components/ProductCard"
import PrinciplesGrid from "@/components/PrinciplesGrid"
import EmailCapture from "@/components/EmailCapture"
import CourseCard from "@/components/CourseCard"
import PostCard, { type PostSummary } from "@/components/PostCard"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
}

/* ─── Page helpers ───────────────────────────────────────────────────────── */

// Renders children twice: once forced light, once forced dark
function Specimen({
  name,
  note,
  children,
  stack,
  className,
}: {
  name: string
  note?: string
  children: React.ReactNode
  stack?: boolean
  className?: string
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="font-mono text-14 text-ink">{name}</h3>
        {note && <p className="text-14 text-ink-2">{note}</p>}
      </div>
      <div className={cn("grid gap-3", !stack && "lg:grid-cols-2")}>
        {(["light", "dark"] as const).map((mode) => (
          <div
            key={mode}
            data-theme={mode}
            className="relative overflow-hidden rounded-panel border border-line bg-bg text-ink"
          >
            <span className="label-mono absolute top-4 right-4 z-10 text-[11px] text-ink-2">{mode}</span>
            <div className={cn("p-6 pt-12 sm:p-8 sm:pt-12", className)}>{children}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Group({ number, label, title, rest, children }: {
  number: string
  label: string
  title: string
  rest: string
  children: React.ReactNode
}) {
  return (
    <Section id={label.toLowerCase()}>
      <div className="flex flex-col gap-6">
        <SectionLabel number={number}>{label}</SectionLabel>
        <TwoToneHeading lead={title} rest={rest} size="md" className="max-w-3xl" />
      </div>
      <div className="mt-14 flex flex-col gap-14">{children}</div>
    </Section>
  )
}

/* ─── Sample data ────────────────────────────────────────────────────────── */

const colorTokens = [
  { token: "--bg", light: "#F2F1EE", dark: "#000000", use: "Page background" },
  { token: "--surface", light: "#FAFAF8", dark: "#0B0B0B", use: "Cards, panels" },
  { token: "--surface-inverse", light: "#111111", dark: "#F2F1EE", use: "Alternating cards" },
  { token: "--ink", light: "#111111", dark: "#F2F1EE", use: "Primary text" },
  { token: "--ink-2", light: "#6B6A66", dark: "#8A8A86", use: "Secondary text, captions" },
  { token: "--ink-3", light: "#A3A29E", dark: "#55554F", use: "Marks and dot fields only" },
  { token: "--line", light: "#DCDAD5", dark: "#1F1F1D", use: "Hairlines, borders" },
  { token: "--accent", light: "#2E74AE", dark: "#2E74AE", use: "One accent moment" },
  { token: "--accent-text", light: "#2A6CA3", dark: "#5A9BD4", use: "Accent links" },
  { token: "--positive", light: "#13733A", dark: "#4ADE80", use: "Data only" },
  { token: "--negative", light: "#B42318", dark: "#F87171", use: "Data only" },
]

const typeScale = [
  { px: 96, cls: "text-96", sample: "Ship" },
  { px: 64, cls: "text-64", sample: "Software" },
  { px: 40, cls: "text-40", sample: "Built with intention" },
  { px: 28, cls: "text-28", sample: "Designed to solve real problems" },
  { px: 20, cls: "text-20", sample: "Card titles and lead paragraphs" },
  { px: 16, cls: "text-16", sample: "Body copy at 16px with a 1.6 line height for comfortable reading." },
  { px: 14, cls: "text-14", sample: "Secondary copy, descriptions and UI text." },
  { px: 12, cls: "text-12", sample: "Fine print and helper text." },
]

const principles = [
  { title: "[TODO: principle]", body: "[TODO: one-line explanation of the principle.]" },
  { title: "[TODO: principle]", body: "[TODO: one-line explanation of the principle.]" },
  { title: "[TODO: principle]", body: "[TODO: one-line explanation of the principle.]" },
]

const samplePost: PostSummary = {
  slug: "sample",
  title: "[TODO: post title]",
  description: "[TODO: one-sentence description of the post.]",
  date: "2026-10-22",
  readingTime: 6,
  category: "Shipping",
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function DesignPage() {
  return (
    <main>
      <Container className="relative py-16 md:py-24">
        <div className="flex flex-col gap-8">
          <SectionLabel number="00">Design system</SectionLabel>
          <TwoToneHeading
            as="h1"
            lead="Less, but better."
            rest="Tokens, motifs and components for djwooster.com."
            size="lg"
            className="max-w-4xl"
          />
          <div className="flex flex-wrap items-center gap-4">
            <ThemeToggle />
            <p className="text-14 text-ink-2">Every specimen renders in both modes. The toggle sets the page.</p>
          </div>
          <nav aria-label="Sections" className="flex flex-wrap gap-2">
            {["Color", "Type", "Shape", "Motifs", "Components"].map((s, i) => (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                className="label-mono flex h-7 items-center gap-2 rounded-full border border-line bg-surface px-3 text-ink-2 transition-colors hover:text-ink"
              >
                <span className="text-ink">0{i + 1}</span> {s}
              </a>
            ))}
          </nav>
        </div>
      </Container>

      {/* 01 · Color */}
      <Group number="01" label="Color" title="Grayscale first." rest="Color appears only when it means something.">
        <Specimen name="Palette" note="Swatches read live CSS variables" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {colorTokens.map((c) => (
            <div key={c.token} className="flex flex-col gap-2">
              <div
                className="h-16 rounded-inner border border-line"
                style={{ background: `var(${c.token})` }}
              />
              <span className="font-mono text-12 text-ink">{c.token}</span>
              <span className="text-12 text-ink-2">{c.use}</span>
            </div>
          ))}
        </Specimen>

        <div className="overflow-x-auto rounded-panel border border-line">
          <table className="w-full min-w-[560px] text-left text-14">
            <thead className="label-mono text-ink-2">
              <tr className="border-b border-line">
                <th className="px-4 py-3 font-normal">Token</th>
                <th className="px-4 py-3 font-normal">Light</th>
                <th className="px-4 py-3 font-normal">Dark</th>
                <th className="px-4 py-3 font-normal">Use</th>
              </tr>
            </thead>
            <tbody className="font-mono text-12 tabular-nums">
              {colorTokens.map((c) => (
                <tr key={c.token} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 text-ink">{c.token}</td>
                  <td className="px-4 py-3 text-ink-2">{c.light}</td>
                  <td className="px-4 py-3 text-ink-2">{c.dark}</td>
                  <td className="px-4 py-3 font-sans text-14 text-ink-2">{c.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Group>

      {/* 02 · Type */}
      <Group number="02" label="Type" title="Three faces, one voice." rest="Geist for reading, Geist Mono for data, Doto for rare moments.">
        <Specimen name="Display · Doto" note="Hero moments and big stats only" stack>
          <p className="font-display text-40 leading-none font-bold tracking-tight sm:text-64 lg:text-96">
            DESIGN. BUILD. SHIP.
          </p>
        </Specimen>

        <Specimen name="Two-tone headline" note="Ink phrase, gray continuation" stack>
          <TwoToneHeading lead="Software, built with intention." rest="Designed to solve real problems." size="lg" />
        </Specimen>

        <div className="flex flex-col">
          {typeScale.map((t) => (
            <div key={t.px} className="flex items-baseline gap-6 overflow-hidden border-b border-line py-4 first:border-t">
              <span className="label-mono w-12 shrink-0 text-ink-2">{t.px}</span>
              <span className={cn(t.cls, t.px >= 20 ? "headline" : "", "truncate text-ink")}>{t.sample}</span>
            </div>
          ))}
        </div>

        <Specimen name="Mono labels & numbers" note="12px, 0.12em tracking, tabular numerals">
          <div className="flex flex-col gap-5">
            <span className="label-mono text-ink-2">Small uppercase label</span>
            <span className="label-mono text-ink">NOI · Occupancy · Delinquency</span>
            <span className="font-mono text-28 text-ink tabular-nums">$1,284,330.00</span>
          </div>
        </Specimen>
      </Group>

      {/* 03 · Shape */}
      <Group number="03" label="Shape" title="Depth from lines, not shadows." rest="iOS-style corners, hairline borders, a visible grid.">
        <Specimen name="Radius" note="10 inner · 14 card · 16 panel · full pills" className="flex flex-wrap items-end gap-4">
          {[
            ["rounded-inner", "10"],
            ["rounded-card", "14"],
            ["rounded-panel", "16"],
          ].map(([cls, px]) => (
            <div key={cls} className="flex flex-col items-center gap-2">
              <div className={cn("size-20 border border-line bg-surface", cls)} />
              <span className="label-mono text-ink-2">{px}px</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-20 items-center">
              <span className="h-8 w-24 rounded-full border border-line bg-surface" />
            </div>
            <span className="label-mono text-ink-2">Pill</span>
          </div>
        </Specimen>

        <Specimen name="Grid marks" note="Hairlines with crosshairs at key intersections">
          <div className="relative grid h-40 grid-cols-3 border border-line">
            <div className="border-r border-line" />
            <div className="border-r border-line" />
            <div />
            {(["top-0", "bottom-0"] as const).flatMap((edge) =>
              [0, 1, 2, 3].map((i) => (
                <span key={`${edge}-${i}`} className={cn("absolute", edge)} style={{ left: `${(i / 3) * 100}%` }}>
                  <Crosshair className="absolute -translate-x-1/2 -translate-y-1/2" />
                </span>
              )),
            )}
          </div>
        </Specimen>
      </Group>

      {/* 04 · Motifs */}
      <Group number="04" label="Motifs" title="Geometry instead of stock imagery." rest="Every mark is built from circles, rectangles and lines.">
        <Specimen name="Product pictograms" note="One accent dot each · hover the dial" className="grid grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.slug} className="group flex flex-col items-center gap-4">
              <Pictogram kind={p.pictogram} size={88} title={p.name} />
              <span className="label-mono text-ink-2">{p.name}</span>
            </div>
          ))}
        </Specimen>

        <Specimen name="Node-line diagram" note="Draws in on scroll" stack>
          <NodeLines
            width={800}
            height={260}
            nodes={[
              { id: "dj", x: 400, y: 30, label: "DJ Wooster", labelSide: "right", accent: true },
              { id: "fm", x: 140, y: 220, label: "FocusMode", labelSide: "bottom" },
              { id: "re", x: 400, y: 220, label: "RE-IQ", labelSide: "bottom" },
              { id: "sq", x: 660, y: 220, label: "SourceIQ", labelSide: "bottom" },
            ]}
            edges={[
              { from: "dj", to: "fm" },
              { from: "dj", to: "re" },
              { from: "dj", to: "sq" },
            ]}
            className="mb-8"
          />
        </Specimen>

        <Specimen name="Dot fields" note="Halftone · cloud · grid" className="grid gap-3 sm:grid-cols-3">
          {(["halftone", "cloud", "grid"] as const).map((v) => (
            <div key={v} className="flex flex-col gap-2">
              <div className="aspect-[4/3] overflow-hidden rounded-inner border border-line">
                <DotField variant={v} cols={32} rows={24} gap={10} focus={[0.65, 0.4]} />
              </div>
              <span className="label-mono text-ink-2">{v}</span>
            </div>
          ))}
        </Specimen>

        <Specimen name="Wireframe geometry" note="Background art for dark sections" className="flex justify-center">
          <WireframeCube size={110} divisions={4} className="h-auto w-48" />
        </Specimen>
      </Group>

      {/* 05 · Components */}
      <Group number="05" label="Components" title="Restrained, precise, reusable." rest="Built once, used across every page.">
        <Specimen name="Button" note="Primary is the accent moment — one per viewport" className="flex flex-wrap items-center gap-3">
          <Button arrow>Join the waitlist</Button>
          <Button variant="solid">Solid</Button>
          <Button variant="secondary" arrow>
            See the products
          </Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm" variant="secondary">
            Small
          </Button>
        </Specimen>

        <Specimen name="SectionLabel · StatusChip" className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-3">
            <SectionLabel number="01">Products</SectionLabel>
            <SectionLabel dir="right">Read more</SectionLabel>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusChip status="live" />
            <StatusChip status="in-review" note="iOS" />
            <StatusChip status="beta" />
            <StatusChip status="waitlist" />
            <StatusChip status="soon" />
          </div>
        </Specimen>

        <Specimen name="Stat" note="Dot-matrix or sans numeral, mono caption" className="grid grid-cols-2 gap-6">
          <Stat value="3" caption="Products shipped" display />
          <Stat value="$495" caption="Course price" />
        </Specimen>

        <Specimen name="ThemeToggle" note="Spring knob · LIGHT / DARK">
          <ThemeToggle />
        </Specimen>

        <Specimen name="ProductCard" stack className="grid gap-3 md:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </Specimen>

        <Specimen name="PrinciplesGrid" note="Rams poster style" stack>
          <PrinciplesGrid items={principles} />
        </Specimen>

        <Specimen name="EmailCapture · inline" note="Submit to see the success state">
          <EmailCapture source="design-inline" tag="newsletter" />
        </Specimen>

        <Specimen name="EmailCapture · full" stack>
          <EmailCapture
            variant="full"
            source="design-full"
            tag="lead-checklist"
            headline="The App Store checklist."
            headlineRest="Everything Apple checks before approving your app."
            description="[TODO: one-line description of the checklist.]"
            cta="Send it"
            successTitle="It's on its way."
            successMessage="Check your inbox for the checklist."
          />
        </Specimen>

        <Specimen name="CourseCard" note="Default and inverse; CTA follows course config" className="grid gap-3 sm:grid-cols-2">
          <CourseCard course={courses[0]} inverse />
          <CourseCard course={courses[1]} />
        </Specimen>

        <Specimen name="Inverse card" note="Alternating black/light surface">
          <Card inverse className="flex flex-col gap-3 p-6">
            <span className="label-mono text-ink-2">Inverse</span>
            <p className="headline text-20">Tokens flip inside the block.</p>
          </Card>
        </Specimen>

        <Specimen name="PostCard" className="grid gap-3">
          <PostCard post={samplePost} />
        </Specimen>
      </Group>
    </main>
  )
}
