import type { MetadataRoute } from "next";
import { publishedArticles } from "@/data/articles";
import { services, site } from "@/data/site";

const publicPages = ["/", "/about", "/services", "/pricing", "/reviews", "/faq", "/blog", "/contact", "/book"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...publicPages.map((path) => ({ url: new URL(path, site.url).toString(), lastModified: new Date("2026-03-24") })),
    ...services.map((service) => ({ url: new URL(`/services/${service.slug}`, site.url).toString(), lastModified: new Date("2026-03-24") })),
    ...publishedArticles.map((article) => ({ url: new URL(`/blog/${article.slug}`, site.url).toString(), lastModified: new Date(article.updatedAt ?? article.publishedAt) })),
  ];
}
