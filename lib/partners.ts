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
    { id: 'video-visit', title: 'See a doctor by video now', sub: 'Third-party telehealth marketplace', url: 'https://sesamecare.com/', kind: 'partner' },
    { id: 'urgent-near-me', title: 'Urgent care near me', sub: 'Search in Google Maps', url: maps('urgent care open now near me'), kind: 'map' },
  ],
  doctor: [
    { id: 'book-visit', title: 'Book a doctor visit', sub: 'Third-party booking service', url: 'https://www.zocdoc.com/', kind: 'partner' },
    { id: 'video-visit', title: 'Video visit instead', sub: 'Third-party telehealth marketplace', url: 'https://sesamecare.com/', kind: 'partner' },
  ],
  home: [
    { id: 'rx-savings', title: 'Save on medicine', sub: 'Third-party pharmacy discount service', url: 'https://www.goodrx.com/', kind: 'partner' },
    { id: 'pharmacy-near-me', title: 'Pharmacy near me', sub: 'Search in Google Maps', url: maps('pharmacy open now near me'), kind: 'map' },
  ],
};

// Page sponsorship: one sponsor per page, shown the same to everyone.
// It is never chosen from symptoms, answers, who the check is for, or the suggested care level.
export interface Sponsor {
  name: string | null; // null = unsold; shows the house ad
  line: string;
  url: string;
}

export const SPONSOR: Sponsor = {
  name: null,
  line: 'Sponsor this page. The same message for every visitor, with no personal or health-based targeting.',
  url: '/advertise',
};
