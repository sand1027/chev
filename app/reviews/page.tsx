import { Breadcrumbs } from "@/components/breadcrumbs";
import { ReviewCarousel } from "@/components/review-carousel";
import { PageShell } from "@/components/site-chrome";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Who the practice is for",
  description: "Fresher interview sessions, experienced architect mentoring, and data-platform consulting for startups and mid-size companies.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <PageShell>
      <section className="page-hero container">
        <Breadcrumbs items={[{ label: "Practice" }]} />
        <p className="eyebrow"><span /> Three audiences</p>
        <h1>The work changes with <em>who is in the room.</em></h1>
        <p>Freshers practise the interview. Experienced professionals map the move to architect. Companies get a platform design they can implement.</p>
      </section>
      <section className="review-marquee-section"><ReviewCarousel /></section>
    </PageShell>
  );
}
