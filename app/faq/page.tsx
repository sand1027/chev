import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/site-chrome";
import { faqs } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Career consulting FAQs", description: "Answers to common questions about Chev's international career consulting and how to get started.", path: "/faq" });

export default function FaqPage() {
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
  return <PageShell><section className="page-hero container"><Breadcrumbs items={[{ label: "FAQs" }]} /><p className="eyebrow"><span /> Helpful details</p><h1>Questions, answered with <em>clarity.</em></h1><p>Everything you need to know before starting a conversation with Chev.</p></section><section className="container faq-list">{faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section><JsonLd data={faqSchema} /></PageShell>;
}
