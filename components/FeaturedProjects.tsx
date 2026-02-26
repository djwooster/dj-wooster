"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { EASE } from "@/lib/motion";

export default function FeaturedProjects() {
  return (
    <section id="work" className="px-6 md:px-12 py-24 border-t border-black/10">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="text-xs tracking-widest uppercase text-black/40">
          Selected Work
        </h2>
        <span className="text-xs tracking-widest uppercase text-black/30 font-mono">
          (03)
        </span>
      </div>

      <div>
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.8,
              delay: i * 0.08,
              ease: EASE,
            }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12 py-10 border-b border-black/10 hover:border-black transition-colors duration-300"
            >
              {/* Index + Title */}
              <div className="flex items-start gap-6 md:gap-8 flex-1">
                <span className="text-xs text-black/25 tracking-widest font-mono mt-2 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none group-hover:translate-x-2 transition-transform duration-400 ease-out">
                    {project.title}
                  </h3>
                  <p className="text-sm text-black/40 mt-2 tracking-wide">
                    {project.category} &nbsp;·&nbsp; {project.year}
                  </p>
                </div>
              </div>

              {/* Thumbnail */}
              <motion.div
                className="w-full md:w-52 h-36 md:h-32 bg-black/[0.04] overflow-hidden flex-shrink-0"
                whileHover={{ scale: 0.96 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black/8 to-transparent">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-black/20">
                    Preview
                  </span>
                </div>
              </motion.div>

              {/* Arrow */}
              <span className="hidden md:block text-xl text-black/20 group-hover:text-black group-hover:translate-x-2 transition-all duration-300 flex-shrink-0">
                →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
