"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { projects } from "@/data/projects";
import type { Project } from "@/types";

import ProjectVisual from "@/components/ui/ProjectVisual";
import SectionHead from "@/components/ui/SectionHead";

import { Arrow, ArrowUpRight, Github } from "@/components/ui/Icons";

const iconBtn =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone/70 transition-colors hover:border-gold hover:text-gold";

const pad = (n: number) => String(n + 1).padStart(2, "0");

/* Browser-style preview: real screenshot if there is one, gold motif otherwise */
function Preview({ p }: { p: Project }) {
  const shot = p.screenshots?.[0];

  return (
    <Link
      href={`/projects/${p.slug}`}
      data-cursor
      aria-label={`Open ${p.title} case study`}
      className="group/prev block overflow-hidden rounded-[18px] border border-gold/20 bg-ink/60"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
      </div>

      <div className="relative aspect-[16/10] overflow-hidden">
        {shot ? (
          <>
            <img
              src={shot}
              alt={`${p.title} project screenshot`}
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/prev:scale-[1.03] [filter:saturate(.85)_sepia(.1)_brightness(.92)_contrast(1.04)]"
            />
            <div className="absolute inset-0 bg-[#d8be8c]/10 mix-blend-soft-light" />
          </>
        ) : (
          <div className="absolute inset-0">
            <ProjectVisual motif={p.motif} />
          </div>
        )}
      </div>
    </Link>
  );
}

function Details({ p, i }: { p: Project; i: number }) {
  return (
    <div className="relative z-10 flex h-full flex-col justify-center">
      <p className="label uppercase tracking-[.2em]">{p.category}</p>

      <h3 className="display mt-4 text-[clamp(2.2rem,4vw,3.6rem)] leading-[.95] text-bone">
        {p.title}
      </h3>

      {p.subtitle && <p className="mt-3 text-base text-gold md:text-lg">{p.subtitle}</p>}

      <p className="mt-5 line-clamp-4 max-w-md text-[15px] leading-7 text-bone/60">
        {p.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {p.technologies.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-bone/55"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        {p.github ? (
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            data-cursor
          >
            VIEW CASE STUDY
            <Arrow />
          </a>
        ) : (
          <Link href={`/projects/${p.slug}`} className="btn-gold" data-cursor>
            VIEW CASE STUDY
            <Arrow />
          </Link>
        )}

        {p.github && (
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className={iconBtn}
            data-cursor
            aria-label={`${p.title} GitHub repository`}
          >
            <Github />
          </a>
        )}

        {p.liveUrl && (
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={iconBtn}
            data-cursor
            aria-label={`${p.title} live demo`}
          >
            <ArrowUpRight />
          </a>
        )}
      </div>

      {/* big faint index number behind the text */}
      <span
        aria-hidden="true"
        className="display pointer-events-none absolute -top-14 right-0 -z-10 select-none text-[clamp(6rem,10vw,9rem)] leading-none text-gold/[.08]"
      >
        {pad(i)}
      </span>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState(0);
  const p = projects[active];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setActive((a) => (a + 1) % projects.length);
    if (e.key === "ArrowLeft") setActive((a) => (a - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="relative border-t border-white/10 py-16 md:py-20">
      <div className="container-x">
        <SectionHead
          kicker="Projects"
          lines={["Selected work."]}
          note="Pick a project to preview it, then open the case study to see how it was built."
        />

        {/* SHOWCASE PANEL */}
        <div className="glass-card relative overflow-hidden rounded-[30px] p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className="order-2 lg:order-1 lg:col-span-5">
                <Details p={p} i={active} />
              </div>
              <div className="order-1 lg:order-2 lg:col-span-7">
                <Preview p={p} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* THUMBNAIL STRIP */}
        <div
          role="tablist"
          aria-label="Choose a project"
          onKeyDown={onKey}
          className="-mx-5 mt-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((proj, idx) => {
            const on = idx === active;
            return (
              <button
                key={proj.slug}
                type="button"
                role="tab"
                aria-selected={on}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(idx)}
                data-cursor
                className={`relative w-[168px] shrink-0 snap-start rounded-2xl border px-4 py-3.5 text-left transition-colors duration-300 ${
                  on
                    ? "border-gold/60 bg-gold/10"
                    : "border-white/10 hover:border-gold/30"
                }`}
              >
                <span className={`text-[10px] tracking-[.18em] ${on ? "text-gold" : "text-bone/45"}`}>
                  {pad(idx)}
                </span>
                <span
                  className={`mt-1 block truncate text-sm ${on ? "text-bone" : "text-bone/60"}`}
                >
                  {proj.title}
                </span>
                {on && (
                  <motion.span
                    layoutId="proj-progress"
                    className="absolute inset-x-4 bottom-0 h-px origin-left bg-gold"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
