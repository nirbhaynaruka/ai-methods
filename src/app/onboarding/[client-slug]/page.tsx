// File: src/app/onboarding/[client-slug]/page.tsx
// This file is a Server Component and must NOT contain 'use client' or client hooks.

import { getClientData, ClientData } from '@/lib/onboardingKeys';
import Link from 'next/link';
// Assuming '@/components/ClientOnboarding' is the correct path for your client component
import ClientOnboardingContent from '@/components/ClientOnboarding';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

// === 1. SERVER COMPONENT LOGIC (for Static Build) ===

// Export required for Next.js Static Export (`output: 'export'`)
export async function generateStaticParams() {
  // Generates paths like /onboarding/bityog and /onboarding/medcorp
  // Since data is now fetched from Firebase, we need to define known slugs statically
  const knownSlugs = ['bityog', 'medcorp']; // Add more as needed
  return knownSlugs.map((slug) => ({
    'client-slug': slug,
  }));
}

// The default export must be an async function (Server Component).
// FIX: Define props inline and simplified.
export default async function ClientOnboardingPage({ params }: {
  params: Promise<{
    'client-slug': string;
  }>;
}) {
  const resolvedParams = await params;
  const clientSlug = resolvedParams['client-slug'];
  const clientData = await getClientData(clientSlug);

  if (!clientData) {
    return (
      <>
        <Header />
        <main className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center text-center bg-[#EFEFEF] py-20 px-6">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Error 404</h1>
          <p className="text-lg text-[#666666] mb-8">
            The requested client onboarding page does not exist or the link is invalid.
          </p>
          <Link href="/" className="cta-button cta-button-secondary">Back to AI Methods Home</Link>
        </main>
        <Footer />
      </>
    );
  }

  // Pass the validated, server-fetched data to the separate Client Component.
  return <ClientOnboardingContent clientData={clientData} />;
}
