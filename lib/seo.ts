import type { Metadata } from "next";
import { site } from "@/data/site";

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, siteName: site.name, title, description },
    twitter: { card: "summary", title, description },
    robots: { index: true, follow: true },
  };
}
