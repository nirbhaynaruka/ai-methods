// // File: src/app/sitemap.ts
// import { MetadataRoute } from 'next'
// import { clientOnboardingMap } from '@/lib/onboardingKeys'; // Import client data

// export const dynamic = 'force-static'; // ADD THIS LINE

// export default function sitemap(): MetadataRoute.Sitemap {
//   return [
//     {
//       url: 'https://aimethods.co',
//       lastModified: new Date(),
//       changeFrequency: 'weekly',
//       priority: 1,
//     },
//     {
//       url: 'https://aimethods.co/prompts',
//       lastModified: new Date(),
//       changeFrequency: 'daily',
//       priority: 0.9,
//     },
//     {
//       url: 'https://aimethods.co/waitlist',
//       lastModified: new Date(),
//       changeFrequency: 'monthly',
//       priority: 0.8,
//     },
//     {
//       url: 'https://aimethods.co/products',
//       lastModified: new Date(),
//       changeFrequency: 'monthly',
//       priority: 0.7,
//     },
//     {
//       url: 'https://aimethods.co/contact',
//       lastModified: new Date(),
//       changeFrequency: 'monthly',
//       priority: 0.7,
//     },
//     {
//       url: 'https://aimethods.co/about',
//       lastModified: new Date(),
//       changeFrequency: 'monthly',
//       priority: 0.7,
//     },
//     {
//       url: 'https://aimethods.co/privacy',
//       lastModified: new Date(),
//       changeFrequency: 'monthly',
//       priority: 0.5,
//     },
//     {
//       url: 'https://aimethods.co/terms',
//       lastModified: new Date(),
//       changeFrequency: 'monthly',
//       priority: 0.5,
//     },
//     {
//       url: 'https://aimethods.co/comingsoon',
//       lastModified: new Date(),
//       changeFrequency: 'monthly',
//       priority: 0.3,
//     },
//     // Add other pages as they are built out
//   ]
// }

// File: src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { clientOnboardingMap } from '@/lib/onboardingKeys'; // Import client data

export const dynamic = 'force-static';

// Define the base URL dynamically or use a constant
const BASE_URL = 'https://aimethods.co';

export default function sitemap(): MetadataRoute.Sitemap {
  // Generate list of client onboarding paths to EXCLUDE from sitemap
  // The layout file already adds 'noindex, nofollow' but excluding them from
  // the sitemap completely is an added layer of protection.
  const onboardingUrls: MetadataRoute.Sitemap = Object.keys(clientOnboardingMap).map(slug => ({
    url: `${BASE_URL}/onboarding/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'never', // These are private and should not be crawled
    priority: 0.1, // Low priority for safety
  }));

  const publicUrls: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/prompts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/waitlist`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/humanize`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/comingsoon`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Combine public URLs with the low-priority/excluded onboarding URLs
  return [...publicUrls, ...onboardingUrls];
}
