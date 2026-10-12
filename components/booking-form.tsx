"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/app/analytics";
import { formatInr, services, sessionSlots, site } from "@/data/site";

type BookingStep = 1 | 2 | 3;

type AvailableDate = {
  value: string;
  weekday: string;
  day: string;
  month: string;
  full: string;
};

type RazorpaySuccess = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayCheckout = {
  open: () => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayCheckout;
  }
}

const testMode = (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "").startsWith("rzp_test_");

function getAvailableDates(): AvailableDate[] {
  const dates: AvailableDate[] = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);

  while (dates.length < 10) {
    cursor.setDate(cursor.getDate() + 1);
    if (cursor.getDay() === 0 || cursor.getDay() === 6) continue;
    const value = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`;
    dates.push({
      value,
      weekday: new Intl.DateTimeFormat("en", { weekday: "short" }).format(cursor),
      day: String(cursor.getDate()),
      month: new Intl.DateTimeFormat("en", { month: "short" }).format(cursor),
      full: new Intl.DateTimeFormat("en", { weekday: "long", day: "numeric", month: "long" }).format(cursor),
    });
  }

  return dates;
}

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function BookingForm({ initialService }: { initialService?: string }) {
  const router = useRouter();
  const availableDates = useMemo(() => getAvailableDates(), []);
  const matchedService = services.find((service) => service.slug === initialService);
  const [step, setStep] = useState<BookingStep>(matchedService ? 2 : 1);
  const [selectedService, setSelectedService] = useState(matchedService?.slug ?? services[0].slug);
  const [selectedDate, setSelectedDate] = useState(availableDates[0].value);
  const [selectedSlot, setSelectedSlot] = useState<string>("11:30");
  const [taken, setTaken] = useState<Record<string, string[]>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const chosenService = services.find((service) => service.slug === selectedService) ?? services[0];
  const chosenDate = availableDates.find((date) => date.value === selectedDate) ?? availableDates[0];
  const openSlots = sessionSlots.filter((slot) => !(taken[selectedDate] ?? []).includes(slot));
  const canPay = Boolean(name.trim() && email.trim() && selectedSlot);

  useEffect(() => {
    if (!matchedService) return;
    setSelectedService(matchedService.slug);
    setStep((current) => (current === 1 ? 2 : current));
  }, [matchedService]);

  useEffect(() => {
    trackEvent("booking_step", { step: ["service", "schedule", "payment"][step - 1], service: selectedService });
  }, [step]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/razorpay/slots")
      .then((response) => response.json())
      .then((data: { taken?: Record<string, string[]> }) => {
        if (!cancelled) setTaken(data.taken ?? {});
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [step]);

  useEffect(() => {
    if (openSlots.includes(selectedSlot as (typeof sessionSlots)[number])) return;
    setSelectedSlot(openSlots[0] ?? "");
  }, [openSlots, selectedSlot]);
  const price = formatInr(chosenService.amount);

  const steps = ["Service", "Schedule", "Payment"];

  async function pay() {
    if (!canPay || paying) return;
    setPaying(true);
    setError("");

    try {
      const orderResponse = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: chosenService.slug,
          name,
          email,
          phone,
          date: selectedDate,
          slot: selectedSlot,
          note,
        }),
      });
      const order = (await orderResponse.json()) as {
        error?: string;
        orderId?: string;
        amount?: number;
        currency?: string;
        keyId?: string;
        name?: string;
      };
      if (!orderResponse.ok || !order.orderId || !order.keyId) {
        trackEvent("booking_error", { step: "order", service: chosenService.slug });
        setError(order.error ?? "Could not start checkout.");
        setPaying(false);
        return;
      }
      trackEvent("begin_checkout", { service: chosenService.slug, currency: "INR", value: chosenService.amount / 100 });

      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        trackEvent("booking_error", { step: "checkout", service: chosenService.slug });
        setError("Razorpay checkout could not be loaded.");
        setPaying(false);
        return;
      }

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: site.counsellor.name,
        description: order.name,
        order_id: order.orderId,
        prefill: { name, email, contact: phone },
        theme: { color: "#123634" },
        modal: {
          ondismiss: () => {
            trackEvent("checkout_dismiss", { service: chosenService.slug });
            setPaying(false);
          },
        },
        handler: async (payment: RazorpaySuccess) => {
          const verifyResponse = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payment),
          });
          if (!verifyResponse.ok) {
            trackEvent("booking_error", { step: "confirm", service: chosenService.slug });
            setError("The payment was received, but it could not be confirmed. Please email Chevvanthi with your payment reference.");
            setPaying(false);
            return;
          }
          trackEvent("purchase", {
            transaction_id: payment.razorpay_payment_id,
            service: chosenService.slug,
            currency: "INR",
            value: chosenService.amount / 100,
          });
          router.push(`/book/success?service=${chosenService.slug}`);
        },
      });
      checkout.open();
    } catch {
      trackEvent("booking_error", { step: "checkout", service: chosenService.slug });
      setError("Something went wrong before checkout opened.");
      setPaying(false);
    }
  }

  return (
    <form
      className="booking-form booking-form-redesign"
      onSubmit={(event) => {
        event.preventDefault();
        if (step === 3) void pay();
      }}
    >
      <div className="booking-progress" aria-label="Booking progress">
        {steps.map((label, index) => {
          const stepNumber = (index + 1) as BookingStep;
          const isCurrent = step === stepNumber;
          const isComplete = step > stepNumber;
          return (
            <div className={isCurrent ? "booking-progress-item current" : isComplete ? "booking-progress-item complete" : "booking-progress-item"} key={label}>
              <button type="button" onClick={() => isComplete && setStep(stepNumber)} disabled={!isComplete} aria-current={isCurrent ? "step" : undefined}>
                {isComplete ? "✓" : String(stepNumber).padStart(2, "0")}
              </button>
              <span>{label}</span>
            </div>
          );
        })}
      </div>

      <div className="booking-layout">
        <div className="booking-stage">
          {step === 1 && (
            <section className="booking-stage-content" aria-labelledby="booking-service-title">
              <p className="booking-kicker">Step 01 <span>—</span> Choose your session</p>
              <h2 id="booking-service-title">What kind of support do you need?</h2>
              <p className="booking-stage-intro">Individual mentoring for freshers and experienced professionals, or a consulting block for a company team.</p>
              <div className="booking-service-list">
                {services.map((service, index) => (
                  <label className={service.slug === selectedService ? "booking-service-option selected" : "booking-service-option"} key={service.slug} data-analytics-event="booking_select_service" data-analytics-service={service.slug}>
                    <input type="radio" name="service" value={service.slug} checked={service.slug === selectedService} onChange={() => setSelectedService(service.slug)} />
                    <span className="booking-service-number">0{index + 1}</span>
                    <span className="booking-service-copy"><strong>{service.name}</strong><small>{service.description}</small><em>{service.audience} · {service.duration}</em></span>
                    <span className="booking-service-price">{formatInr(service.amount)}</span>
                    <span className="booking-service-radio" aria-hidden="true" />
                  </label>
                ))}
              </div>
              <div className="booking-stage-actions"><span>You can change this before you pay.</span><button className="booking-next" type="button" data-analytics-event="booking_continue" data-analytics-step="schedule" onClick={() => setStep(2)}>Choose a time <span>→</span></button></div>
            </section>
          )}

          {step === 2 && (
            <section className="booking-stage-content" aria-labelledby="booking-schedule-title">
              <p className="booking-kicker">Step 02 <span>—</span> Find a time</p>
              <h2 id="booking-schedule-title">Share a time that gives you room to think.</h2>
              <p className="booking-stage-intro">Sessions are by video, in India Standard Time. A time leaves this list once someone pays for it.</p>
              <div className="booking-schedule-grid">
                <div><p className="booking-field-label">Choose a date</p><div className="date-strip">{availableDates.map((date) => <button key={date.value} type="button" className={date.value === selectedDate ? "selected" : ""} data-analytics-event="booking_select_date" data-analytics-date={date.value} onClick={() => setSelectedDate(date.value)} aria-pressed={date.value === selectedDate}><span>{date.weekday}</span><strong>{date.day}</strong><small>{date.month}</small></button>)}</div></div>
                <div><p className="booking-field-label">Available times</p>{openSlots.length ? <div className="time-grid">{openSlots.map((slot) => <button className={slot === selectedSlot ? "selected" : ""} type="button" key={slot} data-analytics-event="booking_select_time" data-analytics-slot={slot} onClick={() => setSelectedSlot(slot)} aria-pressed={slot === selectedSlot}>{slot}</button>)}</div> : <p className="booking-stage-intro">Every time on this day is already booked. Choose another date.</p>}</div>
              </div>
              <div className="booking-selected-time"><span>Your time</span><strong>{selectedSlot ? <>{chosenDate.full} <i>·</i> {selectedSlot}</> : "Choose another date"}</strong></div>
              <div className="booking-stage-actions"><button className="booking-back" type="button" data-analytics-event="booking_back" data-analytics-step="service" onClick={() => setStep(1)}>← Back</button><button className="booking-next" type="button" data-analytics-event="booking_continue" data-analytics-step="payment" onClick={() => setStep(3)} disabled={!selectedSlot}>Continue <span>→</span></button></div>
            </section>
          )}

          {step === 3 && (
            <section className="booking-stage-content" aria-labelledby="booking-details-title">
              <p className="booking-kicker">Step 03 <span>—</span> Pay and reserve</p>
              <h2 id="booking-details-title">A few details, then Razorpay.</h2>
              <p className="booking-stage-intro">Payment opens in Razorpay Checkout. Card details stay with Razorpay, not on this site.</p>
              <div className="booking-fields booking-fields-redesign">
                <label>Your name<input required value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="Full name" /></label>
                <label>Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" /></label>
                <label>Phone<input value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" inputMode="tel" placeholder="Optional" /></label>
              </div>
              <label className="booking-message booking-message-redesign">What would you like to work through?<textarea value={note} onChange={(event) => setNote(event.target.value)} rows={4} placeholder="Interview, architecture move, or the data platform you want to discuss." /></label>
              {error ? <p className="booking-pay-error" role="alert">{error}</p> : null}
              <div className="booking-stage-actions"><button className="booking-back" type="button" data-analytics-event="booking_back" data-analytics-step="schedule" onClick={() => setStep(2)}>← Back</button><button className="booking-next booking-submit" type="submit" data-analytics-event="booking_pay" data-analytics-service={chosenService.slug} disabled={!canPay || paying}>{paying ? "Opening checkout…" : `Pay ${price}`} <span>→</span></button></div>
            </section>
          )}
        </div>

        <aside className="booking-recap" aria-live="polite">
          <p>Your booking</p>
          <div className="booking-recap-mark">C<span>•</span></div>
          <h3>{chosenService.name}</h3>
          <dl>
            <div><dt>Session</dt><dd>{chosenService.duration}</dd></div>
            <div><dt>When</dt><dd>{step === 1 ? "Choose a time" : `${chosenDate.month} ${chosenDate.day} · ${selectedSlot}`}</dd></div>
            <div><dt>Format</dt><dd>{chosenService.audience === "Startups & mid-size companies" ? "Consulting" : "Video call"}</dd></div>
          </dl>
          <div className="booking-recap-total"><span>Investment</span><strong>{price}</strong></div>
          <p className="booking-recap-note">
            {testMode
              ? "Test mode is on. Use a Razorpay test card such as 4111 1111 1111 1111. No real money is charged."
              : "Pay securely with Razorpay. Chevvanthi confirms the time by email after payment."}
          </p>
        </aside>
      </div>
    </form>
  );
}
