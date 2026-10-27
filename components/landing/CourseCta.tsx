import type { Course } from "@/lib/courses"
import Button from "@/components/ui/Button"
import EmailCapture from "@/components/EmailCapture"
import { isExternal } from "@/lib/site"
import { cn } from "@/lib/utils"

// One CTA that follows the course config: checkout when the course is open, the waitlist otherwise
export default function CourseCta({
  course,
  source,
  align = "start",
  className,
}: {
  course: Course
  /** Where on the page this CTA sits, e.g. "lp-vibe:hero" */
  source: string
  align?: "start" | "center"
  className?: string
}) {
  const open = course.status === "open" && course.checkoutUrl
  const price = course.earlyBird?.price ?? course.price
  const plan = course.paymentPlan

  return (
    <div className={cn("flex flex-col gap-3", align === "center" && "items-center text-center", className)}>
      {open ? (
        <Button href={course.checkoutUrl!} size="lg" arrow trackAs={source}>
          Get instant access · ${price}
        </Button>
      ) : (
        <EmailCapture
          source={source}
          tag={course.tag}
          cta="Get early access"
          successTitle="You're on the list."
          successMessage={`You'll get the $${price} early-bird link the moment it opens.`}
          className={align === "center" ? "mx-auto" : undefined}
        />
      )}
      <span className="label-mono text-ink-2">
        {course.earlyBird ? (
          <>
            ${course.earlyBird.price} early bird <span aria-hidden>·</span>{" "}
            <span className="line-through decoration-ink-2">${course.price}</span> after {course.earlyBird.until}
          </>
        ) : (
          `$${course.price}`
        )}
      </span>
      {open && plan && (
        <span className="text-12 text-ink-2">
          {plan.url && isExternal(plan.url) ? (
            <a href={plan.url} className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
              {plan.label}
            </a>
          ) : (
            plan.label
          )}
        </span>
      )}
    </div>
  )
}
