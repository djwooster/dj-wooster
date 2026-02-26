import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/Navigation"

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "DJ Wooster — UX / UI Designer",
  description:
    "DJ Wooster is a UX/UI designer crafting digital experiences from research to launch. Available for work.",
  openGraph: {
    title: "DJ Wooster — UX / UI Designer",
    description:
      "DJ Wooster is a UX/UI designer crafting digital experiences from research to launch.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans antialiased bg-white text-black`}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
