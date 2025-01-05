import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

// Validate required environment variables
if (!projectId || !dataset || !apiVersion) {
  throw new Error(
    'Missing required environment variables: projectId, dataset, or apiVersion.'
  );
}

// Create and export the Sanity client
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN, // Optional: Only if authenticated queries are needed
});
