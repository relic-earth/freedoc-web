import type { Level } from './triage';

// Referral slots shown at the verdict. When an affiliate/referral deal is signed,
// swap `url` for the tracked partner link — every click is already counted
// in Vercel Analytics as the `care_click` event.
export interface CareLink {
  id: string;
  title: string;
  sub: string;
  url: string;
  kind: 'call' | 'map' | 'partner';
}

const maps = (q: string) => `https://www.google.com/maps/search/${encodeURIComponent(q)}`;

export const CARE: Record<Level, CareLink[]> = {
  er: [
    { id: 'call-911', title: 'Call 911', sub: 'If you cannot get to the ER safely', url: 'tel:911', kind: 'call' },
    { id: 'er-near-me', title: 'Nearest emergency room', sub: 'Open directions in Maps', url: maps('emergency room near me'), kind: 'map' },
  ],
  urgent: [
    { id: 'video-visit', title: 'See a doctor by video now', sub: 'Board-certified clinicians, most visits in minutes', url: 'https://sesamecare.com/', kind: 'partner' },
    { id: 'urgent-near-me', title: 'Urgent care near me', sub: 'Open now, with directions', url: maps('urgent care open now near me'), kind: 'map' },
  ],
  doctor: [
    { id: 'book-visit', title: 'Book a doctor visit', sub: 'In person or video, often same week', url: 'https://www.zocdoc.com/', kind: 'partner' },
    { id: 'video-visit', title: 'Video visit instead', sub: 'Skip the waiting room', url: 'https://sesamecare.com/', kind: 'partner' },
  ],
  home: [
    { id: 'rx-savings', title: 'Save on medicine', sub: 'Free pharmacy discount card', url: 'https://www.goodrx.com/', kind: 'partner' },
    { id: 'pharmacy-near-me', title: 'Pharmacy near me', sub: 'Open now, with directions', url: maps('pharmacy open now near me'), kind: 'map' },
  ],
};

// Topic sponsorships: sold by section, never targeted at individual users.
export interface Sponsor {
  topic: string;
  name: string | null; // null = unsold; shows the house ad
  line: string;
  url: string;
}

export const SPONSORS: Record<'kid' | 'parent' | 'me' | 'someone', Sponsor> = {
  kid: { topic: "Kids' health", name: null, line: "Reach parents at the exact moment they need help. Sponsor Kids' health.", url: '/advertise' },
  parent: { topic: 'Caring for parents', name: null, line: 'Reach adult children caring for aging parents. Sponsor this section.', url: '/advertise' },
  me: { topic: 'Everyday health', name: null, line: 'Sponsor Everyday health. No personal targeting, ever.', url: '/advertise' },
  someone: { topic: 'Everyday health', name: null, line: 'Sponsor Everyday health. No personal targeting, ever.', url: '/advertise' },
};
