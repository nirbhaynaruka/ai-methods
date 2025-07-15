// File: src/app/sitemap.ts
import { MetadataRoute } from 'next'

export const dynamic = 'force-static'; // ADD THIS LINE

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://aimethods.co',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://aimethods.co/prompts',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://aimethods.co/waitlist',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://aimethods.co/products',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://aimethods.co/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://aimethods.co/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://aimethods.co/privacy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://aimethods.co/terms',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://aimethods.co/comingsoon',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    // Add other pages as they are built out
  ]
}