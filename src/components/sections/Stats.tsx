"use client";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { certifications } from "@/data/certifications";
import { achievements } from "@/data/achievements";

const stats = [
  { n: projects.length, l: "Projects built" },
  { n: experience.length, l: "Internships" },
  { n: certifications.filter((c) => c.kind !== "award").length, l: "Certifications" },
  { n: achievements.length, l: "Achievements" },
];

export default function Stats() {
  return (
    <section aria-label="At a glance" className="relative border-t border-white/10 py-10">
      <div className="container-x grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-center md:text-left"
          >
            <p className="display text-[clamp(2.6rem,5vw,4.2rem)] leading-none text-gold">{String(s.n).padStart(2, "0")}</p>
            <p className="label mt-2 text-bone/55">{s.l}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
