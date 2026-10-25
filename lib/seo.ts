import type { Metadata } from "next";
import { articles, sources } from "./content";
import { photos, type Photo } from "./photos";
import { siteUrl } from "./site-url";

export const SITE_NAME = "Malistan Archive";
export const PUBLISHED = "2026-10-23";
export const UPDATED = "2026-10-25";

export const abs = (path: string) => (path.startsWith("http") ? path : `${siteUrl}${path.startsWith("/") ? "" : "/"}${path}`);

export const ids = {
  website: `${siteUrl}/#website`,
  organization: `${siteUrl}/#organization`,
  founder: `${siteUrl}/#founder`,
  place: `${siteUrl}/#place`,
};

export const founder = {
  name: "Rohullah Mohammadi",
  role: "Software developer",
  url: "https://rohullah.me",
  photo: "/images/rohullah-mohammadi.webp",
  photoLarge: "/images/rohullah-mohammadi.jpg",
  avatar: "/images/rohullah-mohammadi-avatar.webp",
  blur: "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAABQAgCdASoQABAAA4BaJQBOj+ADHFDfRkuWzAAA/vi0LgbmakCHr76Z61vx6+6ms5jNc0kPATZVjlnz2abkdOmA4L/oefk2eic8KI37vIqQCs7TrAWVt5NMWohtaP5UHB4AAA==" as const,
};

type PageSeo = { title: string; description: string; image: string; imageAlt: string };

/** Search titles stay under ~60 characters with the brand suffix, descriptions under 160. */
export const pages: Record<string, PageSeo> = {
  home: {
    title: "Malistan (مالستان), Ghazni — Valleys, History & Culture",
    description:
      "Explore Malistan (مالستان), a Hazara mountain district in Ghazni, Afghanistan, at 2,800 m — its history, villages, music, people and photographs.",
    image: "/images/og-malistan.jpg",
    imageAlt: "Poplar groves and village homes beneath the mountains of Malistan, Ghazni",
  },
  history: {
    title: "History of Malistan, Ghazni",
    description:
      "The history of Malistan in Ghazni's Hazarajat — semi-autonomy in the 1830s, displacement and return, and post-2001 rebuilding, with dated sources.",
    image: "/images/og-history.jpg",
    imageAlt: "Flat earthen rooftops above the green valley of Malistan in spring",
  },
  places: {
    title: "Places & Villages of Malistan",
    description:
      "Mir Adina, Maknak, Now Deh, Pashia and Sheer Dagh — the valleys, seasons and mountain neighbours of Malistan district, Ghazni, at 2,800 metres.",
    image: "/images/og-places.jpg",
    imageAlt: "The poplar-filled valley of Malistan beneath bare mountain peaks",
  },
  culture: {
    title: "Culture, Music & Language of Malistan",
    description:
      "Hazaragi, the folk music of Now Deh, Nammad and Glem wool weaving, women's knowledge and Nowruz — the living culture of Malistan, Ghazni.",
    image: "/images/og-culture.jpg",
    imageAlt: "A flock grazing a harvested field in Malistan in the evening light",
  },
  people: {
    title: "People of Malistan, Ghazni",
    description:
      "Musicians, scholars and community members of Malistan — including Safdar Ali Malistani and Abay Mirza — documented with care and linked sources.",
    image: "/images/og-people.jpg",
    imageAlt: "A gravel road through a tall avenue of poplars in Malistan",
  },
  about: {
    title: "About the Archive & Its Founder",
    description:
      "Why the Malistan Archive exists, its editorial promise, and its founder Rohullah Mohammadi — a software developer from Malistan, Ghazni.",
    image: "/images/og-about.jpg",
    imageAlt: "Summer clouds over the mountains and poplar groves of Malistan",
  },
  gallery: {
    title: "Photos of Malistan, Ghazni",
    description:
      "Photographs of Malistan, Ghazni — poplar valleys, mountain streams, wheat fields, flocks and the turning seasons, each with full credits.",
    image: "/images/og-gallery.jpg",
    imageAlt: "Poplars turning gold in autumn beneath the mountains of Malistan",
  },
  sources: {
    title: "Sources & Photo Credits",
    description:
      "Every source behind the Malistan Archive — the UNHCR district profile, academic research and local accounts — plus photo credits and licences.",
    image: "/images/og-sources.jpg",
    imageAlt: "A footpath past a freshly cut hay field in Malistan",
  },
};

