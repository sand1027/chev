import { bookingEmailHtml, buildReceiptPdf, formatSession, issuedOn, type BookingMail } from "@/lib/receipt";

export type { BookingMail };

const MAIL_API = "https://api.mail.hostinger.com";

type Mailbox = {
  resourceId: string;
  address: string;
};

type OutgoingMail = {
  to: string;
  subject: string;
  text: string;
  html: string;
  filename: string;
  pdf: Uint8Array;
};

function token() {
  return process.env.HOSTINGER_MAIL_API_TOKEN?.trim() || "";
}

async function mailRequest(path: string, accessToken: string, init?: RequestInit) {
  const response = await fetch(`${MAIL_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) {
    throw new Error(`Hostinger mail ${response.status}`);
  }
  if (response.status === 204) return null;
  return response.json() as Promise<{ data?: { mailboxes?: Mailbox[] } }>;
}

async function sendingMailbox(accessToken: string) {
  const body = await mailRequest("/api/v1/me", accessToken);
  const mailboxes = body?.data?.mailboxes ?? [];
  const preferred = process.env.EMAIL_USER?.trim().toLowerCase();
  const mailbox = mailboxes.find((item) => item.address.toLowerCase() === preferred) ?? mailboxes[0];
  if (!mailbox?.resourceId || !mailbox.address) {
    throw new Error("Hostinger mail has no mailbox for this key.");
  }
  return mailbox;
}

async function sendOne(accessToken: string, mailbox: Mailbox, message: OutgoingMail) {
  await mailRequest(`/api/v1/mailboxes/${mailbox.resourceId}/send`, accessToken, {
    method: "POST",
    body: JSON.stringify({
      to: [message.to],
      displayName: "Chevvanthi",
      subject: message.subject,
      text: message.text,
      html: message.html,
      attachments: [
        {
          filename: message.filename,
          content: Buffer.from(message.pdf).toString("base64"),
          contentType: "application/pdf",
          encoding: "base64",
        },
      ],
    }),
  });
}

export async function sendBookingEmails(booking: BookingMail) {
  const accessToken = token();
  if (!accessToken || !booking.email.includes("@")) return false;

  const mailbox = await sendingMailbox(accessToken);
  const notify = process.env.BOOKING_NOTIFY_EMAIL?.trim() || mailbox.address;
  const when = formatSession(booking.date, booking.slot);
  const issued = issuedOn();
  const pdf = await buildReceiptPdf({ booking, when, from: mailbox.address, issued });
  const filename = `chevvanthi-receipt-${booking.paymentId.replace(/[^\w.-]/g, "") || "payment"}.pdf`;
  const shared = { booking, when, from: mailbox.address, issued };

  await sendOne(accessToken, mailbox, {
    to: notify,
    subject: `New booking: ${booking.service}${when ? ` · ${when}` : ""}`,
    text: `A slot was paid for on the website.\n\n${booking.name} · ${booking.email}\n${booking.service} · ${booking.amount}\n${when}\nPayment ${booking.paymentId}\n\nThe receipt PDF is attached.\nReply from hello@chevvanthi.in\n`,
    html: bookingEmailHtml({
      ...shared,
      heading: "New booking",
      intro: `${booking.name} paid for a session. The receipt is attached.`,
      rows: [
        ["When", when],
        ["Name", booking.name],
        ["Email", booking.email],
        ["Phone", booking.phone || "Not given"],
        ["Note", booking.note || "None"],
        ["Payment", booking.paymentId],
      ],
    }),
    filename,
    pdf,
  });

  await sendOne(accessToken, mailbox, {
    to: booking.email,
    subject: `Payment received — ${booking.service}`,
    text: `Hello ${booking.name},\n\nYour payment of ${booking.amount} is confirmed for ${when || "your session"}.\n\nThe paid receipt is attached.\nChevvanthi will write back from hello@chevvanthi.in with the video link.\n`,
    html: bookingEmailHtml({
      ...shared,
      heading: "Payment received",
      intro: `Hello ${booking.name}, your payment is confirmed and that time is no longer offered to anyone else.`,
      rows: [
        ["When", when],
        ["Payment", booking.paymentId],
      ],
    }),
    filename,
    pdf,
  });

  return true;
}
