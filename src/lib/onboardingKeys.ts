// File: src/lib/onboardingKeys.ts
// This file fetches client-specific data from Firebase Functions for secure onboarding.
// The keys are no longer hardcoded in the repository.

export interface ClientData {
  name: string;
  key: string;
  slug: string;
}

/**
 * Retrieves the client configuration based on the provided slug by calling Firebase Function.
 * @param slug The client slug from the URL (e.g., 'bityog').
 * @returns Promise resolving to the client data or null if not found.
 */
export async function getClientData(slug: string): Promise<ClientData | null> {
  try {
    // For local development, use localhost; for production, use the deployed URL
    const baseUrl = process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000/aimethods-e8521/us-central1'
      : 'https://us-central1-aimethods-e8521.cloudfunctions.net';

    const response = await fetch(`${baseUrl}/getClientOnboardingData?slug=${slug}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching client data:', error);
    return null;
  }
}
