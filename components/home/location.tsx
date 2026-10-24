import { MapPin } from "lucide-react";
import { DistrictMap } from "@/components/map";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const neighbours = [
  { dir: "N", name: "Ajristan", note: "District to the north" },
  { dir: "NE", name: "Nawur", note: "District to the northeast" },
  { dir: "S", name: "Jaghori", note: "District to the south" },
  { dir: "SW", name: "Uruzgan", note: "Province to the southwest" },
];

export function Location() {
  return (
    <section className="section" aria-labelledby="map-title">
      <div className="container location">
        <Reveal className="location__copy">
          <Eyebrow>Find it on the map</Eyebrow>
          <h2 id="map-title" className="section-title">
            Tucked between <em>mountains</em> and memory
          </h2>
          <p>
            The district centre, Mir Adina, anchors a web of high valleys linked by mountain roads that
            can close for weeks in deep winter.
          </p>
          <div className="compass">
            {neighbours.map((n) => (
              <div className="compass__item" key={n.name}>
                <span className="compass__dir">{n.dir}</span>
                <span>
                  <strong>{n.name}</strong>
                  <small>{n.note}</small>
                </span>
              </div>
            ))}
          </div>
          <span className="coords"><MapPin size={15} aria-hidden="true" /> 33°18′N, 67°10′E · approximate centre</span>
        </Reveal>
        <Reveal delay={0.1}>
          <DistrictMap />
        </Reveal>
      </div>
    </section>
  );
}
