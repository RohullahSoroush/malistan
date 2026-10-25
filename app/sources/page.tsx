import type { Metadata } from "next";
import { ArrowUpRight, Camera, Map } from "lucide-react";
import { sources } from "@/lib/content";
import { photos } from "@/lib/photos";
import { graph, pageMetadata, sourcesGraph } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

const shared = photos.filter((p) => !p.source);
const commons = photos.filter((p) => p.source);
import { PageHero, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = pageMetadata("sources", "/sources");

export default function SourcesPage() {
  return (
    <main id="main" className="page">
      <JsonLd data={graph(sourcesGraph())} />
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
            intro="The site uses resized WebP copies of each photograph, and some layouts crop them."
          />
          <div className="credits-grid">
            <div className="credit-card">
              <span className="credit-card__icon"><Camera size={20} aria-hidden="true" /></span>
              <h3>Shared by Rohullah Mohammadi</h3>
              <p>
                {shared.length} photographs of Malistan&apos;s valleys, fields, streams and seasons, shared
                for this archive. All rights reserved — please ask before reusing them.
              </p>
              <div className="chip-row">
                {shared.map((p) => <span className="chip" key={p.id}>{p.title}</span>)}
              </div>
            </div>
            <div className="credit-card">
              <span className="credit-card__icon"><Camera size={20} aria-hidden="true" /></span>
              <h3>Wikimedia Commons</h3>
              {commons.map((p) => (
                <p key={p.id}>
                  <strong>{p.title}</strong> — photograph by {p.author}, licensed{" "}
                  <a href={p.licenseUrl} target="_blank" rel="noopener noreferrer">{p.license}</a>.{" "}
                  <a href={p.source} target="_blank" rel="noopener noreferrer">View original</a>
                </p>
              ))}
            </div>
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
