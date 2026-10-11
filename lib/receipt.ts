import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export type BookingMail = {
  service: string;
  amount: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  slot: string;
  note: string;
  paymentId: string;
};

const forest = "#123634";
const cream = "#f8f5ed";
const paper = "#fffdf8";
const ink = "#172d2c";
const moss = "#5d725d";
const coral = "#f27d63";
const lime = "#d8ed6b";
const line = "#e4dcc8";

export function formatSession(date: string, slot: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const label = match
    ? new Intl.DateTimeFormat("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))))
    : date;
  return [label, slot ? `${slot} IST` : ""].filter(Boolean).join(" · ");
}

export function issuedOn() {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string) {
  if (!value) return "";
  return `<tr>
    <td style="padding:12px 0;border-top:1px solid ${line};font-family:Arial,sans-serif;font-size:13px;line-height:18px;color:${moss};width:120px;vertical-align:top;">${esc(label)}</td>
    <td style="padding:12px 0;border-top:1px solid ${line};font-family:Georgia,serif;font-size:16px;line-height:22px;color:${ink};">${esc(value)}</td>
  </tr>`;
}

export function bookingEmailHtml(input: {
  heading: string;
  intro: string;
  booking: BookingMail;
  when: string;
  from: string;
  issued: string;
  rows: Array<[string, string]>;
}) {
  const details = input.rows.map(([label, value]) => row(label, value)).join("");
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:${cream};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${cream};">
    <tr>
      <td align="center" style="padding:28px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:560px;background:${paper};">
          <tr>
            <td style="background:${forest};padding:28px 32px 24px;">
              <p style="margin:0;font-family:Georgia,serif;font-size:28px;line-height:32px;color:${cream};">chev<span style="color:${coral};">•</span></p>
              <p style="margin:18px 0 0;font-family:Georgia,serif;font-size:32px;line-height:36px;color:${cream};">${esc(input.heading)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;">
              <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:15px;line-height:22px;color:${ink};">${esc(input.intro)}</p>
              <p style="margin:0 0 8px;display:inline-block;background:${lime};color:${ink};font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:6px 10px;">Paid</p>
              <p style="margin:0 0 8px;font-family:Georgia,serif;font-size:40px;line-height:44px;color:${ink};">${esc(input.booking.amount)}</p>
              <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:14px;line-height:20px;color:${moss};">${esc(input.booking.service)}</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${details}</table>
              <p style="margin:22px 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:21px;color:${ink};">The paid receipt is attached as a PDF.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 28px;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;line-height:18px;color:${moss};">Chevvanthi MN · Bangalore · ${esc(input.from)}<br>Issued ${esc(input.issued)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function pdfSafe(value: string) {
  return value
    .replace(/₹/g, "INR ")
    .replace(/\u00a0/g, " ")
    .replace(/[^\x09\x0a\x0d\x20-\x7e\u00a1-\u00ff]/g, "");
}

export async function buildReceiptPdf(input: {
  booking: BookingMail;
  when: string;
  from: string;
  issued: string;
}) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const width = page.getWidth();
  const height = page.getHeight();

  page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.973, 0.961, 0.929) });
  page.drawRectangle({ x: 0, y: height - 132, width, height: 132, color: rgb(0.071, 0.212, 0.204) });
  page.drawRectangle({ x: 0, y: height - 136, width, height: 4, color: rgb(0.949, 0.49, 0.388) });

  const wordmark = "chev";
  const wordmarkSize = 28;
  page.drawText(wordmark, { x: 48, y: height - 62, size: wordmarkSize, font, color: rgb(0.973, 0.961, 0.929) });
  page.drawText("\u00b7", {
    x: 48 + font.widthOfTextAtSize(wordmark, wordmarkSize),
    y: height - 62,
    size: wordmarkSize,
    font,
    color: rgb(0.949, 0.49, 0.388),
  });
  page.drawText("Payment receipt", { x: 48, y: height - 98, size: 22, font, color: rgb(0.973, 0.961, 0.929) });

  page.drawRectangle({ x: 48, y: height - 188, width: 64, height: 24, color: rgb(0.847, 0.929, 0.42) });
  page.drawText("PAID", { x: 62, y: height - 181, size: 11, font: bold, color: rgb(0.09, 0.176, 0.173) });
  page.drawText(pdfSafe(input.booking.amount), {
    x: 48,
    y: height - 236,
    size: 32,
    font: bold,
    color: rgb(0.09, 0.176, 0.173),
  });
  page.drawText(pdfSafe(input.booking.service), {
    x: 48,
    y: height - 262,
    size: 13,
    font,
    color: rgb(0.365, 0.447, 0.365),
  });

  const rows: Array<[string, string]> = [
    ["Receipt", input.booking.paymentId],
    ["Issued", input.issued],
    ["Name", input.booking.name],
    ["Email", input.booking.email],
    ["Phone", input.booking.phone || "Not given"],
    ["Session", input.when || "To be confirmed"],
    ["Note", input.booking.note || "None"],
  ];

  let y = height - 310;
  for (const [label, value] of rows) {
    page.drawLine({
      start: { x: 48, y },
      end: { x: width - 48, y },
      thickness: 1,
      color: rgb(0.894, 0.863, 0.784),
    });
    page.drawText(label, { x: 48, y: y - 22, size: 11, font, color: rgb(0.365, 0.447, 0.365) });
    const text = pdfSafe(value).slice(0, 72);
    page.drawText(text, { x: 150, y: y - 22, size: 12, font: bold, color: rgb(0.09, 0.176, 0.173) });
    y -= 36;
  }

  page.drawText(pdfSafe(`Chevvanthi MN  ·  Bangalore  ·  ${input.from}`), {
    x: 48,
    y: 56,
    size: 10,
    font,
    color: rgb(0.365, 0.447, 0.365),
  });
  page.drawText("This receipt confirms the Razorpay payment for the session above.", {
    x: 48,
    y: 40,
    size: 10,
    font,
    color: rgb(0.365, 0.447, 0.365),
  });

  return pdf.save();
}
