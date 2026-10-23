"use client"

import { useId, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { SignupTag } from "@/lib/courses"
import { track } from "@/lib/analytics"
import { SPRING } from "@/lib/motion"
import { buttonClasses } from "@/components/ui/Button"
import { TwoToneHeading } from "@/components/ui/primitives"
import { cn } from "@/lib/utils"

type State = "idle" | "submitting" | "success" | "error"

export default function EmailCapture({
  source,
  tag,
  variant = "inline",
  headline,
  headlineRest,
  description,
  cta = "Join",
  successTitle = "You're on the list.",
  successMessage = "Check your inbox to confirm.",
  className,
}: {
  /** Where on the site this form lives, e.g. "home-hero", "footer" */
  source: string
  tag: SignupTag
  variant?: "inline" | "full"
  headline?: string
  headlineRest?: string
  description?: string
  cta?: string
  successTitle?: string
  successMessage?: string
  className?: string
}) {
  const [state, setState] = useState<State>("idle")
  const [error, setError] = useState("")
  const id = useId()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get("email") ?? "")
    setState("submitting")
    setError("")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, tag }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong. Try again.")
      track("signup", { source, tag, page: location.pathname })
      setState("success")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.")
      setState("error")
    }
  }

  const form = (
    <AnimatePresence mode="wait" initial={false}>
      {state === "success" ? (
        <motion.div
          key="success"
          role="status"
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={SPRING}
          className="flex min-h-12 items-center gap-3"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 22, delay: 0.05 }}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-bg"
          >
            <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
              <motion.path
                d="M3.5 8.5 6.5 11.5 12.5 4.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, delay: 0.15 }}
              />
            </svg>
          </motion.span>
          <div className="flex flex-col">
            <span className="text-14 font-medium text-ink">{successTitle}</span>
            <span className="text-14 text-ink-2">{successMessage}</span>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
          className="flex flex-col gap-2"
          noValidate
        >
          <div
            className={cn(
              "flex items-center gap-1 rounded-full border bg-surface p-1 transition-colors duration-200 focus-within:border-ink-3",
              state === "error" ? "border-negative" : "border-line",
            )}
          >
            <label htmlFor={`${id}-email`} className="sr-only">
              Email address
            </label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@email.com"
              aria-invalid={state === "error"}
              aria-describedby={state === "error" ? `${id}-error` : undefined}
              className="h-10 min-w-0 flex-1 bg-transparent px-4 text-16 text-ink outline-none placeholder:text-ink-2 sm:text-14"
            />
            <button type="submit" disabled={state === "submitting"} className={buttonClasses("primary", "md")}>
              {state === "submitting" ? <Spinner /> : cta}
            </button>
          </div>
          {state === "error" && (
            <p id={`${id}-error`} className="px-4 text-12 text-negative" role="alert">
              {error}
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  )

  if (variant === "inline") return <div className={cn("w-full max-w-md", className)}>{form}</div>

  return (
    <div className={cn("flex flex-col gap-8 md:flex-row md:items-end md:justify-between", className)}>
      <div className="flex max-w-xl flex-col gap-3">
        {headline && <TwoToneHeading lead={headline} rest={headlineRest} size="sm" />}
        {description && <p className="text-16 text-ink-2">{description}</p>}
      </div>
      <div className="w-full md:max-w-md">
        {form}
        {state !== "success" && <p className="mt-3 px-4 text-12 text-ink-2">No spam. Unsubscribe anytime.</p>}
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <span className="flex w-8 justify-center" aria-label="Submitting">
      <span className="size-4 animate-spin rounded-full border-[1.5px] border-white/30 border-t-white" />
    </span>
  )
}
