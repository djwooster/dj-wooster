import { cn } from "@/lib/utils"

// The system stack renders San Francisco on Apple devices, which is what makes the screens read as real
export const iosFont = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", var(--font-sans), sans-serif'

/** A realistic iPhone: titanium band, side buttons, Dynamic Island and status bar. Screen is 280×600. */
export function IPhone({
  children,
  statusBar = "dark",
  className,
}: {
  children: React.ReactNode
  /** Color of the status bar glyphs: dark on light apps, light on dark ones */
  statusBar?: "dark" | "light"
  className?: string
}) {
  const glyph = statusBar === "dark" ? "#000" : "#fff"
  return (
    <div className={cn("relative w-[300px] shrink-0 select-none", className)}>
      {/* Side buttons */}
      <span aria-hidden className="absolute top-[118px] -left-[3px] h-7 w-[3px] rounded-l-sm bg-[#3a3a3c]" />
      <span aria-hidden className="absolute top-[164px] -left-[3px] h-12 w-[3px] rounded-l-sm bg-[#3a3a3c]" />
      <span aria-hidden className="absolute top-[222px] -left-[3px] h-12 w-[3px] rounded-l-sm bg-[#3a3a3c]" />
      <span aria-hidden className="absolute top-[190px] -right-[3px] h-20 w-[3px] rounded-r-sm bg-[#3a3a3c]" />

      <div
        className="rounded-[56px] p-[10px] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.55),inset_0_0_0_1.5px_rgba(255,255,255,0.12)]"
        style={{ background: "linear-gradient(145deg, #4a4a4d 0%, #1d1d1f 35%, #2c2c2e 70%, #4a4a4d 100%)" }}
      >
        <div className="relative h-[600px] overflow-hidden rounded-[46px] bg-black">
          {children}

          {/* Status bar */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-[50px] items-center justify-between px-[30px] pt-1 text-[15px] font-semibold"
            style={{ color: glyph, fontFamily: iosFont }}
          >
            <span className="w-[54px] text-center">9:41</span>
            <span className="flex items-center gap-[5px]">
              <svg viewBox="0 0 18 12" className="h-[11px] w-[17px]">
                {[0, 1, 2, 3].map((i) => (
                  <rect key={i} x={i * 4.6} y={9 - i * 3} width="3.2" height={3 + i * 3} rx="0.8" fill={glyph} />
                ))}
              </svg>
              <svg viewBox="0 0 16 12" className="h-[11px] w-[15px]">
                <path d="M8 11.2 10.4 8.6a3.4 3.4 0 0 0-4.8 0z" fill={glyph} />
                <path d="M3.9 6.9a5.8 5.8 0 0 1 8.2 0l1.3-1.4a7.8 7.8 0 0 0-10.8 0z" fill={glyph} />
                <path d="M1.3 4.1a9.5 9.5 0 0 1 13.4 0L16 2.7a11.4 11.4 0 0 0-16 0z" fill={glyph} />
              </svg>
              <svg viewBox="0 0 27 13" className="h-[12px] w-[26px]">
                <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" fill="none" stroke={glyph} strokeOpacity="0.4" />
                <rect x="2" y="2" width="18" height="9" rx="2" fill={glyph} />
                <path d="M25 4.5v4a2 2 0 0 0 0-4z" fill={glyph} fillOpacity="0.4" />
              </svg>
            </span>
          </div>

          {/* Dynamic Island */}
          <span aria-hidden className="absolute top-[11px] left-1/2 z-40 h-[33px] w-[112px] -translate-x-1/2 rounded-full bg-black" />

          {/* Home indicator */}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-[8px] left-1/2 z-30 h-[5px] w-[120px] -translate-x-1/2 rounded-full"
            style={{ background: glyph, opacity: 0.85 }}
          />
        </div>
      </div>
    </div>
  )
}
