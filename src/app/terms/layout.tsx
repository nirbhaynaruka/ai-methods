import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Terms of Service - AI Methods",
  description: "Legal terms and conditions for using AI Methods services. Read our terms of service to understand your rights and obligations.",
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
