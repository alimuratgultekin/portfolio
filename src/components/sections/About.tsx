"use client";

import { useRef, useState, useEffect } from "react";
import { motion, animate, useInView } from "framer-motion";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const statsContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const statItem = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 1.5,
      ease: [0, 0, 0.2, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

const stats = [
  { target: 3, suffix: "+", label: "Internships" },
  { target: 1, suffix: "", label: "Publication" },
  { target: 5, suffix: "+", label: "Projects" },
  { target: 3, suffix: "", label: "Languages" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div>
          <AnimatedHeading text="About Me" />
          <motion.div
            className="h-1 w-16 bg-accent rounded mb-12"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: "easeOut" as const,
            }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Bio + Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <p className="text-muted leading-relaxed">
              I&apos;m a Computer Science student at Sabanc&iacute; University,
              graduating in May 2026. My work sits at the intersection of{" "}
              <span className="text-foreground font-medium">
                cybersecurity
              </span>
              ,{" "}
              <span className="text-foreground font-medium">
                machine learning
              </span>
              , and{" "}
              <span className="text-foreground font-medium">
                computer vision
              </span>
              &mdash;building systems that are both intelligent and secure.
            </p>
            <p className="text-muted leading-relaxed">
              I&apos;ve had the opportunity to work as a research assistant at
              the University of Michigan and intern at institutions across
              Europe, including the University of Groningen and Inovako in
              Spain. I&apos;m also a co-author on a paper currently under
              revision at the{" "}
              <span className="text-foreground font-medium italic">
                Computers &amp; Security
              </span>{" "}
              journal.
            </p>
            <p className="text-muted leading-relaxed">
              I speak English, Turkish, and conversational Spanish&mdash;and
              I&apos;m always looking for new challenges that push the
              boundaries of what software can do.
            </p>

            {/* Stats row — staggered reveal with count-up */}
            <motion.div
              className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4"
              variants={statsContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={statItem}
                  className="rounded-lg border border-border bg-gradient-to-br from-[#222228] to-[#282832] p-3 text-center transition-colors hover:border-accent/30"
                >
                  <div className="text-2xl font-bold text-accent">
                    <CountUp target={stat.target} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-xs font-mono text-muted">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Photo placeholder */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center justify-center"
          >
            <div className="aspect-square w-full max-w-sm rounded-lg border border-border bg-surface flex items-center justify-center">
              <span className="text-muted font-mono text-sm">photo</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
