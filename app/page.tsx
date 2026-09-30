import { ReviewCarousel } from "@/components/review-carousel";
import { ScrollHashSync } from "@/components/scroll-hash-sync";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const services = [
  {
    number: "01",
    slug: "career-clarity",
    title: "Global career strategy",
    description:
      "A decisive plan for your next move—from target markets and role positioning to a job-search system that fits your life.",
  },
  {
    number: "02",
    slug: "career-positioning",
    title: "Profile & story",
    description:
      "CVs, LinkedIn, portfolios, and narratives that make your experience easy to understand and hard to overlook.",
  },
  {
    number: "03",
    slug: "interview-support",
    title: "Interview confidence",
    description:
      "Real-world practice for the moments that matter: recruiter calls, panels, case studies, negotiation, and beyond.",
  },
];

const outcomes = [
  ["01", "Find your signal", "Clarify the experience, strengths, and direction that make you the obvious choice."],
  ["02", "Build your case", "Turn your career story into a distinct professional presence across every hiring touchpoint."],
  ["03", "Move with intent", "Show up to each conversation prepared, composed, and ready to make a meaningful next move."],
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
        <div className="hero-grid container">
          <div className="hero-copy">
            <p className="eyebrow reveal-delay-1"><span /> International career consultancy</p>
            <h1 className="display reveal-delay-2">A career that takes you <em>further.</em></h1>
            <p className="hero-intro reveal-delay-3">
              Strategic career guidance for ambitious professionals ready to find work that feels bigger, clearer, and entirely theirs.
            </p>
            <div className="hero-actions reveal-delay-4">
              <a className="button button-dark" href="#connect" data-analytics-event="hero_start_conversation">
                Start a conversation <Arrow />
              </a>
              <a className="text-link" href="#services">Explore services <Arrow /></a>
            </div>
          </div>
          <div className="hero-art reveal-delay-3" aria-label="Abstract illustration of a career path" role="img">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="hero-circle" />
            <div className="hero-sun" />
            <div className="hero-star"><Spark /></div>
            <div className="hero-marker marker-a"><span>01</span><i /></div>
            <div className="hero-marker marker-b"><span>02</span><i /></div>
            <p className="art-caption">Your next chapter<br />starts with clarity.</p>
          </div>
        </div>
        <div className="hero-foot container">
          <p>For professionals building careers across borders and industries.</p>
          <a href="#approach" aria-label="Scroll to approach">Scroll to discover <span>↓</span></a>
        </div>
      </section>

      <section className="intro-section container" id="approach">
        <div className="section-label">The Chev approach</div>
        <div className="intro-copy">
          <p className="kicker">You bring the ambition. We bring the perspective.</p>
          <h2>Career change is personal.<br /><em>The process should be too.</em></h2>
          <p className="body-copy">There is no one-size-fits-all career playbook. Chev blends sharp strategy with honest, human guidance to help you make decisions with confidence—wherever in the world work takes you.</p>
        </div>
        <div className="intro-aside">
          <p>Designed for the moment between<br />what you&apos;ve built and what&apos;s next.</p>
          <div className="tiny-star"><Spark /></div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="container">
          <div className="section-heading">
            <div className="section-label">What we do</div>
            <h2>Guidance for every<br /><em>kind of next.</em></h2>
            <p>Focused, thoughtful support that meets you where you are—and helps you go further.</p>
          </div>
          <div className="services-list">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <div className="service-top"><span>{service.number}</span><Arrow /></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href={`/book?service=${service.slug}`} data-analytics-event={`service_${service.number}_booking`}>Book a slot <Arrow /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="outcomes-section container">
        <div className="outcomes-art" aria-hidden="true">
          <div className="arch arch-1" /><div className="arch arch-2" /><div className="arch arch-3" />
          <div className="outcomes-dot" />
          <p>What becomes<br />possible when<br />you get clear.</p>
        </div>
        <div className="outcomes-copy">
          <div className="section-label">What changes</div>
          <h2>From uncertain<br />to <em>unmistakable.</em></h2>
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
            <div><div className="section-label">The Chev effect</div><h2>Good moves.<br /><em>Great stories.</em></h2></div>
            <p>Every career is different. Here&apos;s what happens when people give theirs the attention it deserves.</p>
          </div>
        </div>
        <ReviewCarousel />
      </section>

      <section className="process-section container">
        <div className="process-note"><span className="roundel">C</span><p>Clear thinking,<br />real momentum.</p></div>
        <div className="process-copy">
          <div className="section-label">How it works</div>
          <h2>A thoughtful process.<br /><em>A decisive result.</em></h2>
          <div className="process-steps">
            <div><span>01 / Connect</span><p>We begin with a complimentary conversation about your direction, questions, and what support could look like.</p></div>
            <div><span>02 / Shape</span><p>We build a focused engagement around your goals, timeline, and the kind of change you&apos;re ready to create.</p></div>
            <div><span>03 / Move</span><p>You leave with a sharper story, a stronger plan, and practical tools to make your next move count.</p></div>
          </div>
        </div>
      </section>

      <section className="connect-section" id="connect">
        <div className="connect-inner container">
          <div className="connect-orb"><div /><span>↗</span></div>
          <div className="connect-copy">
            <p className="eyebrow"><span /> Make your move</p>
            <h2>Ready for a career<br />that feels like <em>yours?</em></h2>
            <p>Let&apos;s start with a conversation. No pressure, no pitch—just a little space to think bigger about what&apos;s next.</p>
            <a className="button button-light" href="mailto:hello@chev.consulting?subject=Career%20consultation%20enquiry" data-analytics-event="contact_email_click">
              Say hello <Arrow />
            </a>
          </div>
        </div>
      </section>

      </main>
      <SiteFooter />
    </>
  );
}
