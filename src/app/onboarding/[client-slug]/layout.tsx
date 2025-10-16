// File: src/app/onboarding/[client-slug]/layout.tsx
import { Metadata, ResolvingMetadata } from 'next';
import React from 'react';
import { getClientData } from '@/lib/onboardingKeys';

// Define the core parameter type (used safely by generateMetadata)
type ClientParams = { 'client-slug': string };

// Dynamic Metadata function
// This function signature is strictly correct for metadata generation.
export async function generateMetadata(
  { params }: { params: ClientParams },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const clientSlug = params['client-slug']; 
  const clientData = getClientData(clientSlug);

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
// We define the type for the default layout export using a simplified structure 
// to bypass the internal compiler's faulty comparison logic that links this 
// to the complicated LayoutProps generic, which causes the build error.
export default function ClientOnboardingLayout({
  children,
  params, // Must be listed here, but removing its custom type definition
}: { children: React.ReactNode, params: { 'client-slug': string } }) {
  // params is included in the type but unused here, as per routing requirement.
  return <>{children}</>;
}
