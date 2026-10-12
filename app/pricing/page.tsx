import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageShell } from "@/components/site-chrome";
import { formatInr, services } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Session and consulting prices",
  description: "₹499 fresher sessions, ₹999 experienced mentoring, and daily, weekly, and monthly data-platform consulting.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <PageShell>
      <section className="page-hero container">
        <Breadcrumbs items={[{ label: "Pricing" }]} />
        <p className="eyebrow"><span /> Prices in INR</p>
        <h1>Clear rates before you <em>book.</em></h1>
        <p>Pay on the booking page with Razorpay. The amount charged is the price shown here.</p>
      </section>
      <section className="container pricing-list">
        {services.map((service) => (
          <article key={service.slug}>
            <div>
              <h2><Link href={`/services/${service.slug}`}>{service.name}</Link></h2>
              <p>{service.description}</p>
            </div>
            <div className="price-meta">
              <span>{service.duration} · {service.audience}</span>
              <strong>{formatInr(service.amount)}</strong>
              <Link href={`/book?service=${service.slug}`}>Book and pay →</Link>
            </div>
          </article>
        ))}
      </section>
      <section className="container pricing-note">
        <h2>Not sure which block you need?</h2>
        <p>Start with a one-hour fresher session or a two-hour mentoring session. Company work can begin with a single consulting day.</p>
        <Link className="button button-light" href="/book">Choose a session →</Link>
      </section>
    </PageShell>
  );
}
