"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { profile } from "@/data/profile";
import GlassModal from "@/components/ui/GlassModal";

export default function About() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [35, -35]);

  const [modal, setModal] = useState<"intro" | "education" | null>(null);

  return (
    <section
      id="about"
      ref={ref}
      className="relative border-t border-white/10 py-20 md:py-28"
    >
      {/* Background decoration */}
      <motion.span
        aria-hidden
        style={{ y }}
        className="display pointer-events-none absolute -left-4 top-0 select-none text-[clamp(8rem,24vw,22rem)] leading-none text-white/[0.018]"
      >
        MS
      </motion.span>

      <div className="container-x relative">

        {/* ========================================================= */}
        {/* ABOUT MAIN LAYOUT                                         */}
        {/* ========================================================= */}

        <div className="grid items-start gap-8 lg:grid-cols-[0.72fr_1fr_1fr]">

          {/* ======================================================= */}
          {/* LEFT ABOUT AREA                                         */}
          {/* ======================================================= */}

          <div className="pt-1 lg:pr-3">

            <p className="label uppercase tracking-[0.28em] text-gold">
              About me
            </p>

            <h2 className="display mt-5 text-[clamp(3.5rem,5.5vw,6.2rem)] leading-[0.82]">
              <span className="text-gold">CURIOUS.</span>
              <br />
              <span className="text-bone">BUILDING.</span>
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-6 text-taupe">
              {profile.degree}
            </p>

            <div className="mt-8 h-px w-14 bg-gold/70" />

            <div className="mt-7 space-y-2 text-xs text-bone/55">
              <p>Student · Coimbatore</p>
              <p>Open to opportunities</p>
            </div>

          </div>


          {/* ======================================================= */}
          {/* INTRODUCTION BOX                                        */}
          {/* ======================================================= */}

          <motion.button
            type="button"
            onClick={() => setModal("intro")}
            whileHover={{ y: -4 }}
            className="
              glass-gold
              box-border
              flex
              h-[540px]
              w-full
              min-w-0
              flex-col
              overflow-hidden
              rounded-[30px]
              p-7
              text-left
              md:p-9
            "
          >

            <p className="label">
              Introduction
            </p>

            <h3 className="mt-5 font-display text-[clamp(1.65rem,2.3vw,2.25rem)] leading-[1.08] text-bone">
              I build digital products where{" "}
              <span className="text-gold">
                intelligence meets clarity.
              </span>
            </h3>


            {/* ===================================================== */}
            {/* INTRODUCTION CONTENT                                  */}
            {/* ===================================================== */}

            <div className="mt-6 space-y-3.5 text-[13.5px] leading-[1.55rem] text-bone/65">

              <p>
                I’m an Artificial Intelligence & Data Science student with a
                strong interest in building practical technology that solves
                real-world problems.
              </p>

              <p>
                My interests span AI, data science, web development and cloud
                technologies, where I enjoy turning ideas into functional and
                meaningful digital experiences.
              </p>

              <p>
                Through projects, internships and continuous learning, I’m
                developing my skills by experimenting, building and improving
                with every experience.
              </p>

            </div>


            {/* ===================================================== */}
            {/* FOCUS AREAS                                            */}
            {/* ===================================================== */}

            <div className="mt-auto pt-4">

              <p className="label mb-3">
                Focus areas
              </p>

              <div className="flex w-full min-w-0 flex-nowrap items-center gap-1.5 overflow-visible whitespace-nowrap">

                {profile.focus.slice(0, 5).map((focus) => (
                  <span
                    key={focus}
                    className="
                      shrink-0
                      whitespace-nowrap
                      rounded-full
                      border
                      border-gold/20
                      bg-gold/[0.035]
                      px-2.5
                      py-1.5
                      text-[9px]
                      leading-none
                      text-bone/70
                      transition
                      duration-300
                      hover:border-gold/55
                      hover:text-gold
                    "
                  >
                    {focus}
                  </span>
                ))}

              </div>

            </div>


            {/* ===================================================== */}
            {/* BOTTOM INTRO NOTE                                      */}
            {/* ===================================================== */}

            <div className="mt-5 border-t border-gold/10 pt-4">

              <p className="text-[12px] leading-5 text-bone/45">
                I’m also interested in UI/UX and thoughtful interface design,
                creating experiences that feel simple, intuitive and engaging.
              </p>

            </div>

          </motion.button>


          {/* ======================================================= */}
          {/* EDUCATION BOX                                           */}
          {/* ======================================================= */}

          <motion.button
            type="button"
            onClick={() => setModal("education")}
            whileHover={{ y: -4 }}
            className="
              glass-gold
              box-border
              flex
              h-[540px]
              w-full
              min-w-0
              flex-col
              overflow-hidden
              rounded-[30px]
              p-7
              text-left
              md:p-9
            "
          >

            <p className="label">
              Education
            </p>


            {/* Education information */}
            <div className="mt-8">

              <p className="font-display text-[clamp(1.8rem,2.7vw,2.65rem)] leading-[1.04] text-bone">
                {profile.education.degree}
              </p>

              <p className="mt-5 text-base text-bone/60">
                {profile.education.school}
              </p>

              <p className="mt-2 text-sm text-gold">
                {profile.education.years}
              </p>

            </div>


            {/* Divider */}
            <div className="my-9 h-px w-full bg-gradient-to-r from-gold/55 via-gold/15 to-transparent" />


            {/* Education description */}
            <p className="text-[14px] leading-6 text-bone/60">
              Building a strong foundation across artificial intelligence,
              software development, data, cloud technologies and user-focused
              product design.
            </p>


            {/* Bottom area */}
            <div className="mt-auto flex items-end justify-between pt-8">

              <span className="text-[10px] uppercase tracking-[0.2em] text-taupe">
                Academic focus
              </span>

              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/30 text-gold">
                ↗
              </span>

            </div>

          </motion.button>

        </div>
      </div>


      {/* =========================================================== */}
      {/* INTRODUCTION MODAL                                          */}
      {/* =========================================================== */}

      <GlassModal
        open={modal === "intro"}
        onClose={() => setModal(null)}
        eyebrow="About me"
        title="Building with intention."
      >
        <p>
          I’m an Artificial Intelligence & Data Science student interested in
          creating practical technology that solves real-world problems.
        </p>

        <p className="mt-4">
          My interests span AI, data science, web development and cloud
          technologies. I enjoy turning ideas into functional and meaningful
          digital experiences.
        </p>

        <p className="mt-4">
          Through projects, internships and continuous learning, I’m
          constantly experimenting, building and improving my skills.
        </p>

        <p className="mt-4">
          I’m also interested in UI/UX and thoughtful interface design,
          creating experiences that feel simple, intuitive and engaging.
        </p>
      </GlassModal>


      {/* =========================================================== */}
      {/* EDUCATION MODAL                                             */}
      {/* =========================================================== */}

      <GlassModal
        open={modal === "education"}
        onClose={() => setModal(null)}
        eyebrow="Education"
        title={profile.education.degree}
      >
        <p>
          {profile.education.school} · {profile.education.years}
        </p>

        <p className="mt-4">
          My academic focus brings together artificial intelligence, data,
          software development and cloud technologies.
        </p>
      </GlassModal>

    </section>
  );
}