"use client";

import { useMemo, useState } from "react";
import { services, site } from "@/data/site";

type BookingStep = 1 | 2 | 3;

type AvailableDate = {
  value: string;
  weekday: string;
  day: string;
  month: string;
  full: string;
};

const slots = ["09:00", "11:30", "14:00", "16:30"];

function getAvailableDates(): AvailableDate[] {
  const dates: AvailableDate[] = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);

  while (dates.length < 5) {
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

export function BookingForm({ initialService }: { initialService?: string }) {
  const availableDates = useMemo(() => getAvailableDates(), []);
  const defaultService = services.some((service) => service.slug === initialService) ? initialService : services[0].slug;
  const [step, setStep] = useState<BookingStep>(1);
  const [selectedService, setSelectedService] = useState(defaultService);
  const [selectedDate, setSelectedDate] = useState(availableDates[0].value);
  const [selectedSlot, setSelectedSlot] = useState(slots[1]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const chosenService = services.find((service) => service.slug === selectedService) ?? services[0];
  const chosenDate = availableDates.find((date) => date.value === selectedDate) ?? availableDates[0];
  const canSubmit = Boolean(name.trim() && email.trim());
  const emailSubject = encodeURIComponent(`Booking request: ${chosenService.name}`);
  const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nService: ${chosenService.name}\nPrice: ${chosenService.price}\nDuration: ${chosenService.duration}\nPreferred date: ${chosenDate.full}\nPreferred time: ${selectedSlot}\n\nWhat I would like support with:\n${note}`);

  const steps = ["Service", "Schedule", "Details"];

  return (
    <form
      className="booking-form booking-form-redesign"
      action={`mailto:${site.email}?subject=${emailSubject}&body=${emailBody}`}
      method="post"
      onSubmit={(event) => {
        if (!canSubmit) event.preventDefault();
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
              <h2 id="booking-service-title">What would make the biggest difference right now?</h2>
              <p className="booking-stage-intro">Choose the format that best matches the conversation you need to have.</p>
              <div className="booking-service-list">
                {services.map((service, index) => (
                  <label className={service.slug === selectedService ? "booking-service-option selected" : "booking-service-option"} key={service.slug}>
                    <input type="radio" name="service" value={service.slug} checked={service.slug === selectedService} onChange={() => setSelectedService(service.slug)} />
                    <span className="booking-service-number">0{index + 1}</span>
                    <span className="booking-service-copy"><strong>{service.name}</strong><small>{service.description}</small><em>{service.duration} · Video call</em></span>
                    <span className="booking-service-price">{service.price}</span>
                    <span className="booking-service-radio" aria-hidden="true" />
                  </label>
                ))}
              </div>
              <div className="booking-stage-actions"><span>Not sure? You can change this later.</span><button className="booking-next" type="button" onClick={() => setStep(2)}>Choose a time <span>→</span></button></div>
            </section>
          )}

          {step === 2 && (
            <section className="booking-stage-content" aria-labelledby="booking-schedule-title">
              <p className="booking-kicker">Step 02 <span>—</span> Find a time</p>
              <h2 id="booking-schedule-title">Pick a moment that gives you room to think.</h2>
              <p className="booking-stage-intro">All sessions happen by video. Times are shown in the counsellor&apos;s local time and confirmed by email.</p>
              <div className="booking-schedule-grid">
                <div><p className="booking-field-label">Choose a date</p><div className="date-strip">{availableDates.map((date) => <button key={date.value} type="button" className={date.value === selectedDate ? "selected" : ""} onClick={() => setSelectedDate(date.value)} aria-pressed={date.value === selectedDate}><span>{date.weekday}</span><strong>{date.day}</strong><small>{date.month}</small></button>)}</div></div>
                <div><p className="booking-field-label">Available times</p><div className="time-grid">{slots.map((slot) => <button className={slot === selectedSlot ? "selected" : ""} type="button" key={slot} onClick={() => setSelectedSlot(slot)} aria-pressed={slot === selectedSlot}>{slot}</button>)}</div></div>
              </div>
              <div className="booking-selected-time"><span>Your preferred time</span><strong>{chosenDate.full} <i>·</i> {selectedSlot}</strong></div>
              <div className="booking-stage-actions"><button className="booking-back" type="button" onClick={() => setStep(1)}>← Back</button><button className="booking-next" type="button" onClick={() => setStep(3)}>Continue <span>→</span></button></div>
            </section>
          )}

          {step === 3 && (
            <section className="booking-stage-content" aria-labelledby="booking-details-title">
              <p className="booking-kicker">Step 03 <span>—</span> Your details</p>
              <h2 id="booking-details-title">A little context before we meet.</h2>
              <p className="booking-stage-intro">A few details help make the session more useful from the first minute.</p>
              <div className="booking-fields booking-fields-redesign">
                <label>Your name<input required value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="Full name" /></label>
                <label>Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" /></label>
              </div>
              <label className="booking-message booking-message-redesign">What would you like to work through?<textarea value={note} onChange={(event) => setNote(event.target.value)} rows={4} placeholder="A short note is enough—share the move, decision, or question on your mind." /></label>
              <div className="booking-stage-actions"><button className="booking-back" type="button" onClick={() => setStep(2)}>← Back</button><button className="booking-next booking-submit" type="submit" disabled={!canSubmit}>Request this slot <span>→</span></button></div>
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
            <div><dt>Format</dt><dd>Video call</dd></div>
          </dl>
          <div className="booking-recap-total"><span>Investment</span><strong>{chosenService.price}</strong></div>
          <p className="booking-recap-note">No payment is taken today. Your session is confirmed only after Chev replies to your request.</p>
        </aside>
      </div>
    </form>
  );
}
