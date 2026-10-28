"use client"

import Link from "next/link"
import { track } from "@/lib/analytics"
import { isExternal } from "@/lib/site"
import { cn } from "@/lib/utils"

// primary = the accent moment; solid = ink fill for persistent CTAs (header) so the accent stays rare
type Variant = "primary" | "solid" | "secondary" | "ghost"
type Size = "sm" | "md" | "lg"

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:brightness-110",
  solid: "bg-ink text-bg hover:opacity-85",
  secondary: "border border-line bg-surface text-ink hover:border-ink-3",
  ghost: "text-ink hover:bg-ink/5",
}

const sizes: Record<Size, string> = {
  sm: "h-8 px-3.5 text-14 gap-1.5",
  md: "h-10 px-5 text-14 gap-2",
  lg: "h-12 px-6 text-16 gap-2",
}

type Props = {
  variant?: Variant
  size?: Size
  arrow?: boolean
  className?: string
  children: React.ReactNode
  /** Analytics label — every CTA click is tracked */
  trackAs?: string
} & (
  | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">)
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
)

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex shrink-0 select-none items-center justify-center rounded-full font-medium whitespace-nowrap",
    "transition-[transform,filter,opacity,background-color,border-color] duration-200 ease-out-soft active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  )
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={cn("size-3.5", className)}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Button(props: Props) {
  const { variant = "primary", size = "md", arrow, className, children, trackAs, ...rest } = props
  const classes = buttonClasses(variant, size, cn(arrow && "group", className))
  const content = (
    <>
      {children}
      {arrow && <Arrow className="transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5" />}
    </>
  )

  if (rest.href !== undefined) {
    const { href, onClick, ...anchor } = rest as { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      track("cta_click", { label: trackAs ?? String(children), href, page: location.pathname })
      onClick?.(e)
    }
    if (isExternal(href)) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={classes} onClick={handleClick} {...anchor}>
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} onClick={handleClick} {...anchor}>
        {content}
      </Link>
    )
  }

  const button = rest as React.ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type="button" className={classes} {...button}>
      {content}
    </button>
  )
}
