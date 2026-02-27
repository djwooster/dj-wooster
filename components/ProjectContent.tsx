"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { Project } from "@/lib/projects";
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
          <h2 className="text-base font-bold tracking-wide uppercase text-black pt-1">
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
              <p className="text-[10px] tracking-[0.3em] uppercase text-black/25 mb-8">
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
          {project.slug === "inbound-health" ? (
            <UserFlowDiagram />
          ) : project.slug === "workforce-mobile" ? (
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

        {/* Process image grid */}
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
          <p className="text-[10px] tracking-[0.3em] uppercase text-black/25 mb-10 self-start">
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
  );
}
