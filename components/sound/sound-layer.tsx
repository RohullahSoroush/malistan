"use client";

import { useEffect } from "react";
import { SOUND_NAMES, unlock, type UiSound } from "@/lib/sound/engine";
import { playSound, soundEnabled } from "@/lib/sound/store";

const INTERACTIVE = "a[href], button, [role='tab'], [data-sound]";

/** Picks a sound for any clicked control, unless it names its own with data-sound. */
function soundFor(el: HTMLElement): UiSound | null {
  const named = el.closest<HTMLElement>("[data-sound]")?.dataset.sound;
  if (named === "none") return null;
  if (named && (SOUND_NAMES as readonly string[]).includes(named)) return named as UiSound;
  if (el.matches(".btn--primary, .btn--light")) return "cta";
  if (el.matches(".nav__link, .mobile-menu__link, .toc a, .search-result, .brand, .back-link, .footer-col a")) return "nav";
  if (el.matches(".mosaic__item")) return "shutter";
  if (el.matches(".topic-card, .source-card")) return "card";
  return "tap";
}

/**
 * Adds sound to every click across the site without touching each component.
 * Nothing plays on its own: sounds only answer the visitor's own clicks and key presses.
 */
export function SoundLayer() {
  useEffect(() => {
    // Browsers unlock audio only inside a gesture, so prepare it on the press itself.
    const onPress = () => { if (soundEnabled()) unlock(); };

    const onClick = (event: MouseEvent) => {
      if (!soundEnabled() || !(event.target instanceof Element)) return;
      const el = event.target.closest<HTMLElement>(INTERACTIVE);
      if (!el || el.matches(":disabled, [aria-disabled='true']")) return;
      const sound = soundFor(el);
      if (!sound) return;
      const step = Number(el.closest<HTMLElement>("[data-sound-step]")?.dataset.soundStep ?? 0);
      playSound(sound, step);
    };

    window.addEventListener("pointerdown", onPress, { capture: true, passive: true });
    window.addEventListener("keydown", onPress, { capture: true });
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("pointerdown", onPress, { capture: true });
      window.removeEventListener("keydown", onPress, { capture: true });
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
