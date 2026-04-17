"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { MotionConfig } from "framer-motion";

interface SimpleModeContextType {
  simple: boolean;
  toggle: () => void;
}

const SimpleModeContext = createContext<SimpleModeContextType>({
  simple: false,
  toggle: () => {},
});

export function useSimpleMode() {
  return useContext(SimpleModeContext);
}

export default function SimpleModeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [simple, setSimple] = useState(false);

  // On mount: check URL param first, then localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("simple") === "true") {
      setSimple(true);
      localStorage.setItem("simpleMode", "true");
      return;
    }
    if (localStorage.getItem("simpleMode") === "true") {
      setSimple(true);
    }
  }, []);

  const toggle = () => {
    setSimple((prev) => {
      const next = !prev;
      localStorage.setItem("simpleMode", String(next));
      return next;
    });
  };

  return (
    <SimpleModeContext.Provider value={{ simple, toggle }}>
      {/* When simple mode is on, MotionConfig tells framer-motion to skip
          all animations (elements jump to final state instantly). */}
      <MotionConfig reducedMotion={simple ? "always" : "never"}>
        {children}
      </MotionConfig>
    </SimpleModeContext.Provider>
  );
}
