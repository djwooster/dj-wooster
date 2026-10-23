import { cn } from "@/lib/utils"

export interface Principle {
  title: string
  body: string
}

// Numbered principle grid in the Rams poster style: hairline cells, big dot-matrix numerals
export default function PrinciplesGrid({ items, className }: { items: Principle[]; className?: string }) {
  return (
    <ol
      className={cn(
        "grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item, i) => (
        <li key={i} className="flex min-h-56 flex-col justify-between gap-10 bg-bg p-6">
          <span className="font-display text-64 leading-none font-bold text-ink tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="headline text-20 text-ink">{item.title}</h3>
            <p className="text-14 text-ink-2">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
