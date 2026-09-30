import Link from "next/link";
import { PageShell } from "@/components/site-chrome";

export default function NotFound() {
  return <PageShell><section className="not-found container"><p className="eyebrow"><span /> 404</p><h1>This page has moved <em>on.</em></h1><p>The page you&apos;re looking for isn&apos;t available. Explore Chev&apos;s services or return to the homepage.</p><div><Link className="button button-dark" href="/">Back home →</Link><Link className="text-link" href="/services">Explore services →</Link></div></section></PageShell>;
}
