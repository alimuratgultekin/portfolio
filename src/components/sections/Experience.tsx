"use client";

import { motion } from "framer-motion";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

interface Position {
  role: string;
  company: string;
  date: string;
  description: string;
  tags: string[];
}

const positions: Position[] = [
  {
    role: "Research Assistant",
    company: "University of Michigan & University of Groningen",
    date: "Aug 2025 — Present",
    description:
      "Collaborated with professors on 2 research papers focusing on cybersecurity and machine learning, including Android malware detection using VirusTotal and Quark Engine.",
    tags: ["Python", "ML", "Cybersecurity", "Android Malware"],
  },
  {
    role: "Cybersecurity & ML Intern",
    company: "University of Groningen",
    date: "Jun 2025 — Aug 2025",
    description:
      "Built and evaluated Intrusion Detection Systems using machine learning techniques on network traffic data.",
    tags: ["Python", "ML", "Cybersecurity", "Docker", "Linux", "Snort", "Ubuntu"],
  },
  {
    role: "Deep Learning & Computer Vision Intern",
    company: "Inovako, Spain",
    date: "Jul 2024 — Oct 2024",
    description:
      "Labeled industrial datasets and developed a machine learning model using computer vision to detect and classify industrial components.",
    tags: ["Python", "PyTorch", "OpenCV", "Deep Learning", "Computer Vision"],
  },
  {
    role: "Assistant Project Manager",
    company: "NY Business Excellence",
    date: "Jul 2024 — Sep 2024",
    description:
      "Coordinated project workflows, managed documentation, and facilitated team communication across multiple initiatives.",
    tags: ["Project Management", "Communication"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div>
          <AnimatedHeading text="Experience" />
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

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

          <div className="space-y-10">
            {positions.map((pos, i) => (
              <motion.div
                key={i}
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="relative pl-10"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-accent bg-background" />

                {/* Card */}
                <div className="rounded-lg border border-border bg-gradient-to-br from-[#222228] to-[#282832] p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-black/20">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{pos.role}</h3>
                      <p className="text-accent text-sm">{pos.company}</p>
                    </div>
                    <span className="text-muted font-mono text-sm shrink-0">
                      {pos.date}
                    </span>
                  </div>
                  <p className="mt-3 text-muted text-sm leading-relaxed">
                    {pos.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {pos.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-surface-light px-3 py-1 text-xs font-mono text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
