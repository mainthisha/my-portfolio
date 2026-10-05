import { MaskLines } from "./Reveal";

export default function SectionHead({ kicker, lines, note }: { kicker: string; lines?: string[]; note?: string }) {
  return (
    <header className="section-head mb-7 md:mb-9">
      <div className="flex items-end justify-between gap-8 border-b border-gold/15 pb-4 md:pb-5">
        <div>
          <p className="display section-kicker text-[clamp(3rem,6vw,5.6rem)] leading-[.88] text-gold">{kicker}</p>
          {lines?.length ? (
            <p className="mt-2 text-sm font-medium tracking-wide text-taupe/80 md:text-base">
              <MaskLines lines={lines} />
            </p>
          ) : null}
        </div>
        {note && <p className="hidden max-w-sm text-right text-xs leading-5 text-taupe/75 md:block">{note}</p>}
      </div>
    </header>
  );
}
