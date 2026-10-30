"use client";
import { useEffect, useState } from "react";
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
/* =========================================================
   PROJECT STATUS
========================================================= */
function getStatus(p: Project, index: number) {
  if (p.status) return p.status;
  const fallbackStatuses = [
    "Featured Project",
    "AI Platform",
    "Full Stack App",
  ];
  return fallbackStatuses[index % fallbackStatuses.length];
}
/* =========================================================
   PROJECT PREVIEW
========================================================= */
function Preview({ p }: { p: Project }) {
  const shot = p.screenshots?.[0];
  return (
    <div className="relative">
      {/* Golden ambient glow */}
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[45px] bg-gold/[0.07] blur-[75px]" />
      <Link
        href={`/projects/${p.slug}`}
        data-cursor
        aria-label={`Open ${p.title} case study`}
        className="group/prev relative block overflow-hidden rounded-[22px] border border-gold/20 bg-ink/70 shadow-[0_0_60px_rgba(216,190,140,0.08)]"
      >
        {/* Browser-style header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </div>
          <span className="text-[9px] uppercase tracking-[0.2em] text-bone/25">
            Project Preview
          </span>
        </div>
        {/* Project screenshot */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {shot ? (
            <>
              <img
                src={shot}
                alt={`${p.title} project screenshot`}
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/prev:scale-[1.035] [filter:saturate(.85)_sepia(.1)_brightness(.92)_contrast(1.04)]"
              />
              <div className="absolute inset-0 bg-[#d8be8c]/10 mix-blend-soft-light" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0">
              <ProjectVisual motif={p.motif} />
            </div>
          )}
          {/* Open project button */}
          <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink/60 text-gold backdrop-blur-md transition-transform duration-300 group-hover/prev:rotate-45">
            <ArrowUpRight />
          </span>
        </div>
      </Link>
    </div>
  );
}
/* =========================================================
   PROJECT DETAILS
========================================================= */
function Details({ p, i }: { p: Project; i: number }) {
  const status = getStatus(p, i);
  return (
    <div className="relative z-10 flex h-full flex-col justify-center">
      {/* Project status */}
      <div className="flex items-center gap-3">
        <span className="h-px w-7 bg-gold/70" />
        <p className="text-[10px] uppercase tracking-[0.22em] text-gold">
          {status}
        </p>
      </div>
      {/* Project title */}
      <h3 className="display mt-4 text-[clamp(2.2rem,4vw,3.6rem)] leading-[.95] text-bone">
        {p.title}
      </h3>
      {/* Subtitle */}
      {p.subtitle && (
        <p className="mt-3 text-base text-gold md:text-lg">
          {p.subtitle}
        </p>
      )}
      {/* Description */}
      <p className="mt-5 line-clamp-4 max-w-md text-[15px] leading-7 text-bone/60">
        {p.summary}
      </p>
      {/* Technologies */}
      <div className="mt-5 flex flex-wrap gap-2">
        {p.technologies.slice(0, 4).map((technology) => (
          <span
            key={technology}
            className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-bone/55 transition-colors duration-300 hover:border-gold/30 hover:text-gold"
          >
            {technology}
          </span>
        ))}
      </div>
      {/* Buttons */}
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
          <Link
            href={`/projects/${p.slug}`}
            className="btn-gold"
            data-cursor
          >
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
      {/* Large faded project number */}
      <span
        aria-hidden="true"
        className="display pointer-events-none absolute -top-14 right-0 -z-10 select-none text-[clamp(6rem,10vw,9rem)] leading-none text-gold/[.08]"
      >
        {pad(i)}
      </span>
    </div>
  );
}
/* =========================================================
   MAIN PROJECTS SECTION
========================================================= */
export default function Projects() {
  const [active, setActive] = useState(0);
  const p = projects[active];
  /* =======================================================
     AUTO PLAY
     Changes project every 5 seconds
  ======================================================= */
  useEffect(() => {
    if (projects.length <= 1) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % projects.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);
  /* =======================================================
     KEYBOARD NAVIGATION
  ======================================================= */
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setActive((current) => (current + 1) % projects.length);
    }
    if (e.key === "ArrowLeft") {
      setActive(
        (current) => (current - 1 + projects.length) % projects.length
      );
    }
  };
  return (
    <section
      id="projects"
      className="relative border-t border-white/10 py-16 md:py-20"
    >
      <div className="container-x">
        {/* =================================================
            SECTION HEADER
        ================================================= */}
        <SectionHead
          kicker="Projects"
          lines={["Selected work."]}
          note="Explore selected projects, the technology behind them, and the ideas that shaped each build."
        />
        {/* =================================================
            MAIN SHOWCASE
        ================================================= */}
        <div className="glass-card relative overflow-hidden rounded-[30px] p-6 md:p-10">
          {/* Background ambient glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gold/[0.035] blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-gold/[0.025] blur-[100px]" />
          <AnimatePresence mode="wait">
            <motion.div
              key={p.slug}
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
            >
              {/* Project details */}
              <div className="order-2 lg:order-1 lg:col-span-5">
                <Details p={p} i={active} />
              </div>
              {/* Project preview */}
              <div className="order-1 lg:order-2 lg:col-span-7">
                <Preview p={p} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* =================================================
            PROJECT THUMBNAILS
            3 PER ROW ON DESKTOP
        ================================================= */}
        <div
          role="tablist"
          aria-label="Choose a project"
          onKeyDown={onKey}
          className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((proj, idx) => {
            const on = idx === active;
            const shot = proj.screenshots?.[0];
            return (
              <button
                key={proj.slug}
                type="button"
                role="tab"
                aria-selected={on}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(idx)}
                data-cursor
                className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-500 ${
                  on
                    ? "border-gold/60 bg-gold/[0.08] shadow-[0_0_35px_rgba(216,190,140,0.08)]"
                    : "border-white/10 bg-white/[0.015] hover:border-gold/30 hover:bg-white/[0.03]"
                }`}
              >
                {/* Thumbnail image */}
                <div className="relative aspect-[16/8] overflow-hidden">
                  {shot ? (
                    <img
                      src={shot}
                      alt=""
                      className={`h-full w-full object-cover object-top transition-all duration-500 ${
                        on
                          ? "scale-[1.02] opacity-100"
                          : "opacity-45 grayscale-[30%] group-hover:opacity-75"
                      }`}
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        on ? "opacity-100" : "opacity-60"
                      }`}
                    >
                      <ProjectVisual motif={proj.motif} />
                    </div>
                  )}
                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  {/* Project number */}
                  <span
                    className={`absolute left-4 top-3 text-[10px] tracking-[0.2em] transition-colors ${
                      on ? "text-gold" : "text-bone/35"
                    }`}
                  >
                    {pad(idx)}
                  </span>
                  {/* Active gold line */}
                  {on && (
                    <motion.span
                      layoutId="project-active-line"
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-gold"
                    />
                  )}
                </div>
                {/* Thumbnail information */}
                <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                  <div className="min-w-0">
                    <span
                      className={`block truncate text-sm transition-colors ${
                        on ? "text-bone" : "text-bone/55"
                      }`}
                    >
                      {proj.title}
                    </span>
                    <span
                      className={`mt-1 block truncate text-[9px] uppercase tracking-[0.16em] ${
                        on ? "text-gold/80" : "text-bone/25"
                      }`}
                    >
                      {getStatus(proj, idx)}
                    </span>
                  </div>
                  <ArrowUpRight
                    className={`shrink-0 transition-all duration-300 ${
                      on
                        ? "text-gold"
                        : "text-bone/20 group-hover:text-gold"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
        {/* =================================================
            AUTO PLAY PROGRESS INDICATOR
        ================================================= */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {projects.map((proj, idx) => (
            <button
              key={proj.slug}
              type="button"
              aria-label={`Go to project ${idx + 1}`}
              onClick={() => setActive(idx)}
              className="group h-4 w-10"
            >
              <span className="block h-px w-full overflow-hidden bg-white/10">
                {idx === active && (
                  <motion.span
                    key={active}
                    initial={{
                      scaleX: 0,
                    }}
                    animate={{
                      scaleX: 1,
                    }}
                    transition={{
                      duration: 5,
                      ease: "linear",
                    }}
                    className="block h-full origin-left bg-gold"
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}