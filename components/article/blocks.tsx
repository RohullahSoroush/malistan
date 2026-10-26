import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight, Quote } from "lucide-react";
import type { Fact, Faq, GlossaryTerm, TimelineEvent } from "@/lib/article-extras";
import { sources } from "@/lib/content";
import { photo } from "@/lib/photos";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Breadcrumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        <li><Link href="/">Home</Link></li>
        {trail.map((item) => (
          <li key={item.label}>
            <ChevronRight size={13} aria-hidden="true" />
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Glance({ facts }: { facts: Fact[] }) {
  return (
    <dl className="glance" aria-label="At a glance">
      {facts.map((f) => (
        <div className="glance__item" key={f.label}>
          <dt>{f.label}</dt>
          <dd>
            <strong>{f.value}</strong>
            {f.note && <small>{f.note}</small>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function InlinePhoto({ id, caption }: { id: string; caption?: string }) {
  const p = photo(id);
  const tall = p.height > p.width;
  return (
    <Reveal>
      <figure className={tall ? "inline-photo inline-photo--tall" : "inline-photo"}>
        <Link href={`/gallery#${p.id}`} className="inline-photo__frame" aria-label={`Open ${p.title} in the gallery`}>
          <Image src={p.src} alt={p.description} fill placeholder={p.blur} sizes="(max-width: 960px) 100vw, 720px" />
        </Link>
        <figcaption>
          <span>{caption ?? p.description}</span>
          <small>{p.title} · {p.credit}</small>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function PullQuote({ text, cite }: { text: string; cite?: string }) {
  return (
    <Reveal>
      <figure className="pull-quote">
        <Quote size={26} aria-hidden="true" />
        <blockquote>{text}</blockquote>
        {cite && <figcaption>{cite}</figcaption>}
      </figure>
    </Reveal>
  );
}

export function Timeline({ title, events }: { title: string; events: TimelineEvent[] }) {
  return (
    <section className="timeline" aria-label={title}>
      <Eyebrow>Timeline</Eyebrow>
      <h3>{title}</h3>
      <ol>
        {events.map((e, i) => {
          const source = e.source ? sources.find((s) => s.id === e.source) : undefined;
          return (
            <Reveal key={e.year + e.title} delay={Math.min(i, 4) * 0.05}>
              <li className="timeline__item">
                <span className="timeline__year">{e.year}</span>
                <div className="timeline__body">
                  <strong>{e.title}</strong>
                  <p>{e.text}</p>
                  {source && (
                    <a href={source.url} target="_blank" rel="noopener noreferrer">{source.name.split(" · ")[0]}</a>
                  )}
                </div>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}

export function Glossary({ title, terms }: { title: string; terms: GlossaryTerm[] }) {
  return (
    <section className="glossary" aria-label={title}>
      <Eyebrow>Glossary</Eyebrow>
      <h3>{title}</h3>
      <dl>
        {terms.map((t, i) => (
          <Reveal key={t.term} delay={Math.min(i, 5) * 0.04}>
            <div className="glossary__item">
              <dt>
                {t.term}
                {t.native && <span lang="fa" dir="rtl">{t.native}</span>}
              </dt>
              <dd>{t.meaning}</dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <section className="faq" aria-labelledby="faq-title">
      <Eyebrow>Common questions</Eyebrow>
      <h2 id="faq-title">Questions people ask about <em>Malistan</em></h2>
      <div className="faq__list">
        {items.map((f, i) => (
          <details className="faq__item" key={f.q} open={i === 0}>
            <summary>
              <span>{f.q}</span>
              <ChevronRight size={18} aria-hidden="true" />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function StoryNav({
  prev,
  next,
}: {
  prev?: { href: string; eyebrow: string; title: string };
  next?: { href: string; eyebrow: string; title: string };
}) {
  return (
    <nav className="story-nav" aria-label="Previous and next story">
      {prev ? (
        <Link href={prev.href} className="story-nav__link story-nav__link--prev">
          <span className="story-nav__dir"><ArrowLeft size={15} aria-hidden="true" /> Previous</span>
          <span className="story-nav__eyebrow">{prev.eyebrow}</span>
          <strong>{prev.title}</strong>
        </Link>
      ) : <span />}
      {next ? (
        <Link href={next.href} className="story-nav__link story-nav__link--next">
          <span className="story-nav__dir">Next <ArrowRight size={15} aria-hidden="true" /></span>
          <span className="story-nav__eyebrow">{next.eyebrow}</span>
          <strong>{next.title}</strong>
        </Link>
      ) : <span />}
    </nav>
  );
}
