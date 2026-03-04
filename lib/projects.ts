export interface ActIteration {
  title: string;
  description: string;
  image?: string;
  imageLabel?: string;
}

export interface ProjectAct {
  number: string;
  name: string;
  surface: string;
  outcome: string;
  decision: string;
  researchInsights?: string[];
  iterations?: ActIteration[];
  solutionText?: string;
  images?: string[];
}

export interface ProjectContext {
  role: string;
  timeline: string;
  team: string;
  scope: string;
}

export interface BusinessGoal {
  number: string;
  title: string;
  description: string;
}

export interface ProcessPhase {
  number: string;
  name: string;
  question: string;
  methods: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface ResearchQuote {
  quote: string;
  author: string;
  insights: Array<{ title: string; description: string }>;
}

export type ProjectWidget =
  | "heuristicEvaluation"
  | "constructionPersona"
  | "workforceFlowDiagram"
  | "workforceWireframes";

export interface Project {
  slug: string;
  title: string;
  year: string;
  client: string;
  tags: string[];
  tldr?: string;
  overview?: string;
  challenge?: string;
  process?: string;
  outcome?: string;
  challengeWidget?: ProjectWidget;
  challengeImages?: string[];
  challengeLeftWidget?: ProjectWidget;
  challengeRightWidget?: ProjectWidget;
  processWidget?: ProjectWidget;
  processImages?: string[];
  thumbnail?: string;
  heroImage?: string;
  researchImage?: string;
  researchImageLabel?: string;
  prototypeGif?: string;
  processImage1?: string;
  processImage2?: string;
  finalImages?: string[];
  processImage1Label?: string;
  processImage2Label?: string;
  comingSoon?: boolean;
  acts?: ProjectAct[];
  systemsNote?: string;
  context?: ProjectContext;
  problem?: string;
  businessGoals?: BusinessGoal[];
  processPhases?: ProcessPhase[];
  researchQuote?: ResearchQuote;
  testimonials?: Testimonial[];
  researchContext?: string;
  keyInsight?: string;
  rootCauses?: Array<{ title: string; description: string }>;
}

export const projects: Project[] = [
  {
    slug: "inbound-health",
    title: "Hospital at Home",
    year: "2023–2026",
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
    businessGoals: [
      {
        number: "01",
        title: "Increase Hospital Capacity",
        description:
          "Reduce inpatient stays by 10% by enabling eligible patients to continue recovery at home, freeing up hospital beds for higher-acuity cases.",
      },
      {
        number: "02",
        title: "Improve Operational Efficiency",
        description:
          "Streamline remote patient monitoring for nurses and care teams, reducing time spent on administrative workload and manual check-ins by 30%.",
      },
      {
        number: "03",
        title: "Enhance Patient Outcomes and Satisfaction",
        description:
          "Support faster recovery and maintain patient satisfaction scores of 4 out of 5 or better through continuous biometric tracking and personalized care in the comfort of home.",
      },
    ],
    processPhases: [
      {
        number: "01",
        name: "Early Market Validation",
        question: "Why does this product need to exist?",
        methods: [
          "Stakeholder interviews",
          "User interviews",
          "Competitor analysis",
        ],
      },
      {
        number: "02",
        name: "Proof of Concept",
        question: "Is this something we can solve for the user?",
        methods: ["Prototyping", "Concept testing", "Usability testing"],
      },
      {
        number: "03",
        name: "Prototype & Develop",
        question: "How should we actually build the solution?",
        methods: ["IA mapping", "Prototyping", "Usability testing"],
      },
      {
        number: "04",
        name: "Minimum Viable Product",
        question: "Is our solution something people actually want?",
        methods: ["User interviews", "Surveys", "In-app feedback"],
      },
    ],
    researchQuote: {
      quote:
        "I'm not very tech-savvy, so at first I was nervous about using the iPad — but once I saw how easy it was to check my readings and send them to the nurse, it actually made me feel more in control of my recovery.",
      author: "Gil, former patient",
      insights: [
        {
          title: "Patients need reassurance and simplicity",
          description:
            "Many patients felt anxious about using new technology, highlighting the importance of clear guidance, simple navigation, and ongoing support to build confidence.",
        },
        {
          title: "Patients want meaningful connection with their care team",
          description:
            "Patients valued knowing that their nurses could easily see their readings and check in when needed, which made them feel supported and secure while recovering at home.",
        },
      ],
    },
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
          "Salesforce is not a blank canvas — every interaction had to work within its component system. I designed an AI-generated patient summary that surfaced the right clinical context at the start of each shift, giving nurses a single read-before-you-enter view instead of piecing together data across multiple records.",
        images: ["/ai-highlighted.png"],
      },
      {
        number: "03",
        name: "Patient",
        surface: "Custom iOS App · Patient",
        outcome:
          "Patient satisfaction held at 4/5 or better through the full care episode.",
        decision:
          "Eligible patients were declining to enroll — not from clinical hesitation, but because they didn't trust the product or understand its value. I redesigned onboarding around that trust gap, addressing the specific barriers causing drop-off before a single vital was ever submitted.",
        iterations: [
          {
            title: "Navigation",
            description:
              "I initially hypothesized that a bottom navigation was superior because it would allow for more space to display items on-screen, but in user testing, 3 of 4 users failed to identify navigation menu items when tasked with navigating to other pages in-app, which resulted in further concepts using a left navigation.",
            image: "/nav-bottom-wireframe-1.png",
            imageLabel: "Bottom Nav Wireframe",
          },
          {
            title: "Care Episode Overview",
            description:
              "One concept hypothesized that a wholistic, all-in-one view of items related to the patient's care episode could eliminate the need to navigate away from the home page by displaying all relevant information. However, I ultimately learned that patients preferred simplicity and predictability above all else.",
            image: "/episode-overview.png",
            imageLabel: "Care Episode Wireframe",
          },
        ],
        solutionText:
          "Testing made the path forward clear: patients needed familiar navigation, focused tasks, and a persistent sense of their care team's presence. The final design replaced the bottom nav with a persistent left rail, stripped the home screen back to only what mattered that day, and put the nurse connection one tap away at all times.",
        images: [
          "/inbound-project-mockup-new.png",
          "/calendar-new.png",
          "/vitals-details-new2.png",
          "/video-visit-new.png",
        ],
      },
    ],
    systemsNote:
      "I built a design system from scratch across all three surfaces — two Salesforce apps with their own UI constraints, and a fully custom iOS app. Maintaining coherence across environments that different, with no prior system to reference, was the challenge worth pursuing.",
  },
  {
    slug: "msk-portal",
    title: "Oncology Portal Redesign",
    year: "2022–2023",
    client: "Memorial Sloan Kettering",
    tags: [
      "UX Audit",
      "Design Systems",
      "Information Architecture",
      "Interaction Design",
      "Enterprise UX",
    ],
    tldr: "MSK's legacy oncology portal had no shared view of where the problems were. I ran a three-method audit to align the team on priorities, redesigned key flows using the org design system, and co-led the migration from legacy UI — resulting in a 30% improvement in patient consent flow completion time.",
    context: {
      role: "Senior Product Designer",
      timeline: "Feb 2022 – Jan 2023",
      team: "Product · Engineering · Clinical stakeholders",
      scope: "Portal audit · Key flow redesign · Design system migration",
    },
    overview:
      "A legacy oncology portal serving patients, clinicians, and administrative staff — each with different workflows, different mental models, and no shared baseline for what needed fixing. I ran a comprehensive audit, redesigned key flows against the MSK design system, and co-led the migration from legacy UI.",
    challenge:
      "Before I opened Figma, I needed the team to agree on what was actually broken. The portal served mixed user types with completely different workflows — and competing opinions about where to start. The audit created a shared, evidence-based backlog where there had only been assumptions.",
    process:
      "I ran a three-method audit: a heuristic evaluation produced a severity-ranked issue list; a component inventory exposed UI drift and legacy patterns the design system had never absorbed; and a task flow analysis mapped where each user type was hitting friction. From there I redesigned key flows using the MSK design system and co-led the migration plan — defining the transition path, not just delivering the destination.",
    outcome:
      "30% improvement in task completion time for patients navigating the electronic consent flow on arrival. The audit and migration work left the team with a durable foundation — not a one-off redesign requiring another full pass in 18 months.",
    challengeWidget: "heuristicEvaluation",
    thumbnail: "/msk-thumbnail.jpg",
    processImage1: "/msk-original-1.png",
    processImage1Label: "Legacy UI",
    processImage2: "/improves-msk-1.png",
    processImage2Label: "Redesigned",
    finalImages: ["/form-select-msk.png", "/signature-msk.png"],
  },
  {
    slug: "msk-data-abstraction",
    title: "Patient Data Abstraction",
    year: "2022–2023",
    client: "Memorial Sloan Kettering",
    tags: [
      "Visual Design",
      "Component Architecture",
      "Dashboard Design",
      "Data Visualization",
      "Design Systems",
    ],
    tldr: "CTDataHub is a centralized workspace I designed at Memorial Sloan Kettering that extracts and consolidates patient health and medication data from the EHR into a single, automated view — eliminating the context-switching that was costing nurses measurable time and accuracy on every shift.",
    context: {
      role: "Visual Designer",
      timeline: "2022–2023",
      team: "Product · Engineering · Clinical stakeholders",
      scope: "Visual design · Component architecture · Research synthesis",
    },
    overview:
      "CTDataHub is a centralized workspace that extracts and consolidates patient health and medication data from the EHR and displays it in a user-friendly, automated, and consolidated view. As the visual designer on the project, I led the UI from concept to polished component library, working alongside the team to synthesize research findings into a dashboard nurses could actually trust.",
    challenge:
      "Nurses had no single source of truth. Critical patient data was scattered across multiple systems — each with its own navigation model and terminology. The cognitive overhead of context-switching was measurable: time lost, details missed, and a workflow that asked nurses to do too much remembering and not enough caring. The wireframes below were the starting point — a rough structural foundation that mapped the data hierarchy before any visual decisions were made.",
    challengeImages: ["/poc-wireframe-1.png", "/poc-wireframe-2.png"],
    process:
      "I synthesized findings from clinical staff interviews to map the highest-frequency tasks and the specific data points nurses referenced most. From there I led the visual design and component architecture — building a system that could handle high information density without overwhelming the user, and that could absorb new data sources without requiring a redesign.",
    problem:
      "Current manual data abstraction workflows were keeping MSK staff from more important aspects of clinical care and creating a financial burden on the facility.",
    rootCauses: [
      {
        title: "No single source of truth",
        description:
          "Patient data lived across multiple disconnected systems and departments — making it nearly impossible to surface the right information quickly, or report it back to trial sponsors on time.",
      },
      {
        title: "Data staff couldn't fully trust",
        description:
          "Without standardization, clinical staff routinely double-checked their own work — waiting for a colleague to confirm what they were seeing before acting on it, adding delays that compounded across every shift.",
      },
      {
        title: "Automation opportunities going unused",
        description:
          "High-value signals like Serious Adverse Events could have been surfaced automatically. Instead, staff were manually scanning records to find them.",
      },
      {
        title: "The wrong people doing the wrong work",
        description:
          "Senior clinical staff were spending a measurable portion of their shifts on manual data retrieval — time that should have gone to patient care, coordination, and support.",
      },
    ],
    businessGoals: [
      {
        number: "01",
        title: "Increase the rate at which the correct data was identified by 50%",
        description: "",
      },
      {
        number: "02",
        title: "Decrease the time required to identify the correct data by 50%",
        description: "",
      },
      {
        number: "03",
        title: "Decrease the perceived difficulty of identifying the correct data by 30%",
        description: "",
      },
    ],
    processImages: [
      "/patient-abstraction-wireframe-3.png",
      "/patient-abstraction-final-4.png",
    ],
    researchContext:
      "I sat in on 6 one-hour, semi-structured interviews with clinical staff — observing workflows, noting friction points, and synthesizing findings into design direction. I didn't lead the research, but the sessions gave me direct access to the language and mental models I needed to make the right visual decisions.",
    testimonials: [
      {
        quote:
          "It would be great to see all of this information in one place, especially with the medications — because that's something that manually takes an incredible amount of time to go through every single EMR document to see when the patients started this medication.",
        author: "Kalista, Clinical Research Coordinator",
      },
      {
        quote:
          "Some patients can have like 25 adverse events and 100 medications and we have to look through every document. I was definitely overwhelmed the first time I logged into CTMS. I wish there was a simpler solution because there is a lot of information in here that isn't relevant for us.",
        author: "Anmol, Clinical Research Coordinator",
      },
    ],
    keyInsight:
      "Consolidation was the feature. Every other design decision flowed from getting Adverse Event and medication data into one place.",
    outcome:
      "By aggregating patient health and medication data from the EHR into a single consolidated view, CTDataHub reduced the time nurses spent locating critical information by approximately 40% — turning a fragmented, multi-system workflow into a single source of truth.",
    heroImage: "/patient-abstraction-hero.png",
    thumbnail: "/patient-abstraction-thumb.jpg",
  },
  {
    slug: "national-grid",
    title: "National Grid",
    year: "2025",
    client: "National Grid",
    comingSoon: true,
    tags: [],
  },
];
