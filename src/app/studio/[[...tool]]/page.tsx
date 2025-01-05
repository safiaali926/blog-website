/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path are handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * Learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

// Forces this route to be statically generated
export const dynamic = 'force-static';

// Metadata and viewport for Sanity Studio
export { metadata, viewport } from 'next-sanity/studio';

// Studio Page Component
export default function StudioPage() {
  return <NextStudio config={config} />;
}
