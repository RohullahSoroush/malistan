"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Clapperboard, Expand, X } from "lucide-react";
import { photos } from "@/lib/content";
import { Button } from "@/components/ui/button";

const categories = ["All photographs", "Landscapes", "Seasons", "Films"];

export function Gallery() {
  const [category, setCategory] = useState(categories[0]);
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);

  const visible = photos.filter((p) => category === categories[0] || p.category === category);
  const photo = photos[selected];

  return (
    <>
      <div className="segmented" role="group" aria-label="Filter photographs">
        {categories.map((c) => (
          <button key={c} type="button" aria-pressed={c === category} onClick={() => setCategory(c)}>
            {c === category && (
              <motion.span layoutId="segmented-pill" className="segmented__pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
            )}
            <span className="segmented__label">{c}</span>
          </button>
        ))}
      </div>

      {category === "Films" ? (
        <div className="empty-state">
          <span className="empty-state__icon"><Clapperboard size={28} aria-hidden="true" /></span>
          <h2>Moving pictures are on the way</h2>
          <p>
            The film collection is being prepared. Future editions will feature locally documented
            videos, shared with permission from their creators.
          </p>
          <Button href="/about#contribute-to-a-future-edition" variant="secondary">
            How to contribute <ArrowUpRight aria-hidden="true" />
          </Button>
        </div>
      ) : (
        <div className="gallery-grid">
          {visible.map((p) => (
            <button
              key={p.src}
              type="button"
              className="photo-card"
              data-tilt
              data-spotlight
              onClick={() => {
                setSelected(photos.indexOf(p));
                dialog.current?.showModal();
              }}
            >
              <span className="photo-card__media">
                <Image src={p.src} alt={p.description} fill sizes="(max-width: 700px) 100vw, 50vw" />
                <span className="photo-card__zoom" aria-hidden="true"><Expand size={18} /></span>
              </span>
              <span className="photo-card__body">
                <small>{p.category}</small>
                <strong>{p.title}</strong>
                <p>Photograph by {p.author}</p>
              </span>
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialog}
        className="photo-dialog"
        aria-label={photo.title}
        onClick={(e) => { if (e.target === dialog.current) dialog.current.close(); }}
      >
        <button type="button" className="icon-btn dialog-close" aria-label="Close photograph" onClick={() => dialog.current?.close()}>
          <X size={20} />
        </button>
        <div className="lightbox-image">
          <Image src={photo.src} alt={photo.description} fill sizes="94vw" />
        </div>
        <div className="lightbox-caption">
          <div>
            <h2>{photo.title}</h2>
            <p>{photo.author} · CC BY-SA 4.0</p>
          </div>
          <a className="link" href={photo.source} target="_blank" rel="noopener noreferrer">
            View original <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </dialog>
    </>
  );
}
