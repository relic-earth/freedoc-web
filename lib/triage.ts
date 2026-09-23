export type Level = 'home' | 'doctor' | 'urgent' | 'er';
export type Who = 'me' | 'kid' | 'parent' | 'someone';

export const LEVELS: Record<
  Level,
  { emoji: string; label: string; short: string; color: string; ink: string; bg: string; blurb: string }
> = {
  home: {
    emoji: '🟢',
    label: 'Treat at home',
    short: 'Home care',
    color: '#16a34a',
    ink: '#ffffff',
    bg: '#dcfce7',
    blurb: 'This sounds safe to manage at home for now. Keep an eye on it.',
  },
  doctor: {
    emoji: '🟡',
    label: 'See a doctor in 1–2 days',
    short: 'See a doctor soon',
    color: '#ca8a04',
    ink: '#1a1203',
    bg: '#fef9c3',
    blurb: 'This is worth a doctor visit soon, but it does not look like an emergency.',
  },
  urgent: {
    emoji: '🟠',
    label: 'Urgent care today',
    short: 'Urgent care today',
    color: '#ea580c',
    ink: '#ffffff',
    bg: '#ffedd5',
    blurb: 'This should be checked today at urgent care or by video with a doctor.',
  },
  er: {
    emoji: '🔴',
    label: 'Go to the ER now',
    short: 'ER now',
    color: '#dc2626',
    ink: '#ffffff',
    bg: '#fee2e2',
    blurb: 'Go to the emergency room now, or call 911 if you cannot get there safely.',
  },
};

export const WHO: Record<Who, { label: string; emoji: string; phrase: string }> = {
  me: { label: 'Me', emoji: '🙋', phrase: 'the person asking (an adult)' },
  kid: { label: 'My kid', emoji: '🧒', phrase: 'the user’s child' },
  parent: { label: 'My parent', emoji: '👵', phrase: 'the user’s older parent' },
  someone: { label: 'Someone else', emoji: '🧑‍🤝‍🧑', phrase: 'another person the user is helping' },
};

export interface Question {
  id: string;
  text: string;
  options: string[];
  multi?: boolean;
}

export interface Verdict {
  level: Level;
  headline: string;
  summary: string;
  doNow: string[];
  watchFor: string[];
  possibleCauses: { name: string; note: string }[];
  askDoctor: string[];
  topic: string;
}

export function isLevel(x: unknown): x is Level {
  return x === 'home' || x === 'doctor' || x === 'urgent' || x === 'er';
}

export function medlineUrl(topic: string) {
  return `https://vsearch.nlm.nih.gov/vivisimo/cgi-bin/query-meta?v%3Aproject=medlineplus&v%3Asources=medlineplus-bundle&query=${encodeURIComponent(topic)}`;
}
