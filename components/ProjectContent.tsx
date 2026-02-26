"use client"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import type { Project } from "@/lib/projects"
import { EASE } from "@/lib/motion"

function PlaceholderImage({ label, tall = false }: { label: string; tall?: boolean }) {
  return (
    <div
      className={`w-full bg-black/[0.04] flex items-center justify-center ${tall ? "h-[60vw] md:h-[50vh]" : "h-[45vw] md:h-[40vh]"}`}
    >
      <span className="text-[10px] tracking-[0.3em] uppercase text-black/20">
        {label}
      </span>
    </div>
  )
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
}

export default function ProjectContent({ project }: { project: Project }) {
  return (
    <article>
      {/* Overview */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="px-6 md:px-12 py-20 border-b border-black/10"
      >
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
          <h2 className="text-xs tracking-widest uppercase text-black/40 pt-1">
            Overview
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed font-light text-black/80">
            {project.overview}
          </p>
        </div>
      </motion.section>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="px-6 md:px-12 py-8 border-b border-black/10"
      >
        <PlaceholderImage label="Hero Image — Full Width" tall />
      </motion.div>

      {/* Challenge */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="px-6 md:px-12 py-20 border-b border-black/10"
      >
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
          <h2 className="text-xs tracking-widest uppercase text-black/40 pt-1">
            The Challenge
          </h2>
          <div>
            <p className="text-base md:text-lg leading-relaxed text-black/65 mb-10">
              {project.challenge}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PlaceholderImage label="Research Photo" />
              <PlaceholderImage label="Whiteboard Session" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Process */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="px-6 md:px-12 py-20 border-b border-black/10"
      >
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
          <h2 className="text-xs tracking-widest uppercase text-black/40 pt-1">
            Process
          </h2>
          <div>
            <p className="text-base md:text-lg leading-relaxed text-black/65 mb-10">
              {project.process}
            </p>
          </div>
        </div>

        {/* Process image grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <PlaceholderImage label="Wireframes" />
          <PlaceholderImage label="Prototype" />
          <PlaceholderImage label="User Testing" />
        </div>
      </motion.section>

      {/* Final design image */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="px-6 md:px-12 py-8 border-b border-black/10"
      >
        <PlaceholderImage label="Final Design — Full Width" tall />
      </motion.div>

      {/* Outcome */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="px-6 md:px-12 py-20"
      >
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
          <h2 className="text-xs tracking-widest uppercase text-black/40 pt-1">
            Outcome
          </h2>
          <div>
            <p className="text-base md:text-lg leading-relaxed text-black/65 mb-12">
              {project.outcome}
            </p>

            {/* Next project link */}
            <div className="pt-8 border-t border-black/10">
              <p className="text-xs tracking-widest uppercase text-black/30 mb-2">
                Next Project
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </article>
  )
}
