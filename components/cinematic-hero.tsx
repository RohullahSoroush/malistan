"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "motion/react";
import { ArrowDown, ArrowUpRight, MapPin, Pause, Play } from "lucide-react";

const landscapes = [
  {
    image: "/images/malistan-valley.webp",
    label: "The green valleys · Summer",
    season: "Valley",
    alt: "Green fields, village buildings and mountains stretching across Malistan valley",
  },
  {
    image: "/images/malistan-winter.webp",
    label: "A quieter world · Winter",
    season: "Winter",
    alt: "Snow blankets the mountains and villages of Malistan in deep winter",
  },
];

const letters = "MALISTAN".split("");

export function CinematicHero() {
  const [scene, setScene] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY  = useTransform(scrollYProgress, [0, 1], [0, reduced || paused ? 0 : 180]);
  const hY   = useTransform(scrollYProgress, [0, 1], [0, reduced || paused ? 0 : -70]);

  return (
    <section className="cinema-hero" ref={ref} aria-label="Welcome to Malistan">
      {/* Parallax background */}
      <motion.div className="cinema-landscape" style={{ y: bgY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={scene}
            className="cinema-scene"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: reduced ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={landscapes[scene].image}
              alt={landscapes[scene].alt}
              fill priority loading="eager" sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="cinema-scrim" />

      {/* Top info bar */}
      <div className="cinema-topline">
        <span>
          <span className="live-dot" aria-hidden="true" />
          AN OPEN ARCHIVE OF HOME
        </span>
        <span>
          GHAZNI PROVINCE, AFGHANISTAN <ArrowUpRight size={11} aria-hidden="true" />
        </span>
      </div>

      {/* Main headline */}
      <motion.div className="cinema-heading" style={{ y: hY }}>
        <div className="cinema-kicker">
          <span>THE PLACE WE CARRY WITH US</span>
          <span lang="fa" dir="rtl">سرزمین خاطره‌ها</span>
        </div>

        <h1 aria-label="Malistan">
          {letters.map((letter, i) => (
            <motion.span
              aria-hidden="true"
              key={i}
              initial={reduced ? false : { y: "115%", rotate: 4, opacity: 0 }}
              animate={{ y: "0%", rotate: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.08 + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <div className="cinema-subtitle">
          <span>
            A place. A people. <em>A feeling.</em>
          </span>
          <span className="cinema-native" lang="fa" dir="rtl">
            مالستان
          </span>
        </div>
      </motion.div>

      {/* Bottom row */}
      <div className="cinema-bottom">
        <Link href="#intro" className="round-explore">
          <span aria-hidden="true"><ArrowDown size={20} /></span>
          <span>
            Step into<br />our story
          </span>
        </Link>

        <p>
          Between the mountains,<br />
          something calls you home.
        </p>

        <div className="scene-switcher">
          <span className="scene-label">CHANGE THE VIEW</span>
          <div>
            {landscapes.map((s, i) => (
              <button
                key={s.season}
                aria-pressed={scene === i}
                className={scene === i ? "active" : ""}
                onClick={() => setScene(i)}
              >
                <span>0{i + 1}</span>
                {s.season}
                <ArrowUpRight size={12} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Caption bar */}
      <div className="cinema-caption">
        <span>
          <MapPin size={11} aria-hidden="true" />
          {landscapes[scene].label} · Malistan
        </span>
        <button
          className="motion-toggle"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
          aria-label={paused ? "Enable parallax motion" : "Pause parallax motion"}
        >
          {paused ? <Play size={11} aria-hidden="true" /> : <Pause size={11} aria-hidden="true" />}
          <span>{paused ? "Motion paused" : "Motion live"}</span>
        </button>
      </div>
    </section>
  );
}
