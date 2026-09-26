import type { Metadata } from 'next';
import Triage from '@/components/Triage';
import { LEVELS, isLevel } from '@/lib/triage';

type SP = Promise<{ l?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const { l } = await searchParams;
  const level = isLevel(l) ? l : null;
  const title = level ? `FreeDoc suggested: ${LEVELS[level].label}` : 'FreeDoc — Should I go to the ER?';
  const img = `/api/og${level ? `?l=${level}` : ''}`;
  return {
    title,
    description: 'A free AI symptom checker that suggests a next step: home care, a doctor visit, urgent care, or the ER. Not medical advice.',
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
            <p className="kicker">
              Someone shared a FreeDoc suggestion
            </p>
            <h1>
              {LEVELS[level].emoji} {LEVELS[level].label}
            </h1>
            <p className="sub">Not feeling well yourself? Get your own suggested next step in about 60 seconds. It’s free. FreeDoc is AI, not medical advice.</p>
          </>
        ) : (
          <>
            <h1>Should I go to the ER?</h1>
            <p className="sub">Get a suggested next step in about 60 seconds. Free, with no account. FreeDoc is AI, not medical advice.</p>
          </>
        )}
        <Triage />
      </div>
    </section>
  );
}
