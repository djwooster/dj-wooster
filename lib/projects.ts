export interface Project {
  slug: string
  title: string
  category: string
  year: string
  client: string
  tags: string[]
  overview: string
  challenge: string
  process: string
  outcome: string
}

export const projects: Project[] = [
  {
    slug: "banking-reimagined",
    title: "Banking Reimagined",
    category: "Mobile App · UX / UI",
    year: "2024",
    client: "FinTech Startup",
    tags: ["User Research", "Mobile Design", "Prototyping", "Design Systems"],
    overview:
      "A complete reimagining of the mobile banking experience — from onboarding to daily spend tracking. The challenge was making financial data feel approachable and even beautiful for a generation of users who expect their apps to feel as polished as consumer products.",
    challenge:
      "Users were abandoning the app during onboarding at a rate of 68%. Account visibility was buried three levels deep, and the visual hierarchy made it nearly impossible to understand financial health at a glance. Stakeholders had differing opinions on what the product should prioritise.",
    process:
      "We ran three rounds of moderated usability testing with 24 participants, mapped 12 distinct user journeys, and built a component library from scratch using an atomic design methodology. The redesign consolidated 140+ screens into 42 clearly structured views with consistent interaction patterns throughout.",
    outcome:
      "Onboarding drop-off reduced by 54%. Daily active usage increased 3.2×. The design system is now used across all three of the company's products, accelerating engineering delivery by an estimated 35%.",
  },
  {
    slug: "commerce-elevated",
    title: "Commerce Elevated",
    category: "E-commerce · UX Strategy",
    year: "2024",
    client: "Luxury Retail Brand",
    tags: ["UX Strategy", "Information Architecture", "Visual Design", "A/B Testing"],
    overview:
      "A luxury retail brand with world-class products was trapped in an outdated digital experience that failed to reflect the quality of what they sell. We redesigned the full purchase journey — from discovery through to post-purchase — to earn and sustain customer trust.",
    challenge:
      "Cart abandonment sat at 79%. The site had grown organically over eight years with no cohesive design language, resulting in contradictory UI patterns and broken trust signals at precisely the moments when customers needed confidence most.",
    process:
      "Starting with competitive benchmarking and 24 in-depth customer interviews, we rebuilt the information architecture from the ground up. A full visual identity audit informed a new design language — restrained, confident, and unmistakably premium — before a single pixel was placed.",
    outcome:
      "Conversion rate increased by 41%. Average order value grew 28%. Bounce rate on product pages dropped from 62% to 31%, and the brand now ranks in the top three in its category for digital experience benchmarks.",
  },
  {
    slug: "flow-dashboard",
    title: "Flow Dashboard",
    category: "SaaS Product · Design Systems",
    year: "2023",
    client: "B2B Analytics Platform",
    tags: ["Design Systems", "Data Visualisation", "Interaction Design", "Accessibility"],
    overview:
      "A B2B analytics platform serving enterprise clients needed a dashboard that could surface complex, multi-dimensional data in a way that non-technical stakeholders could act on immediately — without losing the depth that power users depended on.",
    challenge:
      "The existing dashboard required an average of 14 clicks to answer the most common user questions. Data was displayed as raw numbers with no contextual framing, no recommended actions, and no clear visual hierarchy to guide attention.",
    process:
      "We introduced progressive disclosure, a consistent data visualisation system built on a 12-column grid, and inline AI-generated summaries that contextualised key metrics. WCAG 2.1 AA compliance and comprehensive keyboard navigation were built in from day one.",
    outcome:
      "Time-to-insight dropped from an average of 8 minutes to 90 seconds. NPS score jumped from 24 to 61. The design system reduced engineering delivery time by 40% across all subsequent feature releases.",
  },
]
