// File: src/app/onboarding/[client-slug]/page.tsx
// This file is a Server Component and must NOT contain 'use client' or client hooks.

import { getClientData, getAllClientSlugs, ClientData } from '@/lib/onboardingKeys';
import Link from 'next/link';
// Assuming '@/components/ClientOnboarding' is the correct path for your client component
import ClientOnboardingContent from '@/components/ClientOnboarding';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

// === 1. SERVER COMPONENT LOGIC (for Static Build) ===

// Now that we removed static export, we can fetch from Firestore dynamically
export async function generateStaticParams() {
  // Fetch all client slugs from Firestore for static generation
  try {
    const baseUrl = process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:5001/aimethods-e8521/us-central1'
      : 'https://us-central1-aimethods-e8521.cloudfunctions.net';

    const response = await fetch(`${baseUrl}/getAllClientSlugs`);
    if (response.ok) {
      const slugs = await response.json();
      return slugs.map((slug: string) => ({
        'client-slug': slug,
      }));
    }
  } catch (error) {
    console.error('Error fetching client slugs for static params:', error);
  }

  // Fallback to empty array if Firestore fetch fails
  return [];
}

// Helper function to generate a new client slug and key (moved to separate file to avoid Next.js export issues)
function generateNewClient(clientName: string): { slug: string; key: string } {
  // Generate slug from client name (lowercase, remove special chars, replace spaces with hyphens)
  const slug = clientName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();

  // Generate a random key (8 characters, alphanumeric)
  const key = Math.random().toString(36).substring(2, 10);

  return { slug, key };
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
