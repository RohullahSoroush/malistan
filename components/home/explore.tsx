import { ArrowRight, Landmark, Mountain, Music, Users } from "lucide-react";
import { TopicCard } from "@/components/cards/topic-card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const topics: {
  slug: string;
  image: string;
  position: string;
  kicker: string;
  title: string;
  description: string;
  icon: typeof Landmark;
}[] = [
  {
    slug: "history",
    image: "/images/malistan-winter.webp",
    position: "30% 50%",
    kicker: "Centuries of memory",
    title: "History & heritage",
    description: "From semi-autonomous Hazarajat to post-2001 rebuilding — the full arc, read with care.",
    icon: Landmark,
  },
  {
    slug: "places",
    image: "/images/malistan-valley.webp",
    position: "50% 60%",
    kicker: "Know the land",
    title: "Places & landscape",
    description: "Mir Adina, Maknak, Now Deh — every valley holds a different story.",
    icon: Mountain,
  },
  {
    slug: "culture",
    image: "/images/malistan-valley.webp",
    position: "85% 40%",
    kicker: "Living traditions",
    title: "Culture & everyday life",
    description: "Hazaragi, folk music, Nammad and Glem weaving, and the joy of Nowruz.",
    icon: Music,
  },
  {
    slug: "people",
    image: "/images/malistan-winter.webp",
    position: "80% 60%",
    kicker: "Faces & voices",
    title: "People of Malistan",
    description: "Musicians, scholars and community members who give the district its voice.",
    icon: Users,
  },
];

export function Explore() {
  return (
    <section id="explore" className="section" aria-labelledby="explore-title">
      <div className="container">
        <Reveal>
          <SectionHeader
            id="explore-title"
            eyebrow="Explore the archive"
            title={<>Four ways into <em>Malistan</em></>}
            intro="Researched stories with their sources in plain sight — start anywhere."
            action={
              <Button href="/history" variant="secondary">
                Begin with history <ArrowRight aria-hidden="true" />
              </Button>
            }
          />
        </Reveal>
        <div className="card-grid">
          {topics.map((t, i) => (
            <Reveal key={t.slug} delay={i * 0.08}>
              <TopicCard
                href={`/${t.slug}`}
                image={t.image}
                imagePosition={t.position}
                kicker={t.kicker}
                title={t.title}
                description={t.description}
                icon={t.icon}
                num={`0${i + 1}`}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
