import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PoolPoint – Smart Scoring App for Snooker Players",
  description:
    "PoolPoint is a smart scoring companion app for snooker and pool players. Track scores, auto-calculate table costs, and manage player stats in real-time.",
  keywords: [
    "snooker app",
    "pool score tracker",
    "snooker scoreboard",
    "billiards tracking app",
    "table cost calculator",
    "snooker ranking app",
    "snooker team match",
    "billiards history tracker",
  ],
  authors: [{ name: "H-R-Wells2" }],
  creator: "H-R-Wells2",
  metadataBase: new URL("https://poolpoint.vercel.app"),
  openGraph: {
    title: "PoolPoint – Real-Time Snooker Score & Cost Tracker",
    description:
      "Play smarter with PoolPoint. Track snooker scores, auto-rank players, and split table costs with ease.",
    url: "https://poolpoint.vercel.app",
    siteName: "PoolPoint",
    images: [
      {
        url: "https://poolpoint.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "PoolPoint Snooker Score Tracker",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
