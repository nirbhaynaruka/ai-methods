// File: src/app/contact/layout.tsx
import type { Metadata } from 'next';
import React from 'react';

// Metadata export for SEO - This is a Server Component.
export const metadata: Metadata = {
  title: "AI Methods - Contact Us",
  description: "Get in touch with AI Methods for inquiries, custom AI solutions, partnerships, or support. We're here to help you empower your workflows.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
