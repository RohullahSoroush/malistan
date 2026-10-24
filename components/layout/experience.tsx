"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

const MAX_TILT = 5;

export function Experience() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let tilted: HTMLElement | null = null;
    let magnet: HTMLElement | null = null;
    const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    const light = { x: pointer.x, y: pointer.y };

    const reset = (el: HTMLElement | null, ...props: string[]) => props.forEach((p) => el?.style.removeProperty(p));

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!(event.target instanceof Element)) return;
      const target = event.target;

      // Soft light under the cursor on cards
      const card = target.closest<HTMLElement>("[data-spotlight]");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - r.left}px`);
        card.style.setProperty("--my", `${event.clientY - r.top}px`);
      }
      if (!finePointer || reduced) return;

      // Gentle 3D tilt
      const tilt = target.closest<HTMLElement>("[data-tilt]");
      if (tilted && tilted !== tilt) reset(tilted, "--rx", "--ry");
      tilted = tilt;
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const nx = (event.clientX - r.left) / r.width - 0.5;
        const ny = (event.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty("--rx", `${(-ny * MAX_TILT).toFixed(2)}deg`);
        tilt.style.setProperty("--ry", `${(nx * MAX_TILT).toFixed(2)}deg`);
      }

      // Magnetic buttons
      const mag = target.closest<HTMLElement>("[data-magnetic]");
      if (magnet && magnet !== mag) reset(magnet, "--bx", "--by");
      magnet = mag;
      if (mag) {
        const r = mag.getBoundingClientRect();
        mag.style.setProperty("--bx", `${((event.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px`);
        mag.style.setProperty("--by", `${((event.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px`);
      }
    };

    const onLeave = () => {
      reset(tilted, "--rx", "--ry");
      reset(magnet, "--bx", "--by");
      tilted = magnet = null;
    };

    // Cursor light eases towards the pointer
    const tick = () => {
      light.x += (pointer.x - light.x) * 0.12;
      light.y += (pointer.y - light.y) * 0.12;
      if (glow.current) glow.current.style.transform = `translate3d(${light.x}px, ${light.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    if (finePointer && !reduced) frame = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <motion.div className="reading-progress" style={{ scaleX }} aria-hidden="true" />
      <div ref={glow} className="cursor-light" aria-hidden="true" />
    </>
  );
}
