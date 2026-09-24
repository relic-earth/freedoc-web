'use client';
import { track } from '@vercel/analytics';
import type { Offer } from '@/lib/insurance';

export default function OfferLink({ o }: { o: Offer }) {
  return (
    <a className="offer" href={o.url} target="_blank" rel="sponsored noopener" onClick={() => track('offer_click', { id: o.id })}>
      <span className="offer-tag">{o.tag}</span>
      <span className="offer-what">{o.what}</span>
      <span className="offer-name">{o.name}</span>
      <span className="offer-line">{o.line}</span>
      <span className="offer-cta">See plans →</span>
    </a>
  );
}
