// Interface sounds, synthesised live with the Web Audio API — no audio files.
// They only ever play in response to the visitor's own actions.

type Bus = {
  ctx: AudioContext;
  master: GainNode;
  dry: GainNode;
  reverb: GainNode;
  noise: AudioBuffer;
};

let bus: Bus | null = null;

function impulse(ctx: AudioContext, seconds: number, decay: number) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
  }
  return buffer;
}

function audio(): Bus | null {
  if (bus) return bus;
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;

  const ctx = new AC({ latencyHint: "interactive" });
  const master = ctx.createGain();
  master.gain.value = 0.48;
  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -14;
  limiter.ratio.value = 8;
  master.connect(limiter).connect(ctx.destination);

  const convolver = ctx.createConvolver();
  convolver.buffer = impulse(ctx, 1.8, 3);
  const reverb = ctx.createGain();
  reverb.gain.value = 0.28;
  reverb.connect(convolver).connect(master);

  const dry = ctx.createGain();
  dry.connect(master);

  const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  bus = { ctx, master, dry, reverb, noise };
  return bus;
}

/** Unlocks audio. Browsers only allow this inside a user gesture. */
export function unlock() {
  const b = audio();
  if (b && b.ctx.state !== "running") b.ctx.resume().catch(() => undefined);
}

const ready = () => (bus && bus.ctx.state === "running" ? bus : null);

function route(b: Bus, pan: number, wet: number) {
  const panner = b.ctx.createStereoPanner();
  panner.pan.value = pan;
  panner.connect(b.dry);
  if (wet > 0) {
    const send = b.ctx.createGain();
    send.gain.value = wet;
    panner.connect(send).connect(b.reverb);
  }
  return panner;
}

/* ── Voices ─────────────────────────────────────────────────── */

function tone(o: { freq: number; to?: number; type?: OscillatorType; dur: number; gain: number; attack?: number; when?: number; pan?: number; wet?: number }) {
  const b = ready();
  if (!b) return;
  const t = b.ctx.currentTime + (o.when ?? 0);
  const osc = b.ctx.createOscillator();
  osc.type = o.type ?? "sine";
  osc.frequency.setValueAtTime(o.freq, t);
  if (o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t + o.dur * 0.6);
  const env = b.ctx.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(o.gain, t + (o.attack ?? 0.004));
  env.gain.exponentialRampToValueAtTime(0.0001, t + o.dur);
  osc.connect(env).connect(route(b, o.pan ?? 0, o.wet ?? 0.12));
  osc.start(t);
  osc.stop(t + o.dur + 0.05);
}

function air(o: { dur: number; gain: number; freq: number; to?: number; q?: number; type?: BiquadFilterType; attack?: number; when?: number; pan?: number; wet?: number }) {
  const b = ready();
  if (!b) return;
  const t = b.ctx.currentTime + (o.when ?? 0);
  const src = b.ctx.createBufferSource();
  src.buffer = b.noise;
  src.loop = true;
  const filter = b.ctx.createBiquadFilter();
  filter.type = o.type ?? "bandpass";
  filter.Q.value = o.q ?? 1;
  filter.frequency.setValueAtTime(o.freq, t);
  if (o.to) filter.frequency.exponentialRampToValueAtTime(o.to, t + o.dur);
  const env = b.ctx.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(o.gain, t + (o.attack ?? o.dur * 0.35));
  env.gain.exponentialRampToValueAtTime(0.0001, t + o.dur);
  src.connect(filter).connect(env).connect(route(b, o.pan ?? 0, o.wet ?? 0.15));
  src.start(t, Math.random() * 0.5);
  src.stop(t + o.dur + 0.05);
}

/**
 * The signature voice: a soft crystal-kalimba tone.
 * FM gives the glassy body, a tiny filtered-noise tick gives the mallet touch,
 * and a detuned octave partial adds a gentle shimmer that blooms in the reverb.
 */
const CHIME_OCTAVE = 0.375; // an octave and a fourth below the written notes, for a warm, soft register

