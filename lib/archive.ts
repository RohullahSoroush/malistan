import "server-only";
import { cache } from "react";
import { articles as staticArticles, sources as staticSources, type Article } from "./content";
import { photos as staticPhotos, type Photo } from "./photos";
import { CONTACT_EMAIL } from "./site-url";

/**
 * Everything the site shows, read from the archive's database (edited at admin.malistan.org). Only rows whose status is
 * "published" can be read: the public key has nothing else (row-level security). Pages re-read it at most once a
 * minute (ISR), and the built-in content in lib/content.ts and lib/photos.ts takes over if the database can't be reached,
 * so the site never goes blank.
 *
 * Env (server only): SUPABASE_ANON_KEY — the project's publishable key. SUPABASE_URL defaults to the archive's project.
 */

export const REVALIDATE_SECONDS = 60;

export type Source = { id: string; name: string; date: string; url: string; note: string };
export type Person = {
  slug: string; name: string; nativeName: string | null; role: string; village: string | null; life: string | null;
  summary: string; bio: string; photo: string | null; photoCredit: string | null; source: string | null;
};
export type Film = {
  id: string; title: string; description: string; url: string; provider: "youtube" | "vimeo" | "file" | "other";
  embedId: string | null; thumbnail: string | null; duration: string | null; recordedOn: string | null;
  location: string | null; credit: string; license: string; featured: boolean;
};
export type Settings = {
  siteName: string; tagline: string; contactEmail: string; announcement: string | null; announcementUrl: string | null;
  contributionsOpen: boolean;
};
export type Archive = {
  /** Article slugs in the editors' order. */
  order: string[];
  articles: Record<string, Article>;
  sources: Source[];
  photos: Photo[];
  people: Person[];
  films: Film[];
  settings: Settings;
  /** True when the data came from the database (false = built-in fallback). */
  live: boolean;
};

const DEFAULT_URL = "https://rliulwyatyohtefiayug.supabase.co";
/** A neutral pine-green blur for photographs uploaded without a preview. */
const NEUTRAL_BLUR = "data:image/gif;base64,R0lGODlhAQABAIAAAC1aRAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" as const;

const fallback: Archive = {
  order: Object.keys(staticArticles),
  articles: staticArticles,
  sources: staticSources,
  photos: staticPhotos,
  people: [],
  films: [],
  settings: {
    siteName: "Malistan", tagline: "A community archive for Malistan, Ghazni", contactEmail: CONTACT_EMAIL,
    announcement: null, announcementUrl: null, contributionsOpen: true,
  },
  live: false,
};

type Row = Record<string, unknown>;
const str = (v: unknown) => (typeof v === "string" ? v : "");
const opt = (v: unknown) => (typeof v === "string" && v.trim() ? v : null);
/** Site paths and https links only — never protocol-relative or other schemes. */
const safeSrc = (v: unknown) => {
  const s = str(v);
  return /^https:\/\/[^\s\\]+$/.test(s) || /^\/(?![/\\])[^\s\\]*$/.test(s) ? s : "";
};

