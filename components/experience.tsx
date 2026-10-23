"use client";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate, stagger, scroll } from "motion";

export function Experience() {
  const path = usePathname();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });
  useEffect(() => {
    if (reduced) return;
    const elements = document.querySelectorAll(
      "main > .article-hero > *, main.source-page > h1, main.gallery-page > h1",
    );
    const controls = elements.length
      ? animate(
          elements,
          { opacity: [0.2, 1], y: [35, 0] },
          { duration: 0.85, delay: stagger(0.08), ease: [0.22, 1, 0.36, 1] },
        )
      : null;
    const parallax = [
      ...document.querySelectorAll<HTMLElement>(
        ".landscape-photo, .gallery-preview",
      ),
    ].map((container) => {
      const image = container.querySelector("img");
      if (!image) return () => {};
      const animation = animate(
        image,
        { y: ["-7%", "7%"], scale: [1.16, 1.16] },
        { ease: "linear" },
      );
      const stop = scroll(animation, {
        target: container,
        offset: ["start end", "end start"],
      });
      return () => {
        stop();
        animation.cancel();
      };
    });
    return () => {
      controls?.stop();
      parallax.forEach((stop) => stop());
    };
  }, [path, reduced]);
  return (
    <motion.div
      className="reading-progress"
      style={{ scaleX: progress }}
      aria-hidden="true"
    />
  );
}