function chime(note: number, o: { gain?: number; when?: number; pan?: number; wet?: number; dur?: number; shimmer?: number } = {}) {
  const b = ready();
  if (!b) return;
  const freq = note * CHIME_OCTAVE;
  const t = b.ctx.currentTime + (o.when ?? 0);
  const gain = o.gain ?? 0.07;
  const dur = (o.dur ?? 1.4) * 1.15;
  const out = route(b, o.pan ?? 0, o.wet ?? 0.38);

  const carrier = b.ctx.createOscillator();
  carrier.type = "sine";
  carrier.frequency.value = freq;
  const mod = b.ctx.createOscillator();
  mod.type = "sine";
  mod.frequency.value = freq * 3.01;
  const depth = b.ctx.createGain();
  depth.gain.setValueAtTime(freq * 1.5, t);
  depth.gain.exponentialRampToValueAtTime(freq * 0.02, t + 0.16);
  mod.connect(depth).connect(carrier.frequency);

  const body = b.ctx.createGain();
  body.gain.setValueAtTime(0.0001, t);
  body.gain.exponentialRampToValueAtTime(gain, t + 0.004);
  body.gain.exponentialRampToValueAtTime(gain * 0.35, t + 0.12);
  body.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  carrier.connect(body).connect(out);

  const shimmer = b.ctx.createOscillator();
  shimmer.type = "sine";
  shimmer.frequency.value = freq * 2.003;
  const glow = b.ctx.createGain();
  glow.gain.setValueAtTime(0.0001, t);
  glow.gain.exponentialRampToValueAtTime(gain * (o.shimmer ?? 0.22), t + 0.01);
  glow.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.6);
  shimmer.connect(glow).connect(out);

  [carrier, mod, shimmer].forEach((osc) => {
    osc.start(t);
    osc.stop(t + dur + 0.05);
  });
  air({ dur: 0.022, gain: gain * 0.3, freq: Math.min(freq * 4, 9000), q: 2, attack: 0.002, when: o.when, pan: o.pan, wet: 0.04 });
}

/** Clicks walk through this pentatonic phrase, so browsing plays a little tune. */
const PHRASE = [587.33, 698.46, 783.99, 880.0, 783.99, 698.46, 587.33, 523.25, 587.33, 698.46, 880.0, 1046.5, 880.0, 783.99];
const TICKS = [523.25, 587.33, 698.46, 783.99, 880.0, 1046.5, 1174.66];
let phraseIndex = 0;
let lastNoteAt = 0;

function nextNote() {
  const now = performance.now();
  if (now - lastNoteAt > 4000) phraseIndex = 0;
  lastNoteAt = now;
  return PHRASE[phraseIndex++ % PHRASE.length];
}

/** Glassy bell with inharmonic partials. */
function bell(freq: number, o: { gain?: number; when?: number; pan?: number; dur?: number; wet?: number } = {}) {
  [1, 2.76, 5.4, 8.93].forEach((ratio, i) =>
    tone({
      freq: freq * ratio,
      dur: (o.dur ?? 1.2) / (1 + i * 0.7),
      gain: (o.gain ?? 0.06) / (1 + i * 1.5),
      attack: 0.002,
      when: o.when,
      pan: o.pan,
      wet: o.wet ?? 0.4,
    }),
  );
}

function chirp(gain: number) {
  let when = 0;
  const base = 3200 + Math.random() * 900;
  for (let i = 0; i < 3; i++) {
    const dur = 0.06 + Math.random() * 0.05;
    tone({ freq: base, to: base * (i % 2 ? 0.8 : 1.3), dur, gain, attack: 0.008, when, pan: 0.3, wet: 0.25 });
    when += dur + 0.03;
  }
}

/* ── Sound palette ──────────────────────────────────────────── */

export type UiSound =
  | "tap" | "nav" | "card" | "cta" | "tick" | "open" | "close" | "swish" | "shutter" | "pop"
  | "sound-on" | "theme-dark" | "theme-light" | "scene"
  | "season-spring" | "season-summer" | "season-autumn" | "season-winter";

export const SOUND_NAMES: readonly UiSound[] = [
  "tap", "nav", "card", "cta", "tick", "open", "close", "swish", "shutter", "pop",
  "sound-on", "theme-dark", "theme-light", "scene",
  "season-spring", "season-summer", "season-autumn", "season-winter",
];

let lastSound = 0;

