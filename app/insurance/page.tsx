import type { Metadata } from 'next';
import CoverageFinder from '@/components/CoverageFinder';
import OfferLink from '@/components/OfferLink';
import { OFFERS, LINKS } from '@/lib/insurance';

export const metadata: Metadata = {
  title: 'Free health insurance — see what you qualify for in 30 seconds | FreeDoc',
  description: 'Answer three questions to see if you qualify for free Medicaid, free CHIP for kids, or a discounted marketplace plan, with one-tap links to apply. Plus cheap plans that can start tomorrow.',
  alternates: { canonical: '/insurance' },
  openGraph: { title: 'Do you qualify for free health insurance?', description: 'Three questions, 30 seconds, one-tap links to apply. Free, private, no account.', url: 'https://freedoc.live/insurance' },
};

const FAQ = [
  { q: 'Is Medicaid really free?', a: 'For most people, yes. Medicaid usually has no monthly premium, and visits and prescriptions cost little or nothing. Some states charge small copays or premiums at higher incomes.' },
  { q: 'Can I apply outside Open Enrollment?', a: 'Yes for Medicaid and CHIP, which accept applications every day of the year. Marketplace plans open November 1 to January 15, or within 60 days of a life change such as losing a job’s coverage, moving, marrying, or having a baby.' },
  { q: 'I lost my job. What should I do?', a: 'Apply right away. Losing job-based coverage lets you enroll in a marketplace plan within 60 days, and if your income dropped, you may now qualify for Medicaid.' },
  { q: 'What is a short-term plan?', a: 'A short-term plan is cheaper coverage that can start fast, but it is not ACA coverage. It can refuse pre-existing conditions and cap what it pays. It works best as a bridge while you wait for Medicaid or a marketplace plan to start.' },
  { q: 'I have no insurance and need care today.', a: 'Community health centers see everyone and charge on a sliding scale by income. Nonprofit hospitals must offer financial assistance, so ask for a charity-care application before you pay a bill. If it is an emergency, call 911; ERs must treat you regardless of insurance.' },
];

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function Insurance() {
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <section className="hero ins-hero">
        <p className="kicker">Free health insurance</p>
        <h1>Do you qualify for free health insurance?</h1>
        <p className="sub">Three questions, about 30 seconds. We show exactly what you qualify for and take you straight to the right application.</p>
        <div className="levels-strip">
          <span className="lv-pill" style={{ ['--lv' as string]: '#15803d' }}>Medicaid · often $0</span>
          <span className="lv-pill" style={{ ['--lv' as string]: '#0b5cad' }}>CHIP for kids</span>
          <span className="lv-pill" style={{ ['--lv' as string]: '#b45309' }}>Marketplace discounts</span>
        </div>
      </section>

      <CoverageFinder />

      <section className="section" id="instant">
        <p className="kicker">Need coverage today?</p>
        <h2>Cheap plans that start fast</h2>
        <p className="lede">If you earn too much for free coverage or need something while your application is processed, these plans can start within days.</p>
        <div className="offer-grid">
          {OFFERS.map((o) => (
            <OfferLink key={o.id} o={o} />
          ))}
        </div>
        <p className="disclose">FreeDoc may earn a referral fee when you buy through these links, at no cost to you. It never changes what we show you. Short-term plans are not ACA coverage: they can exclude pre-existing conditions and limit benefits, so check free options above first.</p>
      </section>

      <section className="section">
        <p className="kicker">No insurance yet</p>
        <h2>Free or low-cost care right now</h2>
        <div className="steps">
          <a className="stepbox ins-link" href={LINKS.healthCenter} target="_blank" rel="noopener">
            <p className="n">01</p>
            <h3>Community health centers</h3>
            <p>Doctors, dentists, and medicine on a sliding scale by income, often $0 to $40 a visit. Insurance is not required.</p>
          </a>
          <a className="stepbox ins-link" href={LINKS.hillBurton} target="_blank" rel="noopener">
            <p className="n">02</p>
            <h3>Free hospital care</h3>
            <p>Nonprofit hospitals must offer financial assistance, and Hill-Burton facilities provide free or reduced-cost care. Ask for it before you pay.</p>
          </a>
          <a className="stepbox ins-link" href="/">
            <p className="n">03</p>
            <h3>Free symptom check</h3>
            <p>Not sure you need a doctor? FreeDoc tells you home, doctor, urgent care, or ER in about 60 seconds, so you only pay for care you need.</p>
          </a>
        </div>
      </section>

      <section className="section">
        <p className="kicker">Questions</p>
        <h2>Straight answers</h2>
        <div className="ins-faq">
          {FAQ.map((f) => (
            <details key={f.q} className="card">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <p className="src">
          Income limits use the 2026 federal poverty guidelines. Medicaid rules differ by state, and the final decision comes from your state or marketplace. FreeDoc is not a government agency or an insurance company, and applying through the official links above is always free.
        </p>
      </section>
    </div>
  );
}
