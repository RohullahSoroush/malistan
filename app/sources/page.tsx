import type { Metadata } from "next";
import { ArrowUpRight, Camera, Map } from "lucide-react";
import { getArchive } from "@/lib/archive";
import { graph, pageMetadata, sourcesGraph } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = pageMetadata("sources", "/sources");

export const revalidate = 60;

export default async function SourcesPage() {
  const { sources, photos } = await getArchive();
  // Photographs shared for the archive vs. openly licensed ones from elsewhere (they carry a link to the original).
  const shared = photos.filter((p) => !p.source);
  const commons = photos.filter((p) => p.source);
  return (
    <main id="main" className="page">
      <JsonLd data={graph(sourcesGraph(sources))} />
      <div className="container">
        <PageHero
          eyebrow="Transparency is part of the story"
          title={<>Built on <em>sources</em>, open to discovery</>}
          intro="The source library for this first edition of the Malistan Archive. Research checked in October 2026."
        />

        <div className="source-list">
          {sources.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <a className="source-card" href={s.url || undefined} target={s.url ? "_blank" : undefined} rel={s.url ? "noopener noreferrer" : undefined}>
                <span className="source-card__index">{String(i + 1).padStart(2, "0")}</span>
                <div className="source-card__body">
                  {s.date && <span className="chip">{s.date}</span>}
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
              <h3>Shared with the archive</h3>
              <p>
                {shared.length} photographs of Malistan, shared for this archive by{" "}
                {[...new Set(shared.map((p) => p.author).filter(Boolean))].join(", ") || "the community"}. Unless a
                licence says otherwise, all rights are reserved — please ask before reusing them.
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
