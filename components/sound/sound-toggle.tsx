"use client";

import { Volume2, VolumeX } from "lucide-react";
import { setSoundEnabled, useSoundEnabled } from "@/lib/sound/store";

/** Mutes or unmutes the site's action sounds; the choice is remembered. */
export function SoundToggle() {
  const on = useSoundEnabled();
  return (
    <button
      type="button"
      className={on ? "icon-btn sound-toggle is-on" : "icon-btn sound-toggle"}
      aria-pressed={on}
      aria-label={on ? "Mute sound effects" : "Turn sound effects on"}
      title={on ? "Sound effects on — click to mute" : "Sound effects off — click to turn on"}
      data-sound="none"
      onClick={() => setSoundEnabled(!on)}
    >
      {on ? <Volume2 size={18} aria-hidden="true" /> : <VolumeX size={18} aria-hidden="true" />}
    </button>
  );
}
