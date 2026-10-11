import { getBookedSlotMap } from "@/lib/booked-slots";

export const runtime = "nodejs";

export async function GET() {
  try {
    const taken = await getBookedSlotMap();
    return Response.json({ taken });
  } catch {
    return Response.json({ error: "The calendar could not be checked." }, { status: 502 });
  }
}
