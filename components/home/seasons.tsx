"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check, Leaf, Snowflake, Sprout, Sun, type LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { malistanClock, type SeasonId } from "@/lib/live";

const seasons: {
  id: SeasonId;
  name: string;
  native: string;
  months: string;
  icon: LucideIcon;
  title: string;
  text: string;
  points: string[];
}[] = [
  {
    id: "spring",
    name: "Spring",
    native: "بهار",
    months: "March – May",
    icon: Sprout,
    title: "Nowruz and the first furrows",
    text: "Nowruz, the Persian New Year, marks the end of winter's isolation. Roads reopen, families visit across the valleys, and the planting season begins.",
    points: ["Nowruz gatherings and shared meals", "Mountain roads reopen", "Fields are ploughed and sown"],
  },
  {
    id: "summer",
    name: "Summer",
    native: "تابستان",
    months: "June – August",
    icon: Sun,
    title: "A short, generous season",
    text: "Wheat, maize, peas and potatoes grow quickly in the thin mountain air, while sheep and goats graze the high summer pastures.",
    points: ["Wheat, maize, peas and potatoes", "Flocks on the high pastures", "Wool and dairy from the herds"],
  },
  {
    id: "autumn",
    name: "Autumn",
    native: "خزان",
    months: "September – November",
    icon: Leaf,
    title: "Harvest before the snow",
    text: "Grain, grapes and almonds are gathered in, and households lay up what they need for the months when the passes close.",
    points: ["Grapes and almonds", "Grain brought in and stored", "Homes readied for winter"],
  },
  {
    id: "winter",
    name: "Winter",
    native: "زمستان",
    months: "December – February",
    icon: Snowflake,
    title: "When the valleys go quiet",
    text: "Snow can cut villages off from each other and from the provincial capital for months. Life turns inward — to home, family, stories and songs.",
    points: ["Snow-closed mountain roads", "Long evenings with family", "Stories and songs at home"],
  },
];

const flakes = Array.from({ length: 16 }, (_, i) => ({ x: 18 + i * 31, d: 6 + (i % 5), delay: -(i * 1.3) % 8, r: 1.6 + (i % 3) * 0.8 }));
const leaves = Array.from({ length: 10 }, (_, i) => ({ x: 30 + i * 48, d: 7 + (i % 4), delay: -(i * 1.7) % 9 }));
const sprouts = [70, 140, 205, 300, 350, 470];
const poplars = [52, 74, 96, 404, 426, 448, 470];

function Scene({ season }: { season: SeasonId }) {
  return (
    <svg className={`scene scene--${season}`} viewBox="0 0 520 380" preserveAspectRatio="xMidYMax slice" role="img" aria-label={`Illustration of Malistan's valleys in ${season}`}>
      <rect className="scene__sky" width="520" height="380" />
      <g className="scene__sun">
        <circle className="scene__glow" cx="400" cy="92" r="70" />
        <g className="scene__rays">
          {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1="400" y1="40" x2="400" y2="28" transform={`rotate(${i * 30} 400 92)`} />
          ))}
        </g>
        <circle className="scene__disc" cx="400" cy="92" r="28" />
      </g>
      <g className="scene__birds">
        <path d="M150 96q8-8 16 0q8-8 16 0" />
        <path d="M196 74q6-6 12 0q6-6 12 0" />
        <path d="M120 70q5-5 10 0q5-5 10 0" />
      </g>
      <path className="scene__far" d="M0 252 70 170l50 36 70-86 60 70 50-40 70 60 60-70 90 82v158H0Z" />
      <path className="scene__snow" d="M190 120l-19 22 10 5 9-8 9 9 10-6Zm240 20-16 17 9 4 8-7 8 7 7-3Z" />
      <path className="scene__near" d="M0 302 90 222l60 42 80-72 90 78 70-34 130 66v78H0Z" />
      <path className="scene__snow" d="M230 192l-19 18 10 5 10-8 9 8 9-5Zm-140 30-15 14 8 3 8-6 7 5Z" />
      <path className="scene__ground" d="M0 322c120-22 220 10 320-8s140-12 200 4v62H0Z" />
      <g className="scene__trees">
        {poplars.map((x) => (
          <g key={x}>
            <rect className="scene__trunk" x={x - 1.5} y="292" width="3" height="34" rx="1.5" />
            <ellipse className="scene__crown" cx={x} cy="284" rx="9" ry="26" />
          </g>
        ))}
      </g>
      <g className="scene__house">
        <rect x="244" y="296" width="54" height="26" rx="2" />
        <rect x="236" y="292" width="70" height="6" rx="2" />
        <rect className="scene__window" x="256" y="304" width="9" height="9" rx="1.5" />
        <rect className="scene__window" x="277" y="304" width="9" height="9" rx="1.5" />
      </g>
      <g className="scene__sprouts">
        {sprouts.map((x) => (
          <path key={x} d={`M${x} 340v-10m0 4q-6-2-8-8q6 0 8 6m0-2q6-2 8-8q-6 0-8 6`} />
        ))}
      </g>
      <g className="scene__leaves">
        {leaves.map((l, i) => (
          <ellipse key={i} cx={l.x} cy="-10" rx="5" ry="2.6" style={{ animationDuration: `${l.d}s`, animationDelay: `${l.delay}s` }} />
        ))}
      </g>
      <g className="scene__flakes">
        {flakes.map((f, i) => (
          <circle key={i} cx={f.x} cy="-10" r={f.r} style={{ animationDuration: `${f.d}s`, animationDelay: `${f.delay}s` }} />
        ))}
      </g>
    </svg>
  );
}

