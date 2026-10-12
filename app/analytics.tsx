"use client";

import type { Analytics as FirebaseAnalytics } from "firebase/analytics";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean);

type EventParams = Record<string, string | number>;

type QueuedEvent = {
  name: string;
  params?: EventParams;
};

const queue: QueuedEvent[] = [];
let analyticsPromise: Promise<FirebaseAnalytics | null> | null = null;
let flushing = false;
let lastEventKey = "";
let lastEventAt = 0;

function eventName(value: string) {
  const cleaned = value.toLowerCase().replace(/[^a-z0-9_]/g, "_").replace(/_+/g, "_").replace(/^_+|_+$/g, "");
  const named = /^[a-z]/.test(cleaned) ? cleaned : `event_${cleaned}`;
  return named.slice(0, 40);
}

function eventValue(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 100);
}

const pageNames: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/services": "Services",
  "/pricing": "Pricing",
  "/reviews": "Practice",
  "/blog": "Guides",
  "/faq": "FAQs",
  "/contact": "Contact",
  "/book": "Book and pay",
  "/book/success": "Payment received",
};

function pageName(pathname: string, title: string) {
  if (pageNames[pathname]) return pageNames[pathname];
  const clean = title.replace(/\s*\|\s*Chevvanthi\s*$/, "").trim();
  return clean || pathname;
}

function currentPage(): EventParams {
  const pathname = window.location.pathname;
  const search = window.location.search;
  return {
    page_name: pageName(pathname, document.title),
    page_path: `${pathname}${search}`,
  };
}

function safeUrl(href: string) {
  try {
    const url = new URL(href, window.location.origin);
    if (url.protocol === "mailto:" || url.protocol === "tel:") return url.protocol.slice(0, -1);
    if (url.origin === window.location.origin) return eventValue(`${url.pathname}${url.search}`);
    return eventValue(`${url.origin}${url.pathname}`);
  } catch {
    return "";
  }
}

async function clientAnalytics() {
  if (!hasFirebaseConfig || typeof window === "undefined") return null;
  analyticsPromise ??= (async () => {
    const analyticsModule = await import("firebase/analytics");
    if (!(await analyticsModule.isSupported())) return null;
    const appModule = await import("firebase/app");
    const app = appModule.getApps().length ? appModule.getApp() : appModule.initializeApp(firebaseConfig);
    return analyticsModule.initializeAnalytics(app, {
      config: {
        send_page_view: false,
        debug_mode: window.location.hostname === "localhost",
      },
    });
  })();
  return analyticsPromise;
}

async function flush() {
  if (flushing) return;
  flushing = true;
  try {
    const analytics = await clientAnalytics();
    if (!analytics) {
      queue.length = 0;
      return;
    }
    const { logEvent } = await import("firebase/analytics");
    while (queue.length) {
      const item = queue.shift();
      if (!item) break;
      logEvent(analytics, item.name, item.params);
    }
  } finally {
    flushing = false;
    if (queue.length) void flush();
  }
}

export function trackEvent(name: string, params?: EventParams) {
  const safeParams = params
    ? Object.fromEntries(
        Object.entries(params)
          .slice(0, 25)
          .map(([key, value]) => [eventName(key), typeof value === "number" ? value : eventValue(value)]),
      )
    : undefined;
  const queued = { name: eventName(name), params: safeParams };
  const key = `${queued.name}:${JSON.stringify(queued.params ?? {})}`;
  const now = Date.now();
  if (key === lastEventKey && now - lastEventAt < 800) return;
  lastEventKey = key;
  lastEventAt = now;
  queue.push(queued);
  void flush();
}

function trackClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (target.closest("input, textarea, select, option, nextjs-portal")) return;
  const element = target.closest<HTMLElement>("a, button, [data-analytics-event]");
  if (!element || element.closest("nextjs-portal")) return;

  const params: EventParams = { ...currentPage() };
  const text = element.innerText || element.getAttribute("aria-label") || "";
  if (text.trim()) params.click_text = text;
  if (element instanceof HTMLAnchorElement && element.href) {
    const url = safeUrl(element.href);
    if (url) params.click_url = url;
  }
  for (const attribute of element.attributes) {
    if (!attribute.name.startsWith("data-analytics-") || attribute.name === "data-analytics-event") continue;
    params[attribute.name.slice("data-analytics-".length)] = attribute.value;
  }
  trackEvent(element.dataset.analyticsEvent || "click", params);
}

function trackScroll() {
  const page = window.location.pathname;
  const seen = trackScroll.seen;
  if (trackScroll.page !== page) {
    trackScroll.page = page;
    seen.clear();
  }
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return;
  const percent = Math.round((window.scrollY / max) * 100);
  for (const mark of [25, 50, 75, 100]) {
    if (percent < mark || seen.has(mark)) continue;
    seen.add(mark);
    trackEvent("scroll", { ...currentPage(), percent: mark });
  }
}

trackScroll.seen = new Set<number>();
trackScroll.page = "";

function AnalyticsListener() {
  const pathname = usePathname();
  const search = useSearchParams().toString();

  useEffect(() => {
    let sent = false;
    const pagePath = search ? `${pathname}?${search}` : pathname;
    const send = () => {
      if (sent) return;
      sent = true;
      const title = document.title.replace(/\s*\|\s*Chevvanthi\s*$/, "").trim();
      trackEvent("page_view", {
        page_name: pageName(pathname, document.title),
        page_title: title,
        page_path: pagePath,
        page_location: window.location.href.split("#")[0],
      });
    };
    const titleElement = document.querySelector("title");
    const observer = titleElement
      ? new MutationObserver(() => {
          observer?.disconnect();
          send();
        })
      : null;
    observer?.observe(titleElement as Node, { childList: true, characterData: true, subtree: true });
    const timeout = window.setTimeout(send, 300);
    return () => {
      sent = true;
      observer?.disconnect();
      window.clearTimeout(timeout);
    };
  }, [pathname, search]);

  useEffect(() => {
    document.addEventListener("click", trackClick, true);
    window.addEventListener("scroll", trackScroll, { passive: true });
    return () => {
      document.removeEventListener("click", trackClick, true);
      window.removeEventListener("scroll", trackScroll);
    };
  }, []);

  return null;
}

export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsListener />
    </Suspense>
  );
}
