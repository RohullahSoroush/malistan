import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookMarked, BookOpen, Clock, Info, MapPin } from "lucide-react";
import { FounderCard } from "@/components/cards/founder-card";
import { TopicCard } from "@/components/cards/topic-card";
import { Toc } from "@/components/toc";
import { Eyebrow, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { getArchive, type Person } from "@/lib/archive";
import { articleGraph, articlePage, graph, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { CONTACT_EMAIL } from "@/lib/site-url";

// Articles come from the archive (published in the admin). Known ones are prerendered; a new one renders on its first
// visit; every page refreshes at most once a minute, and an unpublished address is a 404.
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getArchive()).order.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = (await getArchive()).articles[slug];
  if (!a) return { title: "Page not found" };
  return pageMetadata(slug, `/${slug}`, { type: "article", page: articlePage(slug, a) });
}

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("");
}

/** Profiles of the people of Malistan (admin → People), shown on the people article. */
function PeopleProfiles({ people, sources }: { people: Person[]; sources: { id: string; name: string; date: string; url: string }[] }) {
  return (
    <section className="people-grid" aria-label="Profiles">
      {people.map((p) => {
        const source = p.source ? sources.find((s) => s.id === p.source) : undefined;
        return (
          <article className="person-card" id={`person-${p.slug}`} key={p.slug}>
            <span className="person-card__portrait">
              {p.photo ? <Image src={p.photo} alt={`Portrait of ${p.name}`} fill sizes="72px" /> : <span aria-hidden="true">{initials(p.name)}</span>}
            </span>
            <div>
              <h3>{p.name}</h3>
              {p.nativeName && <p className="person-card__native" lang="fa" dir="rtl">{p.nativeName}</p>}
              <p className="person-card__meta">{[p.role, p.village, p.life].filter(Boolean).join(" · ")}</p>
            </div>
            <div className="person-card__body">
              {p.summary && <p>{p.summary}</p>}
              {p.bio && p.bio !== p.summary && (
                <details>
                  <summary>Read more</summary>
                  {p.bio.split(/\n{2,}/).map((para, i) => <p key={i}>{para}</p>)}
                </details>
              )}
              {source && (
                source.url ? (
                  <a className="source-pill" href={source.url} target="_blank" rel="noopener noreferrer">
                    <BookMarked size={15} aria-hidden="true" /> {source.name}{source.date ? ` · ${source.date}` : ""}
                  </a>
                ) : (
                  <span className="source-pill"><BookMarked size={15} aria-hidden="true" /> {source.name}</span>
                )
              )}
              {p.photo && p.photoCredit && <small className="photo-card__credit">Portrait: {p.photoCredit}</small>}
            </div>
          </article>
        );
      })}
    </section>
  );
}

// Turns the contact address inside article text into a mailto link.
function linkEmail(text: string) {
  const parts = text.split(CONTACT_EMAIL);
  if (parts.length === 1) return text;
  return parts.flatMap((part, i) => (i === 0 ? [part] : [<a key={i} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, part]));
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { articles, order, sources, photos, people } = await getArchive();
  const a = articles[slug];
  if (!a) notFound();

  const words = [a.intro, ...a.sections.map((s) => s.text)].join(" ").split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  const toc = a.sections.map((s) => ({ id: slugify(s.title), label: s.title.split(" · ")[0] }));
  const more = order.filter((key) => key !== slug && key !== "about").slice(0, 3).map((key) => [key, articles[key]!] as const);
  const known = photos.find((p) => p.src === a.image);
  const cover = known ?? (a.image
    ? { src: a.image, description: a.title.replace(/\n/g, " "), title: a.eyebrow || "Cover", credit: "Malistan Archive", blur: "empty" as const }
    : photos[0]!);

  return (
    <main id="main" className="page">
      <JsonLd data={graph(articleGraph(slug, a, sources))} />
      <div className="container">
        <header className="article-hero">
          <Link href="/" className="back-link"><ArrowLeft size={15} aria-hidden="true" /> Back home</Link>
          <Eyebrow>{a.eyebrow}</Eyebrow>
          <h1 className="article-hero__title">{a.title}</h1>
          <p className="article-hero__intro">{a.intro}</p>
          <div className="chip-row">
            <span className="chip"><Clock aria-hidden="true" /> {minutes} min read</span>
            <span className="chip"><BookOpen aria-hidden="true" /> {a.sections.length} chapters</span>
            <span className="chip"><MapPin aria-hidden="true" /> Malistan, Ghazni</span>
          </div>
        </header>

        <figure className="article-cover">
          <Image
            src={cover.src}
            alt={cover.description}
            fill
            priority
            placeholder={cover.blur}
            sizes="(max-width: 1240px) 100vw, 1200px"
          />
          <figcaption>{cover.title} · {cover.credit} · <Link href="/sources#photo-credits">Credits</Link></figcaption>
        </figure>

        <div className="article-layout">
          <Toc items={toc} />
          <article className="prose">
            {slug === "people" && people.length > 0 && <PeopleProfiles people={people} sources={sources} />}
            {a.sections.map((s, i) => {
              const source = s.source ? sources.find((x) => x.id === s.source) : undefined;
              return (
                <section className="chapter" id={toc[i]!.id} key={`${i}-${s.title}`}>
                  <span className="chapter__num">CHAPTER {String(i + 1).padStart(2, "0")}</span>
                  <h2>{s.title}</h2>
                  <p>{linkEmail(s.text)}</p>
                  {source && (source.url ? (
                    <a className="source-pill" href={source.url} target="_blank" rel="noopener noreferrer">
                      <BookMarked size={15} aria-hidden="true" /> {source.name}{source.date ? ` · ${source.date}` : ""}
                    </a>
                  ) : (
                    <span className="source-pill"><BookMarked size={15} aria-hidden="true" /> {source.name}{source.date ? ` · ${source.date}` : ""}</span>
                  ))}
                </section>
              );
            })}

            {slug === "about" && <FounderCard id="founder" showStoryLink={false} />}

            <aside className="note-card">
              <Info size={20} aria-hidden="true" />
              <div>
                <strong>A growing community archive</strong>
                <p>
                  Researched for this edition in October 2026. Historical figures are labelled with
                  their source date, and local knowledge or documented corrections help future
                  editions grow.
                </p>
              </div>
            </aside>
          </article>
        </div>
      </div>

      <section className="container" aria-labelledby="more-title">
        <Reveal>
          <SectionHeader id="more-title" eyebrow="Keep exploring" title={<>More from <em>Malistan</em></>} />
        </Reveal>
        <div className="card-grid card-grid--3">
          {more.map(([key, item], i) => (
            <Reveal key={key} delay={i * 0.08}>
              <TopicCard
                href={`/${key}`}
                image={item.image}
                kicker={item.eyebrow}
                title={item.title.replace("\n", " ")}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
