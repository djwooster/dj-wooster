"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollRestorer() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== "/") return

    const target = sessionStorage.getItem("scrollTarget")
    if (!target) return
    sessionStorage.removeItem("scrollTarget")

    // Small delay so the page has fully rendered before scrolling
    const timer = setTimeout(() => {
      const el = document.getElementById(target)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }, 120)

    return () => clearTimeout(timer)
  }, [pathname])

  return null
}
