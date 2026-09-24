import type { MetadataRoute } from 'next';
import { SYMPTOMS } from '@/lib/symptoms';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://freedoc.live';
  return [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/insurance`, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${base}/symptoms`, changeFrequency: 'weekly', priority: 0.9 },
    ...SYMPTOMS.map((s) => ({ url: `${base}/symptoms/${s.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: `${base}/plus`, priority: 0.5 },
    { url: `${base}/privacy`, priority: 0.3 },
    { url: `${base}/health-data`, priority: 0.3 },
    { url: `${base}/terms`, priority: 0.3 },
    { url: `${base}/advertise`, priority: 0.3 },
  ];
}
