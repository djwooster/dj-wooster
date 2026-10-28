import { NextResponse } from "next/server"

// Stub: validates and logs the signup. Resend gets wired in here later.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const email = typeof body?.email === "string" ? body.email.trim() : ""

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 })
  }

  // TODO: add contact to Resend audience with { source, tag }
  console.info("[subscribe]", { email, source: body.source, tag: body.tag })

  return NextResponse.json({ ok: true })
}
