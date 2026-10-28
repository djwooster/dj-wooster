"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { footerNav, isExternal, pageCode, priceNote, site, social } from "@/lib/site"
import { Container, Crosshair } from "@/components/ui/primitives"

export default function Footer() {
  const pathname = usePathname()

  return (
    <footer className="border-t border-line">
      <Container className="relative py-16 md:py-24">
        <Crosshair className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 max-sm:left-4" />
        <Crosshair className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 max-sm:right-4" />

        <div className="flex flex-col gap-3">
          <Link href="/" className="label-mono w-fit text-14 tracking-[0.16em] text-ink">
            {site.name}
          </Link>
          <p className="max-w-sm text-14 text-ink-2">
            Custom websites, web apps and iOS apps, designed and engineered end to end. {priceNote}.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-10 border-t border-line pt-10 sm:grid-cols-4">
          {footerNav.map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <span className="label-mono text-ink-2">{group.title}</span>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-14 text-ink transition-colors duration-200 hover:text-ink-2">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-col gap-4">
            <span className="label-mono text-ink-2">Elsewhere</span>
            <ul className="flex flex-col gap-2">
              {social.map((link) => (
                <li key={link.label}>
                  <a
                    href={isExternal(link.href) ? link.href : "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="text-14 text-ink transition-colors duration-200 hover:text-ink-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="label-mono flex h-14 items-center justify-between gap-4 text-ink-2">
          <span>
            {site.domain} <span aria-hidden>·</span> {pageCode(pathname)}
          </span>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </Container>
      </div>
    </footer>
  )
}
