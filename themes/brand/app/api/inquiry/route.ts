import { NextResponse } from "next/server"
import { budgets, needs, timelines } from "@/lib/inquiry"

const oneOf = (list: readonly string[], value: string) => list.includes(value)

// Stub: validates and logs the inquiry. Resend (notify DJ + auto-reply) gets wired in here later.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const str = (key: string) => (typeof body?.[key] === "string" ? body[key].trim() : "")

  const inquiry = {
    name: str("name"),
    email: str("email"),
    company: str("company"),
    website: str("website"),
    need: str("need"),
    timeline: str("timeline"),
    budget: str("budget"),
    about: str("about"),
    source: str("source") || "direct",
  }

  const errors: Record<string, string> = {}
  if (!inquiry.name) errors.name = "Add your name."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) errors.email = "Enter a valid email address."
  if (!oneOf(needs, inquiry.need)) errors.need = "Pick what you need."
  if (!oneOf(timelines, inquiry.timeline)) errors.timeline = "Pick a timeline."
  if (!oneOf(budgets, inquiry.budget)) errors.budget = "Pick a budget."
  if (inquiry.about.length < 10) errors.about = "A sentence or two about the project."

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 400 })
  }

  // TODO: send with Resend and add to the lead log
  console.info("[inquiry]", inquiry)

  return NextResponse.json({ ok: true })
}
