import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pizza-calc.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pizza Dough Calculator",
    template: "%s | Pizza Dough Calculator",
  },
  description:
    "Free, open-source Neapolitan pizza dough calculator. Computes precise ingredient weights using baker's percentages, a two-stage cold-proof fermentation model, and a Q10 yeast curve.",
  keywords: [
    "pizza dough calculator",
    "neapolitan pizza",
    "pizza recipe",
    "baker's percentage",
    "cold proof",
    "pizza fermentation",
    "yeast calculator",
    "pizza dough recipe",
    "hydration calculator",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Pizza Dough Calculator",
    title: "Pizza Dough Calculator",
    description:
      "Precise ingredient weights for Neapolitan pizza — two-stage fermentation, baker's percentages, Q10 yeast model. Free and open-source.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Pizza Dough Calculator",
    description:
      "Precise ingredient weights for Neapolitan pizza — two-stage fermentation, baker's percentages, Q10 yeast model.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Pizza Dough Calculator",
  description:
    "Free Neapolitan pizza dough calculator with two-stage fermentation, baker's percentages, and Q10 yeast model.",
  url: SITE_URL,
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  author: {
    "@type": "Person",
    name: "Tobias Pfeil",
    url: "https://github.com/TobiasPfeil02",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="google-site-verification" content="x9270rPoNyJkz0yjBsUnaC2Ehfei0iOlDT5fesamgIM" />
      </head>
      <body className="min-h-full bg-stone-50 font-sans text-stone-900">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
