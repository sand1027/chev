import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/site-chrome";
import { achievements, experience, expertiseGroups, site, summary } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Chevvanthi MN",
  description: "Senior Data and Solutions Architect in Bangalore with 20+ years across enterprise data, cloud platforms, and ETL modernisation.",
  path: "/about",
});

export default function AboutPage() {
  const { counsellor } = site;
  return (
    <PageShell>
      <section className="page-hero container">
        <Breadcrumbs items={[{ label: "About" }]} />
        <p className="eyebrow"><span /> {counsellor.location}</p>
        <h1>A data architect who still <em>builds the thing.</em></h1>
        <p>{counsellor.bio}</p>
      </section>
      <section className="container profile-grid">
        <div className="profile-photo-frame">
          <Image className="profile-photo" src="/chevvanthi.jpg" alt="Portrait of Chevvanthi MN" fill priority sizes="(max-width: 800px) 100vw, 480px" />
        </div>
        <div>
          <p className="section-label">Profile</p>
          <h2>{counsellor.name}</h2>
          <p className="profile-role">{counsellor.role}</p>
          <p className="profile-facts"><span>{counsellor.location}</span><span>{counsellor.years} of IT experience</span></p>
          <ul className="summary-list">{summary.map((item) => <li key={item}>{item}</li>)}</ul>
          <p className="body-copy">B.E. in Information Technology, Kongu Engineering College, Bharathiar University, 2004.</p>
        </div>
      </section>
      <section className="container experience-list">
        <p className="section-label">Core technical expertise</p>
        <h2>The platforms and the practices.</h2>
        {expertiseGroups.map((group) => (
          <article key={group.title}>
            <div><span className="experience-role">{group.title}</span></div>
            <div><p>{group.items}</p></div>
          </article>
        ))}
      </section>
      <section className="container experience-list">
        <p className="section-label">Experience</p>
        <h2>Where the platforms were built.</h2>
        {experience.map((role) => (
          <article key={`${role.organisation}-${role.period}`}>
            <div>
              <time>{role.period}</time>
              <span className="experience-role">{role.role}</span>
            </div>
            <div>
              <h3>{role.organisation}</h3>
              <p>{role.summary}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="container experience-list">
        <p className="section-label">Leadership</p>
        <h2>What the delivery record includes.</h2>
        {achievements.map((item, index) => (
          <article key={item}>
            <div><span className="experience-role">0{index + 1}</span></div>
            <div><p>{item}</p></div>
          </article>
        ))}
      </section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: counsellor.name, jobTitle: counsellor.role, description: counsellor.bio, url: `${site.url}/about`, address: { "@type": "PostalAddress", addressLocality: "Bangalore", addressCountry: "IN" } }} />
    </PageShell>
  );
}
