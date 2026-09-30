import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageShell } from "@/components/site-chrome";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Contact Chev", description: "Start a conversation about career clarity, career positioning, interview preparation, or an international career move.", path: "/contact" });

export default function ContactPage() {
  return <PageShell><section className="page-hero container"><Breadcrumbs items={[{ label: "Contact" }]} /><p className="eyebrow"><span /> Start a conversation</p><h1>A considered next step starts <em>with a hello.</em></h1><p>Tell Chev a little about what is changing and the kind of support you&apos;re looking for. You&apos;ll receive a reply with the right next step.</p><a className="button button-dark" href={`mailto:${site.email}?subject=Career%20consultation%20enquiry`}>Email {site.email} →</a></section><section className="container contact-panel"><h2>What to include</h2><ul><li>The role, direction, or decision you&apos;re exploring</li><li>Where you&apos;re currently feeling stuck</li><li>Your preferred timeline and time zone</li></ul><p>This site currently uses a direct email enquiry. Add a secure form provider or booking link once the client chooses one.</p></section></PageShell>;
}
