import Button from "@/components/ui/Button"
import { Container, SectionLabel } from "@/components/ui/primitives"

// Placeholder until step 4 (home page)
export default function Home() {
  return (
    <main>
      <Container className="flex min-h-[60vh] flex-col items-start justify-center gap-8 py-24">
        <SectionLabel number="P.01">Home · in progress</SectionLabel>
        <p className="font-display text-40 leading-none font-bold sm:text-64 lg:text-96">DESIGN. BUILD. SHIP.</p>
        <Button href="/design" variant="secondary" arrow>
          View the design system
        </Button>
      </Container>
    </main>
  )
}
