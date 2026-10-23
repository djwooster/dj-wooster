// Single place for analytics events. Vercel Analytics gets wired in here (step 7).
export type AnalyticsEvent = "signup" | "cta_click"

export function track(event: AnalyticsEvent, props: Record<string, string | number | boolean | undefined>) {
  // TODO: replace with `track` from @vercel/analytics
  if (process.env.NODE_ENV === "development") console.info("[analytics]", event, props)
}
