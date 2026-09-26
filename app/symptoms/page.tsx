import type { Metadata } from 'next';
import Link from 'next/link';
import { SYMPTOMS } from '@/lib/symptoms';
import { WHO, type Who } from '@/lib/triage';

export const metadata: Metadata = {
  title: 'Symptom guides: when to go to the ER, urgent care, or stay home | FreeDoc',
  description: 'Plain-English guides to common symptoms, with the warning signs that mean ER, urgent care, or home care.',
  alternates: { canonical: 'https://freedoc.live/symptoms' },
};

const GROUPS: { who: Who; title: string }[] = [
  { who: 'me', title: 'For adults' },
  { who: 'kid', title: 'For kids' },
  { who: 'parent', title: 'For older parents' },
  { who: 'someone', title: 'Injuries & first aid' },
];

export default function Symptoms() {
  return (
    <div className="wrap">
      <div className="article" style={{ maxWidth: 1120 }}>
        <h1>Symptom guides</h1>
        <p className="intro">General information about common warning signs for ER, urgent care, or home care. These guides are not medical advice. When in doubt, seek care.</p>
        {GROUPS.map((g) => (
          <div key={g.who}>
            <h2>
              {WHO[g.who].emoji} {g.title}
            </h2>
            <div className="sym-grid">
              {SYMPTOMS.filter((s) => s.who === g.who).map((s) => (
                <Link key={s.slug} href={`/symptoms/${s.slug}`} className="sym-link">
                  {s.name}
                  <span>{s.question}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
