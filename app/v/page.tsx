import type { Metadata } from 'next';
import Triage from '@/components/Triage';
import { LEVELS, isLevel } from '@/lib/triage';

type SP = Promise<{ l?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const { l } = await searchParams;
  const level = isLevel(l) ? l : null;
  const title = level ? `FreeDoc says: ${LEVELS[level].label}` : 'FreeDoc — Should I go to the ER?';
  const img = `/api/og${level ? `?l=${level}` : ''}`;
  return {
    title,
    description: 'Free symptom check in 60 seconds. Find out if you should treat it at home, see a doctor, go to urgent care, or go to the ER.',
    openGraph: { title, images: [{ url: img, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, images: [img] },
    robots: { index: false },
  };
}

export default async function SharePage({ searchParams }: { searchParams: SP }) {
  const { l } = await searchParams;
  const level = isLevel(l) ? l : null;
  return (
    <section className="hero">
      <div className="wrap">
        {level ? (
          <>
            <p className="kicker" style={{ fontSize: 18, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#15803d' }}>
              Someone shared their FreeDoc result
            </p>
            <h1>
              {LEVELS[level].emoji} {LEVELS[level].label}
            </h1>
            <p className="sub">Not feeling well yourself? Get your own answer in about 60 seconds. It’s free and private.</p>
          </>
        ) : (
          <>
            <h1>Should I go to the ER?</h1>
            <p className="sub">Get a clear answer in about 60 seconds. Free, private, no account.</p>
          </>
        )}
        <Triage />
      </div>
    </section>
  );
}
