import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageShell } from "@/components/site-chrome";
import { publishedArticles } from "@/data/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Guides", description: "Short guides on interview storytelling, architecture interviews, and the move from engineer to architect.", path: "/blog" });

export default function BlogPage() {
  return <PageShell><section className="page-hero container"><Breadcrumbs items={[{ label: "Guides" }]} /><p className="eyebrow"><span /> From the practice</p><h1>Notes you can use in the <em>next conversation.</em></h1><p>How to explain a project in an interview, and how to talk about the move from engineer to architect.</p></section><section className="container article-grid">{publishedArticles.map((article) => <article className="article-card" key={article.slug}><p>{article.category} <span>•</span> {article.readingTime}</p><h2><Link href={`/blog/${article.slug}`}>{article.title}</Link></h2><p>{article.description}</p><div><time dateTime={article.publishedAt}>{new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(article.publishedAt))}</time><Link href={`/blog/${article.slug}`}>Read guide →</Link></div></article>)}</section></PageShell>;
}