const CYCLE_MS = 6500;

export function Seasons() {
  const [active, setActive] = useState<SeasonId>("spring");
  const [current, setCurrent] = useState<SeasonId | null>(null);
  const [touched, setTouched] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { margin: "-20% 0px -20% 0px" });
  const reduced = useReducedMotion();
  const cycling = inView && !touched && !reduced;
  const season = seasons.find((s) => s.id === active)!;

  // Open on the season it is right now in Malistan.
  useEffect(() => {
    const now = malistanClock(new Date()).season;
    setCurrent(now);
    setActive(now);
  }, []);

  useEffect(() => {
    if (!cycling) return;
    const id = setTimeout(() => {
      const i = seasons.findIndex((s) => s.id === active);
      setActive(seasons[(i + 1) % seasons.length].id);
    }, CYCLE_MS);
    return () => clearTimeout(id);
  }, [active, cycling]);

  const choose = (id: SeasonId) => {
    setTouched(true);
    setActive(id);
  };

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + seasons.length) % seasons.length;
    choose(seasons[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <section className="section" aria-labelledby="seasons-title">
      <div className="container">
        <Reveal>
          <SectionHeader
            id="seasons-title"
            eyebrow="A year in Malistan"
            title={<>Four seasons, <em>one rhythm</em></>}
            intro="At 2,800 metres the calendar is written by the mountains. Choose a season to see how life moves through the valleys."
          />
        </Reveal>

        <Reveal>
          <div className="seasons" ref={root}>
            <div className="seasons__tabs" role="tablist" aria-label="Seasons">
              {seasons.map((s, i) => {
                const selected = s.id === active;
                return (
                  <button
                    key={s.id}
                    ref={(el) => { tabs.current[i] = el; }}
                    type="button"
                    role="tab"
                    id={`season-tab-${s.id}`}
                    aria-selected={selected}
                    aria-controls="season-panel"
                    tabIndex={selected ? 0 : -1}
                    className="season-tab"
                    onClick={() => choose(s.id)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                  >
                    {selected && (
                      <motion.span layoutId="season-pill" className="season-tab__pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                    )}
                    <span className="season-tab__icon"><s.icon size={18} aria-hidden="true" /></span>
                    <span className="season-tab__text">
                      <strong>{s.name}</strong>
                      <small lang="fa">{s.native}</small>
                    </span>
                    {current === s.id && <span className="season-tab__now">Now</span>}
                    {selected && cycling && (
                      <span key={`${s.id}-cycle`} className="season-tab__progress" style={{ ["--cycle-ms" as string]: `${CYCLE_MS}ms` }} />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="seasons__stage">
              <div className="seasons__art">
                <Scene season={active} />
              </div>
              <div className="seasons__panel" role="tabpanel" id="season-panel" aria-labelledby={`season-tab-${active}`}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="seasons__copy"
                  >
                    <span className="seasons__months">{season.months}</span>
                    <span className="seasons__native" lang="fa" dir="rtl" aria-hidden="true">{season.native}</span>
                    <h3>{season.title}</h3>
                    <p>{season.text}</p>
                    <ul>
                      {season.points.map((p) => (
                        <li key={p}><Check size={16} aria-hidden="true" /> {p}</li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
