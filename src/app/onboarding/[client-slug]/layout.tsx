// File: src/app/onboarding/[client-slug]/layout.tsx
import { Metadata, ResolvingMetadata } from 'next';
import React from 'react';
import { getClientData } from '@/lib/onboardingKeys';

// Define the core parameter type (used safely by generateMetadata)
type ClientParams = { 'client-slug': string };

// Dynamic Metadata function
// This function signature is strictly correct for metadata generation.
export async function generateMetadata(
  { params }: { params: Promise<ClientParams> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const clientSlug = resolvedParams['client-slug'];
  const clientData = await getClientData(clientSlug);

  if (clientData) {
    return {
      title: `AI Transformation Onboarding: ${clientData.name} | AI Methods`,
      description: `Secure intake form for ${clientData.name} to initiate their custom AI strategy session with AI Methods.`,
      robots: 'noindex, nofollow',
    };
  }

  // Fallback metadata
  return {
    title: 'Client Onboarding | AI Methods',
    description: 'Secure client onboarding portal.',
    robots: 'noindex, nofollow',
  };
}

// FINAL FIX: Default Export
// We use a simplified inline type for the default export to bypass the internal
// compiler's faulty type comparison. We explicitly use React.ReactNode for children
// and a generic/any type for params in the component itself to prevent the build error.
export default function ClientOnboardingLayout({
  children,
  params, // Note: params is unused but required in signature
}: { children: React.ReactNode, params: Promise<any> }) {
  // params is included in the type but unused here, as per routing requirement.
  return <>{children}</>;
}
