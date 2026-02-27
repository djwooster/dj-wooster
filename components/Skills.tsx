"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

const skills = [
  {
    number: "01",
    title: "User Research",
    description:
      "Interviews, surveys, and ethnographic studies to uncover real user needs before solutions are assumed.",
  },
  {
    number: "02",
    title: "Information Architecture",
    description:
      "Structuring content and navigation flows for clarity, hierarchy, and intuitive wayfinding.",
  },
  {
    number: "03",
    title: "Wireframing",
    description:
      "Low-fidelity blueprints that communicate structure and intent before visual design takes over.",
  },
  {
    number: "04",
    title: "Interaction Design",
    description:
      "Defining behaviours, states, and transitions that feel natural, responsive, and considered.",
  },
  {
    number: "05",
    title: "Prototyping",
    description:
      "High-fidelity prototypes for testing assumptions, validating flows, and aligning stakeholders.",
  },
  {
    number: "06",
    title: "Visual Design",
    description:
      "Typography, colour, and composition that build brand identity and create genuine delight.",
  },
  {
    number: "07",
    title: "Usability Testing",
    description:
      "Moderated and unmoderated sessions to validate designs and surface problems before launch.",
  },
  {
    number: "08",
    title: "Design Systems",
    description:
      "Scalable component libraries and documentation that keep product teams aligned and moving fast.",
  },
];

export default function Skills() {
  return (
    <section
      id="process"
      className="px-6 md:px-12 py-24 border-t border-black/10"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-4xl md:text-6xl lg:text-6xl font-black tracking-tight leading-[0.9]"
        >
          The full process,
          <br />
          end to end.
        </motion.h2>
        {/* <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs tracking-widest uppercase text-black/40"
        >
          What I do
        </motion.span> */}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-t border-black/10">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              delay: (i % 4) * 0.06,
              ease: EASE,
            }}
            className="group border-r border-b border-black/10 p-7 hover:bg-black hover:text-white transition-colors duration-400 cursor-default"
          >
            <span className="text-xs font-mono text-black/25 group-hover:text-white/30 block mb-6 transition-colors duration-400">
              {skill.number}
            </span>
            <h3 className="text-base font-bold mb-3 tracking-tight">
              {skill.title}
            </h3>
            <p className="text-sm text-black/45 group-hover:text-white/55 leading-relaxed transition-colors duration-400">
              {skill.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
