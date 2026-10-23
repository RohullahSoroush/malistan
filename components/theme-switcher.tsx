"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type Preference = "system" | "light" | "dark";
const storageKey = "malistan-theme";

export function ThemeSwitcher() {
  const [preference, setPreference] = useState<Preference>("system");
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const read = (): Preference => {
      try {
        const saved = localStorage.getItem(storageKey);
        return saved === "dark" || saved === "light" ? saved : "system";
      } catch { return "system"; }
    };
    let current = read();
    const apply = () => {
      document.documentElement.dataset.theme = current === "system"
        ? media.matches ? "dark" : "light" : current;
      setPreference(current);
    };
    const sync = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) { current = read(); apply(); }
    };
    const change = (event: Event) => {
      current = (event as CustomEvent<Preference>).detail;
      apply();
    };
    apply();
    media.addEventListener("change", apply);
    window.addEventListener("storage", sync);
    window.addEventListener("malistan-theme", change);
    return () => {
      media.removeEventListener("change", apply);
      window.removeEventListener("storage", sync);
      window.removeEventListener("malistan-theme", change);
    };
  }, []);
  const Icon = preference === "dark" ? Moon : preference === "light" ? Sun : Monitor;
  return (
    <label className="theme-switcher">
      <Icon size={16} aria-hidden="true" />
      <select aria-label="Color theme" value={preference} onChange={(event) => {
        const next = event.target.value as Preference;
        try { localStorage.setItem(storageKey, next); } catch { /* Still works without storage. */ }
        window.dispatchEvent(new CustomEvent("malistan-theme", { detail: next }));
      }}>
        <option value="system">Auto</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
