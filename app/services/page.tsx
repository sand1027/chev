import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageShell } from "@/components/site-chrome";
import { services } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Career consulting services", description: "Explore Chev's career strategy, career positioning, and interview support services for professionals making intentional next moves.", path: "/services" });

export default function ServicesPage() {
  return <PageShell><section className="page-hero container"><Breadcrumbs items={[{ label: "Services" }]} /><p className="eyebrow"><span /> How Chev can help</p><h1>Support for the move you&apos;re <em>ready to make.</em></h1><p>Choose focused support for the decisions, story, and conversations that can shape your next chapter.</p></section><section className="container cards-grid">{services.map((service, index) => <article className="service-detail" key={service.slug}><span>0{index + 1}</span><h2>{service.name}</h2><p>{service.description}</p><ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul><div className="service-booking"><strong>{service.price}</strong><Link href={`/book?service=${service.slug}`}>Book this service →</Link></div></article>)}</section></PageShell>;
}
