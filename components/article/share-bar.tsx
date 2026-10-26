"use client";

import { useEffect, useState } from "react";
import { Check, Link2, MessageCircle, Share2 } from "lucide-react";
import { playSound } from "@/lib/sound/store";

export function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  useEffect(() => { setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function"); }, []);

  const text = `${title} — Malistan Archive`;
  const encoded = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      playSound("pop");
      window.setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  }

  return (
    <div className="share" role="group" aria-label="Share this story">
      <span className="share__label">Share this story</span>
      <div className="share__actions">
        <a className="share__btn" href={`https://wa.me/?text=${encodedText}%20${encoded}`} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={16} aria-hidden="true" /> WhatsApp
        </a>
        <a className="share__btn" href={`https://x.com/intent/tweet?text=${encodedText}&url=${encoded}`} target="_blank" rel="noopener noreferrer">
          <span className="share__x" aria-hidden="true">𝕏</span> Post
        </a>
        <a className="share__btn" href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener noreferrer">
          <span className="share__f" aria-hidden="true">f</span> Facebook
        </a>
        {canShare && (
          <button type="button" className="share__btn" data-sound="none" onClick={() => navigator.share({ title: text, url }).catch(() => undefined)}>
            <Share2 size={16} aria-hidden="true" /> More
          </button>
        )}
        <button type="button" className={copied ? "share__btn is-done" : "share__btn"} data-sound="none" onClick={copy}>
          {copied ? <Check size={16} aria-hidden="true" /> : <Link2 size={16} aria-hidden="true" />}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
