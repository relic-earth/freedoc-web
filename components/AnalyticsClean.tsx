'use client';
import { Analytics } from '@vercel/analytics/next';

// Page views are sent without query strings or hashes, so a shared /v?l=... link never
// reports a care level. Custom events are always bare names with no properties.
export default function AnalyticsClean() {
  return (
    <Analytics
      beforeSend={(event) => {
        try {
          const u = new URL(event.url);
          return { ...event, url: u.origin + u.pathname };
        } catch {
          return event;
        }
      }}
    />
  );
}
