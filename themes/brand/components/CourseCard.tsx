import type { Course } from "@/lib/courses"
import Button from "@/components/ui/Button"
import { StatusChip } from "@/components/ui/primitives"
import { cn } from "@/lib/utils"

// CTA follows config: waitlist → course page, open → checkout, closed → disabled
function courseCta(course: Course) {
  if (course.status === "open" && course.checkoutUrl) return { label: "Enroll", href: course.checkoutUrl }
  if (course.status === "closed") return null
  return { label: course.label ? "Get notified" : "Join the waitlist", href: `/courses/${course.slug}` }
}

export default function CourseCard({
  course,
  inverse,
  className,
}: {
  course: Course
  inverse?: boolean
  className?: string
}) {
  const cta = courseCta(course)
  const chip = course.label ? "soon" : course.status

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-card border border-line p-6",
        inverse ? "inverse" : "bg-surface",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <StatusChip status={chip} />
        {course.price !== undefined && (
          <span className="font-mono text-14 text-ink tabular-nums">${course.price}</span>
        )}
      </div>
      <div className="mt-10 flex flex-1 flex-col gap-2">
        <h3 className="headline text-28 text-ink">{course.title}</h3>
        <p className="text-16 text-ink-2">{course.outcome}</p>
      </div>
      <div className="mt-8">
        {cta ? (
          <Button href={cta.href} variant={inverse ? "solid" : "secondary"} arrow trackAs={`course-${course.slug}`}>
            {cta.label}
          </Button>
        ) : (
          <Button variant="secondary" disabled>
            Enrollment closed
          </Button>
        )}
      </div>
    </article>
  )
}
