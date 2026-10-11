import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageShell } from "@/components/site-chrome";
import { formatInr, getService } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Payment received",
  description: "Your Chevvanthi consultation payment was received. The session time is confirmed by email.",
  path: "/book/success",
});

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const chosen = getService(service);

  return (
    <PageShell>
      <section className="page-hero container">
        <Breadcrumbs items={[{ label: "Book a slot", href: "/book" }, { label: "Payment received" }]} />
        <p className="eyebrow">
          <span /> Payment received
        </p>
        <h1>
          Your session request is <em>in.</em>
        </h1>
        <p>
          {chosen
            ? `${chosen.name} · ${formatInr(chosen.amount)} · ${chosen.duration}. `
            : "The payment was confirmed. "}
          Chevvanthi will reply at the email you entered to confirm the time.
        </p>
        <div className="hero-actions">
          <Link className="button button-dark" href="/">
            Back to home
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
