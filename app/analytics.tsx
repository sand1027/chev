"use client";

import type { Analytics as FirebaseAnalytics } from "firebase/analytics";
import Script from "next/script";
import { useEffect } from "react";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
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

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  useEffect(() => {
    let firebaseAnalytics: FirebaseAnalytics | undefined;
    let mounted = true;

    if (hasFirebaseConfig) {
      void Promise.all([import("firebase/app"), import("firebase/analytics")]).then(
        async ([appModule, analyticsModule]) => {
          if (!mounted || !(await analyticsModule.isSupported())) return;
          const app = appModule.getApps().length
            ? appModule.getApp()
            : appModule.initializeApp(firebaseConfig);
          firebaseAnalytics = analyticsModule.getAnalytics(app);
          analyticsModule.logEvent(firebaseAnalytics, "page_view");
        },
      );
    }

    const handleTrackedClick = (event: MouseEvent) => {
      const element = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-analytics-event]");
      const eventName = element?.dataset.analyticsEvent;
      if (!eventName) return;

      window.gtag?.("event", eventName);
      const activeFirebaseAnalytics = firebaseAnalytics;
      if (activeFirebaseAnalytics) {
        void import("firebase/analytics").then(({ logEvent }) =>
          logEvent(activeFirebaseAnalytics, eventName),
        );
      }
    };

    document.addEventListener("click", handleTrackedClick);
    return () => {
      mounted = false;
      document.removeEventListener("click", handleTrackedClick);
    };
  }, []);

  if (!gaMeasurementId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}');`}
      </Script>
    </>
  );
}
