"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function AnimatedHeading({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.h2
      className={`text-3xl font-bold mb-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ marginRight: "0.3em" }}
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}
