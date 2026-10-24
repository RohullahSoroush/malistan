"use client";

import { animate } from "motion";
import { useEffect, useRef } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (el) el.style.opacity = "1";
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate(
          el,
          { opacity: [0, 1], transform: ["translateY(52px)", "translateY(0)"], filter: ["blur(4px)", "blur(0px)"] },
          { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
        );
        observer.disconnect();
      },
      { threshold: 0.06 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal-wrap ${className}`}>
      {children}
    </div>
  );
}
