export interface ProjectAct {
  number: string;
  name: string;
  surface: string;
  outcome: string;
  decision: string;
  researchInsights?: string[];
  images?: string[];
}

export interface ProjectContext {
  role: string;
  timeline: string;
  team: string;
  scope: string;
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  client: string;
  tags: string[];
  tldr?: string;
  overview: string;
  challenge: string;
  process: string;
  outcome: string;
  thumbnail?: string;
  heroImage?: string;
  researchImage?: string;
  researchImageLabel?: string;
  prototypeGif?: string;
  processImage1?: string;
  processImage2?: string;
  finalImages?: string[];
  comingSoon?: boolean;
  acts?: ProjectAct[];
  systemsNote?: string;
  context?: ProjectContext;
  problem?: string;
}

export const projects: Project[] = [
  {
    slug: "inbound-health",
    title: "Hospital at Home",
    year: "2024",
    client: "Inbound Health",
    tags: [
      "User Research",
      "Mobile Design",
      "Interaction Design",
      "Design Systems",
      "Information Architecture",
      "Usability Testing",
    ],
    tldr: "Inbound Health needed a care coordination platform that worked for three radically different user groups: care liaisons, biometric nurses, and patients. As founding designer, I built the UX framework, design system, and shipped three product surfaces from scratch — reducing liaison triage time by 40% and maintaining patient satisfaction at 4/5 or better through the full care episode.",
    overview:
      "Founding Product Designer on a greenfield care coordination platform. Three user groups, three product surfaces — a Salesforce liaison app, a Salesforce nurse dashboard, and a custom iOS patient app — built from scratch with no prior design system or patterns to reference.",
    context: {
      role: "Founding Product Designer",
      timeline: "Feb 2023 – Jan 2026",
      team: "2 PMs · 1 eng lead · 3 frontend engineers",
      scope: "All three product surfaces · Design system · Research & testing",
    },
    problem:
      "Three user groups with completely different mental models, workflows, and technical literacy — and a greenfield platform with nothing built yet. Care liaisons were manually reviewing hundreds of ineligible patients with no way to filter or prioritize. Biometric nurses were rebuilding repetitive documentation from scratch each shift. Patients with little to no tech experience were being asked to manage their own clinical data. No design system, no established patterns, no prior designer.",
    challenge:
      "Hospital systems needed to expand capacity without compromising care quality. Patients managing recovery at home were anxious about unfamiliar technology, and the interface had to work correctly for the least tech-savvy user in the room, every time.",
    process:
      "I conducted 14 interviews across clinical staff and patients across four iterative phases — from early market validation through MVP. Each test round directly changed the design: bottom navigation was replaced after 3 of 4 users failed key tasks, and all 8 usability participants preferred a data table over charts for viewing biometric history.",
    outcome:
      "Forecasted to reduce unnecessary inpatient stays by 50 patients per month per hospital, saving $900K–$1.8M annually. Patient satisfaction held at 4/5 or better throughout the care episode. Engineering reported significantly fewer handoff gaps after the design system launched — sprint reviews shifted from design debates to acceptance criteria check-ins.",
    thumbnail: "/ipad-image-1.jpg",
    heroImage: "/inbound-project-mockup-new.png",
    acts: [
      {
        number: "01",
        name: "Liaison",
        surface: "Salesforce App · Care Liaison",
        outcome: "40% reduction in triage time.",
        decision:
          "I went field-level into Epic EMR data to identify which patient signals actually predicted program fit. That validation shaped both the AI/ML pre-filtering inputs — removing hard disqualifications before liaisons ever saw a list — and the UI's prioritization order, so liaisons worked highest-fit patients first.",
        researchInsights: [
          "EMR field validation revealed which patient signals actually predicted program fit — directly shaping the AI/ML filtering inputs and the triage UI hierarchy.",
          "Liaisons were spending most of their time on patients who would never qualify — the biggest UX gain was upstream filtering, not interface polish.",
          "Patient enrollment drop-off traced to distrust and unclear value, not clinical hesitation — which reframed the entire iOS onboarding design problem.",
        ],
        images: ["/research-1.png"],
      },
      {
        number: "02",
        name: "Biometric Nurse",
        surface: "Salesforce Dashboard · Biometric Nurse",
        outcome: "Less time on paperwork. More time on patients.",
        decision:
          "Salesforce is not a blank canvas — every interaction and layout had to work within its component system. I designed reusable care plan templates that reduced repetitive documentation within that constraint, shifting nurse time from logistics to care.",
      },
      {
        number: "03",
        name: "Patient",
        surface: "Custom iOS App · Patient",
        outcome: "Patient satisfaction held at 4/5 or better through the full care episode.",
        decision:
          "Eligible patients were declining to enroll — not from clinical hesitation, but because they didn't trust the product or understand its value. I redesigned onboarding around that trust gap, addressing the specific barriers causing drop-off before a single vital was ever submitted.",
        images: ["/video-visit-new.png", "/vitals-details-new2.png"],
      },
    ],
    systemsNote:
      "I built a design system from scratch across all three surfaces — two Salesforce apps with their own UI constraints, and a fully custom iOS app. Maintaining coherence across environments that different, with no prior system to reference, is the senior-level challenge worth naming.",
  },
  {
    slug: "workforce-mobile",
    title: "Workforce Mobile",
    year: "2026",
    client: "Enterprise HR Platform",
    tags: [
      "User Research",
      "iOS Design",
      "Interaction Design",
      "Design Systems",
      "Usability Testing",
      "Information Architecture",
    ],
    tldr: "A legacy workforce app carrying a 2.1-star rating was failing employees at every critical moment — payday, benefits enrollment, and clocking in. I led a ground-up redesign anchored in field research with hourly workers, salaried staff, and HR admins, consolidating 90+ screens into 34 focused views. Time-entry errors dropped 67%, benefits enrollment rose from 57% to 89%, and the App Store rating climbed from 2.1 to 4.6 stars within six months.",
    overview:
      "A ground-up redesign of a legacy iOS payroll and HR application used by thousands of hourly and salaried workers to manage timekeeping, pay, and benefits. The existing app hadn't been meaningfully updated in six years and was failing employees at the moments that mattered most — payday, benefits enrollment, and clocking in at job sites.",
    challenge:
      "The legacy app carried a 2.1-star App Store rating and a growing backlog of support tickets. Time-entry errors were costing the company an estimated $1.2M annually in payroll corrections. 43% of employees abandoned benefits enrollment mid-flow and completed it over the phone instead — a costly, avoidable workaround. The app's information architecture predated modern iOS conventions, making routine tasks like locating a pay stub feel unnecessarily difficult.",
    process:
      "I led three rounds of research with 18 employees spanning hourly field workers, salaried office staff, and HR administrators. A key early insight changed the entire clock-in flow: field workers were often checking in under real time pressure — standing outside in cold weather, wearing work gloves. The gesture had to work in two taps or fewer, with no login prompt. I mapped 8 core user journeys, consolidated 90+ screens into 34 clearly scoped views, and built a component library the engineering team could ship incrementally alongside the legacy system.",
    outcome:
      "Time-entry errors dropped 67% in the first quarter after launch. Benefits enrollment completion rose from 57% to 89%. The App Store rating climbed from 2.1 to 4.6 stars within six months of release. HR support call volume fell 34%, saving an estimated $800K annually in overhead.",
    thumbnail: "/workforce-thumbnail.jpg",
    prototypeGif: "/workforce-gif-2.gif",
  },
  {
    slug: "commerce-elevated",
    title: "Redesigned Clinical Systems",
    comingSoon: true,
    year: "2024",
    client: "Enterprise HR + Payroll Platform",
    tags: [
      "UX Strategy",
      "Information Architecture",
      "Visual Design",
      "A/B Testing",
    ],
    overview:
      "A luxury retail brand with world-class products was trapped in an outdated digital experience that failed to reflect the quality of what they sell. We redesigned the full purchase journey — from discovery through to post-purchase — to earn and sustain customer trust.",
    challenge:
      "Cart abandonment sat at 79%. The site had grown organically over eight years with no cohesive design language, resulting in contradictory UI patterns and broken trust signals at precisely the moments when customers needed confidence most.",
    process:
      "Starting with competitive benchmarking and 24 in-depth customer interviews, we rebuilt the information architecture from the ground up. A full visual identity audit informed a new design language — restrained, confident, and unmistakably premium — before a single pixel was placed.",
    outcome:
      "Conversion rate increased by 41%. Average order value grew 28%. Bounce rate on product pages dropped from 62% to 31%, and the brand now ranks in the top three in its category for digital experience benchmarks.",
  },
];
