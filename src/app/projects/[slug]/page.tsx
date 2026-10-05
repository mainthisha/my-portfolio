import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import ProjectVisual from "@/components/ui/ProjectVisual";
import Footer from "@/components/sections/Footer";
import { Arrow, ArrowUpRight, Github } from "@/components/ui/Icons";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  return p ? { title: p.title, description: p.summary } : {};
}

function Row({ n, label, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-white/10 py-9 md:grid-cols-[160px_1fr] md:gap-8 md:py-10">
      <h2 className="label flex items-center gap-3">
        <span className="text-gold">{n}</span>
        {label}
      </h2>
      <div>{children}</div>
    </section>
  );
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  const idx = projects.findIndex((x) => x.slug === p.slug) + 1;

  const hero = p.screenshots?.[0];
  const gallery = p.screenshots?.slice(1) ?? [];

  let count = 0;
  const num = () => String(++count).padStart(2, "0");

  const facts: [string, string][] = [
    ["Category", p.category],
    ["Status", p.status ?? "Completed"],
    ...(p.impact ? ([["Highlight", p.impact]] as [string, string][]) : []),
    ["Built by", profile.name],
  ];

  return (
    <>
      <main className="container-x pb-20 pt-28 md:pt-32">
        <Link
          href="/#projects"
          className="label inline-flex items-center gap-2 transition-colors hover:text-gold"
          data-cursor
        >
          <Arrow className="rotate-180" /> All projects
        </Link>

        {/* HERO */}
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="label mb-5 flex items-center gap-3">
              <span className="text-gold">
                {String(idx).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
              <span className="h-px w-8 bg-white/20" />
              {p.category}
            </p>

            <h1 className="display text-[clamp(2.2rem,4.2vw,3.8rem)] leading-[1]">{p.title}</h1>

            {p.subtitle && <p className="mt-4 text-lg text-gold">{p.subtitle}</p>}

            <p className="mt-5 max-w-[52ch] text-[15px] leading-7 text-bone/60">{p.summary}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-gold" data-cursor>
                  LIVE DEMO <ArrowUpRight />
                </a>
              )}
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-line" data-cursor>
                  <Github /> GITHUB
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-[24px] bg-[#0f0d0b] ring-1 ring-gold/20">
              {hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={hero} alt={`${p.title} cover`} className="block h-auto w-full" />
              ) : (
                <div className="aspect-[16/10]">
                  <ProjectVisual motif={p.motif} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FACTS */}
        <dl className="mt-12 grid divide-y divide-white/10 border-y border-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {facts.map(([k, v]) => (
            <div key={k} className="px-0 py-4 sm:px-5 lg:first:pl-0">
              <dt className="label">{k}</dt>
              <dd className={`mt-1.5 text-[15px] ${k === "Status" ? "text-gold" : "text-bone/85"}`}>{v}</dd>
            </div>
          ))}
        </dl>

        {/* SECTIONS */}
        <div className="mt-6">
          <Row n={num()} label="Overview">
            <p className="max-w-[62ch] text-lg leading-8 text-bone/85">{p.overview}</p>
          </Row>

          {(p.problem || p.solution) && (
            <Row n={num()} label="Problem → Solution">
              <div className="grid gap-5 sm:grid-cols-2">
                {p.problem && (
                  <div className="rounded-[18px] border border-white/10 p-5">
                    <p className="label mb-2">The problem</p>
                    <p className="text-[15px] leading-7 text-bone/70">{p.problem}</p>
                  </div>
                )}
                {p.solution && (
                  <div className="rounded-[18px] border border-gold/40 bg-gold/[.04] p-5">
                    <p className="label mb-2 text-gold">The solution</p>
                    <p className="text-[15px] leading-7 text-bone/80">{p.solution}</p>
                  </div>
                )}
              </div>
            </Row>
          )}

          <Row n={num()} label="Features">
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {p.features.map((f, i) => (
                <li key={f} className="flex items-baseline gap-4 border-b border-white/10 py-3.5 text-[16px] text-bone/85">
                  <span className="text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                  {f}
                </li>
              ))}
            </ul>
          </Row>

          <Row n={num()} label="Stack">
            <ul className="flex flex-wrap gap-2.5">
              {p.technologies.map((t) => (
                <li key={t} className="rounded-full border border-gold/40 px-4 py-2 text-[13px] text-bone/90">
                  {t}
                </li>
              ))}
            </ul>
          </Row>

          {p.context && (
            <Row n={num()} label="Context">
              <p className="max-w-[62ch] text-[16px] leading-7 text-bone/75">{p.context}</p>
            </Row>
          )}

          {gallery.length > 0 && (
            <Row n={num()} label="Gallery">
              <div className="grid gap-4 sm:grid-cols-2">
                {gallery.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt={`${p.title} screenshot ${i + 2}`}
                    loading="lazy"
                    className="w-full rounded-[16px] ring-1 ring-white/10"
                  />
                ))}
              </div>
            </Row>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}