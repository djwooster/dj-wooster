"use client"

import { MotionConfig } from "framer-motion"

// reducedMotion="user" turns transform animations off when the OS asks for reduced motion
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
