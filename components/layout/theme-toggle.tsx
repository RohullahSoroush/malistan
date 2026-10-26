"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";
const STORAGE_KEY = "malistan-theme";

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const root = document.documentElement;
    const media = matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      const next = storedTheme() ?? (media.matches ? "dark" : "light");
      root.dataset.theme = next;
      setTheme(next);
    };
    const onMedia = () => { if (!storedTheme()) sync(); };
    const onStorage = (e: StorageEvent) => { if (e.key === STORAGE_KEY || e.key === null) sync(); };
    sync();
    media.addEventListener("change", onMedia);
    window.addEventListener("storage", onStorage);
    return () => {
      media.removeEventListener("change", onMedia);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* storage unavailable */ }

    const apply = () => {
      root.dataset.theme = next;
      setTheme(next);
    };

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("startViewTransition" in document) || reduced) {
      apply();
      return;
    }

    // Circular light-to-dark wipe that grows out of the toggle.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    root.classList.add("theme-transition");
    const transition = document.startViewTransition(() => flushSync(apply));
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    }).catch(() => undefined); // the browser may skip the transition; the theme still applies
    transition.finished.finally(() => root.classList.remove("theme-transition"));
  }

  const dark = theme === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="theme-toggle"
      data-sound={dark ? "theme-light" : "theme-dark"}
      onClick={toggle}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__cloud" />
        <span className="theme-toggle__stars" />
        <span className="theme-toggle__knob">
          <Sun className="theme-toggle__sun" size={15} strokeWidth={2.4} />
          <Moon className="theme-toggle__moon" size={14} strokeWidth={2.4} />
        </span>
      </span>
    </button>
  );
}
