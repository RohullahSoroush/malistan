import { Landmark, Map, Mountain, Sparkle, Users, type LucideIcon } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
const facts: { icon: LucideIcon; value: number; prefix?: string; suffix?: string; unit?: string; label: string; note: string }[] = [
  { icon: Mountain, value: 2800, unit: "m", label: "Elevation", note: "Among Afghanistan's highest communities" },
  { icon: Map, value: 1978, prefix: "~", unit: "km²", label: "Area", note: "Mountain valleys, pastures and seasonal rivers" },
  { icon: Users, value: 90, suffix: "%+", label: "Hazara", note: "Part of the historic Hazarajat region" },
  { icon: Landmark, value: 9, unit: "regions", label: "Named regions", note: "Mir Adina, Maknak, Pashia, Sheer Dagh and more" },
];

const places = ["Mir Adina", "Maknak", "Now Deh", "Pashia", "Sheer Dagh", "Hazarajat", "Ghazni", "مالستان", "Nowruz", "Hazaragi"];

function PlaceGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="marquee__group" aria-hidden={hidden || undefined}>
      {places.map((p) => (
        <span key={p} style={{ display: "contents" }}>
          <span className="marquee__item" lang={/[؀-ۿ]/.test(p) ? "fa" : undefined}>{p}</span>
          <Sparkle size={16} aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export function Facts() {
  return (
    <section className="facts" aria-label="Malistan at a glance">
      <div className="container">
        <div className="facts__grid">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08} className="facts__item">
              <div className="fact" data-spotlight>
                <div className="fact__head">
                  <span className="fact__icon"><f.icon size={19} aria-hidden="true" /></span>
                  <span className="fact__label">{f.label}</span>
                </div>
                <p className="fact__value">
                  <CountUp to={f.value} prefix={f.prefix} suffix={f.suffix} />
                  {f.unit && <span className="fact__unit">{f.unit}</span>}
                </p>
                <p className="fact__note">{f.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="marquee">
        <div className="marquee__track">
          <PlaceGroup />
          <PlaceGroup hidden />
        </div>
      </div>
    </section>
  );
}
