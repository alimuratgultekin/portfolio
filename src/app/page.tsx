import SimpleModeProvider from "@/components/SimpleModeProvider";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <SimpleModeProvider>
      {/* Skip link — invisible + non-interactive until focused via Tab key */}
      <a
        href="#about"
        className="fixed left-4 top-4 z-[100] rounded-lg bg-accent px-4 py-2 font-medium text-white opacity-0 pointer-events-none focus:opacity-100 focus:pointer-events-auto transition-opacity"
      >
        Skip to content
      </a>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </SimpleModeProvider>
  );
}
