"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight, BookOpen, Menu, Search, X } from "lucide-react";
import { articles } from "@/lib/content";
import { Brand } from "./brand";
import { ThemeToggle } from "./theme-toggle";
import { SoundToggle } from "@/components/sound/sound-toggle";

export const navLinks = [
  { label: "History", href: "/history" },
  { label: "Places", href: "/places" },
  { label: "Culture", href: "/culture" },
  { label: "People", href: "/people" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const suggestions = ["Maknak", "Music", "Nowruz", "Hazarajat"];
const panelMotion = {
  initial: { opacity: 0, y: -10, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.98 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
};

export function Header() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const searchButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery("");
  }, [path]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (menuOpen) { setMenuOpen(false); menuButton.current?.focus(); }
      if (searchOpen) { setSearchOpen(false); searchButton.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    let restore: string | undefined;
    if (menuOpen) {
      restore = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      if (restore !== undefined) document.body.style.overflow = restore;
    };
  }, [menuOpen, searchOpen]);

  const q = query.trim().toLowerCase();
  const results = q
    ? Object.entries(articles).filter(([slug, a]) =>
        `${slug} ${a.title} ${a.eyebrow} ${a.intro} ${a.sections.map((s) => `${s.title} ${s.text}`).join(" ")}`
          .toLowerCase()
          .includes(q),
      )
    : [];

  const isActive = (href: string) => path === href || path.startsWith(`${href}/`);

  return (
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="site-header__bar">
        <Brand />

        <nav className="nav" aria-label="Main">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "nav__link is-active" : "nav__link"}
                aria-current={active ? "page" : undefined}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="nav__pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="nav__label">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="site-header__actions">
          <button
            ref={searchButton}
            type="button"
            className="icon-btn"
            aria-label={searchOpen ? "Close search" : "Search the archive"}
            aria-expanded={searchOpen}
            aria-controls="search-panel"
            data-sound={searchOpen ? "close" : "open"}
            onClick={() => { setSearchOpen((v) => !v); setMenuOpen(false); }}
          >
            {searchOpen ? <X size={19} /> : <Search size={19} />}
          </button>
          <SoundToggle />
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            className="icon-btn menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            data-sound={menuOpen ? "close" : "open"}
            onClick={() => { setMenuOpen((v) => !v); setSearchOpen(false); }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div id="search-panel" className="header-panel search-panel" role="search" {...panelMotion}>
            <label className="search-field">
              <Search size={18} aria-hidden="true" />
              <span className="sr-only">Search the archive</span>
              <input
                autoFocus
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search places, people, music…"
              />
              <kbd>Esc</kbd>
            </label>
            {!q && (
              <div className="search-suggest">
                Try
                {suggestions.map((s, i) => (
                  <button key={s} type="button" data-sound="tick" data-sound-step={i} onClick={() => setQuery(s)}>{s}</button>
                ))}
              </div>
            )}
            {q && (
              <div aria-live="polite">
                {results.length ? (
                  <ul className="search-results">
                    {results.map(([slug, a]) => (
                      <li key={slug}>
                        <Link href={`/${slug}`} className="search-result">
                          <span className="search-result__icon"><BookOpen size={17} /></span>
                          <span>
                            <strong>{a.eyebrow}</strong>
                            <small>{a.title.replace("\n", " ")}</small>
                          </span>
                          <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="search-empty">Nothing found for “{query}”. Try a place name or a topic.</p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav id="mobile-menu" className="header-panel mobile-menu" aria-label="Mobile" {...panelMotion}>
            <ul>
              <li>
                <Link href="/" className={path === "/" ? "mobile-menu__link is-active" : "mobile-menu__link"}>
                  <small>00</small> Home <ArrowRight size={18} />
                </Link>
              </li>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * (i + 1), duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    className={isActive(link.href) ? "mobile-menu__link is-active" : "mobile-menu__link"}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    <small>{String(i + 1).padStart(2, "0")}</small> {link.label} <ArrowRight size={18} />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mobile-menu__foot">
              <Link href="/sources" className="link">Sources &amp; credits <ArrowUpRight /></Link>
              <span>Founded by Rohullah Mohammadi</span>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
