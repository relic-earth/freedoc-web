import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/api/triage', '/api/lead'] }], sitemap: 'https://freedoc.live/sitemap.xml' };
}
