import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, MapPin, Mountain, Globe, Users, BookOpen } from "lucide-react";
import { CinematicHero } from "@/components/cinematic-hero";
import { DistrictMap } from "@/components/map";
import { Reveal } from "@/components/reveal";
import { articles, photos } from "@/lib/content";

const topics = [
  {
    slug:    "history",
    num:     "01",
    photo:   "/images/malistan-winter.webp",
    eyebrow: "Centuries of memory",
    title:   "History & Heritage",
    desc:    "From the Hazara homeland to post-2001 reconstruction — the full arc of Malistan's story.",
  },
  {
    slug:    "places",
    num:     "02",
    photo:   "/images/malistan-valley.webp",
    eyebrow: "Know the land",
    title:   "Places & Landscape",
    desc:    "Mir Adina, Maknak, Now Deh — every valley in Malistan holds a distinct story.",
  },
  {
    slug:    "culture",
    num:     "03",
    photo:   "/images/malistan-valley.webp",
    eyebrow: "Living traditions",
    title:   "Culture & Traditions",
    desc:    "Hazaragi language, folk music, wool weaving, Nowruz — the culture that binds a people.",
  },
  {
    slug:    "people",
    num:     "04",
    photo:   "/images/malistan-winter.webp",
    eyebrow: "Faces & voices",
    title:   "People of Malistan",
    desc:    "Musicians, scholars, community leaders — the names that give Malistan its voice.",
  },
];

const stories = [
  {
    num:     "01",
    eyebrow: "The Highlands of Ghazni",
    href:    "/history",
    title:   "A place with a past. A story still unfolding.",
    desc:    "Understand Malistan through its layered history — from the semi-autonomous Hazarajat of the 1800s to the hope of post-2001 community rebuilding.",
  },
  {
    num:     "02",
    eyebrow: "Culture & Everyday Life",
    href:    "/culture",
    title:   "The sound of belonging.",
    desc:    "Hazaragi folk music, wool weaving, Nowruz celebrations — culture here is not a relic, it is the air people breathe.",
  },
  {
    num:     "03",
    eyebrow: "Places & Landscape",
    href:    "/places",
    title:   "Many valleys. One Malistan.",
    desc:    "At 2,800 metres above sea level, Malistan's landscape is among the most dramatic in central Afghanistan.",
  },
];

