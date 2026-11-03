import type { MetadataRoute } from "next";
import { getArchive } from "@/lib/archive";
import { abs, articlePage, pages, UPDATED } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { order, articles, photos } = await getArchive();
  const home = {
    url: abs("/").replace(/\/$/, ""),
    lastModified: UPDATED,
    changeFrequency: "weekly" as const,
    priority: 1,
    images: [abs(pages.home.image), ...photos.slice(0, 3).map((p) => abs(p.src))],
  };

  const stories = order.map((slug) => [slug, articles[slug]!] as const).map(([slug, a]) => ({
    url: abs(`/${slug}`),
    lastModified: UPDATED,
    changeFrequency: "monthly" as const,
    priority: slug === "about" ? 0.6 : 0.8,
    images: [...new Set([...(a.image ? [abs(a.image)] : []), abs(articlePage(slug, a).image)])],
  }));

  return [
    home,
    ...stories,
    {
      url: abs("/gallery"),
      lastModified: UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
      images: photos.map((p) => abs(p.src)),
    },
    { url: abs("/sources"), lastModified: UPDATED, changeFrequency: "monthly", priority: 0.5 },
    { url: abs("/contact"), lastModified: UPDATED, changeFrequency: "yearly", priority: 0.4 },
  ];
}
