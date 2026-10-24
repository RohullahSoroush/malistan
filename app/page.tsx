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
import { Reveal } from "@/components/ui/reveal";
import { siteUrl } from "@/lib/site-url";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Place",
      "@id": `${siteUrl}/#place`,
      name: "Malistan",
      alternateName: ["Malestan", "مالستان"],
      description:
        "A mountain district at about 2,800 metres in Ghazni Province, central Afghanistan, and part of the historic Hazara homeland of Hazarajat.",
      geo: { "@type": "GeoCoordinates", latitude: 33.2953, longitude: 67.1689, elevation: 2800 },
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Ghazni Province",
        containedInPlace: { "@type": "Country", name: "Afghanistan" },
      },
      sameAs: "https://en.wikipedia.org/wiki/Malistan_District",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Malistan Archive",
      inLanguage: "en",
      about: { "@id": `${siteUrl}/#place` },
      founder: { "@id": `${siteUrl}/#founder` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#founder`,
      name: "Rohullah Mohammadi",
      jobTitle: "Software Developer",
      description: "Software developer from Malistan, Ghazni, who founded and built the Malistan Archive.",
      url: "https://rohullah.me",
      homeLocation: { "@id": `${siteUrl}/#place` },
    },
  ],
};

export default function Home() {
  return (
    <main id="main">
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
