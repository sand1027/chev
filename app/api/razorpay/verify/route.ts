import { verifyPaymentSignature } from "@/lib/razorpay";

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

  return Response.json({ ok: true, paymentId });
}
