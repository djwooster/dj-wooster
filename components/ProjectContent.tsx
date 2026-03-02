"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { Project, ProjectAct, ProjectContext } from "@/lib/projects";
import { EASE } from "@/lib/motion";
import UserFlowDiagram from "@/components/UserFlowDiagram";
import WorkforceFlowDiagram from "@/components/WorkforceFlowDiagram";
import ConstructionPersona from "@/components/ConstructionPersona";
import WorkforceWireframes from "@/components/WorkforceWireframes";

function PlaceholderImage({
  label,
  tall = false,
}: {
  label: string;
  tall?: boolean;
}) {
  return (
    <div
      className={`w-full bg-black/[0.04] flex items-center justify-center ${tall ? "h-[60vw] md:h-[50vh]" : "h-[45vw] md:h-[40vh]"}`}
    >
      <span className="text-[10px] tracking-[0.3em] uppercase text-black/20">
        {label}
      </span>
    </div>
  );
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

function ActSection({ act }: { act: ProjectAct }) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="px-6 md:px-12 py-20 border-b border-black/10"
    >
      {/* Act header */}
      <div className="flex items-start justify-between mb-14">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-black/35 mb-2">
            Act {act.number}
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
            {act.name}
          </h2>
        </div>
        <p className="text-xs tracking-widest uppercase text-black/35 text-right hidden md:block">
          {act.surface}
        </p>
      </div>

      {/* Outcome — the skimmable hook */}
      <p className="text-3xl md:text-4xl font-black tracking-tight leading-[1.1] mb-8 max-w-3xl">
        {act.outcome}
      </p>

      {/* Design decision */}
      <p className="text-base md:text-lg text-black/65 leading-relaxed max-w-2xl mb-14">
        {act.decision}
      </p>

      {/* Research insights */}
      {act.researchInsights && (
        <div className="mb-14 border-t border-black/10 pt-10">
          <p className="text-xs tracking-[0.3em] uppercase text-black/35 mb-6">
            Key Insights
          </p>
          <ul className="space-y-5 max-w-2xl">
            {act.researchInsights.map((insight, i) => (
              <li key={i} className="flex gap-5">
                <span className="text-xs font-mono text-black/25 flex-shrink-0 pt-[3px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm md:text-base text-black/65 leading-relaxed">
                  {insight}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Images */}
      {act.images && act.images.length > 0 ? (
        <div
          className={`grid gap-4 ${act.images.length > 1 ? "grid-cols-1 md:grid-cols-2" : ""}`}
        >
          {act.images.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`${act.name} interface`}
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-auto"
            />
          ))}
        </div>
      ) : (
        <PlaceholderImage label={`${act.name} — Interface`} />
      )}
    </motion.section>
  );
}

