import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Achievements from "@/components/sections/Achievements";
import Hackathons from "@/components/sections/Hackathons";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Sparkles from "@/components/ui/Sparkles";

export default function Home() {
  return (
    <>
      <Sparkles />

      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Achievements />
      <Hackathons />
      <Resume />
      <Contact />
      <Footer />
    </>
  );
}