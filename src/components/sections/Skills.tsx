"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { skills } from "@/data/skills";

import SectionHead from "@/components/ui/SectionHead";
import GlassModal from "@/components/ui/GlassModal";

import {
  Code,
  Brain,
  Globe,
  Cloud,
  Wrench,
} from "@/components/ui/Icons";

const iconMap: Record<string, typeof Code> = {
  programming: Code,
  ai: Brain,
  ml: Brain,
  web: Globe,
  cloud: Cloud,
  tools: Wrench,
};

export default function Skills() {
  const groups = skills.filter(
    (skill) => skill.id !== "soft"
  );

  const [selected, setSelected] = useState<
    (typeof groups)[number] | null
  >(null);

  return (
    <section
      id="skills"
      className="relative border-t border-white/10 py-16 md:py-20"
    >
      <div className="container-x">

        <SectionHead
          kicker="Skills"
          lines={["Technologies I work with."]}
          note="A focused stack across programming, AI, data, web, cloud and engineering tools."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {groups.map((group, i) => {
            const Icon = iconMap[group.id] ?? Code;

            return (
              <motion.button
                type="button"
                key={group.id}
                onClick={() => setSelected(group)}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-10% 0px",
                }}
                transition={{
                  duration: 0.65,
                  delay: (i % 3) * 0.08,
                }}
                className="
                  glass-card
                  group
                  relative
                  overflow-hidden
                  rounded-[28px]
                  p-7
                  text-left
                  transition-transform
                  duration-300
                  hover:-translate-y-1
                  focus-visible:ring-1
                  focus-visible:ring-gold
                "
              >

                {/* HEADER */}

                <div className="relative z-10 flex items-center gap-4">

                  <span
                    className="
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-gold/35
                      bg-gold/[0.06]
                      text-gold
                      shadow-[0_0_28px_rgba(216,190,140,0.08)]
                      transition-all
                      duration-300
                      group-hover:border-gold/65
                      group-hover:bg-gold/[0.1]
                      group-hover:shadow-[0_0_35px_rgba(216,190,140,0.15)]
                    "
                  >
                    <Icon className="h-6 w-6" />
                  </span>

                  <div>

                    <p
                      className="
                        text-[10px]
                        uppercase
                        tracking-[0.18em]
                        text-gold/80
                      "
                    >
                      0{i + 1}
                    </p>

                    <h3
                      className="
                        display
                        text-[1.4rem]
                        leading-tight
                        text-bone
                        md:text-[1.5rem]
                      "
                    >
                      {group.title}
                    </h3>

                  </div>

                </div>

                {/* SKILLS */}

                <div className="relative z-10 mt-7 flex flex-wrap gap-2">

                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="
                        rounded-full
                        border
                        border-white/10
                        bg-black/10
                        px-3
                        py-2
                        text-xs
                        tracking-wide
                        text-bone/70
                        transition-all
                        duration-300
                        group-hover:border-gold/20
                        group-hover:text-bone/90
                      "
                    >
                      {item}
                    </span>
                  ))}

                </div>

                {/* FOOTER */}

                <div
                  className="
                    relative
                    z-10
                    mt-7
                    flex
                    items-center
                    justify-between
                  "
                >

                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.18em]
                      text-gold/65
                    "
                  >
                    Click to explore
                  </p>

                  <span
                    className="
                      h-px
                      w-10
                      bg-gradient-to-r
                      from-gold/50
                      to-transparent
                      transition-all
                      duration-300
                      group-hover:w-16
                    "
                  />

                </div>

              </motion.button>
            );
          })}

        </div>

        {/* SOFT SKILLS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
            glass-card
            mt-5
            rounded-[28px]
            p-6
            md:p-8
          "
        >

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-gold
            "
          >
            Soft Skills
          </p>

          <div className="mt-4 flex flex-wrap gap-3">

            {skills
              .find((skill) => skill.id === "soft")
              ?.items.map((item) => (
                <span
                  key={item}
                  className="
                    border
                    border-gold/25
                    bg-gold/[0.035]
                    px-4
                    py-2
                    text-sm
                    text-gold/80
                    transition-all
                    duration-300
                    hover:border-gold/50
                    hover:bg-gold/[0.07]
                  "
                >
                  {item}
                </span>
              ))}

          </div>

        </motion.div>

      </div>

      {/* MODAL */}

      <GlassModal
        open={!!selected}
        onClose={() => setSelected(null)}
        eyebrow="Skills"
        title={selected?.title ?? ""}
      >

        <p className="text-bone/75">
          A practical set of tools and technologies I use
          to build projects, experiment with ideas and turn
          concepts into working applications.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">

          {selected?.items.map((item) => (
            <span
              key={item}
              className="
                rounded-full
                border
                border-gold/25
                bg-gold/[0.05]
                px-4
                py-2
                text-xs
                text-gold
              "
            >
              {item}
            </span>
          ))}

        </div>

      </GlassModal>

    </section>
  );
}