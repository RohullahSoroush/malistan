"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

/** The editors' announcement (admin → Site settings). Hidden for the rest of the visit once dismissed. */
export function Announcement({ text, href }: { text: string; href: string | null }) {
  const key = `announcement:${text}`;
  const [show, setShow] = useState(false);
  useEffect(() => {
    try { setShow(sessionStorage.getItem(key) !== "hidden"); } catch { setShow(true); }
  }, [key]);
  if (!show) return null;
  const dismiss = () => {
    setShow(false);
    try { sessionStorage.setItem(key, "hidden"); } catch { /* private mode */ }
  };
  const external = !!href && href.startsWith("https://");
  return (
    <div className="announcement" role="region" aria-label="Announcement">
      <p>
        {href ? (
          external ? <a href={href} target="_blank" rel="noopener noreferrer">{text}</a> : <Link href={href}>{text}</Link>
        ) : text}
      </p>
      <button type="button" aria-label="Dismiss announcement" onClick={dismiss}><X size={16} aria-hidden="true" /></button>
    </div>
  );
}
