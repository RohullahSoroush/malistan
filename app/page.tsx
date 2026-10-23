import { CinematicHero } from "@/components/cinematic-hero";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Mountain,
  Music2,
  BookOpen,
  Users,
  Compass,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { DistrictMap } from "@/components/map";
export const metadata = { alternates: { canonical: "/" } };
const topics = [
  {
    num: "01",
    title: "History & heritage",
    desc: "The chapters that shaped our home.",
    href: "/history",
    icon: BookOpen,
  },
  {
    num: "02",
    title: "Places to discover",
    desc: "From mountain valleys to village lanes.",
    href: "/places",
    icon: Mountain,
  },
  {
    num: "03",
    title: "Culture & traditions",
    desc: "The music and memories we carry.",
    href: "/culture",
    icon: Music2,
  },
  {
    num: "04",
    title: "People of Malistan",
    desc: "The lives behind our shared story.",
    href: "/people",
    icon: Users,
  },
];
export default function Home() {
  return (
    <main id="main">
      <CinematicHero />
      <div className="place-strip">
        <div className="container">
          <span>
            <span className="live-dot" /> A COMMUNITY ARCHIVE, ROOTED IN
            MALISTAN
          </span>
          <span>Our land. Our people. Our stories.</span>
          <span lang="fa" dir="rtl">
            از دل مالستان، برای همه
          </span>
        </div>
      </div>
      <section id="intro" className="section container intro">
        <Reveal>
          <span className="eyebrow">01 / ROOTED IN SOMETHING REAL</span>
          <h2>
            More than a place
            <br />
            on the <em>map.</em>
          </h2>
        </Reveal>
        <Reveal className="intro-copy">
          <p className="lead">
            In the highlands of Ghazni, there is a place that lives in the
            hearts of its people—wherever life takes them.
          </p>
          <p>
            This is Malistan. A district of mountain villages, Hazara heritage
            and a rich tradition of music. This archive brings its landscapes,
            people and memories together, one story at a time.
          </p>
          <Link href="/about" className="text-link">
            Get to know Malistan <ArrowUpRight size={17} />
          </Link>
        </Reveal>
      </section>
      <section className="section discover-section" id="discover">
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">
                02 / CHOOSE YOUR OWN PATH
              </span>
              <h2>
                Find your way <em>into Malistan.</em>
              </h2>
            </div>
            <span className="small-note">Start with what speaks to you.</span>
          </Reveal>
          <div className="topic-grid editorial-topics">
            {topics.map(({ num, title, desc, href, icon: Icon }) => (
              <Reveal key={num}>
                <Link href={href} className="topic-card">
                  <span className="topic-top">
                    <Icon size={26} strokeWidth={1.3} />
                    <span>{num}</span>
                  </span>
                  <span
                    className="topic-photo"
                    aria-hidden="true"
                    style={{
                      backgroundImage: `url(${num === "02" || num === "04" ? "/images/malistan-winter.webp" : "/images/malistan-valley.webp"})`,
                    }}
                  />
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <span className="circle-arrow">
                    <ArrowUpRight size={19} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section container landscape-section">
        <Reveal className="landscape-photo">
          <Image
            src="/images/malistan-winter.webp"
            alt="Snow-covered Malistan landscape in winter"
            fill
            sizes="(max-width: 800px) 100vw, 55vw"
          />
          <span className="photo-label">
            <MapPin size={14} /> A winter in Malistan
          </span>
        </Reveal>
        <Reveal className="landscape-copy">
          <span className="eyebrow">03 / A LANDSCAPE THAT LIVES WITHIN US</span>
          <h2>
            Quiet beauty.
            <br />
            <em>Lasting roots.</em>
          </h2>
          <p>
            Highland seasons shape life here. Cold winters give way to warm, dry
            summers; fields, streams and mountain slopes form the backdrop to
            everyday life.
          </p>
          <p>
            Discover Mir Adina, Maknak and the villages that give Malistan its
            character.
          </p>
          <Link href="/places" className="text-link">
            Explore the places <ArrowUpRight size={17} />
          </Link>
          <div className="location-facts">
            <div>
              <small>PROVINCE</small>
              <strong>Ghazni</strong>
            </div>
            <div>
              <small>DISTRICT CENTRE</small>
              <strong>Mir Adina</strong>
            </div>
            <div>
              <small>LOCAL NAME</small>
              <strong lang="fa">مالستان</strong>
            </div>
          </div>
        </Reveal>
      </section>
      <section className="culture-feature">
        <div className="container culture-inner">
          <Reveal>
            <span className="eyebrow light">
              04 / VOICES THAT CONNECT GENERATIONS
            </span>
            <h2>
              A melody can carry
              <br />
              an entire <em>homeland.</em>
            </h2>
            <p>
              Malistan’s folk traditions live in voices, in family memories, and
              in the music passed from one generation to the next.
            </p>
            <Link href="/culture" className="button cream">
              Meet our cultural heritage <ArrowUpRight size={18} />
            </Link>
          </Reveal>
          <div className="sound-art" aria-hidden="true">
            <span className="sound-ring ring-one" />
            <span className="sound-ring ring-two" />
            <span className="sound-ring ring-three" />
            <Music2 size={86} strokeWidth={0.7} />
            <span className="sound-script" lang="fa">
              نوای مالستان
            </span>
            <span className="sound-caption">A HERITAGE TO REMEMBER</span>
          </div>
        </div>
      </section>
      <section className="section container">
        <Reveal className="section-heading">
          <div>
            <span className="eyebrow">05 / NOTES FROM THE LANDSCAPE</span>
            <h2>
              A glimpse of <em>home.</em>
            </h2>
          </div>
          <Link href="/gallery" className="text-link">
            Visit the photo archive <ArrowUpRight size={17} />
          </Link>
        </Reveal>
        <div className="photo-pair">
          <Link href="/gallery" className="gallery-preview">
            <Image
              src="/images/malistan-valley.webp"
              alt="Cultivated valley beneath the mountains of Malistan"
              fill
              sizes="(max-width: 650px) 100vw, 60vw"
            />
            <span>
              <small>LANDSCAPES</small>
              <strong>A valley called home</strong>
              <ArrowUpRight size={22} />
            </span>
          </Link>
          <Link href="/gallery" className="gallery-preview">
            <Image
              src="/images/malistan-winter.webp"
              alt="Winter snow in Malistan"
              fill
              sizes="(max-width: 650px) 100vw, 40vw"
            />
            <span>
              <small>SEASONS</small>
              <strong>When the mountains turn white</strong>
              <ArrowUpRight size={22} />
            </span>
          </Link>
        </div>
        <p className="image-credit">
          Photographs: Danial & Mohammad Reza Rahmani · CC BY-SA 4.0 ·{" "}
          <Link href="/sources#photo-credits">Credits & licences</Link>
        </p>
      </section>
      <section className="map-section">
        <div className="container map-layout">
          <Reveal>
            <span className="eyebrow">06 / FIND US IN THE HIGHLANDS</span>
            <h2>
              Here, in the
              <br />
              <em>heart of the highlands.</em>
            </h2>
            <p>
              Find Malistan in Ghazni province, Afghanistan. Explore the area
              around Mir Adina and see how our home connects to the surrounding
              landscape.
            </p>
            <span className="coordinates">
              <Compass size={18} /> 33.2953° N &nbsp; 67.1689° E
            </span>
            <small className="map-disclaimer">
              Approximate district-centre location. Map data © OpenStreetMap
              contributors.
            </small>
          </Reveal>
          <DistrictMap />
        </div>
      </section>
      <section className="section container stories">
        <Reveal className="section-heading">
          <div>
            <span className="eyebrow">07 / STORIES WORTH YOUR TIME</span>
            <h2>
              Begin with a <em>story.</em>
            </h2>
          </div>
          <Link href="/sources" className="text-link">
            Our research & sources <ArrowUpRight size={17} />
          </Link>
        </Reveal>
        <div className="story-grid">
          {[
            {
              tag: "PEOPLE & MUSIC",
              title: "Remembering the voices of Malistan",
              text: "Safdar Ali Malistani, Abay Mirza, and the care that cultural memory deserves.",
              href: "/people",
            },
            {
              tag: "LAND & LIVELIHOODS",
              title: "The knowledge behind everyday life",
              text: "What research in Maknak tells us about women and livestock care.",
              href: "/culture",
            },
            {
              tag: "HISTORY & MEMORY",
              title: "Reading Malistan through the record",
              text: "A historical profile, local stories, and a more thoughtful way to build an archive.",
              href: "/history",
            },
          ].map((s, i) => (
            <Link href={s.href} className="story-card" key={s.href}>
              <span className="story-number">0{i + 1}</span>
              <span className="eyebrow">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="text-link">
                Read the story <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="contribute container">
        <div>
          <span className="eyebrow">EVERY MEMORY HAS A PLACE HERE</span>
          <h2>
            Your home. <em>Your story.</em>
          </h2>
          <p>
            A photograph, a family memory, a voice worth remembering.
            <br />
            Help the next chapter of Malistan’s archive take shape.
          </p>
        </div>
        <Link
          href="/about#contribute-to-a-future-edition"
          className="button green"
        >
          Be part of the story <ArrowUpRight size={18} />
        </Link>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Place",
            name: "Malistan",
            alternateName: ["Malestan", "مالستان"],
            description: "A district in Ghazni province, Afghanistan.",
            address: {
              "@type": "PostalAddress",
              addressRegion: "Ghazni",
              addressCountry: "AF",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 33.2953,
              longitude: 67.1689,
            },
          }),
        }}
      />
    </main>
  );
}
