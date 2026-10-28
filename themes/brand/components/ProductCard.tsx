import Link from "next/link"
import type { Product } from "@/lib/products"
import Pictogram from "@/components/motifs/Pictogram"
import { StatusChip } from "@/components/ui/primitives"
import { Arrow } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export default function ProductCard({ product, className }: { product: Product; className?: string }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group flex h-full flex-col rounded-card border border-line bg-surface p-6",
        "transition-[border-color,transform] duration-200 ease-out-soft hover:border-ink-3 active:scale-[0.99]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <Pictogram kind={product.pictogram} size={56} />
        <StatusChip status={product.status} note={product.statusNote} />
      </div>

      <div className="mt-10 flex flex-1 flex-col gap-2">
        <h3 className="headline text-20 text-ink">{product.name}</h3>
        <p className="text-14 text-ink-2">{product.problem}</p>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-line pt-4">
        <span className="label-mono text-ink-2">{product.platforms.join(" · ")}</span>
        <span className="label-mono flex items-center gap-1.5 text-ink">
          View
          <Arrow className="size-3 transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
