import { getService } from "@/data/site";
import { getRazorpay } from "@/lib/razorpay";

export const runtime = "nodejs";

type OrderRequest = {
  slug?: string;
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  slot?: string;
  note?: string;
};

function clip(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const razorpay = getRazorpay();
  if (!razorpay) {
    return Response.json({ error: "Payments are not configured yet." }, { status: 500 });
  }

  let body: OrderRequest;
  try {
    body = (await request.json()) as OrderRequest;
  } catch {
    return Response.json({ error: "Send the booking details as JSON." }, { status: 400 });
  }

  const service = getService(body.slug);
  const name = clip(body.name, 80);
  const email = clip(body.email, 80);
  if (!service) return Response.json({ error: "Choose a service from the list." }, { status: 400 });
  if (!name || !email.includes("@")) {
    return Response.json({ error: "Add your name and a valid email address." }, { status: 400 });
  }

  try {
    const order = await razorpay.client.orders.create({
      amount: service.amount,
      currency: "INR",
      receipt: `chev_${Date.now()}`.slice(0, 40),
      notes: {
        service: service.slug,
        name,
        email,
        phone: clip(body.phone, 20),
        date: clip(body.date, 20),
        slot: clip(body.slot, 10),
        note: clip(body.note, 200),
      },
    });

    return Response.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: razorpay.keyId,
      name: service.name,
    });
  } catch {
    return Response.json({ error: "Razorpay could not start this payment. Try again in a moment." }, { status: 502 });
  }
}
