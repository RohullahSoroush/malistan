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
    label: "The green valleys",
    season: "Valley",
    alt: "Green fields, village buildings and mountains in Malistan",
  },
  {
    image: "/images/malistan-winter.webp",
    label: "A quieter kind of winter",
    season: "Winter",
    alt: "Winter snow blankets the mountains and villages of Malistan",
  },
];

export function CinematicHero() {
  const [scene, setScene] = useState(1);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduced || paused ? 0 : 180],
  );
  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduced || paused ? 0 : -80],
  );
  return (
    <section className="cinema-hero" ref={ref} aria-label="Welcome to Malistan">
      <motion.div className="cinema-landscape" style={{ y }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={scene}
            className="cinema-scene"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduced ? 0 : 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src={landscapes[scene].image}
              alt={landscapes[scene].alt}
              fill
              priority
              loading="eager"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="cinema-scrim" />
      <div className="cinema-topline">
        <span>
          <span className="live-dot" /> AN OPEN ARCHIVE OF HOME
        </span>
        <span>
          GHAZNI, AFGHANISTAN <ArrowUpRight size={13} />
        </span>
      </div>
      <motion.div className="cinema-heading" style={{ y: titleY }}>
        <div className="cinema-kicker">
          <span>THE PLACE WE CARRY WITH US</span>
          <span lang="fa" dir="rtl">
            سرزمین خاطره‌ها
          </span>
        </div>
        <h1 aria-label="Malistan">
          {"MALISTAN".split("").map((letter, i) => (
            <motion.span
              aria-hidden="true"
              key={i}
              initial={reduced ? false : { y: "110%", rotate: 5 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{
                duration: 1.15,
                delay: 0.1 + i * 0.065,
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
      <div className="cinema-bottom">
        <Link href="#intro" className="round-explore">
          <span>
            <ArrowDown size={22} />
          </span>
          <span>
            Step into
            <br />
            our story
          </span>
        </Link>
        <p>
          Somewhere between the mountains,
          <br />
          you find a little of yourself.
        </p>
        <div className="scene-switcher">
          <span className="scene-label">A DIFFERENT PERSPECTIVE</span>
          <div>
            {landscapes.map((s, i) => (
              <button
                aria-pressed={scene === i}
                key={s.season}
                className={scene === i ? "active" : ""}
                onClick={() => setScene(i)}
              >
                <span>0{i + 1}</span>
                {s.season}
                <ArrowUpRight size={13} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="cinema-caption">
        <span>
          <MapPin size={12} />
          {landscapes[scene].label} · Malistan
        </span>
        <button
          className="motion-toggle"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
          aria-label={
            paused ? "Enable landscape motion" : "Pause landscape motion"
          }
        >
          {paused ? <Play size={12} /> : <Pause size={12} />}
          <span>{paused ? "Motion off" : "Motion on"}</span>
        </button>
      </div>
    </section>
  );
}
