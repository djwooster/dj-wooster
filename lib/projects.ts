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
    slug: "inbound-health",
    title: "Patient iPad Experience",
    category: "Mobile App · UX Research",
    year: "2024",
    client: "Inbound Health",
    tags: ["User Research", "Mobile Design", "Interaction Design", "Design Systems"],
    overview:
      "A hospital-at-home platform empowering patients to track biometric readings and stay connected to their care team through recovery. Designed for users with little to no prior tech experience — simple enough to use under stress, without any in-person guidance.",
    challenge:
      "Hospital systems needed to expand capacity without compromising care quality. Patients managing recovery at home were anxious about unfamiliar technology, and the interface had to work correctly for the least tech-savvy user in the room, every time.",
    process:
      "I conducted 14 interviews across clinical staff and patients across four iterative phases — from early market validation through MVP. Each test round directly changed the design: bottom navigation was replaced after 3 of 4 users failed key tasks, and all 8 usability participants preferred a data table over charts for viewing biometric history.",
    outcome:
      "Forecasted to reduce unnecessary inpatient stays by 50 patients per month per hospital, saving $900K–$1.8M annually. Patient satisfaction maintained at 4/5 or better through continuous biometric tracking and streamlined clinician workflows.",
  },
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
]
