import { siteUrl } from "@/lib/site-url";
import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;
  return ["", ...Object.keys(articles), "gallery", "sources"].map((slug) => ({
    url: base + (slug ? "/" + slug : ""),
    lastModified: new Date("2026-10-23"),
    changeFrequency: "monthly",
    priority: slug ? 0.7 : 1,
  }));
}
export const dynamic = "force-static";
