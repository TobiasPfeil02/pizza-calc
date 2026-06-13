import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Neapolitan Pizza Dough Calculator",
  description:
    "Free, open-source calculator for Neapolitan pizza dough. Computes precise ingredient weights with a two-stage fermentation model.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-stone-50 font-sans text-stone-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
