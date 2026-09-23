import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Triage from '@/components/Triage';
import { SYMPTOMS, getSymptom } from '@/lib/symptoms';
import { medlineUrl } from '@/lib/triage';

type P = Promise<{ slug: string }>;

export function generateStaticParams() {
  return SYMPTOMS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: P }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSymptom(slug);
  if (!s) return {};
  return {
    title: `${s.question} | FreeDoc`,
    description: `${s.intro} Get a free, clear answer in 60 seconds.`,
    alternates: { canonical: `https://freedoc.live/symptoms/${s.slug}` },
    openGraph: { title: s.question, description: s.intro, images: [{ url: '/api/og', width: 1200, height: 630 }] },
  };
}

export default async function SymptomPage({ params }: { params: P }) {
  const { slug } = await params;
  const s = getSymptom(slug);
  if (!s) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `When should I go to the ER for ${s.name.toLowerCase()}?`, acceptedAnswer: { '@type': 'Answer', text: `Go to the ER or call 911 for: ${s.er.join('; ')}.` } },
      { '@type': 'Question', name: `When is ${s.name.toLowerCase()} an urgent care visit?`, acceptedAnswer: { '@type': 'Answer', text: `Get care today for: ${s.urgent.join('; ')}.` } },
      { '@type': 'Question', name: `How can I treat ${s.name.toLowerCase()} at home?`, acceptedAnswer: { '@type': 'Answer', text: s.home.join(' ') } },
    ],
  };
  const related = SYMPTOMS.filter((x) => x.slug !== s.slug && x.who === s.who).slice(0, 4);

  return (
    <div className="wrap">
      <div className="article">
        <p className="crumbs">
          <Link href="/">FreeDoc</Link> › <Link href="/symptoms">Symptoms</Link> › {s.name}
        </p>
        <h1>{s.question}</h1>
        <p className="intro">{s.intro}</p>

        <Triage initialText={s.starter} initialWho={s.who} />

        <div className="box er">
          <h2>🔴 Go to the ER or call 911 if there is</h2>
          <ul className="list">{s.er.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="box urgent">
          <h2>🟠 Get care today if there is</h2>
          <ul className="list">{s.urgent.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="box home">
          <h2>🟢 What helps at home</h2>
          <ul className="list">{s.home.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>

        <p className="src">
          Learn more from MedlinePlus, the U.S. National Library of Medicine:{' '}
          <a href={medlineUrl(s.name)} target="_blank" rel="noopener">
            {s.name} →
          </a>
          . This guide is general information, not medical advice.
        </p>

        {related.length > 0 && (
          <>
            <h2>Related questions</h2>
            <div className="sym-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {related.map((r) => (
                <Link key={r.slug} href={`/symptoms/${r.slug}`} className="sym-link">
                  {r.name}
                  <span>{r.question}</span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
