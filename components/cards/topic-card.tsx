import Image from "next/image";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { photos } from "@/lib/photos";

export type Tone = "brand" | "accent";

export function TopicCard({
  href,
  image,
  imagePosition,
  kicker,
  title,
  description,
  num,
  icon: Icon,
  tone = "brand",
  cta = "Read the story",
}: {
  href: string;
  image: string;
  imagePosition?: string;
  kicker: string;
  title: string;
  description?: string;
  num?: string;
  icon?: LucideIcon;
  tone?: Tone;
  cta?: string;
}) {
  return (
    <Link href={href} className={tone === "accent" ? "topic-card tone-accent" : "topic-card"} data-spotlight data-tilt>
      <div className="topic-card__media">
        <Image
          src={image}
          alt=""
          fill
          placeholder={photos.find((p) => p.src === image)?.blur ?? "empty"}
          sizes="(max-width: 580px) 100vw, (max-width: 1080px) 50vw, 25vw"
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
        {Icon && <span className="topic-card__badge"><Icon size={19} /></span>}
        {num && <span className="topic-card__num">{num}</span>}
      </div>
      <div className="topic-card__body">
        <span className="topic-card__kicker">{kicker}</span>
        <h3 className="topic-card__title">{title}</h3>
        {description && <p className="topic-card__desc">{description}</p>}
        <span className="topic-card__cta">{cta} <ArrowRight size={16} aria-hidden="true" /></span>
      </div>
    </Link>
  );
}
