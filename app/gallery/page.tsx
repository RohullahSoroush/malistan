import type { Metadata } from "next";
import { Camera } from "lucide-react";
import { Gallery } from "@/components/gallery";
import { PageHero } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Photo & film archive",
  description:
    "Photographs of Malistan, Ghazni — poplar-lined valleys, mountain streams, fields, flocks and the turning seasons, with full credits.",
  openGraph: { images: [{ url: "/images/malistan-autumn-valley.webp", width: 1080, height: 1080, alt: "Poplars turning gold in autumn in Malistan" }] },
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <main id="main" className="page gallery-page">
      <div className="container">
        <PageHero
          eyebrow="Photo & film archive"
          title={<>A little closer <em>to home</em></>}
          intro="Landscapes we recognise, seasons we remember — a small collection with many more stories to come."
        />
        <Gallery />
        <aside className="note-card">
          <Camera size={20} aria-hidden="true" />
          <div>
            <strong>About this collection</strong>
            <p>
              Ten photographs shared by Rohullah Mohammadi, alongside two from Wikimedia Commons
              licensed CC BY-SA 4.0. Select any photograph to see it larger with its credit, and use
              the arrow keys to move between them.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
