"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X, Search, ArrowRight } from "lucide-react";
import { MountainMark } from "./icons";
import { articles } from "@/lib/content";
const links = [
  ["Discover", "/"],
  ["History", "/history"],
  ["Places", "/places"],
  ["Culture", "/culture"],
  ["People", "/people"],
  ["Gallery", "/gallery"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const path = usePathname();
  const results = Object.entries(articles).filter(([key, a]) =>
    `${key} ${a.title} ${a.intro} ${a.sections.map((s) => s.title + " " + s.text).join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <>
      <header className="header">
        <Link href="/" className="brand" aria-label="Malistan home">
          <MountainMark />
          <span>
            MALISTAN<small>A PLACE. A PEOPLE. A STORY.</small>
          </span>
        </Link>
        <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
          {links.map(([text, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {text}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button
            aria-label="Search the archive"
            className="icon-button"
            onClick={() => setSearch(!search)}
            aria-expanded={search}
          >
            {search ? <X size={19} /> : <Search size={19} />}
          </button>
          <Link href="/about" className="about-link">
            Our story <ArrowUpRight size={16} />
          </Link>
          <button
            className="icon-button menu-button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {search && (
        <section className="search-panel" aria-label="Search archive">
          <div className="container">
            <label htmlFor="search">What would you like to discover?</label>
            <input
              autoFocus
              id="search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try music, Maknak, history…"
              onKeyDown={(e) => {
                if (e.key === "Escape") setSearch(false);
              }}
            />
            {query && (
              <div className="search-results" aria-live="polite">
                {results.length ? (
                  results.map(([slug, a]) => (
                    <Link
                      onClick={() => {
                        setSearch(false);
                        setQuery("");
                      }}
                      key={slug}
                      href={"/" + slug}
                    >
                      {a.eyebrow}
                      <ArrowRight size={16} />
                    </Link>
                  ))
                ) : (
                  <p>No results. Try a place name or another topic.</p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container footer-top">
        <Link href="/" className="brand">
          <MountainMark />
          <span>
            MALISTAN<small>A PLACE. A PEOPLE. A STORY.</small>
          </span>
        </Link>
        <p>
          Rooted in our mountains.
          <br />
          Connected through our stories.
        </p>
        <div>
          <Link href="/about">About the archive</Link>
          <Link href="/sources">Sources & photo credits</Link>
          <Link href="/about#contribute-to-a-future-edition">
            Contribute a memory <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Malistan Archive · An independent
          community project
        </span>
        <span className="creator-credit">
          Designed &amp; built by{" "}
          <a href="https://rohullah.me" target="_blank" rel="noopener noreferrer">
            Rohullah Mohammadi <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </span>
        <span>
          Ghazni, Afghanistan <span className="live-dot" />
        </span>
      </div>
    </footer>
  );
}
