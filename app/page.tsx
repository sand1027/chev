import Image from "next/image";
import { ReviewCarousel } from "@/components/review-carousel";
import { ScrollHashSync } from "@/components/scroll-hash-sync";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { formatInr, services } from "@/data/site";

const highlights = [
  services.find((service) => service.slug === "fresher-consultation"),
  services.find((service) => service.slug === "experienced-mentoring"),
  services.find((service) => service.slug === "consulting-day"),
].flatMap((service) => (service ? [service] : []));

const outcomes = [
  ["01", "Lead the room", "Teams of 30+ across delivery, solution design, vendor governance, and client consulting."],
  ["02", "Modernise the platform", "Cloud migration, ETL modernisation, governance, and analytics that shorten the path to a useful report."],
  ["03", "Make the architecture clear", "Design trade-offs, stakeholder conversations, and pre-sales pitches that a team can act on."],
];

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.8c.5 5.7 2.6 8.1 8.2 9.2-5.6 1.1-7.7 3.5-8.2 9.2-.5-5.7-2.6-8.1-8.2-9.2 5.6-1.1 7.7-3.5 8.2-9.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="site-shell">
      <ScrollHashSync sectionIds={["top", "approach", "services", "stories", "connect"]} />
      <section className="hero" id="top">
        <div className="hero-split">
          <div className="hero-copy">
            <div>
              <p className="eyebrow reveal-delay-1"><span /> Senior Data & Solutions Architect</p>
              <h1 className="display reveal-delay-2">Architecture you can <em>explain.</em></h1>
              <p className="hero-intro reveal-delay-3">
                Chevvanthi MN mentors freshers and experienced IT professionals, and advises startups and mid-size teams on Microsoft Fabric, Azure, and data platforms.
              </p>
              <div className="hero-actions reveal-delay-4">
                <a className="button button-dark" href="/book" data-analytics-event="hero_start_conversation">
                  Book and pay <Arrow />
                </a>
                <a className="text-link" href="#services">Explore services <Arrow /></a>
              </div>
            </div>
            <ul className="hero-points">
              <li><span>Fabric</span> OneLake, lakehouse, and Data Factory</li>
              <li><span>Azure</span> Synapse, migration, and governance</li>
              <li><span>Mentoring</span> Interviews and the path to architect</li>
            </ul>
          </div>
          <div className="hero-media">
            <Image className="hero-portrait" src="/chevvanthi.jpg" alt="Portrait of Chevvanthi MN" fill priority sizes="(max-width: 900px) 100vw, 380px" />
          </div>
          <dl className="hero-facts">
            <div><dt>Based in</dt><dd>Bangalore</dd></div>
            <div><dt>In practice</dt><dd>20+ years</dd></div>
            <div><dt>Sessions from</dt><dd>₹499</dd></div>
          </dl>
        </div>
      </section>

      <section className="intro-section container" id="approach">
        <div className="section-label">The practice</div>
        <div className="intro-copy">
          <p className="kicker">Senior Data & Solutions Architect</p>
          <h2>Twenty years inside<br /><em>enterprise data.</em></h2>
          <p className="body-copy">Microsoft Fabric, Azure, Synapse, Snowflake, and the ETL systems that came before them. Chevvanthi uses that work to prepare people for interviews and to help companies design platforms that hold up.</p>
        </div>
        <div className="intro-aside">
          <p>B.E. Information Technology,<br />Kongu Engineering College, 2004.</p>
          <div className="tiny-star"><Spark /></div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="container">
          <div className="section-heading">
            <div className="section-label">What we do</div>
            <h2>Three ways to<br /><em>work together.</em></h2>
            <p>A one-hour fresher session, a two-hour architect mentoring session, or a consulting block for a company team.</p>
          </div>
          <div className="services-list">
            {highlights.map((service, index) => (
              <article className="service-card" key={service.slug}>
                <div className="service-top"><span>0{index + 1}</span></div>
                <h3>{service.audience}</h3>
                <p>{service.description} {formatInr(service.amount)} · {service.duration}.</p>
                <a href={`/book?service=${service.slug}`} data-analytics-event={`service_${service.slug}_booking`}>Book this <Arrow /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="outcomes-section container">
        <div className="outcomes-art" aria-hidden="true">
          <div className="arch arch-1" /><div className="arch arch-2" /><div className="arch arch-3" />
          <div className="outcomes-dot" />
          <p>Teams, platforms,<br />and a decision<br />you can defend.</p>
        </div>
        <div className="outcomes-copy">
          <div className="section-label">What the work has built</div>
          <h2>Delivery, platforms,<br />and <em>clear decisions.</em></h2>
          <div className="outcomes-list">
            {outcomes.map(([number, title, description]) => (
              <div className="outcome" key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stories-section" id="stories">
        <div className="container">
          <div className="stories-header">
            <div><div className="section-label">Who it&apos;s for</div><h2>Freshers, architects,<br /><em>and teams.</em></h2></div>
            <p>Choose the format that matches the conversation. Company packages continue by the day, week, or month.</p>
          </div>
        </div>
        <ReviewCarousel />
      </section>

      <section className="process-section container">
        <div className="process-note"><span className="roundel">C</span><p>Pay here.<br />Meet on video.</p></div>
        <div className="process-copy">
          <div className="section-label">How it works</div>
          <h2>Choose a session.<br /><em>Then pay.</em></h2>
          <div className="process-steps">
            <div><span>01 / Choose</span><p>Pick a fresher session, experienced mentoring, or a daily, weekly, or monthly consulting block.</p></div>
            <div><span>02 / Pay</span><p>Share a preferred time and pay with Razorpay. The charge matches the price on this site.</p></div>
            <div><span>03 / Meet</span><p>Chevvanthi confirms the slot by email. You arrive with the interview, architecture question, or platform problem in front of you.</p></div>
          </div>
        </div>
      </section>

      <section className="connect-section" id="connect">
        <div className="connect-inner container">
          <div className="connect-orb"><div /><span>↗</span></div>
          <div className="connect-copy">
            <p className="eyebrow"><span /> Book a session</p>
            <h2>Ready to talk through<br />the <em>next decision?</em></h2>
            <p>Fresher sessions start at ₹499. Experienced mentoring is ₹999 for two hours. Company consulting starts at ₹2,000 a day.</p>
            <a className="button button-light" href="/book" data-analytics-event="contact_email_click">
              Book and pay <Arrow />
            </a>
          </div>
        </div>
      </section>

      </main>
      <SiteFooter />
    </>
  );
}
