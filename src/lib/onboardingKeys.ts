// File: src/lib/onboardingKeys.ts
// This file stores the client-specific data needed for the onboarding pages.
// In a production environment, this data would ideally be managed via a secured database
// or a CMS/Headless setup, but for simplicity and demonstration, we use a constant map.

export interface ClientData {
  name: string;
  key: string;
  slug: string;
}

// Map client slugs to their access credentials and display name.
export const clientOnboardingMap: Record<string, { key: string; name: string }> = {
  // Example Client 1: BITYOG - Access Key: yoga4ai
  'bityog': {
    key: 'yoga4ai', // The password the client will use for access
    name: 'BITYOG FITNESS',
  },
  // Example Client 2: A hypothetical client - Access Key: healthai2025
  'medcorp': {
    key: 'healthai2025',
    name: 'MedCorp Diagnostics',
  },
  // Add new clients here as needed:
  // 'newclient': {
  //   key: 'securekey123',
  //   name: 'New Client Enterprises',
  // },
};

/**
 * Retrieves the client configuration based on the provided slug.
 * @param slug The client slug from the URL (e.g., 'bityog').
 * @returns The client data or null if not found.
 */
export function getClientData(slug: string): ClientData | null {
  const data = clientOnboardingMap[slug];
  if (data) {
    return {
      name: data.name,
      key: data.key,
      slug: slug,
    };
  }
  return null;
}