/** Complete metadata for a page: title, description, canonical, Open Graph and Twitter. */
export function pageMetadata(key: string, path: string, options: { type?: "website" | "article"; absoluteTitle?: boolean } = {}): Metadata {
  const page = pages[key];
  const fullTitle = options.absoluteTitle ? page.title : `${page.title} | ${SITE_NAME}`;
  const image = { url: page.image, width: 1200, height: 630, alt: page.imageAlt, type: "image/jpeg" };
  return {
    title: options.absoluteTitle ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      type: options.type ?? "website",
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      title: fullTitle,
      description: page.description,
      images: [image],
      ...(options.type === "article"
        ? { publishedTime: PUBLISHED, modifiedTime: UPDATED, authors: [founder.url], section: page.title }
        : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: page.description, images: [image] },
  };
}

/* ── Structured data (JSON-LD) ─────────────────────────────── */

function imageObject(p: Photo) {
  return {
    "@type": "ImageObject",
    "@id": abs(`/gallery#${p.id}`),
    contentUrl: abs(p.src),
    url: abs(`/gallery#${p.id}`),
    name: p.title,
    caption: p.description,
    width: p.width,
    height: p.height,
    encodingFormat: "image/webp",
    creator: { "@type": "Person", name: p.author },
    creditText: p.credit,
    copyrightNotice: p.license === "All rights reserved" ? `© ${p.author}. All rights reserved.` : `${p.author}, ${p.license}`,
    license: p.licenseUrl ?? abs("/sources#photo-credits"),
    acquireLicensePage: p.source ?? founder.url,
    contentLocation: { "@id": ids.place },
  };
}

/** Site-wide entities, referenced by @id from every page. */
export function siteGraph() {
  return [
    {
      "@type": "WebSite",
      "@id": ids.website,
      url: siteUrl,
      name: SITE_NAME,
      alternateName: ["Malistan", "مالستان", "Malestan"],
      description: pages.home.description,
      inLanguage: "en",
      publisher: { "@id": ids.organization },
      about: { "@id": ids.place },
    },
    {
      "@type": "Organization",
      "@id": ids.organization,
      name: SITE_NAME,
      alternateName: "Malistan",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: abs("/logo-512.png"), width: 512, height: 512 },
      image: abs(pages.home.image),
      description: "An independent community archive documenting the history, places, culture and people of Malistan district in Ghazni, Afghanistan.",
      founder: { "@id": ids.founder },
    },
    {
      "@type": "Person",
      "@id": ids.founder,
      name: founder.name,
      jobTitle: "Software Developer",
      description: "Software developer from Malistan, Ghazni, who founded and built the Malistan Archive.",
      image: { "@type": "ImageObject", url: abs(founder.photoLarge), width: 1200, height: 1200, caption: founder.name },
      url: founder.url,
      sameAs: [founder.url],
      homeLocation: { "@id": ids.place },
      knowsAbout: ["Software development", "Web development", "Malistan", "Hazara culture", "Ghazni Province"],
    },
    {
      "@type": "Place",
      "@id": ids.place,
      name: "Malistan",
      alternateName: ["Malestan", "مالستان"],
      description:
        "A mountain district at about 2,800 metres in Ghazni Province, central Afghanistan, and part of the historic Hazara homeland of Hazarajat.",
      geo: { "@type": "GeoCoordinates", latitude: 33.2953, longitude: 67.1689, elevation: 2800 },
      hasMap: "https://www.openstreetmap.org/?mlat=33.2953&mlon=67.1689#map=11/33.2953/67.1689",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Ghazni Province",
        containedInPlace: { "@type": "Country", name: "Afghanistan" },
      },
      image: ["malistan-valley-panorama", "malistan-autumn-valley", "malistan-clouds-valley"].map((id) => abs(`/images/${id}.webp`)),
      sameAs: ["https://en.wikipedia.org/wiki/Malistan_District"],
    },
  ];
}

