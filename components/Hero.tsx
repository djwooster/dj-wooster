"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import { EASE } from "@/lib/motion";

const headline = ["Design", "that", "moves", "people."];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
};

const wordVariants: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: EASE },
  },
};

export default function Hero() {
  return (
    <section className="px-6 md:px-12 pt-32 md:pt-44 pb-16 md:pb-24">
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        className="text-xs tracking-widest uppercase text-black/40 mb-10"
      >
        UX / UI Designer &mdash; Available for work
      </motion.p>

      {/* Headline */}
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-[15vw] md:text-[10vw] lg:text-[9vw] font-black leading-[0.88] tracking-tight"
      >
        {headline.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden mr-[0.15em] last:mr-0"
          >
            <motion.span variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h1>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-black/10 pt-8"
      >
        <p className="text-base md:text-lg text-black/50 max-w-md leading-relaxed">
          I craft digital experiences from research to launch — turning complex
          problems into elegant, user-centred products that people actually want
          to use.
        </p>

        <Link
          href="/#work"
          className="inline-flex items-center gap-3 text-xs tracking-widest uppercase group self-start md:self-auto"
        >
          <span className="border-b border-black pb-0.5 group-hover:pr-4 transition-all duration-300">
            View Work
          </span>
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
