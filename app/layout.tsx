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
    default: "Chev — International Career Consultancy",
    template: "%s | Chev",
  },
  description:
    "Strategic career guidance for ambitious professionals ready to find work that feels bigger, clearer, and entirely theirs.",
  keywords: [
    "career consultant",
    "international career coach",
    "career strategy",
    "job search coaching",
    "interview coaching",
    "career transition",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Chev",
    title: "Chev — International Career Consultancy",
    description:
      "A career that takes you further. Strategic guidance for ambitious professionals ready to make their next move.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chev — International Career Consultancy",
    description:
      "A career that takes you further. Strategic guidance for ambitious professionals ready to make their next move.",
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
