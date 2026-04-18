"use client";

import { motion } from "framer-motion";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

const skillsGrid = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const categoryCard = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const tagItem = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

interface SkillCategory {
  title: string;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", "C++", "JavaScript", "HTML/CSS", "SQL", "Bash"],
  },
  {
    title: "ML / AI",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "YOLO", "Pandas", "NumPy", "Hugging Face"],
  },
  {
    title: "Cybersecurity",
    skills: ["Wireshark", "Snort", "Nmap", "VirusTotal", "Quark Engine", "Burp Suite", "Metasploit", "Kali Linux", "Android Malware Analysis"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Linux/Ubuntu", "Docker", "Git", "AWS", "n8n", "VS Code", "Jupyter"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div>
          <AnimatedHeading text="Skills" />
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

        {/* Staggered categories with nested tag stagger */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={skillsGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.title}
              variants={categoryCard}
              className="rounded-lg border border-border bg-gradient-to-br from-[#222228] to-[#282832] p-5"
            >
              <h3 className="font-mono text-accent text-sm uppercase tracking-wider mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={tagItem}
                    className="rounded-full border border-border bg-surface-light px-3 py-1 text-sm font-mono text-muted transition-colors duration-200 hover:border-accent/50 hover:text-foreground"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