export function breadcrumbs(trail: [name: string, path: string][]) {
  return {
    "@type": "BreadcrumbList",
    "@id": abs(`${trail[trail.length - 1][1]}#breadcrumb`),
    itemListElement: [["Home", "/"], ...trail].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: path === "/" ? siteUrl : abs(path),
    })),
  };
}

export function webPage(type: string, key: string, path: string, extra: Record<string, unknown> = {}) {
  const page = pages[key];
  const url = path === "/" ? siteUrl : abs(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: path === "/" ? page.title : `${page.title} | ${SITE_NAME}`,
    description: page.description,
    inLanguage: "en",
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.place },
    primaryImageOfPage: { "@type": "ImageObject", url: abs(page.image), width: 1200, height: 630 },
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    ...extra,
  };
}

export function articleGraph(slug: string) {
  const a = articles[slug];
  const page = pages[slug];
  const path = `/${slug}`;
  const cited = [...new Set(a.sections.map((s) => s.source).filter(Boolean))]
    .map((id) => sources.find((s) => s.id === id))
    .filter((s): s is (typeof sources)[number] => Boolean(s));
  const words = [a.intro, ...a.sections.map((s) => s.text)].join(" ").split(/\s+/).length;

  const graph: Record<string, unknown>[] = [
    webPage(slug === "about" ? "AboutPage" : "WebPage", slug, path, { breadcrumb: { "@id": abs(`${path}#breadcrumb`) } }),
    breadcrumbs([[page.title, path]]),
    {
      "@type": "Article",
      "@id": abs(`${path}#article`),
      headline: a.title.replace(/\n/g, " "),
      alternativeHeadline: page.title,
      description: page.description,
      articleSection: a.eyebrow,
      image: [abs(page.image), abs(a.image)],
      author: { "@type": "Person", "@id": ids.founder, name: founder.name, url: founder.url },
      publisher: {
        "@type": "Organization",
        "@id": ids.organization,
        name: SITE_NAME,
        logo: { "@type": "ImageObject", url: abs("/logo-512.png"), width: 512, height: 512 },
      },
      datePublished: PUBLISHED,
      dateModified: UPDATED,
      inLanguage: "en",
      wordCount: words,
      mainEntityOfPage: { "@id": abs(`${path}#webpage`) },
      isPartOf: { "@id": ids.website },
      about: { "@id": ids.place },
      keywords: ["Malistan", "مالستان", "Ghazni", "Hazarajat", "Afghanistan", a.eyebrow],
      ...(cited.length
        ? { citation: cited.map((s) => ({ "@type": "CreativeWork", name: s.name, url: s.url })) }
        : {}),
    },
  ];
  if (slug === "about") graph[0].mainEntity = { "@id": ids.organization };
  return graph;
}

export function galleryGraph() {
  return [
    webPage("CollectionPage", "gallery", "/gallery", {
      breadcrumb: { "@id": abs("/gallery#breadcrumb") },
      mainEntity: { "@id": abs("/gallery#images") },
    }),
    breadcrumbs([[pages.gallery.title, "/gallery"]]),
    {
      "@type": "ImageGallery",
      "@id": abs("/gallery#images"),
      name: "Photographs of Malistan, Ghazni",
      description: pages.gallery.description,
      about: { "@id": ids.place },
      associatedMedia: photos.map(imageObject),
    },
  ];
}

export function homeGraph() {
  return [
    webPage("WebPage", "home", "/", {
      primaryImageOfPage: imageObject(photos[0]),
      mainEntity: { "@id": ids.place },
    }),
  ];
}

export function sourcesGraph() {
  return [
    webPage("CollectionPage", "sources", "/sources", { breadcrumb: { "@id": abs("/sources#breadcrumb") } }),
    breadcrumbs([[pages.sources.title, "/sources"]]),
    {
      "@type": "ItemList",
      "@id": abs("/sources#list"),
      name: "Sources used by the Malistan Archive",
      itemListElement: sources.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "CreativeWork", name: s.name, url: s.url, description: s.note },
      })),
    },
  ];
}

export function graph(nodes: Record<string, unknown>[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
