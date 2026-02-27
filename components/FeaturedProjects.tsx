"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { EASE } from "@/lib/motion";

function PhonePlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black/5 to-transparent">
      <div
        className="border border-black/20 bg-white flex flex-col"
        style={{ width: "72px", height: "128px" }}
      >
        {/* Status bar */}
        <div className="h-2.5 shrink-0 bg-black/3 flex items-center justify-between px-1.5">
          <div className="w-4 h-0.5 bg-black/15" />
          <div className="w-3 h-0.5 bg-black/15" />
        </div>
        {/* Nav */}
        <div className="h-5 border-b border-black/8 shrink-0" />
        {/* Content */}
        <div className="flex-1 p-1.5 overflow-hidden">
          <div className="w-full border border-black/10 h-8 mb-1.5" />
          <div className="grid grid-cols-3 gap-0.5 mb-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-4 border border-black/10" />
            ))}
          </div>
          <div className="space-y-1">
            <div className="w-full h-0.5 bg-black/8" />
            <div className="w-4/5 h-0.5 bg-black/8" />
            <div className="w-3/5 h-0.5 bg-black/8" />
          </div>
        </div>
        {/* Tab bar */}
        <div className="h-3 border-t border-black/8 shrink-0 flex items-center justify-around px-2">
          <div className="w-1 h-1 bg-black/40" />
          <div className="w-1 h-1 bg-black/15" />
          <div className="w-1 h-1 bg-black/15" />
          <div className="w-1 h-1 bg-black/15" />
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="work" className="px-6 md:px-12 py-24 border-t border-black/10">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-md tracking-widest uppercase text-black/60">
          Recent Work
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project, i) => {
          const thumbnail = (
            <motion.div
              className="w-full h-[60vw] md:h-[28vw] bg-black/4 overflow-hidden relative"
              whileHover={project.comingSoon ? undefined : { scale: 0.99 }}
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
              ) : project.slug === "workforce-mobile" ? (
                <PhonePlaceholder />
              ) : project.comingSoon ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-black/5 to-transparent">
                  <motion.p
                    className="text-5xl md:text-6xl font-black tracking-tight uppercase leading-none text-center text-black"
                    animate={{ opacity: [0.35, 0.7, 0.35] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Coming<br />Soon
                  </motion.p>
                  <motion.div
                    className="h-px w-10 bg-black"
                    animate={{ scaleX: [1, 2, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "center" }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black/8 to-transparent">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-black/20">
                    Preview
                  </span>
                </div>
              )}
            </motion.div>
          );

          const meta = (
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  className={`text-xl md:text-2xl font-black tracking-tight leading-tight transition-transform duration-300 ease-out ${
                    !project.comingSoon ? "group-hover:translate-x-2" : ""
                  }`}
                >
                  {project.title}
                </h3>
                <p className="text-[15px] text-black/55 mt-1 tracking-wide">
                  {project.category}&nbsp;·&nbsp;{project.year}
                </p>
              </div>
              {!project.comingSoon && (
                <span className="text-xl text-black/20 group-hover:text-black group-hover:translate-x-2 transition-all duration-300 shrink-0 mt-1">
                  →
                </span>
              )}
            </div>
          );

          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
            >
              {project.comingSoon ? (
                <div className="flex flex-col gap-6 py-4 cursor-default">
                  {thumbnail}
                  {meta}
                </div>
              ) : (
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col gap-6 py-4"
                >
                  {thumbnail}
                  {meta}
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
