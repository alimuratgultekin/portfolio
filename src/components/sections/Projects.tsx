"use client";

import { motion } from "framer-motion";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

const gridContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const gridItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
}

const projects: Project[] = [
  {
    title: "Android Malware Detection",
    description:
      "ML system using VirusTotal and Quark Engine combined with metadata to detect malicious Android applications.",
    tags: ["Python", "ML", "Cybersecurity", "VirusTotal", "Quark Engine"],
    github: "#",
  },
  {
    title: "Intrusion Detection System",
    description:
      "Machine learning pipeline using Random Forest and XGBoost to detect network intrusions.",
    tags: ["Python", "Scikit-learn", "Docker", "Cybersecurity"],
    github: "#",
  },
  {
    title: "Industrial Simulation Game",
    description:
      "Real-life simulation game for teaching supply chain and industrial engineering concepts.",
    tags: ["React", "JavaScript", "Game Development", "Education"],
    github: "#",
  },
  {
    title: "OpenSMILE Emotion Detection",
    description:
      "ML model trained to detect emotional states from voice recordings.",
    tags: ["Python", "ML", "Audio Processing", "OpenSMILE"],
    github: "#",
  },
  {
    title: "Medical Data Security Analysis",
    description:
      "Security analysis on NHANES dataset focusing on diabetes and heart attack prediction data.",
    tags: ["Python", "Data Analysis", "Healthcare", "Security"],
    github: "#",
  },
  {
    title: "Lung Cancer Detection",
    description:
      "Computer vision module detecting lung cancer nodules from CT scans using deep learning.",
    tags: ["Python", "PyTorch", "Computer Vision", "Medical AI"],
    github: "#",
  },
  {
    title: "Secure P2P Client Application",
    description:
      "Secure peer-to-peer messaging app with RSA enrollment, AES-CBC encryption, and ECC/HMAC handshake for session-key derivation and mutual authentication.",
    tags: ["Python", "Cryptography", "RSA", "AES", "ECC", "Tkinter"],
    github: "#",
  },
  {
    title: "Crime & Socioeconomic Analysis",
    description:
      "ML analysis of education and unemployment impact on crime rates using Random Forest, Logistic Regression, and KNN.",
    tags: ["Python", "Scikit-learn", "Data Analysis", "EDA"],
    github: "#",
  },
  {
    title: "Shopping Website",
    description:
      "Full-stack e-commerce website with responsive UI and MySQL backend.",
    tags: ["PHP", "MySQL", "XAMPP", "HTML/CSS"],
    github: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div>
          <AnimatedHeading text="Projects" />
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

        {/* Staggered grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={gridItem}>
              <div className="group h-full rounded-lg border border-border bg-gradient-to-br from-[#222228] to-[#282832] p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-accent/50 hover:shadow-[0_8px_30px_rgba(220,38,38,0.12)]">
                {/* Folder icon */}
                <svg
                  className="mb-4 h-8 w-8 text-accent transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>

                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-surface-light px-3 py-1 text-xs font-mono text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.github && (
                  <a
                    href={project.github}
                    className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-200 hover:text-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Code
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
