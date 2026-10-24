"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function Toc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (first) setActive(first.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
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
