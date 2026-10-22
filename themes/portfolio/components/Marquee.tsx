"use client";

import { motion } from "framer-motion";

const companies = [
  "Memorial Sloan Kettering",
  "US Bank",
  "Inbound Health",
  "National Grid",
  // "Meta",
  // "Netflix",
  // "Stripe",
  // "Adobe",
  // "Figma",
  // "Notion",
  // "Shopify",
  // "Slack",
];

// Duplicate for seamless loop
const track = [...companies, ...companies];

export default function Marquee() {
  return (
    <section className="py-16 border-t border-b border-black/10 overflow-hidden">
      <p className="px-6 md:px-12 text-[12px] tracking-[0.3em] uppercase text-black/50 mb-8">
        Companies I&apos;ve worked with
      </p>

      <div className="relative flex">
        <motion.div
          className="flex items-center gap-16 flex-shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {track.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-3xl md:text-4xl font-black tracking-tight text-black/10 hover:text-black/80 transition-colors duration-500 whitespace-nowrap cursor-default select-none"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
