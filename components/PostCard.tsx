import Link from "next/link"
import { cn } from "@/lib/utils"

export interface PostSummary {
  slug: string
  title: string
  description?: string
  date: string
  readingTime: number
  category: string
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })

export default function PostCard({ post, className }: { post: PostSummary; className?: string }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className={cn(
        "group flex h-full flex-col gap-6 rounded-card border border-line bg-surface p-6",
        "transition-[border-color,transform] duration-200 ease-out-soft hover:border-ink-3 active:scale-[0.99]",
        className,
      )}
    >
      <div className="label-mono flex items-center justify-between gap-4 text-ink-2">
        <span className="text-ink">{post.category}</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="headline text-20 text-ink">{post.title}</h3>
        {post.description && <p className="text-14 text-ink-2">{post.description}</p>}
      </div>
      <span className="label-mono text-ink-2">{post.readingTime} min read</span>
    </Link>
  )
}
