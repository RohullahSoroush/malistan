import type { Metadata } from "next";
import { Camera } from "lucide-react";
import { Gallery } from "@/components/gallery";
import { PageHero } from "@/components/ui/section";
import { JsonLd } from "@/components/seo/json-ld";
import { galleryGraph, graph, pageMetadata } from "@/lib/seo";
import { getArchive } from "@/lib/archive";

export const metadata: Metadata = pageMetadata("gallery", "/gallery");

export const revalidate = 60;

export default async function GalleryPage() {
  const { photos, films } = await getArchive();
  const shared = photos.filter((p) => !p.source).length;
  const commons = photos.length - shared;
  return (
    <main id="main" className="page gallery-page">
      <JsonLd data={graph(galleryGraph(photos))} />
      <div className="container">
        <PageHero
          eyebrow="Photo & film archive"
          title={<>A little closer <em>to home</em></>}
          intro="Landscapes we recognise, seasons we remember — a small collection with many more stories to come."
        />
        <Gallery photos={photos} films={films} />
        <aside className="note-card">
          <Camera size={20} aria-hidden="true" />
          <div>
            <strong>About this collection</strong>
            <p>
              {photos.length} photographs — {shared} shared with the archive
              {commons ? `, ${commons} openly licensed from elsewhere` : ""}
              {films.length ? `, and ${films.length} film${films.length === 1 ? "" : "s"}` : ""}. Select any photograph to
              see it larger with its credit, and use the arrow keys to move between them.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
