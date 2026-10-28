import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MessageCircleHeart } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { CopyEmail } from "@/components/contact/copy-email";
import { LiveClock } from "@/components/live/live-card";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { contactGraph, founder, graph, pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site-url";

export const metadata: Metadata = pageMetadata("contact", "/contact");

const steps = [
  { title: "Your note arrives", text: `It lands straight in the archive’s inbox at ${CONTACT_EMAIL}.` },
  { title: "A person reads it", text: "Every message is read personally — no bots, no mailing lists." },
  { title: "We write back", text: "You’ll get a reply by email, usually within a few days." },
];

export default function ContactPage() {
  return (
    <main id="main" className="page contact-page">
      <JsonLd data={graph(contactGraph())} />
      <div className="container">
        <PageHero
          eyebrow="Get in touch"
          title={<>Say <em>salaam</em></>}
          intro="A question, a family memory, a correction or an idea for the archive — send a short note and it goes straight to the Malistan Archive’s inbox."
        />

        <div className="contact-layout">
          <Reveal className="contact-layout__main">
            <ContactForm />
          </Reveal>

          <aside className="contact-aside" aria-label="Other ways to reach us">
            <Reveal delay={0.08}>
              <div className="contact-card contact-card--email">
                <span className="contact-card__icon"><Mail size={20} aria-hidden="true" /></span>
                <h2>Prefer email?</h2>
                <a className="contact-card__email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                <CopyEmail />
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="contact-card">
                <span className="contact-card__icon tone-accent"><MessageCircleHeart size={20} aria-hidden="true" /></span>
                <h2>What happens next</h2>
                <ol className="contact-steps">
                  {steps.map((s, i) => (
                    <li key={s.title}>
                      <span className="contact-steps__num" aria-hidden="true">{i + 1}</span>
                      <div>
                        <strong>{s.title}</strong>
                        <p>{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="contact-card contact-card--founder">
                <span className="avatar">
                  <span>
                    <Image src={founder.avatar} alt="" width={46} height={46} placeholder={founder.blur} />
                  </span>
                </span>
                <div>
                  <strong>{founder.name}</strong>
                  <small>Software developer · Founder</small>
                </div>
                <div className="contact-card__clock"><LiveClock /></div>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </main>
  );
}
