import Link from "next/link";
import Footer from "@/components/sections/Footer";

export default function NotFound() {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="pointer-events-none absolute -right-40 top-1/2 h-[70vw] max-h-[900px] w-[70vw] max-w-[900px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(216,190,140,.18),transparent_65%)]" />
        <div className="container-x relative">
          <p className="label">Error 404</p>
          <h1 className="display mt-4 text-[clamp(6rem,24vw,20rem)] text-gold">404</h1>
          <p className="display mt-2 max-w-xl text-4xl italic text-bone/90 sm:text-5xl">This page isn&apos;t part of the collection.</p>
          <p className="mt-6 max-w-md text-taupe">The link may be broken, or the page may have moved. Head back to the start or browse the projects.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/" className="btn-gold" data-cursor>BACK HOME</Link>
            <Link href="/#projects" className="btn-line" data-cursor>VIEW PROJECTS</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
