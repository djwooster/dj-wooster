"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { isLanding, nav, primaryCta, startHref } from "@/lib/site"
import { SPRING } from "@/lib/motion"
import Button from "@/components/ui/Button"
import ThemeToggle from "@/components/ThemeToggle"
import { Container } from "@/components/ui/primitives"
import { cn } from "@/lib/utils"

export default function Header() {
  const pathname = usePathname()
  // The menu remembers the path it was opened on, so it closes itself on navigation
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  // Landing pages: wordmark, theme and one CTA that jumps to the page's own offer
  if (isLanding(pathname)) {
    return (
      <header className="sticky top-0 z-40 border-b border-line bg-bg">
        <Container className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="label-mono text-14 tracking-[0.16em] text-ink" aria-label="DJ Wooster — home">
            DJ Wooster
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block">
              <ThemeToggle />
            </span>
            <Button href="#join" variant="solid" size="sm" trackAs={`header-join:${pathname}`}>
              Get access
            </Button>
          </div>
        </Container>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="label-mono text-14 tracking-[0.16em] text-ink" aria-label="DJ Wooster — home">
          DJ Wooster
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-1.5 text-14 transition-colors duration-200",
                isActive(link.href) ? "text-ink" : "text-ink-2 hover:text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button href={startHref(`header:${pathname}`)} variant="solid" size="sm" trackAs="header-start">
            {primaryCta.label}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpenOn(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative flex size-10 items-center justify-center rounded-full border border-line md:hidden"
        >
          <span className="relative block h-2.5 w-4">
            <motion.span
              className="absolute left-0 h-px w-4 bg-ink"
              animate={open ? { top: 5, rotate: 45 } : { top: 0, rotate: 0 }}
              transition={SPRING}
            />
            <motion.span
              className="absolute left-0 h-px w-4 bg-ink"
              animate={open ? { top: 5, rotate: -45 } : { top: 10, rotate: 0 }}
              transition={SPRING}
            />
          </span>
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={SPRING}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <Container className="flex flex-col gap-6 py-6">
              <nav aria-label="Mobile" className="flex flex-col">
                {nav.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...SPRING, delay: 0.03 * i }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center justify-between border-b border-line py-3 text-20 headline text-ink"
                    >
                      {link.label}
                      {isActive(link.href) && <span className="size-1.5 rounded-full bg-ink" />}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="flex items-center justify-between gap-4">
                <ThemeToggle />
                <Button href={startHref(`menu:${pathname}`)} variant="solid" size="md" trackAs="menu-start">
                  {primaryCta.label}
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
