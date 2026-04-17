"use client";

import { useSimpleMode } from "@/components/SimpleModeProvider";

export default function SimpleModeToggle() {
  const { simple, toggle } = useSimpleMode();

  return (
    <button
      onClick={toggle}
      className="rounded-full border border-border bg-surface/80 backdrop-blur-sm px-4 py-1.5 font-mono text-xs text-muted transition-all duration-200 hover:border-accent/50 hover:text-foreground"
      aria-label={simple ? "Switch to full experience" : "Switch to simple mode"}
    >
      {simple ? "Full Experience" : "Simple Mode"}
    </button>
  );
}
