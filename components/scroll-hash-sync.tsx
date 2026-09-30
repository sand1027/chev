"use client";

import { useEffect } from "react";

export function ScrollHashSync({ sectionIds }: { sectionIds: string[] }) {
  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const updateHash = (id: string) => {
      const nextHash = `#${id}`;
      if (window.location.hash !== nextHash) window.history.replaceState(null, "", nextHash);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) updateHash(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.15, 0.4, 0.65] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  return null;
}
