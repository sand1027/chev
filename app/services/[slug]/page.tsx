import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/site-chrome";
import { formatInr, getService, services, site } from "@/data/site";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

type ServicePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found", robots: { index: false, follow: false } };
  return pageMetadata({
    title: service.name,
    description: `${service.description} ${formatInr(service.amount)} for ${service.duration}.`,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const others = services.filter((item) => item.slug !== service.slug);
  const price = formatInr(service.amount);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}`),
    serviceType: service.audience,
    provider: { "@type": "Person", name: site.counsellor.name, url: absoluteUrl("/about") },
    areaServed: "India",
    offers: { "@type": "Offer", priceCurrency: "INR", price: service.amount / 100, url: absoluteUrl(`/book?service=${service.slug}`) },
  };

  return (
    <PageShell>
      <section className="page-hero container">
        <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: service.name }]} />
        <p className="eyebrow"><span /> {service.audience}</p>
        <h1>{service.name}</h1>
        <p>{service.description}</p>
        <div className="hero-actions">
          <Link className="button button-dark" href={`/book?service=${service.slug}`}>Book this service</Link>
          <span className="service-page-price">{price} · {service.duration}</span>
        </div>
      </section>
      <section className="container service-body">
        <div className="service-cover">
          <h2>What this covers</h2>
          <ol>
            {service.includes.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>
        <aside className="service-book">
          <p>This session</p>
          <strong>{price}</strong>
          <dl>
            <div>
              <dt>Length</dt>
              <dd>{service.duration}</dd>
            </div>
            <div>
              <dt>For</dt>
              <dd>{service.audience}</dd>
            </div>
          </dl>
          <Link className="button button-light" href={`/book?service=${service.slug}`}>Book and pay</Link>
        </aside>
      </section>
      <section className="container service-related">
        <p className="section-label">Other ways to work together</p>
        <div>
          {others.map((item) => (
            <Link key={item.slug} href={`/services/${item.slug}`}>
              <span>{item.audience}</span>
              <strong>{item.name}</strong>
              <small>{formatInr(item.amount)} · {item.duration}</small>
            </Link>
          ))}
        </div>
      </section>
      <JsonLd data={serviceSchema} />
    </PageShell>
  );
}