export default function Home() {
  return (
    <main id="main">
      {/* ── 1. Hero ──────────────────────────────────────── */}
      <CinematicHero />

      {/* ── 2. Place strip ───────────────────────────────── */}
      <div className="place-strip" aria-label="Key facts about Malistan">
        <div className="container place-strip-inner">
          <span className="place-strip-item">
            <span className="place-strip-dot" aria-hidden="true" />
            <Mountain size={12} aria-hidden="true" />
            2,800 m elevation
          </span>
          <span className="place-strip-item">
            <span className="place-strip-dot" aria-hidden="true" />
            Ghazni Province
          </span>
          <span className="place-strip-item">
            <span className="place-strip-dot" aria-hidden="true" />
            <span lang="fa" dir="rtl">مالستان</span>
          </span>
          <span className="place-strip-item">
            <span className="place-strip-dot" aria-hidden="true" />
            Central Afghanistan
          </span>
          <span className="place-strip-item">
            <span className="place-strip-dot" aria-hidden="true" />
            <Globe size={12} aria-hidden="true" />
            33°18′N, 67°10′E
          </span>
          <span className="place-strip-item">
            <span className="place-strip-dot" aria-hidden="true" />
            Hazara homeland
          </span>
        </div>
      </div>

      {/* ── 3. Intro ─────────────────────────────────────── */}
      <section id="intro" className="intro-section container section" aria-label="Introduction">
        <div className="intro-grid">
          <Reveal>
            <h2 className="intro-headline">
              A mountain district of <em>profound</em> beauty and quiet resilience.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="intro-copy">
            <p className="lead">
              Malistan sits at 2,800 metres in the central highlands of
              Afghanistan&apos;s Ghazni Province — part of the historic Hazara
              homeland of Hazarajat. Home to dramatic landscapes, a living musical
              tradition, and a people whose commitment to education and community
              remains unshaken.
            </p>
            <p>
              This archive was founded by Rohullah Mohammadi to give Malistan a
              thoughtful, permanent home on the internet. Too many places like
              Malistan exist only in the margins of larger histories — visible
              when there is conflict, invisible when there is culture, community
              and everyday life. This archive is a small act of correcting that
              imbalance.
            </p>
            <Link href="/about" className="text-link">
              About this archive <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {/* Stats row */}
        <Reveal delay={0.15}>
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-num">2,800</span>
              <span className="stat-label">Metres elevation</span>
              <span className="stat-note">Among Afghanistan&apos;s highest communities</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">~1,978</span>
              <span className="stat-label">km² of terrain</span>
              <span className="stat-note">Mountain valleys and seasonal waterways</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">90%+</span>
              <span className="stat-label">Hazara population</span>
              <span className="stat-note">Heart of the historic Hazarajat region</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">9</span>
              <span className="stat-label">Named regions</span>
              <span className="stat-note">Including Maknak, Mir Adina, Now Deh</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 4. Topics ────────────────────────────────────── */}
      <section className="discover-section section" aria-label="Explore Malistan">
        <div className="container">
          <Reveal>
            <div className="section-heading">
              <div>
                <span className="eyebrow">THE ARCHIVE</span>
                <h2>
                  Discover <em>every corner</em><br />
                  of Malistan.
                </h2>
              </div>
              <Link href="/history" className="text-link">
                Start with history <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <div className="topic-grid">
            {topics.map((t, i) => (
              <Reveal key={t.slug} delay={i * 0.07}>
                <Link href={"/" + t.slug} className="topic-card">
                  <div
                    className="topic-photo"
                    role="img"
                    aria-label={`Photograph for ${t.title}`}
                    style={{ backgroundImage: `url(${t.photo})` }}
                  />
                  <div className="topic-body">
                    <span className="topic-num">{t.num}</span>
                    <h3>{t.title}</h3>
                    <p>{t.desc}</p>
                  </div>
                  <span className="topic-arrow" aria-hidden="true">
                    <ArrowUpRight size={15} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Landscape feature ─────────────────────────── */}
      <section className="section container" aria-label="Landscape of Malistan">
        <div className="landscape-section">
          <Reveal>
            <div className="landscape-photo">
              <Image
                src="/images/malistan-valley.webp"
                alt="Mountain slopes and cultivated land across the Malistan valley"
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
              />
              <span className="photo-label">
                <MapPin size={10} aria-hidden="true" />
                Malistan Valley, Summer
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="landscape-copy">
            <span className="eyebrow">THE LAND</span>
            <h2>
              Where mountains shape <em>everything.</em>
            </h2>
            <p>
              At 2,800 metres above sea level, Malistan sits among Afghanistan&apos;s
              highest-altitude communities. Its valleys run between peaks that
              define the seasons, the crops, the architecture and the character
              of life here. Cold winters bring isolation; warm summers open the
              land to grazing and harvest.
            </p>
            <p>
              The district&apos;s main crops — wheat, maize, peas, grapes, almonds,
              potatoes — grow in a short but abundant season. Highland sheep and
              goats graze pastures that produce the wool behind a tradition of
              weaving. The land is demanding. The people who know it are
              extraordinary.
            </p>
            <div className="location-facts">
              <div>
                <small>Coordinates</small>
                <strong>33°18′N, 67°10′E</strong>
              </div>
              <div>
                <small>Province</small>
                <strong>Ghazni</strong>
              </div>
              <div>
                <small>Region</small>
                <strong>Hazarajat</strong>
              </div>
            </div>
            <Link href="/places" className="text-link">
              Explore the landscape <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── 6. Culture feature (dark) ────────────────────── */}
      <section className="culture-feature section" aria-label="Culture and heritage">
        <div className="container culture-inner">
          <Reveal>
            <span className="eyebrow light">HERITAGE</span>
            <h2>
              Music, language<br />
              and a sense of <em>home.</em>
            </h2>
            <p>
              Hazaragi — a variety of Dari with its own distinct vocabulary —
              carries the proverbs, folk songs and stories of Malistan between
              generations. The district has produced singers like Safdar Ali
              Malistani, whose music is part of a living tradition from the
              village of Now Deh. Culture here is not a relic. It is the air
              people breathe.
            </p>
            <Link href="/culture" className="btn btn-ghost">
              Discover culture &amp; traditions
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="sound-art" aria-hidden="true">
              <span className="sound-ring ring-one" />
              <span className="sound-ring ring-two" />
              <span className="sound-ring ring-three" />
              <BookOpen size={44} strokeWidth={1.25} />
              <span className="sound-script" lang="fa" dir="rtl">نوای مالستان</span>
              <span className="sound-caption">THE VOICE OF MALISTAN</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 7. Photo pair ────────────────────────────────── */}
      <section className="section container" aria-label="Photographs of Malistan">
        <Reveal>
          <div className="section-heading" style={{ marginBottom: "36px" }}>
            <div>
              <span className="eyebrow">THE ARCHIVE</span>
              <h2>Through the <em>lens.</em></h2>
            </div>
            <Link href="/gallery" className="text-link">
              Open full gallery <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <div className="photo-pair">
          {photos.map((p, i) => (
            <Reveal key={p.src} delay={i * 0.1}>
              <Link href="/gallery" className="gallery-preview">
                <Image
                  src={p.src}
                  alt={p.description}
                  fill
                  sizes="(max-width: 800px) 100vw, 50vw"
                />
                <span>
                  <small>{p.category.toUpperCase()}</small>
                  <strong>{p.title}</strong>
                </span>
                <span className="gallery-preview-arrow" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="image-credit">
          Photographs by Danial and Mohammad Reza Rahmani ·{" "}
          <Link href="/sources#photo-credits">CC BY-SA 4.0 — view credits</Link>
        </p>
      </section>

      {/* ── 8. Map ───────────────────────────────────────── */}
      <section className="map-section" aria-label="Location of Malistan">
        <div className="container map-layout">
          <Reveal>
            <span className="eyebrow">FIND IT ON THE MAP</span>
            <h2>
              Tucked between <em>mountains</em> and memory.
            </h2>
            <p>
              Malistan district sits in the central highlands of Ghazni Province.
              Ajristan lies to the north, Nawur to the northeast, Jaghori to the
              south. The district centre, Mir Adina, anchors a network of mountain
              valleys connected by unpaved roads that close in winter.
            </p>
            <p className="coordinates">
              <MapPin size={14} aria-hidden="true" />
              33°18′N, 67°10′E — approximate district centre
            </p>
            <span className="map-disclaimer">
              This map shows an approximate location. It does not draw formal
              administrative boundaries.
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <DistrictMap lat={33.2953} lon={67.1689} />
          </Reveal>
        </div>
      </section>

      {/* ── 9. Stories ───────────────────────────────────── */}
      <section className="section" aria-label="Feature stories">
        <div className="container">
          <Reveal>
            <div className="section-heading" style={{ marginBottom: "48px" }}>
              <div>
                <span className="eyebrow">FURTHER READING</span>
                <h2>Stories worth <em>taking time with.</em></h2>
              </div>
            </div>
          </Reveal>
          <div className="story-grid">
            {stories.map((s, i) => (
              <Reveal key={s.href} delay={i * 0.08}>
                <Link href={s.href} className="story-card">
                  <span className="story-num" aria-hidden="true">{s.num}</span>
                  <span className="eyebrow">{s.eyebrow}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <span className="text-link">
                    Read more <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Founder section ──────────────────────────── */}
      <section
        id="founder"
        className="founder-section"
        aria-label="About the founder"
      >
        <div className="container founder-inner">
          <Reveal>
            <span className="founder-mark" aria-hidden="true">R.M.</span>
            <span className="eyebrow">FOUNDED BY</span>
            <h2>
              Built from love<br />
              for <em>home.</em>
            </h2>
            <p>
              Rohullah Mohammadi is a designer and technologist from Malistan,
              Ghazni. He built this archive from the ground up — researching,
              designing, writing and coding every element — because he believed
              his home district deserved a thoughtful, permanent presence on the
              internet.
            </p>
            <p>
              Too many places like Malistan exist only in the margins of larger
              histories. This archive is a small act of correcting that imbalance,
              and an open invitation for the Malistan community worldwide to
              contribute, correct and expand it.
            </p>
            <div className="founder-sig">
              <Users size={22} aria-hidden="true" style={{ color: "var(--moss)", flexShrink: 0 }} />
              <div>
                <span className="founder-sig-name">Rohullah Mohammadi</span>
                <span className="founder-sig-role">Founder &amp; Curator · Malistan Archive</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <figure className="founder-quote">
              <blockquote>
                &ldquo;Malistan is more than a district in Ghazni. It is the place
                we carry with us wherever we go. I built this archive so that
                feeling has somewhere to live on the internet.&rdquo;
              </blockquote>
              <figcaption>
                <cite>
                  Rohullah Mohammadi · Founder, Malistan Archive
                </cite>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ── 11. Contribute CTA ───────────────────────────── */}
      <section className="section container" aria-label="Contribute to the archive">
        <Reveal>
          <div className="contribute">
            <div>
              <span className="eyebrow">GROW THE ARCHIVE</span>
              <h2>
                Do you have a memory<br />
                to <em>share?</em>
              </h2>
              <p>
                If you have a photograph, a family story, a voice recording
                or knowledge of a person from Malistan whose contribution
                belongs here, this archive wants to hear from you. Every
                addition makes it more complete for everyone who comes after.
              </p>
            </div>
            <Link
              href="/about#contribute-to-a-future-edition"
              className="btn btn-dark"
            >
              How to contribute
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── JSON-LD ───────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Place",
            name: "Malistan",
            alternateName: ["Malestan", "مالستان"],
            description:
              "A mountain district in Ghazni Province, central Afghanistan. Part of the historic Hazara homeland of Hazarajat.",
            geo: {
              "@type": "GeoCoordinates",
              latitude: 33.2953,
              longitude: 67.1689,
            },
            containedInPlace: {
              "@type": "AdministrativeArea",
              name: "Ghazni Province",
              containedInPlace: {
                "@type": "Country",
                name: "Afghanistan",
              },
            },
            url: "https://malistan.org",
            sameAs: "https://en.wikipedia.org/wiki/Malistan_District",
          }),
        }}
      />
    </main>
  );
}
