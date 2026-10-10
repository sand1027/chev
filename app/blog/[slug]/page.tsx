import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/site-chrome";
import { getArticle, publishedArticles } from "@/data/articles";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Guide not found", robots: { index: false, follow: false } };
  return pageMetadata({ title: article.title, description: article.description, path: `/blog/${article.slug}` });
}

export default async function BlogArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, datePublished: article.publishedAt, dateModified: article.updatedAt ?? article.publishedAt, mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`), author: { "@type": "Person", name: article.author.name, jobTitle: article.author.role }, publisher: { "@type": "Organization", name: "Chev" } };
  const relatedArticles = publishedArticles.filter((item) => item.slug !== article.slug).slice(0, 2);
  return <PageShell><article className="article-page container"><Breadcrumbs items={[{ label: "Guides", href: "/blog" }, { label: article.title }]} /><header><p className="eyebrow"><span /> {article.category}</p><h1>{article.title}</h1><p className="article-summary">{article.description}</p><div className="article-byline"><span>By {article.author.name}</span><span>{article.readingTime}</span><time dateTime={article.publishedAt}>{new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(article.publishedAt))}</time></div></header><div className="article-body">{article.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</div><aside className="author-bio"><p className="section-label">About the author</p><h2>{article.author.name}</h2><p className="profile-role">{article.author.role}</p><p>{article.author.bio}</p><Link href="/about">Meet the counsellor →</Link></aside>{relatedArticles.length > 0 && <section className="related-guides"><p className="section-label">Continue reading</p><div>{relatedArticles.map((related) => <Link key={related.slug} href={`/blog/${related.slug}`}>{related.title} <span>→</span></Link>)}</div></section>}</article><JsonLd data={articleSchema} /></PageShell>;
}
