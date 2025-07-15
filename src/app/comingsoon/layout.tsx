// File: src/app/business/layout.tsx
import type { Metadata } from 'next';
import React from 'react';

// Metadata export for SEO - This is a Server Component.
export const metadata: Metadata = {
  title: "AI Methods - AI Solutions for Business",
  description: "Explore AI Methods' comprehensive AI solutions for businesses, including Premium Prompt Library, Custom AI Integrations, and expert AI Training & Consulting services.",
};

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
