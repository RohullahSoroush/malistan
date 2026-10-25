"use client";

import { useSyncExternalStore } from "react";
import { play, unlock, type UiSound } from "./engine";

const KEY = "malistan-sound";
let enabled = true;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try { enabled = localStorage.getItem(KEY) !== "off"; } catch { /* storage unavailable */ }
}

export function soundEnabled() {
  load();
  return enabled;
}

export function setSoundEnabled(next: boolean) {
  load();
  enabled = next;
  try { localStorage.setItem(KEY, next ? "on" : "off"); } catch { /* storage unavailable */ }
  listeners.forEach((l) => l());
  if (next) {
    unlock();
    window.setTimeout(() => play("sound-on"), 30);
  }
}

/** Plays an action sound if the visitor hasn't muted the site. */
export function playSound(name: UiSound, step = 0) {
  if (soundEnabled()) play(name, step);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSoundEnabled() {
  return useSyncExternalStore(subscribe, soundEnabled, () => true);
}
