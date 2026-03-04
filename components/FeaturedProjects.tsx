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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project, i) => {
          const thumbnail = (
            <motion.div
              className={`w-full h-[60vw] md:h-[28vw] overflow-hidden relative ${
                project.comingSoon ? "bg-neutral-900" : "bg-black/4"
              }`}
              whileHover={project.comingSoon ? undefined : { scale: 0.99 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {project.comingSoon ? (
                <>
                  {project.thumbnail && (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/75" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                    <motion.p
                      className="text-5xl md:text-6xl font-black tracking-tight uppercase leading-none text-center text-white"
                      animate={{ opacity: [0.35, 0.7, 0.35] }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      Coming
                      <br />
                      Soon
                    </motion.p>
                    <motion.div
                      className="h-px w-10 bg-white"
                      animate={{ scaleX: [1, 2, 1], opacity: [0.2, 0.5, 0.2] }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ transformOrigin: "center" }}
                    />
                  </div>
                </>
              ) : project.thumbnail ? (
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
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
                  {project.year}
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
