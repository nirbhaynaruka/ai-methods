// File: src/app/onboarding/[client-slug]/page.tsx
// This file is a Server Component and must NOT contain 'use client' or client hooks.

import { getClientData } from '@/lib/firebaseAdmin'

import Link from 'next/link';
// Assuming '@/components/ClientOnboarding' is the correct path for your client component
import ClientOnboardingContent from '@/components/ClientOnboarding'; 
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

// === 1. SERVER COMPONENT LOGIC (for Static Build) ===

// Export required for Next.js Static Export (`output: 'export'`)
// Note: Since we're now using Firestore, we need to define static params manually
// or fetch them at build time. For now, we'll hardcode the known slugs.
export async function generateStaticParams() {
  // Generates paths like /onboarding/bityog and /onboarding/medcorp
  // TODO: Fetch from Firestore if needed, but for static export, keep minimal
  return [
    { 'client-slug': 'bityog' },
    { 'client-slug': 'medcorp' },
  ];
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
