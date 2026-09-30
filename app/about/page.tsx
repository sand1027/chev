import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/site-chrome";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "About the counsellor", description: "Meet the career consultant behind Chev and discover the approach to international career guidance.", path: "/about" });

export default function AboutPage() {
  return <PageShell><section className="page-hero container"><Breadcrumbs items={[{ label: "About" }]} /><p className="eyebrow"><span /> The person behind Chev</p><h1>Career support that sees the <em>whole picture.</em></h1><p>Chev exists to give ambitious professionals a clearer, more human way to navigate the next stage of their working lives.</p></section><section className="container profile-grid"><div className="profile-image-placeholder" role="img" aria-label="Placeholder for the counsellor's professional portrait"><span>Professional portrait<br />to be added</span></div><div><p className="section-label">Meet your consultant</p><h2>{site.counsellor.name}</h2><p className="profile-role">{site.counsellor.role}</p><p className="body-copy">{site.counsellor.bio}</p><ul className="tag-list">{site.counsellor.expertise.map((item) => <li key={item}>{item}</li>)}</ul><p className="editor-note">Before publishing, replace this profile with the counsellor&apos;s verified experience, qualifications, professional portrait (WebP), and location or service-area details.</p></div></section><JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: site.counsellor.name, jobTitle: site.counsellor.role, description: site.counsellor.bio, url: `${site.url}/about` }} /></PageShell>;
}
