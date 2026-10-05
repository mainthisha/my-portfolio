type P = { className?: string };
const base = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const Github = ({ className }: P) => (
  <svg {...base} className={className}><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /></svg>
);
export const Linkedin = ({ className }: P) => (
  <svg {...base} className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /></svg>
);
export const Mail = ({ className }: P) => (
  <svg {...base} className={className}><rect x="2" y="4" width="20" height="16" rx="1" /><path d="m22 7-10 6L2 7" /></svg>
);
export const Arrow = ({ className }: P) => (
  <svg {...base} width={16} height={16} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowUpRight = ({ className }: P) => (
  <svg {...base} width={16} height={16} className={className}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const Download = ({ className }: P) => (
  <svg {...base} width={16} height={16} className={className}><path d="M12 3v12m0 0-5-5m5 5 5-5M4 21h16" /></svg>
);
export const Pin = ({ className }: P) => (
  <svg {...base} className={className}><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
export const Phone = ({ className }: P) => (
  <svg {...base} className={className}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
);
export const Pdf = ({ className }: P) => (
  <svg {...base} width={28} height={28} className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h3M8 17h8" /></svg>
);
export const Trophy = ({ className }: P) => (
  <svg {...base} className={className}><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" /></svg>
);
export const Seal = ({ className }: P) => (
  <svg {...base} className={className}><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" /></svg>
);
export const Layers = ({ className }: P) => (
  <svg {...base} className={className}><path d="m12 2 10 6-10 6L2 8zM2 16l10 6 10-6" /></svg>
);

export const GraduationCap = ({ className }: P) => (
  <svg {...base} className={className}><path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 11.2V16c2.7 2.2 7.3 2.2 10 0v-4.8M21 10v6" /></svg>
);

export const Code = ({ className }: P) => (
  <svg {...base} className={className}><path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 6l-4 12" /></svg>
);
export const Brain = ({ className }: P) => (
  <svg {...base} className={className}><path d="M9 4a3 3 0 0 0-5 2.2A3.2 3.2 0 0 0 5 12a3.2 3.2 0 0 0-1 5.8A3 3 0 0 0 9 20a3 3 0 0 0 6 0 3 3 0 0 0 5-2.2A3.2 3.2 0 0 0 19 12a3.2 3.2 0 0 0 1-5.8A3 3 0 0 0 15 4a3 3 0 0 0-6 0Z"/><path d="M9 4v16M15 4v16M5 8h4M15 8h4M5 16h4M15 16h4" /></svg>
);
export const Globe = ({ className }: P) => (
  <svg {...base} className={className}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>
);
export const Cloud = ({ className }: P) => (
  <svg {...base} className={className}><path d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 9.5 4.5 4.5 0 0 0 7 18Z"/></svg>
);
export const Wrench = ({ className }: P) => (
  <svg {...base} className={className}><path d="M14.7 6.3a4.5 4.5 0 0 0-5.8 5.8L3.5 17.5a1.8 1.8 0 1 0 3 3l5.4-5.4a4.5 4.5 0 0 0 5.8-5.8l-2.8 2.8-2.1-.7-.7-2.1 2.6-3Z"/></svg>
);
export const Network = ({ className }: P) => (
  <svg {...base} className={className}><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="m7 7 3.5 8M17 7l-3.5 8M7 6h10"/></svg>
);
export const Briefcase = ({ className }: P) => (
  <svg {...base} className={className}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></svg>
);
export const X = ({ className }: P) => (
  <svg {...base} className={className}><path d="m6 6 12 12M18 6 6 18"/></svg>
);
