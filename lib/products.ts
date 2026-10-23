export type ProductStatus = "live" | "in-review" | "beta"
export type PictogramKind = "focusmode" | "re-iq" | "sourceiq"

export interface Product {
  slug: string
  name: string
  problem: string
  status: ProductStatus
  statusNote?: string
  pictogram: PictogramKind
  url: string
  platforms: string[]
}

export const products: Product[] = [
  {
    slug: "focusmode",
    name: "FocusMode",
    problem: "A focus timer with sessions, tags and stats, on the web and on iOS.",
    status: "in-review",
    statusNote: "iOS",
    pictogram: "focusmode",
    url: "[TODO: FocusMode URL]",
    platforms: ["Web", "iOS"],
  },
  {
    slug: "re-iq",
    name: "RE-IQ",
    problem: "Tracks NOI, occupancy and delinquency against budget, and surfaces what needs attention.",
    status: "live",
    pictogram: "re-iq",
    url: "[TODO: RE-IQ URL]",
    platforms: ["Web"],
  },
  {
    slug: "sourceiq",
    name: "SourceIQ",
    problem: "Ties ad spend, funnels and pipelines to revenue and ROAS.",
    status: "live",
    pictogram: "sourceiq",
    url: "[TODO: SourceIQ URL]",
    platforms: ["Web"],
  },
]
