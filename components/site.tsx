"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Search, ArrowRight } from "lucide-react";
import { MountainMark } from "./icons";
import { articles } from "@/lib/content";
import { ThemeSwitcher } from "./theme-switcher";

const primaryLinks = [
  ["History", "/history"],
  ["Places", "/places"],
  ["Culture", "/culture"],
  ["People", "/people"],
  ["Gallery", "/gallery"],
];

export function Header() {
  const [open,    setOpen]    = useState(false);
  const [search,  setSearch]  = useState(false);
  const [query,   setQuery]   = useState("");
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  /* Close panels on route change */
  useEffect(() => { setOpen(false); setSearch(false); setQuery(""); }, [path]);

  /* Scroll detection */
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 64);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  /* Mobile menu: lock scroll + focus trap */
  useEffect(() => {
    if (!open) return;
    const prev      = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const bg = [...document.querySelectorAll<HTMLElement>("main, footer")];
    bg.forEach((el) => { el.inert = true; });
    document.querySelector<HTMLAnchorElement>(".nav.open a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); prevFocus?.focus(); }
      if (e.key === "Tab") {
        const items = [...document.querySelectorAll<HTMLElement>(
          ".header a, .header button, .header select"
        )].filter((el) => el.getClientRects().length > 0);
        const [first, last] = [items[0], items[items.length - 1]];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      bg.forEach((el) => { el.inert = false; });
      window.removeEventListener("keydown", onKey);
      if (document.activeElement === document.body) prevFocus?.focus();
    };
  }, [open]);

  const results = Object.entries(articles).filter(([key, a]) =>
    `${key} ${a.title} ${a.eyebrow} ${a.intro} ${a.sections.map((s) => s.title + " " + s.text).join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  const headerClass = [
    "header",
    path === "/" ? "on-home" : "",
    scrolled     ? "is-scrolled" : "",
    open         ? "menu-active"  : "",
  ].filter(Boolean).join(" ");

  return (
    <>
      <header className={headerClass}>
        <Link href="/" className="brand" aria-label="Malistan — home">
          <MountainMark />
          <span>
            MALISTAN
            <small>GHAZNI, AFGHANISTAN</small>
          </span>
        </Link>

        <nav
          className={open ? "nav open" : "nav"}
          aria-label="Main navigation"
          id="main-nav"
        >
          {primaryLinks.map(([text, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {text}
            </Link>
          ))}
          <Link
            href="/about"
            className="menu-extra"
            aria-current={path === "/about" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            Our story
          </Link>
          <Link
            href="/sources"
            className="menu-extra"
            aria-current={path === "/sources" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            Sources & credits
          </Link>
        </nav>

        <div className="header-actions">
          <ThemeSwitcher />

          <button
            className="icon-button"
            aria-label={search ? "Close search" : "Search the archive"}
            aria-expanded={search}
            aria-controls="search-panel"
            onClick={() => { setSearch(!search); setOpen(false); }}
          >
            {search ? <X size={18} /> : <Search size={18} />}
          </button>

          <Link href="/about" className="about-link">
            Our story <ArrowUpRight size={15} aria-hidden="true" />
          </Link>

          <button
            className="icon-button menu-button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => { setOpen(!open); setSearch(false); }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {search && (
        <section
          id="search-panel"
          className="search-panel"
          aria-label="Search the archive"
        >
          <div className="container">
            <label htmlFor="archive-search">
              What would you like to discover?
            </label>
            <input
              autoFocus
              id="archive-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try history, Maknak, culture…"
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setSearch(false);
                  setQuery("");
                  document.querySelector<HTMLButtonElement>(
                    'button[aria-label="Search the archive"]'
                  )?.focus();
                }
              }}
            />
            {query && (
              <div className="search-results" role="region" aria-live="polite">
                {results.length ? (
                  results.map(([slug, a]) => (
                    <Link
                      key={slug}
                      href={"/" + slug}
                      onClick={() => { setSearch(false); setQuery(""); }}
                    >
                      {a.eyebrow}
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  ))
                ) : (
                  <p style={{ padding: "12px 16px", gridColumn: "1/-1", fontSize: "13px", color: "var(--moss)" }}>
                    No results found — try a place name or another topic.
                  </p>
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
        {/* Brand */}
        <div className="footer-brand">
          <Link href="/" className="brand" aria-label="Malistan — home">
            <MountainMark />
            <span>
              MALISTAN
              <small>A PLACE. A PEOPLE. A STORY.</small>
            </span>
          </Link>
          <p>
            Rooted in our mountains.<br />
            Connected through our stories.<br />
            Built for the people of Malistan everywhere.
          </p>
        </div>

        {/* Explore */}
        <div className="footer-col">
          <h4>Explore</h4>
          <Link href="/history">The history</Link>
          <Link href="/places">Places & geography</Link>
          <Link href="/culture">Culture & traditions</Link>
          <Link href="/people">The people</Link>
          <Link href="/gallery">Photo archive</Link>
        </div>

        {/* About */}
        <div className="footer-col">
          <h4>About</h4>
          <Link href="/about">Our story</Link>
          <Link href="/about#founder">Meet the founder</Link>
          <Link href="/about#contribute-to-a-future-edition">
            Contribute a memory <ArrowUpRight size={12} aria-hidden="true" />
          </Link>
          <Link href="/sources">Sources & credits</Link>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Archive</h4>
          <a
            href="https://rohullah.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rohullah Mohammadi <ArrowUpRight size={12} aria-hidden="true" />
          </a>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", paddingBlock: "2px" }}>
            Founder &amp; Curator
          </span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", paddingBlock: "2px" }}>
            Malistan, Ghazni Province
          </span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", paddingBlock: "2px" }}>
            Afghanistan
          </span>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Malistan Archive ·{" "}
          An independent community project
        </span>
        <span className="creator-credit">
          Designed &amp; built by{" "}
          <a
            href="https://rohullah.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rohullah Mohammadi{" "}
            <ArrowUpRight size={11} aria-hidden="true" />
          </a>
        </span>
        <span>
          Ghazni, Afghanistan{" "}
          <span className="live-dot" aria-hidden="true" />
        </span>
      </div>
    </footer>
  );
}
