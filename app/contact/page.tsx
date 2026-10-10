import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageShell } from "@/components/site-chrome";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Chevvanthi",
  description: "Book a paid session or email Chevvanthi about interview mentoring and data-platform consulting.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageShell>
      <section className="page-hero container">
        <Breadcrumbs items={[{ label: "Contact" }]} />
        <p className="eyebrow"><span /> Bangalore</p>
        <h1>Book the session, or <em>write first.</em></h1>
        <p>Paid sessions are booked on this site. If you need to describe a company engagement before you choose a package, send a note.</p>
        <Link className="button button-dark" href="/book">Book and pay →</Link>
      </section>
      <section className="container contact-panel">
        <h2>What to include</h2>
        <ul>
          <li>Whether you are a fresher, an experienced professional, or a company</li>
          <li>The interview, architecture move, or data platform you want to discuss</li>
          <li>Your preferred dates and time zone</li>
        </ul>
        <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
      </section>
    </PageShell>
  );
}
