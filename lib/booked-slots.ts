import { getRazorpay } from "@/lib/razorpay";

type OrderRecord = {
  status?: string;
  created_at?: number;
  notes?: Record<string, string> | null;
};

const HOLD_SECONDS = 15 * 60;

function notesOf(order: OrderRecord) {
  const notes = order.notes;
  if (!notes || typeof notes !== "object") return { date: "", slot: "" };
  return {
    date: typeof notes.date === "string" ? notes.date : "",
    slot: typeof notes.slot === "string" ? notes.slot : "",
  };
}

function blocksSlot(order: OrderRecord, nowSeconds: number) {
  if (order.status === "paid") return true;
  if (order.status !== "created" && order.status !== "attempted") return false;
  const created = order.created_at ?? 0;
  return created > 0 && nowSeconds - created < HOLD_SECONDS;
}

export async function getBookedSlotMap() {
  const razorpay = getRazorpay();
  const taken: Record<string, string[]> = {};
  if (!razorpay) return taken;

  const nowSeconds = Math.floor(Date.now() / 1000);
  let skip = 0;

  for (let page = 0; page < 3; page += 1) {
    const result = (await razorpay.client.orders.all({ count: 100, skip })) as { items?: OrderRecord[] };
    const items = result.items ?? [];
    for (const order of items) {
      if (!blocksSlot(order, nowSeconds)) continue;
      const { date, slot } = notesOf(order);
      if (!date || !slot) continue;
      const times = taken[date] ?? [];
      if (!times.includes(slot)) times.push(slot);
      taken[date] = times;
    }
    if (items.length < 100) break;
    skip += items.length;
  }

  return taken;
}

export function isSlotTaken(taken: Record<string, string[]>, date: string, slot: string) {
  return (taken[date] ?? []).includes(slot);
}
