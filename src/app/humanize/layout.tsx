// File: src/app/prompts/layout.tsx
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Humanize Text – AI Methods",
  description: "Rewrite your text for clarity and readability using AI Methods.",
};

export default function PromptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
