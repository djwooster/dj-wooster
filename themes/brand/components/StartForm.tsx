"use client"

import { useId, useState } from "react"
import { useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { budgets, inquiryConfirmation, needs, timelines } from "@/lib/inquiry"
import { track } from "@/lib/analytics"
import { SPRING } from "@/lib/motion"
import { buttonClasses } from "@/components/ui/Button"
import { Spinner } from "@/components/EmailCapture"
import { cn } from "@/lib/utils"

type State = "idle" | "submitting" | "success" | "error"
type Errors = Record<string, string>

const fieldClasses =
  "w-full rounded-inner border bg-surface px-3.5 text-16 text-ink outline-none transition-colors duration-200 placeholder:text-ink-2 focus:border-ink-3 sm:text-14"

// Must sit inside <Suspense>: it reads ?from= to record where the inquiry started
export default function StartForm() {
  const params = useSearchParams()
  const source = params.get("from") ?? "direct"
  const [state, setState] = useState<State>("idle")
  const [errors, setErrors] = useState<Errors>({})
  const id = useId()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setState("submitting")
    setErrors({})
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        setErrors(json.errors ?? { form: "Something went wrong. Try again." })
        setState("error")
        return
      }
      track("inquiry", { source, need: String(data.need), budget: String(data.budget) })
      setState("success")
    } catch {
      setErrors({ form: "Something went wrong. Try again, or email contact@djwooster.com." })
      setState("error")
    }
  }

  const err = (name: string) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className="text-12 text-negative" role="alert">
        {errors[name]}
      </p>
    ) : null
  const a11y = (name: string) => ({
    "aria-invalid": Boolean(errors[name]) || undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
  })

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state === "success" ? (
        <motion.div
          key="success"
          role="status"
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={SPRING}
          className="flex flex-col items-start gap-5 py-6"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 22, delay: 0.05 }}
            className="flex size-10 items-center justify-center rounded-full bg-ink text-bg"
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
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
          <p className="headline text-20 text-ink md:text-28">{inquiryConfirmation}</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
          className="flex flex-col gap-8"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" htmlFor={`${id}-name`} error={err("name")}>
              <input id={`${id}-name`} name="name" autoComplete="name" required className={cn(fieldClasses, "h-11", errors.name ? "border-negative" : "border-line")} {...a11y("name")} />
            </Field>
            <Field label="Email" htmlFor={`${id}-email`} error={err("email")}>
              <input id={`${id}-email`} name="email" type="email" autoComplete="email" required className={cn(fieldClasses, "h-11", errors.email ? "border-negative" : "border-line")} {...a11y("email")} />
            </Field>
            <Field label="Company" optional htmlFor={`${id}-company`}>
              <input id={`${id}-company`} name="company" autoComplete="organization" className={cn(fieldClasses, "h-11 border-line")} />
            </Field>
            <Field label="Website" optional htmlFor={`${id}-website`}>
              <input id={`${id}-website`} name="website" type="url" inputMode="url" placeholder="https://" autoComplete="url" className={cn(fieldClasses, "h-11 border-line")} />
            </Field>
          </div>

          <ChoiceGroup name="need" legend="What do you need?" options={needs} error={err("need")} />
          <ChoiceGroup name="timeline" legend="Timeline" options={timelines} error={err("timeline")} />
          <ChoiceGroup name="budget" legend="Budget" options={budgets} error={err("budget")} />

          <Field label="About the project" htmlFor={`${id}-about`} error={err("about")}>
            <textarea
              id={`${id}-about`}
              name="about"
              rows={5}
              required
              placeholder="A few sentences: what the business does, what you need built, and what a win looks like."
              className={cn(fieldClasses, "resize-y py-3", errors.about ? "border-negative" : "border-line")}
              {...a11y("about")}
            />
          </Field>

          <div className="flex flex-col gap-3">
            <button type="submit" disabled={state === "submitting"} className={buttonClasses("primary", "lg", "w-full sm:w-fit")}>
              {state === "submitting" ? <Spinner /> : "Send inquiry"}
            </button>
            {errors.form && (
              <p className="text-12 text-negative" role="alert">
                {errors.form}
              </p>
            )}
            <p className="text-12 text-ink-2">I reply to every inquiry within one business day.</p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

function Field({
  label,
  htmlFor,
  optional,
  error,
  children,
}: {
  label: string
  htmlFor: string
  optional?: boolean
  error?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="label-mono flex items-center gap-2 text-ink-2">
        {label}
        {optional && <span className="normal-case tracking-normal">(optional)</span>}
      </label>
      {children}
      {error}
    </div>
  )
}

// Native radios, styled as pills: keyboard and screen readers work as usual
function ChoiceGroup({
  name,
  legend,
  options,
  error,
}: {
  name: string
  legend: string
  options: readonly string[]
  error?: React.ReactNode
}) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="label-mono mb-3 text-ink-2">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="relative cursor-pointer">
            <input type="radio" name={name} value={option} required className="peer sr-only" />
            <span
              className={cn(
                "flex h-10 items-center rounded-full border border-line bg-surface px-4 text-14 text-ink transition-[background-color,border-color,color,transform] duration-200 ease-out-soft select-none",
                "hover:border-ink-3 active:scale-[0.97] peer-checked:border-ink peer-checked:bg-ink peer-checked:text-bg",
                "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
              )}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
      {error}
    </fieldset>
  )
}
