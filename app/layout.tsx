import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "S3oDy | مصمم ومطور تطبيقات ذكية",
  description:
    "بورتفوليو S3oDy — مصمم ومطور مواقع وتطبيقات أندرويد بتقنيات الذكاء الاصطناعي",
  keywords: ["مطور ويب", "Next.js", "React", "Android", "AI", "S3oDy"],
  authors: [{ name: "S3oDy" }],
  openGraph: {
    title: "S3oDy | مصمم ومطور تطبيقات ذكية",
    description: "أحول الأفكار إلى تجارب رقمية استثنائية",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-[var(--font-cairo)] antialiased">{children}</body>
    </html>
  );
}