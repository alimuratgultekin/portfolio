"use client";

import { motion } from "framer-motion";
import { FormEvent } from "react";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Contact() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="mx-auto max-w-2xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <AnimatedHeading text="Let's Connect" className="text-center" />
          <motion.div
            className="h-1 w-16 bg-accent rounded mb-6 mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: "easeOut" as const,
            }}
            style={{ transformOrigin: "center" }}
          />
          <p className="text-muted mb-12">
            Have an idea, a question, or just want to say hi? Feel free to reach
            out&mdash;I&apos;m always open to new opportunities and
            collaborations.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-mono text-muted mb-1.5"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full rounded-lg border border-border bg-[#1e1e24] shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] px-4 py-2.5 text-foreground placeholder:text-muted/50 outline-none transition-colors duration-200 focus:border-accent"
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-mono text-muted mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-lg border border-border bg-[#1e1e24] shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] px-4 py-2.5 text-foreground placeholder:text-muted/50 outline-none transition-colors duration-200 focus:border-accent"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-mono text-muted mb-1.5"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full resize-none rounded-lg border border-border bg-[#1e1e24] shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] px-4 py-2.5 text-foreground placeholder:text-muted/50 outline-none transition-colors duration-200 focus:border-accent"
              placeholder="What's on your mind?"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-accent px-6 py-2.5 font-medium text-white transition-all duration-300 hover:bg-accent-dark hover:shadow-[0_0_20px_rgba(220,38,38,0.25)]"
          >
            Send Message
          </button>
        </motion.form>

        {/* Social links */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 flex items-center justify-center gap-6"
        >
          {/* GitHub */}
          <a
            href="https://github.com/alimuratgultekin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-all duration-200 hover:text-accent hover:scale-110"
            aria-label="GitHub"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/alimuratgultekin/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-all duration-200 hover:text-accent hover:scale-110"
            aria-label="LinkedIn"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:hello@example.com"
            className="text-muted transition-all duration-200 hover:text-accent hover:scale-110"
            aria-label="Email"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