/** Plays a sound; `step` shifts the pitch for sets like tabs so they climb the scale. */
export function play(name: UiSound, step = 0) {
  if (!ready()) return;
  const now = performance.now();
  if (now - lastSound < 70) return;
  lastSound = now;

  switch (name) {
    case "tap": // the next note of the phrase
      chime(nextNote(), { gain: 0.075 });
      return;
    case "nav": // a quick two-note grace
      chime(nextNote(), { gain: 0.06 });
      chime(nextNote(), { gain: 0.05, when: 0.075 });
      return;
    case "card": // a note that lifts on a soft breath
      air({ dur: 0.34, gain: 0.018, freq: 400, to: 1600, q: 0.7 });
      chime(nextNote(), { gain: 0.07, dur: 1.7, shimmer: 0.3 });
      return;
    case "cta": // rising arpeggio with a sparkle
      [587.33, 698.46, 880.0, 1174.66].forEach((f, i) => chime(f, { gain: 0.065, when: i * 0.065, pan: -0.3 + i * 0.2 }));
      bell(784.0, { gain: 0.012, when: 0.26, wet: 0.6 });
      return;
    case "tick": // tabs and filters climb the scale
      chime(TICKS[step % TICKS.length], { gain: 0.06, dur: 0.9 });
      return;
    case "open":
      air({ dur: 0.3, gain: 0.025, freq: 500, to: 2600, q: 0.9 });
      chime(783.99, { gain: 0.05 });
      chime(1174.66, { gain: 0.045, when: 0.08 });
      return;
    case "close":
      air({ dur: 0.26, gain: 0.022, freq: 2400, to: 500, q: 0.9 });
      chime(1174.66, { gain: 0.045 });
      chime(783.99, { gain: 0.04, when: 0.07 });
      return;
    case "swish":
      air({ dur: 0.2, gain: 0.03, freq: 900, to: 3400, q: 1.3, attack: 0.04 });
      chime(nextNote(), { gain: 0.035, dur: 0.8 });
      return;
    case "shutter": // camera click for photographs
      air({ dur: 0.035, gain: 0.08, freq: 3500, type: "highpass", attack: 0.002, wet: 0.05 });
      air({ dur: 0.05, gain: 0.06, freq: 2200, type: "highpass", attack: 0.002, when: 0.07, wet: 0.08 });
      chime(1567.98, { gain: 0.025, when: 0.12, dur: 1, shimmer: 0.35 });
      return;
    case "pop":
      chime(880.0, { gain: 0.065 });
      chime(1318.51, { gain: 0.04, when: 0.06 });
      return;
    case "sound-on":
      [587.33, 698.46, 783.99, 880.0, 1046.5].forEach((f, i) => chime(f, { gain: 0.06, when: i * 0.08, pan: -0.4 + i * 0.2 }));
      return;
    case "theme-dark": // descending moonlight chime
      bell(1046.5, { gain: 0.05 });
      bell(783.99, { gain: 0.045, when: 0.12 });
      air({ dur: 0.5, gain: 0.025, freq: 1800, to: 500, q: 0.7 });
      return;
    case "theme-light": // rising sunrise chime
      bell(783.99, { gain: 0.045 });
      bell(1174.66, { gain: 0.05, when: 0.12 });
      air({ dur: 0.5, gain: 0.025, freq: 500, to: 2200, q: 0.7 });
      return;
    case "scene":
      air({ dur: 0.7, gain: 0.03, freq: 300, to: 1400, q: 0.6 });
      chime(440.0, { gain: 0.06, when: 0.1, dur: 1.8 });
      chime(587.33, { gain: 0.05, when: 0.22, dur: 1.8 });
      return;
    case "season-spring":
      chirp(0.03);
      chime(1046.5, { gain: 0.05, when: 0.08 });
      return;
    case "season-summer":
      [587.33, 698.46, 880.0].forEach((f, i) => chime(f, { gain: 0.06, when: i * 0.06 }));
      return;
    case "season-autumn":
      air({ dur: 0.6, gain: 0.03, freq: 3000, q: 0.5, type: "highpass" });
      chime(440.0, { gain: 0.065, when: 0.05, dur: 1.8 });
      return;
    case "season-winter":
      air({ dur: 0.9, gain: 0.035, freq: 600, to: 1200, q: 2 });
      bell(784.0, { gain: 0.03, when: 0.12, wet: 0.6 });
      return;
  }
}
