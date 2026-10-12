import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageShell } from "@/components/site-chrome";
import { formatInr, services } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mentoring and consulting services",
  description: "Fresher interview sessions, experienced architect mentoring, and Microsoft Fabric and Azure consulting for companies.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <PageShell>
      <section className="page-hero container">
        <Breadcrumbs items={[{ label: "Services" }]} />
        <p className="eyebrow"><span /> Sessions and consulting</p>
        <h1>Support for the interview, the role, or the <em>platform.</em></h1>
        <p>Individual sessions are one-to-one. Company packages cover architecture, pipelines, governance, and the pitch that has to land with a client.</p>
      </section>
      <section className="container cards-grid">
        {services.map((service, index) => (
          <article className="service-detail" key={service.slug}>
            <span>0{index + 1}</span>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="service-booking">
              <strong>{formatInr(service.amount)}</strong>
              <span>{service.duration}</span>
              <Link className="button button-dark" href={`/services/${service.slug}`}>View service</Link>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
