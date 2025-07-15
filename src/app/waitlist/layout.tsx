// File: src/app/waitlist/layout.tsx
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Join the AI Methods Waitlist - Early Access to Premium AI Tools",
  description: "Sign up for the AI Methods waitlist to get exclusive updates, early access, and provide input on pricing for our premium AI prompts and solutions.",
};

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}