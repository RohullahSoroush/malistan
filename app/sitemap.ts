import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";
import { photos } from "@/lib/photos";
import { abs, pages, UPDATED } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: abs("/").replace(/\/$/, ""),
    lastModified: UPDATED,
    changeFrequency: "weekly" as const,
    priority: 1,
    images: [abs(pages.home.image), ...photos.slice(0, 3).map((p) => abs(p.src))],
  };

  const stories = Object.entries(articles).map(([slug, a]) => ({
    url: abs(`/${slug}`),
    lastModified: UPDATED,
    changeFrequency: "monthly" as const,
    priority: slug === "about" ? 0.6 : 0.8,
    images: [abs(a.image), abs(pages[slug].image)],
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
