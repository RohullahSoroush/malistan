import type { Metadata } from "next";
import { ArrowUpRight, Camera, Map } from "lucide-react";
import { sources, photos } from "@/lib/content";
import { PageHero, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Sources & photo credits",
  description: "The research, historical records and openly licensed photography behind the Malistan Archive.",
  alternates: { canonical: "/sources" },
};

export default function SourcesPage() {
  return (
    <main id="main" className="page">
      <div className="container">
        <PageHero
          eyebrow="Transparency is part of the story"
          title={<>Built on <em>sources</em>, open to discovery</>}
          intro="The source library for this first edition of the Malistan Archive. Research checked in October 2026."
        />

        <div className="source-list">
          {sources.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <a className="source-card" href={s.url} target="_blank" rel="noopener noreferrer">
                <span className="source-card__index">{String(i + 1).padStart(2, "0")}</span>
                <div className="source-card__body">
                  <span className="chip">{s.date}</span>
                  <h2>{s.name}</h2>
                  <p>{s.note}</p>
                </div>
                <span className="source-card__arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
              </a>
            </Reveal>
          ))}
        </div>

        <section id="photo-credits" className="credits" aria-labelledby="credits-title">
          <SectionHeader
            id="credits-title"
            eyebrow="The people behind the pictures"
            title={<>Photo credits &amp; <em>licences</em></>}
            intro="Both photographs come from Wikimedia Commons. The site uses resized WebP copies and some layouts crop them; the originals are linked below."
          />
          <div className="credits-grid">
            {photos.map((p) => (
              <div className="credit-card" key={p.src}>
                <span className="credit-card__icon"><Camera size={20} aria-hidden="true" /></span>
                <h3>{p.title}</h3>
                <p>
                  Photograph by {p.author}. Licensed under{" "}
                  <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">
                    CC BY-SA 4.0
                  </a>
                  .
                </p>
                <a className="link" href={p.source} target="_blank" rel="noopener noreferrer">
                  Original &amp; author <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            ))}
            <div className="credit-card tone-accent">
              <span className="credit-card__icon"><Map size={20} aria-hidden="true" /></span>
              <h3>Map data</h3>
              <p>
                The interactive map is provided by{" "}
                <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">
                  OpenStreetMap and its contributors
                </a>
                . The illustrated map shown before loading does not depict district boundaries.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
