import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { photo, photos } from "@/lib/photos";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const tiles = [
  { photo: photo("malistan-autumn-valley"), area: "a", sizes: "(max-width: 760px) 100vw, 45vw" },
  { photo: photo("malistan-stream"), area: "b", sizes: "(max-width: 760px) 50vw, 25vw" },
  { photo: photo("malistan-poplar-road"), area: "c", sizes: "(max-width: 760px) 50vw, 25vw" },
  { photo: photo("malistan-flock"), area: "d", sizes: "(max-width: 760px) 50vw, 25vw" },
];

export function GalleryPreview() {
  return (
    <section className="section" aria-labelledby="lens-title">
      <div className="container">
        <Reveal>
          <SectionHeader
            id="lens-title"
            eyebrow="Photo archive"
            title={<>Through the <em>lens</em></>}
            intro={`${photos.length} photographs of Malistan's valleys, fields, streams and seasons — and the collection is growing.`}
            action={
              <Button href="/gallery" variant="secondary">
                Open the gallery <ArrowRight aria-hidden="true" />
              </Button>
            }
          />
        </Reveal>
        <div className="mosaic">
          {tiles.map(({ photo: p, area, sizes }, i) => (
            <Reveal key={p.id} delay={i * 0.08} className={`mosaic__slot mosaic__slot--${area}`}>
              <Link href={`/gallery#${p.id}`} className="mosaic__item parallax-img" data-tilt>
                <Image src={p.src} alt={p.description} fill placeholder={p.blur} sizes={sizes} />
                <span className="mosaic__caption">
                  <small>{p.category}</small>
                  <strong>{p.title}</strong>
                </span>
                <span className="mosaic__arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="credit-line">
          Photographs shared by Rohullah Mohammadi, with two from Wikimedia Commons (CC BY-SA 4.0) ·{" "}
          <Link href="/sources#photo-credits">View credits</Link>
        </p>
      </div>
    </section>
  );
}
