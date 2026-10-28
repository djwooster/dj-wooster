// The /start form's choices, shared by the form and the API so they can't drift
export const needs = ["Website", "Web app", "iOS app", "Not sure yet"] as const
export const timelines = ["ASAP", "1–3 months", "3+ months"] as const
// No option below $15K, by design
export const budgets = ["$15–25K", "$25–50K", "$50K+"] as const

export const inquiryConfirmation = "Thanks. I'll reply within one business day with a link to book a call."
