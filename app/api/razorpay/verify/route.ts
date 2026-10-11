import { formatInr, getService } from "@/data/site";
import { sendBookingEmails } from "@/lib/mail";
import { getRazorpay, verifyPaymentSignature } from "@/lib/razorpay";

export const runtime = "nodejs";

type VerifyRequest = {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

export async function POST(request: Request) {
  let body: VerifyRequest;
  try {
    body = (await request.json()) as VerifyRequest;
  } catch {
    return Response.json({ error: "Payment details were missing." }, { status: 400 });
  }

  const orderId = body.razorpay_order_id ?? "";
  const paymentId = body.razorpay_payment_id ?? "";
  const signature = body.razorpay_signature ?? "";
  if (!orderId || !paymentId || !signature || !verifyPaymentSignature(orderId, paymentId, signature)) {
    return Response.json({ error: "Payment could not be confirmed." }, { status: 400 });
  }

  let emailSent = false;
  const razorpay = getRazorpay();
  if (razorpay) {
    try {
      const order = (await razorpay.client.orders.fetch(orderId)) as {
        amount?: number;
        notes?: Record<string, string> | null;
      };
      const notes = order.notes ?? {};
      const service = getService(typeof notes.service === "string" ? notes.service : "");
      emailSent = await sendBookingEmails({
        service: service?.name ?? "Session",
        amount: formatInr(service?.amount ?? order.amount ?? 0),
        name: typeof notes.name === "string" ? notes.name : "there",
        email: typeof notes.email === "string" ? notes.email : "",
        phone: typeof notes.phone === "string" ? notes.phone : "",
        date: typeof notes.date === "string" ? notes.date : "",
        slot: typeof notes.slot === "string" ? notes.slot : "",
        note: typeof notes.note === "string" ? notes.note : "",
        paymentId,
      });
    } catch {
      emailSent = false;
    }
  }

  return Response.json({ ok: true, paymentId, emailSent });
}
