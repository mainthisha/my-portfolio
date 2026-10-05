import type Lenis from "lenis";

let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { instance = l; };

/**
 * Smooth-scroll to a hash on the current page.
 * Lands so the section's content starts just below the fixed navbar,
 * skipping the section's own top padding (that was the big empty gap).
 */
export function scrollToHash(hash: string) {
  if (hash === "#home") {
    if (instance) instance.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.querySelector(hash) as HTMLElement | null;
  if (!el) return;

  const header = document.querySelector("header") as HTMLElement | null;
  const headerH = header ? header.offsetHeight : 80;
  const padTop = parseFloat(getComputedStyle(el).paddingTop) || 0;
  const gap = 24; // breathing space between navbar and section heading
  const offset = padTop - headerH - gap;

  if (instance) {
    instance.scrollTo(el, { offset, duration: 1.4 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}