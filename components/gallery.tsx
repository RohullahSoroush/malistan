"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { photos } from "@/lib/content";
import { ArrowUpRight, Expand, X } from "lucide-react";
export function Gallery() {
  const [category, setCategory] = useState("All photographs");
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <div className="filter-row" aria-label="Filter photographs">
        {["All photographs", "Landscapes", "Seasons", "Films"].map((c) => (
          <button
            key={c}
            aria-pressed={c === category}
            className={c === category ? "selected" : ""}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      {category === "Films" ? (
        <div className="empty-state">
          <span className="eyebrow">THE NEXT CHAPTER</span>
          <h2>Moving pictures. Lasting memories.</h2>
          <p>
            The film collection is being prepared. Future editions will feature
            locally documented videos with permission from their creators.
          </p>
          <a className="text-link" href="/about#contribute-to-a-future-edition">
            How to contribute <ArrowUpRight size={17} />
          </a>
        </div>
      ) : (
        <div className="gallery-grid">
          {photos
            .filter(
              (p) => category === "All photographs" || p.category === category,
            )
            .map((p) => (
              <button
                className="gallery-item"
                key={p.src}
                onClick={() => {
                  setSelected(photos.indexOf(p));
                  dialog.current?.showModal();
                }}
              >
                <div>
                  <Image
                    src={p.src}
                    alt={p.description}
                    fill
                    sizes="(max-width: 650px) 100vw, 50vw"
                  />
                  <span className="expand-icon">
                    <Expand size={19} />
                  </span>
                </div>
                <span className="eyebrow">{p.category}</span>
                <h2>{p.title}</h2>
                <p>Photograph by {p.author}</p>
              </button>
            ))}
        </div>
      )}
      <dialog
        ref={dialog}
        className="photo-dialog"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <button
          className="dialog-close icon-button"
          aria-label="Close photograph"
          onClick={() => dialog.current?.close()}
        >
          <X />
        </button>
        <div className="lightbox-image">
          <Image
            src={photos[selected].src}
            alt={photos[selected].description}
            fill
            sizes="90vw"
          />
        </div>
        <div className="lightbox-caption">
          <div>
            <h2>{photos[selected].title}</h2>
            <p>{photos[selected].author} · CC BY-SA 4.0</p>
          </div>
          <a
            href={photos[selected].source}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            View original <ArrowUpRight size={16} />
          </a>
        </div>
      </dialog>
    </>
  );
}
