import { source } from "@/lib/source";
import type { MetadataRoute } from "next";

const baseUrl = "https://serphouse.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages();

  const docPages = pages.map((page) => ({
    url: `${baseUrl}/${page.slugs.join("/")}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page.slugs.length === 1 ? 0.9 : 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...docPages,
  ];
}
