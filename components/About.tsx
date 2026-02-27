"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

const stats = [
  { value: "8+", label: "Years of experience" },
  { value: "25+", label: "Projects delivered" },
  { value: "20+", label: "Companies worked with" },
];

export default function About() {
  return (
    <section
      id="about"
      className="px-6 md:px-12 py-24 border-t border-black/10"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-24">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="text-sm tracking-widest uppercase text-black/40 mb-6">
            About
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.92]">
            Designing with
            <br />
            intent, clarity,
            <br />
            and craft.
          </h2>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="flex flex-col justify-between gap-10"
        >
          <div className="space-y-5 text-base md:text-lg text-black/60 leading-relaxed">
            <p>
              I&apos;m DJ Wooster — a UX/UI designer who believes great design
              is invisible. I work across the full product lifecycle, from
              shaping early concepts with research and strategy to delivering
              pixel-perfect interfaces and scalable design systems.
            </p>
            <p>
              I&apos;ve partnered with startups, scale-ups, and established
              brands across fintech, e-commerce, and SaaS. My process is
              rigorous and collaborative — I embed with teams, speak the
              language of engineering, and stay grounded in what real users
              actually need.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-0 border-t border-black/10 pt-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="pr-6"
              >
                <p className="text-3xl md:text-4xl font-black tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs text-black/40 tracking-wide mt-1 leading-snug">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
