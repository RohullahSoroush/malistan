"use client";

import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSun, Moon, Snowflake, Sun, Sunrise, Sunset, Wind, type LucideIcon } from "lucide-react";
import { describeWeather, malistanClock, phaseLabel, useMalistanWeather, useNow, type DayPhase, type WeatherKind } from "@/lib/live";

const weatherIcons: Record<WeatherKind, LucideIcon> = {
  clear: Sun,
  partly: CloudSun,
  cloudy: Cloud,
  fog: CloudFog,
  rain: CloudRain,
  snow: Snowflake,
  storm: CloudLightning,
};
const phaseIcons: Record<DayPhase, LucideIcon> = { dawn: Sunrise, day: Sun, evening: Sunset, night: Moon };
const seasonNames = { spring: "Spring", summer: "Summer", autumn: "Autumn", winter: "Winter" };

export function LiveCard() {
  const now = useNow(1000);
  const weather = useMalistanWeather();
  const clock = now ? malistanClock(now) : null;
  const desc = weather ? describeWeather(weather.code) : null;
  const WeatherIcon = desc ? (desc.kind === "clear" && weather && !weather.isDay ? Moon : weatherIcons[desc.kind]) : null;
  const PhaseIcon = clock ? phaseIcons[clock.phase] : Sun;

  return (
    <div className="live-card" role="status" aria-live="off" aria-label={clock ? `Local time in Malistan ${clock.hh}:${clock.mm}` : "Local time in Malistan"}>
      <span className="live-card__head">
        <span className="pulse-dot" aria-hidden="true" /> Live in Malistan
      </span>
      <span className="live-card__time" aria-hidden="true">
        {clock ? clock.hh : "--"}
        <span className="live-card__colon">:</span>
        {clock ? clock.mm : "--"}
      </span>
      <span className="live-card__row">
        <PhaseIcon aria-hidden="true" />
        {clock ? `${phaseLabel[clock.phase]} · ${seasonNames[clock.season]}` : "Ghazni, Afghanistan"}
      </span>
      {weather && desc && WeatherIcon && (
        <span className="live-card__row live-card__weather">
          <WeatherIcon aria-hidden="true" />
          <strong>{weather.temp}°C</strong> <span className="live-card__label">{desc.label}</span>
          <span className="live-card__wind"><Wind aria-hidden="true" /> {weather.wind} km/h</span>
        </span>
      )}
    </div>
  );
}

export function LiveClock() {
  const now = useNow(15000);
  const clock = now ? malistanClock(now) : null;
  if (!clock) return null;
  return (
    <span className="live-clock">
      <span className="pulse-dot" aria-hidden="true" />
      It&apos;s {clock.hh}:{clock.mm} in Malistan · {phaseLabel[clock.phase].toLowerCase()}
    </span>
  );
}
