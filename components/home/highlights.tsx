import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Languages, Music2, Scissors, Wheat } from "lucide-react";
import { SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { photo } from "@/lib/photos";

const crops = ["Wheat", "Maize", "Peas", "Grapes", "Almonds", "Potatoes"];
const field = photo("malistan-hay-path");

export function Highlights() {
  return (
    <section className="section" aria-labelledby="life-title">
      <div className="container">
        <Reveal>
          <SectionHeader
            id="life-title"
            eyebrow="Life in Malistan"
            title={<>Life at <em>2,800 metres</em></>}
            intro="Snow that closes the passes, a short and generous summer, and a culture that keeps people close."
          />
        </Reveal>

        <div className="bento">
          <Reveal className="bento-slot bento-slot--photo">
            <div className="bento-card bento-card--photo parallax-img" data-tilt>
              <Image
                src={field.src}
                alt={field.description}
                fill
                placeholder={field.blur}
                sizes="(max-width: 1180px) 100vw, 50vw"
              />
              <span className="chip">Fields · Summer</span>
              <h3>Poplar-lined fields and quiet footpaths.</h3>
              <p>
                Hay dries in the sun beside the paths that link the villages, shaded by tall rows of
                poplars — the valley floor at the height of a short, intense summer.
              </p>
              <Link className="link" href="/places">Explore the landscape <ArrowRight aria-hidden="true" /></Link>
            </div>
          </Reveal>

          <Reveal className="bento-slot" delay={0.06}>
            <div className="bento-card" data-spotlight>
              <span className="bento-card__icon"><Languages size={22} aria-hidden="true" /></span>
              <span className="bento-script" lang="fa" dir="rtl">هزارگی</span>
              <h3>Hazaragi</h3>
              <p>A variety of Dari with its own words and music, carrying proverbs and songs between generations.</p>
              <Link className="link" href="/culture">The language <ArrowRight aria-hidden="true" /></Link>
            </div>
          </Reveal>

          <Reveal className="bento-slot" delay={0.12}>
            <div className="bento-card tone-accent" data-spotlight>
              <div className="eq" aria-hidden="true">
                <span /><span /><span /><span /><span /><span /><span />
              </div>
              <h3>The village of songs</h3>
              <p>Now Deh is remembered for music shared across families — the roots of voices like Safdar Ali Malistani.</p>
              <Link className="link" href="/people"><Music2 aria-hidden="true" /> Meet the musicians</Link>
            </div>
          </Reveal>

          <Reveal className="bento-slot" delay={0.06}>
            <div className="bento-card tone-accent" data-spotlight>
              <span className="bento-card__icon"><Wheat size={22} aria-hidden="true" /></span>
              <h3>A short, generous season</h3>
              <div className="chip-row">
                {crops.map((c) => <span className="chip" key={c}>{c}</span>)}
              </div>
              <p>Highland sheep and goats graze the summer pastures above the fields.</p>
              <Link className="link" href="#seasons">Through the seasons <ArrowRight aria-hidden="true" /></Link>
            </div>
          </Reveal>

          <Reveal className="bento-slot" delay={0.12}>
            <div className="bento-card" data-spotlight>
              <span className="bento-weave" aria-hidden="true" />
              <span className="bento-card__icon"><Scissors size={22} aria-hidden="true" /></span>
              <h3>Nammad &amp; Glem</h3>
              <p>Felt and woven rugs from highland wool — patterns that change from village to village.</p>
              <Link className="link" href="/culture">The craft <ArrowRight aria-hidden="true" /></Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
