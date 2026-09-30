import { Breadcrumbs } from "@/components/breadcrumbs";
import { ReviewCarousel } from "@/components/review-carousel";
import { PageShell } from "@/components/site-chrome";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Client reviews", description: "Read client experiences of Chev's career strategy, positioning, and interview support.", path: "/reviews" });

export default function ReviewsPage() {
  return <PageShell><section className="page-hero container"><Breadcrumbs items={[{ label: "Reviews" }]} /><p className="eyebrow"><span /> Client experiences</p><h1>When the next move starts to <em>make sense.</em></h1><p>A few reflections from professionals who used Chev to find clarity, confidence, and better momentum.</p></section><section className="review-marquee-section"><ReviewCarousel /></section><section className="container editor-note review-note">Only publish reviews the client has approved. Anonymous reviews are intentionally not marked up with review or aggregate-rating structured data.</section></PageShell>;
}
