"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { EASE } from "@/lib/motion";

export default function FeaturedProjects() {
  return (
    <section id="work" className="px-6 md:px-12 py-24 border-t border-black/10">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-md tracking-widest uppercase text-black/60">
          Recent Work
        </h2>
        {/* <span className="text-xs tracking-widest uppercase text-black/30 font-mono">
          (03)
        </span> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
              className="group flex flex-col gap-6 py-4"
            >
              {/* Thumbnail */}
              <motion.div
                className="w-full h-[60vw] md:h-[28vw] bg-black/[0.04] overflow-hidden relative"
                whileHover={{ scale: 0.99 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black/8 to-transparent">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-black/20">
                      Preview
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Title + Arrow */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight group-hover:translate-x-2 transition-transform duration-300 ease-out">
                    {project.title}
                  </h3>
                  <p className="text-sm text-black/40 mt-1 tracking-wide">
                    {project.category} &nbsp;·&nbsp; {project.year}
                  </p>
                </div>
                <span className="text-xl text-black/20 group-hover:text-black group-hover:translate-x-2 transition-all duration-300 shrink-0 mt-1">
                  →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
