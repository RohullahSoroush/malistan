"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function Toc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const chapters = items.map(({ id }) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    let frame = 0;
    // The active chapter is the last one whose heading has passed the reading line.
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = chapters[0]?.id;
      for (const el of chapters) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      if (current) setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  const index = Math.max(0, items.findIndex((i) => i.id === active));

  return (
    <nav className="toc" aria-label="In this story">
      <span className="toc__title">In this story</span>
      <ol>
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={item.id === active ? "is-active" : undefined}
              aria-current={item.id === active ? "location" : undefined}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
      <div className="toc__progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${(index + 1) / items.length})` }} />
      </div>
      <Link className="link" href="/sources">Source library <ArrowUpRight aria-hidden="true" /></Link>
    </nav>
  );
}
