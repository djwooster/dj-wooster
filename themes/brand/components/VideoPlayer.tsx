"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { track } from "@/lib/analytics"
import { SPRING } from "@/lib/motion"
import DotField from "@/components/motifs/DotField"
import { cn } from "@/lib/utils"

// A sales video: poster with one big play button, then native controls with sound.
// Until `src` is a real file it renders a labeled placeholder.
export default function VideoPlayer({
  src,
  poster,
  title,
  duration,
  trackAs,
  className,
}: {
  src?: string
  poster?: string
  title: string
  /** Shown on the poster, e.g. "4:32" */
  duration?: string
  trackAs: string
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const ready = Boolean(src && !src.startsWith("["))

  function play() {
    if (!ready) return
    setPlaying(true)
    track("cta_click", { label: `${trackAs}-play`, page: location.pathname })
    ref.current?.play()
  }

  return (
    <div className={cn("relative aspect-video overflow-hidden rounded-panel border border-line bg-surface", className)}>
      {ready && (
        <video
          ref={ref}
          src={src}
          poster={poster}
          controls={playing}
          playsInline
          preload="metadata"
          className="absolute inset-0 size-full object-cover"
        />
      )}
      {!ready && (
        <div aria-hidden className="absolute inset-0 [mask-image:radial-gradient(closest-side,black,transparent)]">
          <DotField variant="halftone" cols={80} rows={45} gap={12} focus={[0.5, 0.5]} seed={11} className="h-full w-full text-ink-3/60" />
        </div>
      )}

      <AnimatePresence>
        {!playing && (
          <motion.button
            type="button"
            onClick={play}
            disabled={!ready}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            aria-label={`Play: ${title}`}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-5 disabled:cursor-default"
          >
            <motion.span
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              transition={SPRING}
              className="flex size-20 items-center justify-center rounded-full bg-ink text-bg shadow-[0_16px_40px_-16px_rgba(0,0,0,0.5)] md:size-24"
            >
              <svg viewBox="0 0 24 24" className="ml-1 size-7 md:size-8" aria-hidden>
                <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />
              </svg>
            </motion.span>
            <span className="label-mono rounded-full border border-line bg-surface/90 px-3 py-1.5 text-ink-2 backdrop-blur">
              {ready ? `${title}${duration ? ` · ${duration}` : ""}` : "[TODO: hero video]"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
