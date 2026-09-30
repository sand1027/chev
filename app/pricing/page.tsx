import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageShell } from "@/components/site-chrome";
import { services } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Career consultation pricing", description: "See Chev's career consultation formats, durations, and pricing information before booking a conversation.", path: "/pricing" });

export default function PricingPage() {
  return <PageShell><section className="page-hero container"><Breadcrumbs items={[{ label: "Pricing" }]} /><p className="eyebrow"><span /> Simple, transparent support</p><h1>Choose the support that <em>fits your next move.</em></h1><p>Select the service that best fits your goals, then choose a preferred slot on the booking screen. Final availability is always confirmed by Chev.</p></section><section className="container pricing-list">{services.map((service) => <article key={service.slug}><div><h2>{service.name}</h2><p>{service.description}</p></div><div className="price-meta"><span>{service.duration}</span><strong>{service.price}</strong><Link href={`/book?service=${service.slug}`}>Book a slot →</Link></div></article>)}</section><section className="container pricing-note"><h2>Not sure what you need?</h2><p>Start with a short conversation. We&apos;ll make sure the format is the right fit before you commit.</p><Link className="button button-light" href="/book">Choose a time →</Link></section></PageShell>;
}
