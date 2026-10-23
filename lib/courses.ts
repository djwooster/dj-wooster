// Launching a course is a config change: flip `status` to "open" and set `checkoutUrl`.
export type CourseStatus = "waitlist" | "open" | "closed"

export type SignupTag =
  | "waitlist-ship-your-app"
  | "interest-ux-designers"
  | "lead-checklist"
  | "newsletter"
  | "consulting"

export interface Course {
  slug: string
  title: string
  outcome: string
  price?: number
  status: CourseStatus
  checkoutUrl?: string
  tag: SignupTag
  label?: string
}

export const courses: Course[] = [
  {
    slug: "ship-your-app",
    title: "Ship Your App with Claude Code",
    outcome: "Get your app into the App Store with Claude Code.",
    price: 495,
    status: "waitlist",
    checkoutUrl: undefined,
    tag: "waitlist-ship-your-app",
  },
  {
    slug: "claude-code-for-ux-designers",
    title: "Claude Code for UX Designers",
    outcome: "[TODO: course outcome line]",
    status: "waitlist",
    tag: "interest-ux-designers",
    label: "Coming next",
  },
]

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug)
}
