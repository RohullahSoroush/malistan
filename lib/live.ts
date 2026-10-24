"use client";

import { useEffect, useState } from "react";

export type SeasonId = "spring" | "summer" | "autumn" | "winter";
export type DayPhase = "dawn" | "day" | "evening" | "night";

const TIME_ZONE = "Asia/Kabul";
const timeFormat = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
const monthFormat = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, month: "numeric" });

export function malistanClock(date: Date) {
  const [hh, mm] = timeFormat.format(date).split(":");
  const hour = Number(hh);
  const month = Number(monthFormat.format(date));
  return { hh, mm, hour, month, phase: dayPhase(hour), season: seasonFor(month) };
}

export function seasonFor(month: number): SeasonId {
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

function dayPhase(hour: number): DayPhase {
  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "evening";
  return "night";
}

export const phaseLabel: Record<DayPhase, string> = {
  dawn: "Sunrise",
  day: "Daytime",
  evening: "Evening",
  night: "Night",
};

/** Current time, refreshed on an interval. `null` until mounted so server and client markup match. */
export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

export type Weather = { temp: number; code: number; isDay: boolean; wind: number };

let weatherRequest: Promise<Weather | null> | null = null;

function fetchWeather(): Promise<Weather | null> {
  weatherRequest ??= fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=33.2953&longitude=67.1689&current=temperature_2m,weather_code,is_day,wind_speed_10m&timezone=Asia%2FKabul",
  )
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      const c = data?.current;
      if (!c || typeof c.temperature_2m !== "number") return null;
      return { temp: Math.round(c.temperature_2m), code: c.weather_code, isDay: c.is_day === 1, wind: Math.round(c.wind_speed_10m) };
    })
    .catch(() => null);
  return weatherRequest;
}

export function useMalistanWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);
  useEffect(() => {
    let alive = true;
    fetchWeather().then((w) => { if (alive) setWeather(w); });
    return () => { alive = false; };
  }, []);
  return weather;
}

export type WeatherKind = "clear" | "partly" | "cloudy" | "fog" | "rain" | "snow" | "storm";

/** WMO weather interpretation codes, as used by Open-Meteo. */
export function describeWeather(code: number): { label: string; kind: WeatherKind } {
  if (code === 0) return { label: "Clear sky", kind: "clear" };
  if (code === 1) return { label: "Mainly clear", kind: "clear" };
  if (code === 2) return { label: "Partly cloudy", kind: "partly" };
  if (code === 3) return { label: "Overcast", kind: "cloudy" };
  if (code === 45 || code === 48) return { label: "Fog", kind: "fog" };
  if (code >= 51 && code <= 57) return { label: "Drizzle", kind: "rain" };
  if (code >= 61 && code <= 67) return { label: "Rain", kind: "rain" };
  if (code >= 71 && code <= 77) return { label: "Snow", kind: "snow" };
  if (code >= 80 && code <= 82) return { label: "Rain showers", kind: "rain" };
  if (code === 85 || code === 86) return { label: "Snow showers", kind: "snow" };
  if (code >= 95) return { label: "Thunderstorm", kind: "storm" };
  return { label: "Mountain weather", kind: "partly" };
}
