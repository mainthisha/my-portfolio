import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/data/profile";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Loader from "@/components/ui/Loader";
import Navbar from "@/components/ui/Navbar";
import Atmosphere from "@/components/ui/Atmosphere";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: `${profile.name} — AI & Data Science`, template: `%s — ${profile.name}` },
  description: `${profile.name}. ${profile.degree}. ${profile.tagline}`,
  openGraph: { title: profile.name, description: profile.tagline, type: "website" },
  twitter: { card: "summary_large_image", title: profile.name, description: profile.tagline },
};
export const viewport: Viewport = { themeColor: "#0d0c0b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Hanken+Grotesk:wght@300;400;500;600&display=swap"
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <Atmosphere />
        <Loader />
        <SmoothScroll />
        <Cursor />
        <ScrollProgress />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
