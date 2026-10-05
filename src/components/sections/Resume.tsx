"use client";
import { profile } from "@/data/profile";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowUpRight } from "@/components/ui/Icons";
import Reveal from "@/components/ui/Reveal";

export default function Resume() {
  return (
    <section id="resume" className="relative border-t border-white/10 py-20 md:py-24">
      <div className="container-x">
        <div className="glass-card relative overflow-hidden rounded-[36px] p-8 md:p-12 lg:p-16">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-2/3 bg-[radial-gradient(circle_at_70%_30%,rgba(216,190,140,.12),transparent_60%)]" />
          <div className="relative grid items-center gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <p className="label uppercase tracking-[.25em]">Resume</p>
              <h2 className="display mt-5 max-w-4xl text-[clamp(3rem,7vw,7rem)] leading-[.84]">
                THE FULL
                <span className="block text-gold">STORY.</span>
              </h2>
              <p className="mt-7 max-w-xl text-[15px] leading-7 text-bone/55">
                Explore the complete record of my education, internships, technical skills, projects and certifications.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <MagneticButton href={profile.resumePath} download>DOWNLOAD RESUME ↓</MagneticButton>
                <MagneticButton href={profile.resumePath} external variant="line">OPEN RESUME <ArrowUpRight /></MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={.15} className="lg:col-span-4">
              <div className="rounded-[28px] border border-gold/15 bg-ink/50 p-7">
                <p className="label uppercase tracking-[.18em]">Current focus</p>
                <p className="display mt-5 text-2xl">AI + Web + Cloud</p>
                <p className="mt-3 text-sm leading-6 text-bone/50">{profile.degree}</p>
                <div className="mt-7 h-px bg-white/10" />
                <p className="mt-5 text-xs uppercase tracking-[.18em] text-gold">2024 — 2028</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
