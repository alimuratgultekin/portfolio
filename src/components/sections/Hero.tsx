"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import SimpleModeToggle from "@/components/ui/SimpleModeToggle";
import { useSimpleMode } from "@/components/SimpleModeProvider";

// Load Scene dynamically with SSR disabled to avoid hydration issues with Three.js.
// The loading spinner shows while the 3D bundle downloads and initializes.
const Scene = dynamic(() => import("@/components/3d/Scene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-24 w-24 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
    </div>
  ),
});

// Staggered letter animation for the name
const nameText = "Ali Murat Gültekin";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.5,
    },
  },
} as const;

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

const taglineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
      delay: 1.5,
    },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
      delay: 2.0,
    },
  },
};

const scrollIndicatorVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 2.5,
    },
  },
};

export default function Hero() {
  const { simple } = useSimpleMode();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 3D Background — only rendered in full mode */}
      {!simple && (
        <div className="absolute inset-0 z-0">
          <Scene />
        </div>
      )}

      {/* Simple Mode Toggle — above canvas, below navbar on mobile */}
      <div className="absolute top-20 right-4 z-40 pointer-events-auto md:top-6 md:right-6">
        <SimpleModeToggle />
      </div>

      {/* Text Overlay — z-10, pointer-events-none so hover reaches the 3D canvas behind */}
      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-4">
        {/* Name with staggered letter reveal */}
        <motion.h1
          className="text-[clamp(1.75rem,7.5vw,3rem)] font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={nameText}
        >
          {nameText.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className={
                // Accent color for last name (starts at index 10: "Gültekin")
                i >= 10 ? "text-accent" : ""
              }
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="mt-4 text-center font-mono text-sm text-muted sm:text-base md:text-lg"
          variants={taglineVariants}
          initial="hidden"
          animate="visible"
        >
          CS Student &middot; AI Agent Developer &middot; ML Engineer
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-8 flex gap-4 pointer-events-auto"
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
        >
          <a
            href="#projects"
            className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:-translate-y-0.5"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator — z-10 */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="visible"
      >
        <a href="#about">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <span className="text-xs font-mono text-muted/60">scroll</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent/50"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