export default function ProjectContent({ project }: { project: Project }) {
  return (
    <article>
      {project.acts ? (
        <>
          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="px-6 md:px-12 py-8 border-b border-black/10"
          >
            {project.heroImage ? (
              <Image
                src={project.heroImage}
                alt={project.title}
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, 60vw"
                className="w-[75vw] h-auto mx-auto block"
                priority
              />
            ) : (
              <PlaceholderImage label="Hero Image — Full Width" tall />
            )}
          </motion.div>

          {/* Context */}
          {project.context && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="px-6 md:px-12 py-14 border-b border-black/10"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {(
                  [
                    { label: "Role", value: project.context.role },
                    { label: "Timeline", value: project.context.timeline },
                    { label: "Team", value: project.context.team },
                    { label: "Scope", value: project.context.scope },
                  ] as { label: string; value: string }[]
                ).map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs tracking-[0.3em] uppercase text-black/35 mb-2">
                      {label}
                    </p>
                    <p className="text-sm text-black/70 leading-relaxed">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Problem */}
          {project.problem && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="px-6 md:px-12 py-20 border-b border-black/10"
            >
              <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
                <h2 className="text-3xl font-bold tracking-[-.03em] uppercase text-black pt-1">
                  The Problem
                </h2>
                <p className="text-xl md:text-2xl leading-relaxed font-light text-black/80">
                  {project.problem}
                </p>
              </div>
            </motion.section>
          )}

          {/* Three acts */}
          {project.acts.map((act) => (
            <ActSection key={act.number} act={act} />
          ))}

          {/* Systems note */}
          {project.systemsNote && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="px-6 md:px-12 py-20 border-b border-black/10"
            >
              <p className="text-xs tracking-[0.3em] uppercase text-black/35 mb-6">
                Design System
              </p>
              <p className="text-base md:text-lg text-black/65 leading-relaxed max-w-2xl">
                {project.systemsNote}
              </p>
            </motion.section>
          )}

          {/* Outcome */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="px-6 md:px-12 py-20"
          >
            <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
              <h2 className="text-3xl font-bold tracking-[-.03em] uppercase text-black pt-1">
                Outcome
              </h2>
              <div>
                <p className="text-base md:text-lg leading-relaxed text-black/65 mb-12">
                  {project.outcome}
                </p>
                <div className="pt-8 border-t border-black/10">
                  <p className="text-sm tracking-widest uppercase text-black/30 mb-2">
                    Next Project
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </>
      ) : (
        <>
          {/* Overview */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="px-6 md:px-12 py-20 border-b border-black/10"
          >
            <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
              <h2 className="text-3xl font-bold tracking-[-.03em] uppercase text-black pt-1">
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
            {project.heroImage ? (
              <Image
                src={project.heroImage}
                alt={project.title}
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, 60vw"
                className="w-[75vw] h-auto mx-auto block"
                priority
              />
            ) : (
              <PlaceholderImage label="Hero Image — Full Width" tall />
            )}
          </motion.div>

          {/* Challenge */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="px-6 md:px-12 py-20 border-b border-black/10"
          >
            <h2 className="text-3xl font-bold tracking-[-.03em] uppercase text-black mb-3">
              The Challenge
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-black/65 max-w-2xl mb-12">
              {project.challenge}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.researchImage ? (
                <div className="w-full border border-black/10 bg-black/[0.02] p-6 md:p-10">
                  <p className="text-xs font-medium tracking-[0.3em] uppercase text-black/50 mb-8">
                    {project.researchImageLabel ?? "User Research"}
                  </p>
                  <Image
                    src={project.researchImage}
                    alt="Research"
                    width={0}
                    height={0}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="w-full h-auto"
                  />
                </div>
              ) : project.slug === "workforce-mobile" ? (
                <ConstructionPersona />
              ) : (
                <PlaceholderImage label="Research Photo" />
              )}
              {project.slug === "workforce-mobile" ? (
                <WorkforceFlowDiagram />
              ) : (
                <PlaceholderImage label="Whiteboard Session" />
              )}
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
            <h2 className="text-3xl font-bold tracking-[-.03em] uppercase text-black mb-3">
              Process
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-black/65 max-w-2xl mb-12">
              {project.process}
            </p>

            {project.slug === "workforce-mobile" ? (
              <WorkforceWireframes />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { src: project.processImage1, label: "Wireframes" },
                  { src: project.processImage2, label: "Prototype" },
                ].map(({ src, label }) => (
                  <div
                    key={label}
                    className="w-full border border-black/10 bg-black/2 p-6"
                  >
                    {src ? (
                      <Image
                        src={src}
                        alt={label}
                        width={0}
                        height={0}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="w-full h-auto"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-32">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-black/20">
                          {label}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Prototype GIF */}
          {project.prototypeGif && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="px-6 md:px-12 py-16 border-b border-black/10 flex flex-col items-center"
            >
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-black/50 mb-10 self-start">
                Prototype
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.prototypeGif}
                alt="Prototype in action"
                className="w-full max-w-[400px] h-auto block"
              />
            </motion.div>
          )}

          {/* Final design images */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="px-6 md:px-12 py-8 border-b border-black/10 flex flex-col items-center gap-6"
          >
            {project.finalImages && project.finalImages.length > 0 ? (
              project.finalImages.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`Final design ${i + 1}`}
                  width={0}
                  height={0}
                  sizes="80vw"
                  className="w-[80vw] h-auto block"
                />
              ))
            ) : (
              <PlaceholderImage label="Final Design — Full Width" tall />
            )}
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
              <h2 className="text-3xl font-bold tracking-[-.03em] uppercase text-black pt-1">
                Outcome
              </h2>
              <div>
                <p className="text-base md:text-lg leading-relaxed text-black/65 mb-12">
                  {project.outcome}
                </p>
                <div className="pt-8 border-t border-black/10">
                  <p className="text-sm tracking-widest uppercase text-black/30 mb-2">
                    Next Project
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </>
      )}
    </article>
  );
}
