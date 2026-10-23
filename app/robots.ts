import { siteUrl } from "@/lib/site-url";
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = siteUrl;
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: base + "/sitemap.xml",
  };
}
export const dynamic = "force-static";
