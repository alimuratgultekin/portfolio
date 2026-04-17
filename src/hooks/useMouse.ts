"use client";

import { useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number; // -1 to 1 (left to right)
  y: number; // -1 to 1 (top to bottom)
}

/**
 * Tracks mouse position as normalized coordinates (-1..1).
 * Returns null on touch devices (detected via pointer: coarse).
 * Uses requestAnimationFrame lerp smoothing for fluid motion.
 */
export function useMouse(lerpFactor = 0.2): MousePosition | null {
  const [isTouch, setIsTouch] = useState(false);
  const smoothed = useRef<MousePosition>({ x: 0, y: 0 });
  const target = useRef<MousePosition>({ x: 0, y: 0 });
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect touch devices
    const touchQuery = window.matchMedia("(pointer: coarse)");
    setIsTouch(touchQuery.matches);

    const handleTouchChange = (e: MediaQueryListEvent) => {
      setIsTouch(e.matches);
    };
    touchQuery.addEventListener("change", handleTouchChange);

    if (touchQuery.matches) {
      return () => touchQuery.removeEventListener("change", handleTouchChange);
    }

    // Mouse move handler — updates target (raw) position
    const handleMouseMove = (e: MouseEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Lerp loop for smooth interpolation
    const animate = () => {
      smoothed.current = {
        x: smoothed.current.x + (target.current.x - smoothed.current.x) * lerpFactor,
        y: smoothed.current.y + (target.current.y - smoothed.current.y) * lerpFactor,
      };
      setPosition({ x: smoothed.current.x, y: smoothed.current.y });
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      touchQuery.removeEventListener("change", handleTouchChange);
      cancelAnimationFrame(rafId.current);
    };
  }, [lerpFactor]);

  if (isTouch) return null;
  return position;
}
