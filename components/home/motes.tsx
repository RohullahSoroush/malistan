// Drifting light particles for the hero: golden pollen in summer, snow in winter.
const motes = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37.7) % 100,
  size: 2 + ((i * 7) % 4),
  duration: 9 + ((i * 13) % 9),
  delay: -((i * 2.3) % 14),
  drift: ((i % 5) - 2) * 18,
}));

export function Motes({ variant }: { variant: "pollen" | "snow" }) {
  return (
    <div className={`motes motes--${variant}`} aria-hidden="true">
      {motes.map((m, i) => (
        <span
          key={i}
          style={{
            left: `${m.left}%`,
            width: m.size,
            height: m.size,
            animationDuration: `${variant === "snow" ? m.duration * 0.8 : m.duration}s`,
            animationDelay: `${m.delay}s`,
            ["--drift" as string]: `${m.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
