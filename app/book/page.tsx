import { Breadcrumbs } from "@/components/breadcrumbs";
import { BookingForm } from "@/components/booking-form";
import { PageShell } from "@/components/site-chrome";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Book a career consultation", description: "Choose a Chev career consulting service and request a preferred appointment slot.", path: "/book" });

export default async function BookPage({ searchParams }: PageProps<"/book">) {
  const { service } = await searchParams;
  const initialService = typeof service === "string" ? service : undefined;
  return <PageShell><section className="book-intro container"><Breadcrumbs items={[{ label: "Book a slot" }]} /><div className="book-intro-grid"><div><p className="eyebrow"><span /> A private career conversation</p><h1>Make room for the move that <em>matters.</em></h1></div><p>Choose a session, select a preferred time, and share a little context. You&apos;ll receive a personal confirmation before anything is booked.</p></div></section><section className="container booking-wrap"><BookingForm initialService={initialService} /></section></PageShell>;
}
