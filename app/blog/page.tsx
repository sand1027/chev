import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageShell } from "@/components/site-chrome";
import { publishedArticles } from "@/data/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Career guides", description: "Practical guides for career clarity, professional positioning, interviews, and international career moves.", path: "/blog" });

export default function BlogPage() {
  return <PageShell><section className="page-hero container"><Breadcrumbs items={[{ label: "Career guides" }]} /><p className="eyebrow"><span /> Practical perspective</p><h1>Career guidance you can <em>use today.</em></h1><p>Thoughtful, editor-reviewed articles to help you make clearer career decisions. New articles are added by publishing a structured record in the site content collection.</p></section><section className="container article-grid">{publishedArticles.map((article) => <article className="article-card" key={article.slug}><p>{article.category} <span>•</span> {article.readingTime}</p><h2><Link href={`/blog/${article.slug}`}>{article.title}</Link></h2><p>{article.description}</p><div><time dateTime={article.publishedAt}>{new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(article.publishedAt))}</time><Link href={`/blog/${article.slug}`}>Read guide →</Link></div></article>)}</section></PageShell>;
}
