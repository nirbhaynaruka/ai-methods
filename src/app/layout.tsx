// File: src/app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AiMethods – Empowering AI Workflows",
  description:
    "Premium AI prompts, custom solutions, and automation toolkits for modern teams.",
  icons: {
    icon: [
      {
        url: "/assets/images/favicon_32_transparent.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/assets/images/favicon_16_transparent.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
  },
};

// ✅ Proper Next.js 15+ themeColor usage
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFFFFF] text-[#0A0A0A]`}
      >
        {children}
      </body>
    </html>
  );
}
