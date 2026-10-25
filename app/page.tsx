import type { Metadata } from "next";
import { FounderCard } from "@/components/cards/founder-card";
import { Contribute } from "@/components/home/contribute";
import { Explore } from "@/components/home/explore";
import { Facts } from "@/components/home/facts";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { Hero } from "@/components/home/hero";
import { Highlights } from "@/components/home/highlights";
import { Intro } from "@/components/home/intro";
import { Location } from "@/components/home/location";
import { Seasons } from "@/components/home/seasons";
import { JsonLd } from "@/components/seo/json-ld";
import { Reveal } from "@/components/ui/reveal";
import { graph, homeGraph, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("home", "/", { absoluteTitle: true });

export default function Home() {
  return (
    <main id="main">
      <JsonLd data={graph(homeGraph())} />
      <Hero />
      <Facts />
      <Intro />
      <Explore />
      <Highlights />
      <Seasons />
      <GalleryPreview />
      <Location />
      <section className="section" aria-label="About the founder">
        <div className="container">
          <Reveal>
            <FounderCard />
          </Reveal>
        </div>
      </section>
      <Contribute />
    </main>
  );
}
