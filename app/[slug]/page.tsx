import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookMarked, BookOpen, Clock, Info, MapPin } from "lucide-react";
import { FounderCard } from "@/components/cards/founder-card";
import { TopicCard } from "@/components/cards/topic-card";
import { Breadcrumbs, FaqList, Glance, Glossary, InlinePhoto, PullQuote, StoryNav, Timeline } from "@/components/article/blocks";
import { ShareBar } from "@/components/article/share-bar";
import { Toc } from "@/components/toc";
import { Eyebrow, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { articleOrder, extras, type Block } from "@/lib/article-extras";
import { articles, sources } from "@/lib/content";
import { photos } from "@/lib/photos";
import { abs, articleGraph, graph, pageMetadata, pages } from "@/lib/seo";
import { slugify } from "@/lib/slug";
import { JsonLd } from "@/components/seo/json-ld";

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!articles[slug] || !pages[slug]) return { title: "Page not found" };
  return pageMetadata(slug, `/${slug}`, { type: "article" });
}

function ExtraBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "photo": return <InlinePhoto id={block.id} caption={block.caption} />;
    case "quote": return <PullQuote text={block.text} cite={block.cite} />;
    case "timeline": return <Timeline title={block.title} events={block.events} />;
    case "glossary": return <Glossary title={block.title} terms={block.terms} />;
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles[slug];
  if (!a) notFound();

  const extra = extras[slug];
  const words = [a.intro, ...a.sections.map((s) => s.text)].join(" ").split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  const toc = a.sections.map((s) => ({ id: slugify(s.title), label: s.title.split(" · ")[0] }));
  const cover = photos.find((p) => p.src === a.image) ?? photos[0];
  const title = a.title.replace("\n", " ");

  const position = articleOrder.indexOf(slug as (typeof articleOrder)[number]);
  const neighbour = (offset: number) => {
    const key = articleOrder[position + offset];
    return key ? { href: `/${key}`, eyebrow: articles[key].eyebrow, title: articles[key].title.replace("\n", " ") } : undefined;
  };
  const more = Object.entries(articles).filter(([key]) => key !== slug && key !== "about").slice(0, 3);

  return (
    <main id="main" className="page">
      <JsonLd data={graph(articleGraph(slug))} />
      <div className="container">
        <header className="article-hero">
          <Breadcrumbs trail={[{ label: a.eyebrow }]} />
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

        {extra && <Reveal><Glance facts={extra.glance} /></Reveal>}

        <div className="article-layout">
          <Toc items={toc} />
          <article className="prose">
            {a.sections.map((s, i) => {
              const source = s.source ? sources.find((x) => x.id === s.source) : undefined;
              const after = extra?.blocks.filter((b) => b.after === i) ?? [];
              return (
                <div className="chapter-group" key={s.title}>
                  <section className="chapter" id={toc[i].id}>
                    <span className="chapter__num">CHAPTER {String(i + 1).padStart(2, "0")}</span>
                    <h2>{s.title}</h2>
                    <p>{s.text}</p>
                    {source && (
                      <a className="source-pill" href={source.url} target="_blank" rel="noopener noreferrer">
                        <BookMarked size={15} aria-hidden="true" /> {source.name} · {source.date}
                      </a>
                    )}
                  </section>
                  {after.map((block, j) => <ExtraBlock block={block} key={`${block.type}-${i}-${j}`} />)}
                </div>
              );
            })}

            {slug === "about" && <FounderCard id="founder" showStoryLink={false} />}
            {extra?.faq && <FaqList items={extra.faq} />}

            <div className="article-end">
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
              <ShareBar url={abs(`/${slug}`)} title={title} />
            </div>

            <StoryNav prev={neighbour(-1)} next={neighbour(1)} />
          </article>
        </div>
      </div>

      <section className="container section--tight" aria-labelledby="more-title">
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
