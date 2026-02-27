export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  tags: string[];
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
}

export const projects: Project[] = [
  {
    slug: "inbound-health",
    title: "Patient iPad Experience",
    category: "Mobile App · UX Research",
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
    overview:
      "A hospital-at-home platform empowering patients to track biometric readings and stay connected to their care team through recovery. Designed for users with little to no prior tech experience — simple enough to use under stress, without any in-person guidance.",
    challenge:
      "Hospital systems needed to expand capacity without compromising care quality. Patients managing recovery at home were anxious about unfamiliar technology, and the interface had to work correctly for the least tech-savvy user in the room, every time.",
    process:
      "I conducted 14 interviews across clinical staff and patients across four iterative phases — from early market validation through MVP. Each test round directly changed the design: bottom navigation was replaced after 3 of 4 users failed key tasks, and all 8 usability participants preferred a data table over charts for viewing biometric history.",
    outcome:
      "Forecasted to reduce unnecessary inpatient stays by 50 patients per month per hospital, saving $900K–$1.8M annually. Patient satisfaction maintained at 4/5 or better through continuous biometric tracking and streamlined clinician workflows.",
    thumbnail: "/ipad-image-1.jpg",
    heroImage: "/mockup5.png",
    researchImage: "/research-1.png",
    researchImageLabel: "Patient + Stakeholder Interviews",
    processImage1: "/wireframe-01.png",
    processImage2: "/wireframe-2.png",
    finalImages: ["/video-visit.png", "/details.png", "/calendar.png"],
  },
  {
    slug: "workforce-mobile",
    title: "Workforce Mobile",
    category: "iOS App · UX Research",
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
    category: "UX Strategy",
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
