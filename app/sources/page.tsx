import type { Metadata } from "next";
import { sources, photos } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";
export const metadata: Metadata = {
  title: "Sources & photo credits",
  description:
    "Explore the research, historical records and openly licensed photography behind the Malistan Archive.",
  alternates: { canonical: "/sources" },
};
export default function Sources() {
  return (
    <main id="main" className="container source-page">
      <span className="eyebrow">TRANSPARENCY IS PART OF THE STORY</span>
      <h1>
        Built on <em>sources.</em>
        <br />
        Open to discovery.
      </h1>
      <p className="lead">
        A source library for this first edition of the Malistan Archive.
        Research checked in October 2026.
      </p>
      <div className="source-list">
        {sources.map((s, i) => (
          <a href={s.url} target="_blank" rel="noreferrer" key={s.id}>
            <span className="source-index">0{i + 1}</span>
            <div>
              <span className="eyebrow">{s.date}</span>
              <h2>{s.name}</h2>
              <p>{s.note}</p>
            </div>
            <ArrowUpRight />
          </a>
        ))}
      </div>
      <section id="photo-credits" className="credits">
        <span className="eyebrow">THE PEOPLE BEHIND THE PICTURES</span>
        <h2>Photo credits & licences</h2>
        <p>
          Both photographs show Malistan and are sourced from Wikimedia Commons.
          The website uses resized WebP versions; some layouts crop the
          photographs. Original photographs remain available at the links below.
        </p>
        {photos.map((p) => (
          <div key={p.src}>
            <h3>{p.title}</h3>
            <p>
              Photograph by {p.author}. Licensed under{" "}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noreferrer"
              >
                Creative Commons Attribution-ShareAlike 4.0
              </a>
              .
            </p>
            <a
              className="text-link"
              href={p.source}
              target="_blank"
              rel="noreferrer"
            >
              View original & author details <ArrowUpRight size={16} />
            </a>
          </div>
        ))}
        <h3>Map data</h3>
        <p>
          The interactive map is provided by{" "}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noreferrer"
          >
            OpenStreetMap and its contributors
          </a>
          . The decorative map shown before loading is illustrative and does not
          depict district boundaries.
        </p>
      </section>
    </main>
  );
}
