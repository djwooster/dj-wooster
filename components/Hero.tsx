"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
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
      {/* <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        className="text-sm tracking-widest uppercase text-black/40 mb-10"
      >
        UX / UI Designer &mdash;
      </motion.p> */}

      {/* Headline */}
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-[15vw] md:text-[10vw] lg:text-[7vw] font-black leading-[0.88] tracking-tight"
      >
        {headline.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] mr-[0.15em] last:mr-0"
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
        className="mt-6 md:mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
      >
        <p className="text-base md:text-2xl text-black/80 font-regular max-w-2lg leading-relaxed">
          I help product teams build the right thing. Right.
        </p>
      </motion.div>
    </section>
  );
}
