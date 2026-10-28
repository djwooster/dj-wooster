import type { ChipStatus } from "@/components/ui/primitives"
import type { PictogramKind } from "@/lib/products"

export interface WorkItem {
  slug: string
  name: string
  /** "Client website", "Own product · web app" */
  kind: string
  status: ChipStatus
  statusNote?: string
  /** One line, shown gray after the name */
  summary: string
  problem: string
  built: string[]
  platforms: string[]
  /** Stands in for the project visual until each one is designed */
  pictogram: PictogramKind
  /** Only rendered once it's a real URL */
  url?: string
}

// Homepage "Selected work", in order. Add new projects here; the homepage renders them all.
export const work: WorkItem[] = [
  {
    slug: "re-iq",
    name: "RE-IQ",
    kind: "Own product · web app",
    status: "live",
    summary: "Asset management for multifamily owners.",
    problem:
      "Owners and asset managers piece together budgets, rent rolls and manager reports by hand to find out where NOI is slipping.",
    built: [
      "NOI, occupancy and delinquency tracked against budget, by property and month",
      "Variance broken into drivers that sum to the NOI impact, with the evidence one click away",
      "A Needs attention list that says what to look at this week",
    ],
    platforms: ["Web app"],
    pictogram: "re-iq",
    url: "[TODO: RE-IQ URL]",
  },
  {
    slug: "focusmode",
    name: "FocusMode",
    kind: "Own product · iOS and web",
    status: "in-review",
    statusNote: "App Store",
    summary: "A focus timer people keep coming back to.",
    problem: "Most focus timers are either toys or bloated. FocusMode is a calm, fast timer with the stats to show your week.",
    built: [
      "A native-feel iPhone app built in React Native, with a Live Activity on the Lock Screen and Dynamic Island",
      "Voice-first session notes, tags and stats that match the web app",
      "Pro subscriptions with a free trial, through the App Store and Stripe",
    ],
    platforms: ["iOS", "Web"],
    pictogram: "focusmode",
    url: "https://focusmode.me",
  },
  {
    slug: "sourceiq",
    name: "SourceIQ",
    kind: "Own product · web app",
    status: "live",
    summary: "Ad spend traced to revenue.",
    problem: "Marketing teams can see what they spend and what they earn, but not which channel turned one into the other.",
    built: [
      "Spend, leads, pipeline and revenue in one funnel",
      "Blended and per-channel ROAS, updated as deals close",
      "[TODO: one more SourceIQ highlight]",
    ],
    platforms: ["Web app"],
    pictogram: "sourceiq",
    url: "[TODO: SourceIQ URL]",
  },
  {
    slug: "coast-gallery",
    name: "Coast Gallery",
    kind: "Client website",
    status: "in-build",
    summary: "A gallery site that follows the collector home.",
    problem:
      "Most buyers at this Laguna Beach gallery are visitors who fall for a piece in person, then leave without buying. The site's job is to turn that moment into a conversation weeks later.",
    built: [
      "A QR code beside every work opens its page on the visitor's phone",
      "Save this piece with just an email, then book a call with the gallery in one tap",
      "Every save, scan and booking is logged, so the gallery knows where each collector came from",
    ],
    platforms: ["Website", "Mobile first"],
    pictogram: "coast-gallery",
  },
]
