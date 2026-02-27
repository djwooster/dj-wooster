"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import type { Project } from "@/lib/projects"
import { EASE } from "@/lib/motion"

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="px-6 md:px-12 pt-28 md:pt-40 pb-12 md:pb-20 border-b border-black/10">
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-12"
      >
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-black/55 hover:text-black transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">
            ←
          </span>
          <span>All Work</span>
        </Link>
      </motion.div>

      {/* Meta row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
        className="flex flex-wrap items-center gap-4 mb-8"
      >
        <span className="text-xs tracking-widest uppercase text-black/55">
          {project.year}
        </span>
        <span className="text-black/20">·</span>
        <span className="text-xs tracking-widest uppercase text-black/55">
          {project.client}
        </span>
        <span className="text-black/20">·</span>
        <span className="text-xs tracking-widest uppercase text-black/55">
          {project.category}
        </span>
      </motion.div>

      {/* Title */}
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="text-[12vw] md:text-[9vw] font-black tracking-tight leading-[0.88]"
        >
          {project.title}
        </motion.h1>
      </div>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="flex flex-wrap gap-3 mt-10 pt-8 border-t border-black/10"
      >
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-4 py-1.5 border border-black/25 text-[10px] tracking-widest uppercase text-black/70"
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </section>
  )
}
