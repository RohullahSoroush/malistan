import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { photos } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function GalleryPreview() {
  return (
    <section className="section" aria-labelledby="lens-title">
      <div className="container">
        <Reveal>
          <SectionHeader
            id="lens-title"
            eyebrow="Photo archive"
            title={<>Through the <em>lens</em></>}
            action={
              <Button href="/gallery" variant="secondary">
                Open the gallery <ArrowRight aria-hidden="true" />
              </Button>
            }
          />
        </Reveal>
        <div className="duo">
          {photos.map((p, i) => (
            <Reveal key={p.src} delay={i * 0.1}>
              <Link href="/gallery" className="duo__item parallax-img" data-tilt>
                <Image src={p.src} alt={p.description} fill sizes="(max-width: 760px) 100vw, 60vw" />
                <span>
                  <small>{p.category}</small>
                  <strong>{p.title}</strong>
                </span>
                <span className="duo__arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="credit-line">
          Photographs by Danial and Mohammad Reza Rahmani · CC BY-SA 4.0 ·{" "}
          <Link href="/sources#photo-credits">View credits</Link>
        </p>
      </div>
    </section>
  );
}
