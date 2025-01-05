import { defineLive } from 'next-sanity';
import { client } from './client';

// Ensure to use a valid API version (e.g., '2023-01-01')
export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    // Specify the correct API version
    apiVersion: '2024-12-28', // Replace with the actual version you're using
  }),
});
