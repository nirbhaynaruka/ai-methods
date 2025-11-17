import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Privacy Policy - AI Methods",
  description: "Privacy policy for AI Methods. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
