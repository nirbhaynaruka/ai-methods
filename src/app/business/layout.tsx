// File: src/app/prompts/layout.tsx
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "AI Methods - Premium AI Prompts for Analysts, Creators, Builders",
  description: "Unlock advanced AI workflows with expertly crafted prompts for SQL debugging, resume optimization, dashboard explanations, and more.",
};

export default function PromptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}