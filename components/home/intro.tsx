import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { villages } from "@/lib/article-extras";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Intro() {
  return (
    <section className="section intro" aria-labelledby="intro-title">
      <span className="intro__watermark" lang="fa" dir="rtl" aria-hidden="true">مالستان</span>
      <div className="container intro__grid">
        <Reveal className="intro__heading">
          <Eyebrow>Welcome home</Eyebrow>
          <h2 id="intro-title" className="display">
            A mountain district of <em>quiet beauty</em> and lasting resilience.
          </h2>
        </Reveal>
        <Reveal className="intro__body" delay={0.1}>
          <p className="lead">
            Malistan sits at 2,800 metres in the central highlands of Ghazni Province — part of
            Hazarajat, the historic Hazara homeland. Dramatic valleys, a living musical tradition,
            and a people whose devotion to education and community has never wavered.
          </p>
          <p>
            Too many places like Malistan appear only in the margins of larger histories — visible
            in times of conflict, invisible in times of culture and everyday life. This archive is a
            small, careful act of correcting that: sourced, dated, and open to the community.
          </p>
          <Link className="link" href="/about">
            Why this archive exists <ArrowRight aria-hidden="true" />
          </Link>
        </Reveal>
      </div>

      <Reveal className="container" delay={0.15}>
        <div className="villages">
          <span className="villages__label"><MapPin size={14} aria-hidden="true" /> Explore the villages</span>
          <ul className="villages__list">
            {villages.map((v) => (
              <li key={v.name}>
                <Link href={`/places#${v.anchor}`} className="village">
                  <span className="village__name">{v.name}</span>
                  <span className="village__native" lang="fa" dir="rtl">{v.native}</span>
                  <span className="village__note">{v.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
