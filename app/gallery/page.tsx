import type { Metadata } from "next";
import { Camera } from "lucide-react";
import { Gallery } from "@/components/gallery";
import { PageHero } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Photo & film archive",
  description:
    "Openly licensed photographs of Malistan's mountain valleys and winter landscapes, with full creator credits and original sources.",
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
            <strong>The opening collection</strong>
            <p>Two verified photographs of Malistan, both licensed CC BY-SA 4.0. Select one to see its credit and original source.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
