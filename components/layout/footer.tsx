import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { LiveClock } from "@/components/live/live-card";
import { founder } from "@/lib/seo";
import { Brand } from "./brand";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "History & heritage", href: "/history" },
      { label: "Places & landscape", href: "/places" },
      { label: "Culture & traditions", href: "/culture" },
      { label: "People of Malistan", href: "/people" },
      { label: "Photo archive", href: "/gallery" },
    ],
  },
  {
    title: "Archive",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Meet the founder", href: "/about#founder" },
      { label: "Contribute a memory", href: "/about#contribute-to-a-future-edition" },
      { label: "Sources & credits", href: "/sources" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "rohullah.me", href: "https://rohullah.me", external: true },
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Malistan_District", external: true },
      { label: "OpenStreetMap", href: "https://www.openstreetmap.org/?mlat=33.2953&mlon=67.1689#map=10/33.2953/67.1689", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <span className="topo" aria-hidden="true" />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              An independent community archive for Malistan, Ghazni — rooted in its mountains,
              connected through its stories, built for its people everywhere.
            </p>
            <a className="signature" href="https://rohullah.me" target="_blank" rel="noopener noreferrer">
              <span className="avatar">
                <span>
                  <Image src={founder.avatar} alt="" width={46} height={46} placeholder={founder.blur} />
                </span>
              </span>
              <span>
                <strong>Rohullah Mohammadi</strong>
                <small>Software developer · Founder</small>
              </span>
            </a>
          </div>

          {columns.map((col) => (
            <div className="footer-col" key={col.title}>
              <h2>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    {"external" in l ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label} <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    ) : (
                      <Link href={l.href}>{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-wordmark" aria-hidden="true">Malistan</div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Malistan Archive · An independent community project</span>
          <LiveClock />
          <span>
            Built by software developer{" "}
            <a href="https://rohullah.me" target="_blank" rel="noopener noreferrer">Rohullah Mohammadi</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
