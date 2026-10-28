// Launching a course is a config change: flip `status` to "open" and set `checkoutUrl` (a Stripe payment link).
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
  /** Launch price with a real end date; `price` is the regular price after it */
  earlyBird?: { price: number; until: string }
  /** Stripe payment link for the installment option, shown under the main CTA */
  paymentPlan?: { label: string; url?: string }
  /** Self-paced lessons plus live support, shown on the landing pages */
  format?: { liveCalls: string }
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
    earlyBird: { price: 249, until: "[TODO: early-bird end date]" },
    paymentPlan: { label: "[TODO: or 3 payments of $X]" },
    format: { liveCalls: "3× a week" },
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
