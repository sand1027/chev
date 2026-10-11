import nodemailer from "nodemailer";

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

function mailAccount() {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_APP_PASSWORD?.replace(/\s/g, "");
  if (!user || !pass) return null;
  return { user, pass, notify: process.env.BOOKING_NOTIFY_EMAIL?.trim() || user };
}

export async function sendBookingEmails(booking: BookingMail) {
  const account = mailAccount();
  if (!account || !booking.email.includes("@")) return false;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: account.user, pass: account.pass },
  });

  const when = [booking.date, booking.slot].filter(Boolean).join(" at ");
  const details = [
    `Service: ${booking.service}`,
    `Amount: ${booking.amount}`,
    `When: ${when || "Not chosen"} IST`,
    `Name: ${booking.name}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone || "Not given"}`,
    `Note: ${booking.note || "None"}`,
    `Payment: ${booking.paymentId}`,
  ].join("\n");

  await transporter.sendMail({
    from: `"Chevvanthi" <${account.user}>`,
    to: account.notify,
    replyTo: booking.email,
    subject: `New booking: ${booking.service}${when ? ` · ${when}` : ""}`,
    text: `A slot was paid for on the website.\n\n${details}\n`,
  });

  await transporter.sendMail({
    from: `"Chevvanthi" <${account.user}>`,
    to: booking.email,
    replyTo: account.notify,
    subject: `Payment received — ${booking.service}`,
    text: `Hello ${booking.name},\n\nYour payment is confirmed. The time you chose is ${when || "the one in your booking"} IST, and that time is no longer offered to anyone else.\n\n${details}\n\nChevvanthi will write back on this email with the video link.\n`,
  });

  return true;
}
