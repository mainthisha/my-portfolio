"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experience } from "@/data/experience";
import SectionHead from "@/components/ui/SectionHead";
import GlassModal from "@/components/ui/GlassModal";
import { Briefcase, ArrowUpRight, X } from "@/components/ui/Icons";

const chip =
  "rounded-full border border-gold/25 px-3 py-1.5 text-[11px] text-bone/75";

const sectionLabel =
  "mb-3 text-[10px] uppercase tracking-[.22em] text-gold/70";

type Doc = { label: string; href: string };

function DocViewer({ doc, title, onClose }: { doc: Doc | null; title: string; onClose: () => void }) {
  useEffect(() => {
    if (!doc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [doc, onClose]);

  return (
    <AnimatePresence>
      {doc && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            data-lenis-prevent
            className="glass-modal relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-gold/25 p-5 md:p-7"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-ink/60 text-bone/70 transition-colors hover:border-gold/40 hover:text-gold"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="label uppercase tracking-[.2em] text-gold/80">{doc.label}</p>
            <h3 className="display mt-2 pr-12 text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.05] text-gold">
              {title}
            </h3>

            <div className="mt-5 overflow-hidden rounded-[16px] border border-gold/25 bg-[#0f0d0b] p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={doc.href} alt={`${title} - ${doc.label}`} className="h-auto w-full rounded-[10px]" />
            </div>

            <a
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-5"
              data-cursor
            >
              OPEN FULL SIZE <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Experience() {
  const [selected, setSelected] = useState<(typeof experience)[number] | null>(
    null
  );
  const [doc, setDoc] = useState<Doc | null>(null);

  return (
    <section
      id="experience"
      className="relative border-t border-white/10 py-16 md:py-20"
    >
      <div className="container-x">
        <SectionHead
          kicker="Experience"
          lines={["Where I’ve learned by building."]}
          note="Internship experience across AI, UI/UX, data analysis and full-stack development."
        />

        {/* TIMELINE */}
        <div className="relative">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent md:left-1/2 md:-translate-x-1/2" />

          {experience.map((e, i) => {
            const left = i % 2 === 0;
            return (
              <div
                key={e.role + e.company}
                className="relative py-3 pl-12 md:grid md:grid-cols-2 md:gap-16 md:py-4 md:pl-0"
              >
                <span className="absolute left-4 top-11 h-3 w-3 -translate-x-1/2 rounded-full border border-gold bg-ink shadow-[0_0_16px_rgba(216,190,140,.6)] md:left-1/2" />

                <motion.button
                  type="button"
                  onClick={() => setSelected(e)}
                  initial={{ opacity: 0, x: left ? -36 : 36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.7 }}
                  className={`glass-card group relative w-full overflow-hidden rounded-[26px] p-6 text-left transition-transform duration-300 hover:-translate-y-1 md:p-7 ${
                    left ? "md:col-start-1" : "md:col-start-2"
                  }`}
                >
                  <div className="relative flex items-start justify-between gap-5">
                    <div className="min-w-0 flex-1">
                      <p className="label uppercase tracking-[.18em] text-gold/75">
                        0{i + 1} / EXPERIENCE
                      </p>
                      <h3 className="display mt-3 text-[clamp(1.5rem,2.2vw,2.1rem)] leading-[1] text-bone">
                        {e.role}
                      </h3>
                      <p className="mt-3 text-base text-gold">
                        {e.company}
                        {e.period && (
                          <span className="ml-3 text-xs uppercase tracking-[.18em] text-bone/45">
                            {e.period}
                          </span>
                        )}
                      </p>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-ink text-gold">
                      <Briefcase className="h-5 w-5" />
                    </span>
                  </div>

                  {e.overview && (
                    <p className="relative mt-5 line-clamp-3 text-sm leading-6 text-bone/60">
                      {e.overview}
                    </p>
                  )}

                  {e.tools && (
                    <div className="relative mt-4 flex flex-wrap gap-2">
                      {e.tools.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-bone/55"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="relative mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[.18em] text-gold/65">
                    View internship details
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </motion.button>
              </div>
            );
          })}
        </div>
      </div>

      {/* EXPERIENCE DETAILS MODAL */}
      <GlassModal
        open={!!selected}
        onClose={() => { setDoc(null); setSelected(null); }}
        eyebrow={`${selected?.company ?? ""} · Internship${selected?.period ? ` · ${selected.period}` : ""}`}
        title={selected?.role ?? ""}
      >
        {selected?.overview && (
          <p className="text-[15px] leading-7 text-bone/75">
            {selected.overview}
          </p>
        )}

        {selected?.documents && selected.documents.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {selected.documents.map((d) => (
              <button
                key={d.href}
                type="button"
                onClick={() => setDoc(d)}
                data-cursor
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.18em] text-gold transition-colors hover:bg-gold hover:text-ink"
              >
                {d.label}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            ))}
          </div>
        )}

        <p className={`${sectionLabel} mt-7`}>What I worked on</p>
        <ul className="space-y-4">
          {selected?.points.map((p) => (
            <li
              key={p}
              className="flex gap-4 border-b border-white/10 pb-4 last:border-0"
            >
              <span className="mt-3 h-px w-7 shrink-0 bg-gold" />
              {p}
            </li>
          ))}
        </ul>

        {selected?.tools && (
          <div className="mt-7">
            <p className={sectionLabel}>Tools &amp; skills</p>
            <div className="flex flex-wrap gap-2">
              {selected.tools.map((t) => (
                <span key={t} className={chip}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {selected?.built && (
          <div className="mt-7">
            <p className={sectionLabel}>What I built</p>
            <div className="rounded-[20px] border border-gold/20 bg-white/[0.03] p-5">
              <p className="display text-2xl leading-none text-gold">
                {selected.built.name}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selected.built.stack.map((t) => (
                  <span key={t} className={chip}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </GlassModal>

      <DocViewer doc={doc} title={selected ? `${selected.company} · ${selected.role}` : ""} onClose={() => setDoc(null)} />
    </section>
  );
}