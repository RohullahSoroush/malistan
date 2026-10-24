import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Intro() {
  return (
    <section className="section" aria-labelledby="intro-title">
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
    </section>
  );
}
