"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate, stagger, scroll } from "motion";

export function Experience() {
  const path    = usePathname();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 35 });

  useEffect(() => {
    if (reduced) return;

    /* Page-enter stagger for article / gallery / source hero elements */
    const heroEls = document.querySelectorAll(
      "main > .article-hero > *, main.source-page > h1, main.gallery-page > h1, main.gallery-page > .lead, main.source-page > .lead",
    );
    const ctrl = heroEls.length
      ? animate(
          heroEls,
          { opacity: [0, 1], y: [36, 0], filter: ["blur(6px)", "blur(0)"] },
          { duration: 0.8, delay: stagger(0.07), ease: [0.22, 1, 0.36, 1] },
        )
      : null;

    /* Subtle scroll-parallax on images inside landscape / gallery containers */
    const parallaxCleanups = [
      ...document.querySelectorAll<HTMLElement>(".landscape-photo, .gallery-preview"),
    ].map((container) => {
      const img = container.querySelector("img");
      if (!img) return () => {};
      const anim = animate(img, { y: ["-6%", "6%"], scale: [1.14, 1.14] }, { ease: "linear" });
      const stop = scroll(anim, { target: container, offset: ["start end", "end start"] });
      return () => { stop(); anim.cancel(); };
    });

    return () => {
      ctrl?.stop();
      parallaxCleanups.forEach((fn) => fn());
    };
  }, [path, reduced]);

  return (
    <motion.div
      className="reading-progress"
      style={{ scaleX: progress }}
      aria-hidden="true"
      role="progressbar"
      aria-label="Reading progress"
    />
  );
}
