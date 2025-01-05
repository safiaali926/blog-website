import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

import { dataset, projectId } from '../env';

// Validate required environment variables
if (!projectId || !dataset) {
  throw new Error('Missing required environment variables: projectId or dataset.');
}

// Create the Sanity image URL builder
const imageBuilder = createImageUrlBuilder({
  projectId,
  dataset,
});

const placeholderImage = '/placeholder.png'; // Default image for invalid sources

// Function to generate a URL for the given image source
export const urlForImage = (source: Image | null | undefined): string => {
  if (!source) {
    console.warn('Invalid image source provided. Using placeholder image.');
    return placeholderImage;
  }
  return imageBuilder.image(source).auto('format').fit('max').url();
};
