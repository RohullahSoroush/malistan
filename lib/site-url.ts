// The canonical public address of the site. Used for canonical links,
// Open Graph URLs, structured data, the sitemap and robots.txt.
export const PRODUCTION_URL = "https://malistan.org";

// The public contact address, shown in the footer, the About page and structured data.
export const CONTACT_EMAIL = "hello@malistan.org";

function resolveSiteUrl() {
  // Vercel production deploys always use the real domain, so a stale
  // dashboard variable can never point search engines elsewhere.
  if (process.env.VERCEL_ENV === "production") return PRODUCTION_URL;

  // Explicit override for previews or other hosts.
  const override = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (override) return override.replace(/\/+$/, "");

  // Vercel preview deploys reference their own preview URL.
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return process.env.NODE_ENV === "production" ? PRODUCTION_URL : "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
