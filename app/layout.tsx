import type { Metadata } from "next"
import { Geist, Geist_Mono, Doto } from "next/font/google"
import "./globals.css"
import { site } from "@/lib/site"
import Providers from "@/components/Providers"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" })
const doto = Doto({ variable: "--font-doto", subsets: ["latin"], weight: ["700", "900"], display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "DJ Wooster — Software, built with intention", template: "%s — DJ Wooster" },
  description: site.description,
}

// Runs before paint: stored choice wins, otherwise follow the system setting
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})()`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} ${doto.variable} font-sans`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