async function read(path: string): Promise<Row[]> {
  const key = process.env.SUPABASE_ANON_KEY;
  if (!key) throw new Error("SUPABASE_ANON_KEY is not set");
  const base = (process.env.SUPABASE_URL || DEFAULT_URL).replace(/\/$/, "");
  const res = await fetch(`${base}/rest/v1/${path}`, {
    headers: { apikey: key, Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS, tags: ["archive"] },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`archive read failed (${res.status})`);
  return (await res.json()) as Row[];
}

async function load(): Promise<Archive> {
  const [articleRows, sourceRows, photoRows, peopleRows, filmRows, settingsRows] = await Promise.all([
    read("articles?select=slug,title,eyebrow,intro,cover_image,article_sections(title,body,source_id,position)&status=eq.published&order=sort_order"),
    read("sources?select=id,name,date_label,url,note&status=eq.published&order=sort_order"),
    read("photos?select=id,src,width,height,blur,title,description,category,author,credit,license,license_url,source_url&status=eq.published&order=sort_order"),
    read("people?select=slug,name,native_name,role,village,life,summary,bio,photo_src,photo_credit,source_id&status=eq.published&order=sort_order").catch(() => []),
    read("videos?select=id,title,description,url,provider,embed_id,thumbnail,duration,recorded_on,location,credit,license,featured&status=eq.published&order=sort_order").catch(() => []),
    read("site_settings?select=site_name,tagline,contact_email,announcement,announcement_on,announcement_url,contributions_open&limit=1"),
  ]);

  const articles: Record<string, Article> = {};
  const order: string[] = [];
  for (const r of articleRows) {
    const slug = str(r.slug);
    if (!slug) continue;
    const sections = ((r.article_sections as Row[] | null) ?? [])
      .slice()
      .sort((a, b) => Number(a.position) - Number(b.position))
      .map((s) => ({ title: str(s.title), text: str(s.body), ...(opt(s.source_id) ? { source: str(s.source_id) } : {}) }));
    articles[slug] = { title: str(r.title), eyebrow: str(r.eyebrow), intro: str(r.intro), image: safeSrc(r.cover_image), sections };
    order.push(slug);
  }

  const photos: Photo[] = photoRows
    .filter((p) => safeSrc(p.src))
    .map((p) => ({
      id: str(p.id),
      src: safeSrc(p.src),
      width: Number(p.width) || 1200,
      height: Number(p.height) || 800,
      // Exactly a base64 image: next/image places it inside an inline style.
      blur: (/^data:image\/(webp|jpeg|png|gif);base64,[A-Za-z0-9+/=]+$/.test(str(p.blur)) ? str(p.blur) : NEUTRAL_BLUR) as Photo["blur"],
      title: str(p.title),
      description: str(p.description),
      category: str(p.category) || "Landscapes",
      author: str(p.author),
      credit: str(p.credit) || str(p.author),
      license: str(p.license),
      ...(opt(p.license_url) ? { licenseUrl: str(p.license_url) } : {}),
      ...(opt(p.source_url) ? { source: str(p.source_url) } : {}),
    }));

  const s = settingsRows[0] ?? {};
  const announcementOn = s.announcement_on === true && !!opt(s.announcement);
  const announcementUrl = opt(s.announcement_url);

  return {
    order,
    articles,
    sources: sourceRows.map((r) => ({ id: str(r.id), name: str(r.name), date: str(r.date_label), url: str(r.url), note: str(r.note) })),
    photos,
    people: peopleRows.map((r) => ({
      slug: str(r.slug), name: str(r.name), nativeName: opt(r.native_name), role: str(r.role), village: opt(r.village),
      life: opt(r.life), summary: str(r.summary), bio: str(r.bio), photo: safeSrc(r.photo_src) || null,
      photoCredit: opt(r.photo_credit), source: opt(r.source_id),
    })),
    films: filmRows.map((r) => ({
      id: str(r.id), title: str(r.title), description: str(r.description), url: safeSrc(r.url),
      provider: (["youtube", "vimeo", "file"].includes(str(r.provider)) ? str(r.provider) : "other") as Film["provider"],
      embedId: /^[A-Za-z0-9_-]{1,40}$/.test(str(r.embed_id)) ? str(r.embed_id) : null,
      thumbnail: /^https:\/\//.test(str(r.thumbnail)) ? str(r.thumbnail) : null,
      duration: opt(r.duration), recordedOn: opt(r.recorded_on), location: opt(r.location),
      credit: str(r.credit), license: str(r.license), featured: r.featured === true,
    })).filter((f) => f.url),
    settings: {
      siteName: str(s.site_name) || fallback.settings.siteName,
      tagline: str(s.tagline) || fallback.settings.tagline,
      contactEmail: str(s.contact_email) || CONTACT_EMAIL,
      announcement: announcementOn ? str(s.announcement) : null,
      announcementUrl: announcementOn && announcementUrl ? safeSrc(announcementUrl) || null : null,
      contributionsOpen: s.contributions_open !== false,
    },
    live: true,
  };
}

/** The archive for this request (one database round per render; ISR re-reads it at most once a minute). */
export const getArchive = cache(async (): Promise<Archive> => {
  try {
    const data = await load();
    // An empty database (e.g. before the seed ran) must not empty the site.
    if (!data.order.length) return { ...fallback, people: data.people, films: data.films, settings: data.settings };
    return data;
  } catch (error) {
    if (process.env.SUPABASE_ANON_KEY) console.error("[archive] using built-in content:", error instanceof Error ? error.message : error);
    return fallback;
  }
});

/** A YouTube or Vimeo embed address (privacy-friendly YouTube domain), or null for other links. */
export function filmEmbedUrl(f: Pick<Film, "provider" | "embedId">): string | null {
  if (f.provider === "youtube" && f.embedId) return `https://www.youtube-nocookie.com/embed/${f.embedId}?rel=0`;
  if (f.provider === "vimeo" && f.embedId) return `https://player.vimeo.com/video/${f.embedId}?dnt=1`;
  return null;
}

export function filmThumbnail(f: Pick<Film, "provider" | "embedId" | "thumbnail">): string | null {
  return f.thumbnail || (f.provider === "youtube" && f.embedId ? `https://i.ytimg.com/vi/${f.embedId}/hqdefault.jpg` : null);
}

/**
 * Files a contact-form message in the admin's Messages inbox through the database's `submit_contact_message`
 * function (the only write the public key may make). Returns false when the inbox isn't reachable.
 */
export async function fileContactMessage(m: { name: string; email: string; topic: string; message: string; page: string }): Promise<boolean> {
  const key = process.env.SUPABASE_ANON_KEY;
  if (!key) return false;
  const base = (process.env.SUPABASE_URL || DEFAULT_URL).replace(/\/$/, "");
  try {
    const res = await fetch(`${base}/rest/v1/rpc/submit_contact_message`, {
      method: "POST",
      headers: { apikey: key, "Content-Type": "application/json" },
      body: JSON.stringify({ p_name: m.name, p_email: m.email, p_topic: m.topic, p_message: m.message, p_page: m.page }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("[contact] inbox rejected the message", res.status);
    return res.ok;
  } catch (error) {
    console.error("[contact] inbox unreachable", error instanceof Error ? error.name : "unknown_error");
    return false;
  }
}
