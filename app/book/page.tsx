import { Breadcrumbs } from "@/components/breadcrumbs";
import { BookingForm } from "@/components/booking-form";
import { PageShell } from "@/components/site-chrome";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Book and pay", description: "Choose a Chevvanthi session or consulting package, share a preferred time, and pay with Razorpay.", path: "/book" });

export default async function BookPage({ searchParams }: PageProps<"/book">) {
  const { service } = await searchParams;
  const initialService = typeof service === "string" ? service : undefined;
  return <PageShell><section className="book-intro container"><Breadcrumbs items={[{ label: "Book a slot" }]} /><div className="book-intro-grid"><div><p className="eyebrow"><span /> Razorpay checkout</p><h1>Choose the session, then <em>pay.</em></h1></div><p>Pick a service and a preferred time. Payment opens in Razorpay. Chevvanthi confirms the slot by email.</p></div></section><section className="container booking-wrap"><BookingForm key={initialService ?? "choose"} initialService={initialService} /></section></PageShell>;
}
