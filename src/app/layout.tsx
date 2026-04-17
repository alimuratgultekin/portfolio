import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Primary font for body text and headings
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Monospace font for code elements and technical details
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ali Murat Gültekin | Cybersecurity Researcher & ML Engineer",
  description:
    "Computer Science student at Sabancı University specializing in cybersecurity, machine learning, and computer vision. Explore my projects, research, and experience.",
  keywords: [
    "cybersecurity",
    "machine learning",
    "computer vision",
    "portfolio",
    "Ali Murat Gültekin",
    "Sabancı University",
  ],
  authors: [{ name: "Ali Murat Gültekin" }],
  openGraph: {
    title: "Ali Murat Gültekin | Cybersecurity Researcher & ML Engineer",
    description:
      "Computer Science student specializing in cybersecurity, machine learning, and computer vision.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Murat Gültekin | Cybersecurity Researcher & ML Engineer",
    description:
      "Computer Science student specializing in cybersecurity, machine learning, and computer vision.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // "dark" class on <html> enables dark mode; we default to dark
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
