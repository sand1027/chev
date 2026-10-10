"use client";

import { useEffect, useState } from "react";
import { reviews } from "@/data/site";

const LOOP_COPIES = 3;

function ReviewCard({
  review,
  index,
  hidden = false,
}: {
  review: (typeof reviews)[number];
  index: number;
  hidden?: boolean;
}) {
  return (
    <article className="review-card" aria-hidden={hidden || undefined}>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <h3>{review.name}</h3>
      <p>{review.quote}</p>
      <footer>{review.context}</footer>
    </article>
  );
}

function ReviewGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="review-marquee-group" aria-hidden={hidden || undefined}>
      {Array.from({ length: LOOP_COPIES }, (_, copy) =>
        reviews.map((review, index) => (
          <ReviewCard
            key={`${copy}-${review.name}`}
            review={review}
            index={index}
            hidden={hidden || copy > 0}
          />
        )),
      )}
    </div>
  );
}

export function ReviewCarousel() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(motionQuery.matches);
    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);
    return () => motionQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className="review-marquee review-marquee-static" aria-label="Who the practice is for">
        {reviews.map((review, index) => (
          <ReviewCard key={review.name} review={review} index={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="review-marquee" aria-label="Who the practice is for">
      <div className="review-marquee-track">
        <ReviewGroup />
        <ReviewGroup hidden />
      </div>
    </div>
  );
}
