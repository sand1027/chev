"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Guides" },
];

function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const openPage = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="wordmark" href="/" aria-label="Chev home">chev<span>•</span></Link>
        <nav className="header-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} aria-current={isCurrent(pathname, link.href) ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-tools">
          <Link className="header-cta" href="/book">Book a slot ↗</Link>
          <button
            className={isOpen ? "nav-toggle is-open" : "nav-toggle"}
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="nav-toggle-bars" aria-hidden="true" />
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
      <nav id="mobile-nav" className={isOpen ? "mobile-nav is-open" : "mobile-nav"} aria-label="Mobile navigation" aria-hidden={!isOpen} inert={!isOpen}>
        <div className="container mobile-nav-list">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
              onClick={(event) => {
                event.preventDefault();
                openPage(link.href);
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={(event) => {
              event.preventDefault();
              openPage("/book");
            }}
          >
            Book a slot ↗
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-grid"><div><Link className="wordmark" href="/">chev<span>•</span></Link><p>International career consultancy for intentional next moves.</p></div><div><strong>Explore</strong><Link href="/about">About the counsellor</Link><Link href="/services">Services</Link><Link href="/pricing">Pricing</Link></div><div><strong>Resources</strong><Link href="/blog">Career guides</Link><Link href="/faq">Frequently asked questions</Link><Link href="/reviews">Client reviews</Link></div><div><strong>Connect</strong><Link href="/book">Book a slot</Link><Link href="/contact">Start a conversation</Link><a href={`mailto:${site.email}`}>{site.email}</a></div></div><div className="container footer-base"><span>© {new Date().getFullYear()} Chev. All rights reserved.</span><Link href="/sitemap.xml">Sitemap</Link></div></footer>;
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return <><SiteHeader /><main className="content-page">{children}</main><SiteFooter /></>;
}
