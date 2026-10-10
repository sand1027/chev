import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "./analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chev.consulting";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chevvanthi MN — Data Architecture & IT Mentoring",
    template: "%s | Chevvanthi",
  },
  description:
    "One-to-one IT mentoring and Microsoft Fabric, Azure, and data-platform consulting from Chevvanthi MN in Bangalore.",
  keywords: [
    "Chevvanthi MN",
    "data architect mentor",
    "Microsoft Fabric consulting",
    "Azure data platform",
    "interview preparation",
    "solution architect mentoring",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Chevvanthi",
    title: "Chevvanthi MN — Data Architecture & IT Mentoring",
    description:
      "Interview mentoring for freshers and experienced IT professionals, plus data-platform consulting for companies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chevvanthi MN — Data Architecture & IT Mentoring",
    description:
      "Interview mentoring for freshers and experienced IT professionals, plus data-platform consulting for companies.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
