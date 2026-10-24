"use client";

import Image from "next/image";
import { useEffect, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowRight, Images, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveCard } from "@/components/live/live-card";
import { malistanClock, useNow } from "@/lib/live";
import { Motes } from "./motes";

const SCENE_MS = 7000;
const ease = [0.22, 1, 0.36, 1] as const;

const scenes = [
  {
    image: "/images/malistan-valley.webp",
    season: "Summer",
    title: "The green valley",
    alt: "Green fields, poplar trees and a village building beneath misty mountains in Malistan",
  },
  {
    image: "/images/malistan-winter.webp",
    season: "Winter",
    title: "Snow on the peaks",
    alt: "Snow covering the mountains and villages of Malistan in winter",
  },
];

export function Hero() {
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduced = useReducedMotion();
  const autoplay = playing && !reduced;
  const now = useNow(60000);
  const phase = now ? malistanClock(now).phase : "day";

  // Pointer parallax: the photo, sun and copy drift at different depths.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const mediaX = useTransform(sx, (v) => v * -14);
  const mediaY = useTransform(sy, (v) => v * -10);
  const sunX = useTransform(sx, (v) => v * 36);
  const sunY = useTransform(sy, (v) => v * 24);
  const copyX = useTransform(sx, (v) => v * 6);
  const copyY = useTransform(sy, (v) => v * 4);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => { px.set(0); py.set(0); };

  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => setScene((s) => (s + 1) % scenes.length), SCENE_MS);
    return () => clearTimeout(id);
  }, [scene, autoplay]);

  const rise = (delay: number) =>
    reduced
      ? {}
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__frame" data-phase={phase} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
          <motion.div className="hero__parallax" style={{ x: mediaX, y: mediaY }}>
            <AnimatePresence initial={false}>
              <motion.div
                key={scene}
                className="hero__media"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 1.6, ease }}
              >
                <Image
                  className="hero__img"
                  src={scenes[scene].image}
                  alt={scenes[scene].alt}
                  fill
                  priority
                  sizes="(max-width: 1240px) 100vw, 1200px"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <div className="hero__shade" />
          <motion.div className="hero__sun" style={{ x: sunX, y: sunY }} aria-hidden="true" />
          <div className="hero__beam" aria-hidden="true" />
          {!reduced && <Motes variant={scene === 1 ? "snow" : "pollen"} />}

          <motion.div className="hero__live" {...rise(1)}>
            <LiveCard />
          </motion.div>

          <motion.div className="hero__content" style={{ x: copyX, y: copyY }}>
            <motion.span className="hero__badge" {...rise(0.1)}>
              <span className="pulse-dot" aria-hidden="true" /> Ghazni Province · Central Afghanistan
            </motion.span>

            <h1 id="hero-title" className="hero__title" aria-label="Malistan, مالستان">
              <span className="hero__word" aria-hidden="true">
                {"Malistan".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    className="hero__letter"
                    initial={reduced ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.1, delay: 0.2 + i * 0.05, ease }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              <motion.span className="hero__native" lang="fa" dir="rtl" aria-hidden="true" {...rise(0.75)}>
                مالستان
              </motion.span>
            </h1>

            <motion.p className="hero__lead" {...rise(0.6)}>
              A mountain district in the heart of Hazarajat — its valleys and winters, its music and
              language, and the people who carry it home wherever they go.
            </motion.p>

            <motion.div className="hero__actions" {...rise(0.75)}>
              <Button href="#explore" size="lg" data-magnetic>
                Start exploring <ArrowRight aria-hidden="true" />
              </Button>
              <Button href="/gallery" variant="glass" size="lg" data-magnetic>
                <Images aria-hidden="true" /> View the gallery
              </Button>
            </motion.div>
          </motion.div>

          <motion.div className="hero__scenes" role="group" aria-label="Choose a landscape" {...rise(0.9)}>
            {scenes.map((s, i) => (
              <button
                key={s.season}
                type="button"
                className="scene-btn"
                aria-pressed={scene === i}
                onClick={() => setScene(i)}
              >
                <span className="scene-btn__thumb">
                  <Image src={s.image} alt="" fill sizes="44px" />
                </span>
                <span>
                  <small>{s.season}</small>
                  <strong>{s.title}</strong>
                </span>
                {scene === i && autoplay && (
                  <span
                    key={`${scene}-progress`}
                    className="scene-btn__progress"
                    style={{ ["--scene-ms" as string]: `${SCENE_MS}ms` }}
                  />
                )}
              </button>
            ))}
            {!reduced && (
              <button
                type="button"
                className="scene-play"
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                onClick={() => setPlaying((p) => !p)}
              >
                {playing ? <Pause size={16} /> : <Play size={16} />}
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
