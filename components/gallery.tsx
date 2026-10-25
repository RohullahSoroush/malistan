"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Clapperboard, Expand, X } from "lucide-react";
import { photoCategories, photos, type Photo } from "@/lib/photos";
import { Button } from "@/components/ui/button";
import { playSound } from "@/lib/sound/store";

const ALL = "All";
const FILMS = "Films";
const filters = [ALL, ...photoCategories, FILMS];

export function Gallery() {
  const [category, setCategory] = useState<string>(ALL);
  const [openId, setOpenId] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const visible = category === ALL ? photos : photos.filter((p) => p.category === category);
  const index = openId ? visible.findIndex((p) => p.id === openId) : -1;
  const current: Photo | undefined = index >= 0 ? visible[index] : undefined;

  const open = useCallback((id: string) => {
    setOpenId(id);
    if (!dialog.current?.open) dialog.current?.showModal();
  }, []);

  const step = useCallback(
    (delta: number) => {
      if (index < 0) return;
      setOpenId(visible[(index + delta + visible.length) % visible.length].id);
    },
    [index, visible],
  );

  // Deep links such as /gallery#malistan-stream open that photograph.
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id && photos.some((p) => p.id === id)) open(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [open]);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { step(1); playSound("swish"); }
      if (e.key === "ArrowLeft") { step(-1); playSound("swish"); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId, step]);

  const count = (f: string) => (f === ALL ? photos.length : photos.filter((p) => p.category === f).length);

  return (
    <>
      <div className="segmented" role="group" aria-label="Filter photographs">
        {filters.map((f, i) => (
          <button key={f} type="button" aria-pressed={f === category} data-sound="tick" data-sound-step={i} onClick={() => setCategory(f)}>
            {f === category && (
              <motion.span layoutId="segmented-pill" className="segmented__pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
            )}
            <span className="segmented__label">
              {f}
              {f !== FILMS && <span className="segmented__count">{count(f)}</span>}
            </span>
          </button>
        ))}
      </div>

      {category === FILMS ? (
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
        <div className="masonry">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => (
              <motion.div
                key={p.id}
                className="masonry__item"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <button type="button" className="photo-card" data-tilt data-spotlight data-sound="shutter" onClick={() => open(p.id)}>
                  <span className="photo-card__media" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
                    <Image
                      src={p.src}
                      alt={p.description}
                      fill
                      placeholder={p.blur}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="photo-card__zoom" aria-hidden="true"><Expand size={18} /></span>
                  </span>
                  <span className="photo-card__body">
                    <small>{p.category}</small>
                    <strong>{p.title}</strong>
                    <span className="photo-card__credit">{p.credit}</span>
                  </span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <dialog
        ref={dialog}
        className="photo-dialog"
        aria-label={current ? current.title : "Photograph"}
        onClose={() => {
          playSound("close");
          setOpenId(null);
          if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
        }}
        onClick={(e) => { if (e.target === dialog.current) dialog.current.close(); }}
      >
        {current && (
          <>
            <button type="button" className="icon-btn dialog-close" aria-label="Close photograph" data-sound="none" onClick={() => dialog.current?.close()}>
              <X size={20} />
            </button>
            <div className="lightbox-image">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  className="lightbox-image__frame"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Image src={current.src} alt={current.description} fill placeholder={current.blur} sizes="94vw" />
                </motion.div>
              </AnimatePresence>
              {visible.length > 1 && (
                <>
                  <button type="button" className="lightbox-nav lightbox-nav--prev" data-sound="swish" aria-label="Previous photograph" onClick={() => step(-1)}>
                    <ChevronLeft size={22} />
                  </button>
                  <button type="button" className="lightbox-nav lightbox-nav--next" data-sound="swish" aria-label="Next photograph" onClick={() => step(1)}>
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>
            <div className="lightbox-caption">
              <div>
                <span className="lightbox-count">{index + 1} / {visible.length} · {current.category}</span>
                <h2>{current.title}</h2>
                <p>{current.description}</p>
                <p className="lightbox-credit">
                  {current.credit} ·{" "}
                  {current.licenseUrl ? (
                    <a href={current.licenseUrl} target="_blank" rel="noopener noreferrer">{current.license}</a>
                  ) : (
                    current.license
                  )}
                </p>
              </div>
              {current.source && (
                <a className="link" href={current.source} target="_blank" rel="noopener noreferrer">
                  View original <ArrowUpRight aria-hidden="true" />
                </a>
              )}
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
