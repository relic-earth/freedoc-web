import type { Metadata } from 'next';
import CoverageFinder from '@/components/CoverageFinder';
import OfferLink from '@/components/OfferLink';
import { OFFERS, LINKS } from '@/lib/insurance';

export const metadata: Metadata = {
  title: 'Free health insurance: see what you may qualify for | FreeDoc',
  description: 'Answer three questions for an estimate of whether you may qualify for Medicaid, CHIP, or help paying for a marketplace plan, with links to official applications. Estimates only.',
  alternates: { canonical: '/insurance' },
  openGraph: { title: 'Could you qualify for free health insurance?', description: 'Three questions and links to official applications. Estimates only.', url: '/insurance' },
};

const FAQ = [
  { q: 'Is Medicaid really free?', a: 'Often, yes. Medicaid usually has no monthly premium, and visits and prescriptions often cost little or nothing. Some states charge small copays or premiums.' },
  { q: 'Can I apply outside Open Enrollment?', a: 'Yes for Medicaid and CHIP, which accept applications all year. Marketplace Open Enrollment generally runs November 1 to January 15, and a life change such as losing job-based coverage, moving, marrying, or having a baby may let you enroll outside that window.' },
  { q: 'I lost my job. What should I do?', a: 'Consider applying soon. Losing job-based coverage usually opens a 60-day window to enroll in a marketplace plan, and if your income dropped, you may now qualify for Medicaid.' },
  { q: 'What is a short-term plan?', a: 'A short-term plan is limited coverage that is not ACA-compliant health insurance. It can refuse pre-existing conditions, cap what it pays, and is limited or not sold in some states. Read the terms carefully.' },
  { q: 'I have no insurance and need care today.', a: 'Community health centers offer care on a sliding fee scale by income. Nonprofit hospitals are required to have financial assistance policies, so ask for an application before you pay a bill. If it is an emergency, call 911. Under federal law, hospital ERs must screen and stabilize you regardless of your ability to pay.' },
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
        <h1>Could you qualify for free health insurance?</h1>
        <p className="sub">Three questions, about 30 seconds. We estimate what you may qualify for and link you to the official application. Only your state or the marketplace can decide.</p>
        <div className="levels-strip">
          <span className="lv-pill" style={{ ['--lv' as string]: '#15803d' }}>Medicaid · often $0</span>
          <span className="lv-pill" style={{ ['--lv' as string]: '#0b5cad' }}>CHIP for kids</span>
          <span className="lv-pill" style={{ ['--lv' as string]: '#b45309' }}>Marketplace discounts</span>
        </div>
      </section>

      <CoverageFinder />

      <section className="section" id="instant">
        <p className="kicker">Need coverage today?</p>
        <h2>Other plans from third parties</h2>
        <p className="lede">If free coverage is not an option, these third-party sites offer other types of plans. FreeDoc does not sell, recommend, or endorse any plan, so compare the details yourself.</p>
        <div className="offer-grid">
          {OFFERS.map((o) => (
            <OfferLink key={o.id} o={o} />
          ))}
        </div>
        <p className="disclose">FreeDoc may earn a referral fee when you buy through these links, at no extra cost to you. Short-term plans and discount plans are not ACA-compliant health insurance: they can exclude pre-existing conditions, limit benefits, and are not available in every state. Check free options above first.</p>
      </section>

      <section className="section">
        <p className="kicker">No insurance yet</p>
        <h2>Free or low-cost care right now</h2>
        <div className="steps">
          <a className="stepbox ins-link" href={LINKS.healthCenter} target="_blank" rel="noopener">
            <p className="n">01</p>
            <h3>Community health centers</h3>
            <p>Federally funded health centers offer care on a sliding fee scale based on income. Insurance is not required.</p>
          </a>
          <a className="stepbox ins-link" href={LINKS.hillBurton} target="_blank" rel="noopener">
            <p className="n">02</p>
            <h3>Free hospital care</h3>
            <p>Nonprofit hospitals are required to have financial assistance policies, and some Hill-Burton facilities offer free or reduced-cost care. Ask before you pay.</p>
          </a>
          <a className="stepbox ins-link" href="/">
            <p className="n">03</p>
            <h3>Free symptom check</h3>
            <p>Not sure where to go? FreeDoc’s AI suggests a care level in about 60 seconds. It is not medical advice.</p>
          </a>
        </div>
      </section>

      <section className="section">
        <p className="kicker">Questions</p>
        <h2>Common questions</h2>
        <div className="ins-faq">
          {FAQ.map((f) => (
            <details key={f.q} className="card">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <p className="src">
          Estimates use the 2026 federal poverty guidelines and general program rules, which change often. Medicaid rules differ by state, and only your state or the marketplace can decide eligibility. FreeDoc is not a government agency, an insurance company, or a licensed insurance agent or broker, and it is not affiliated with Medicaid, CHIP, Medicare, CMS, or HealthCare.gov. Applying through official government sites is free. This page is general information, not insurance, tax, or legal advice.
        </p>
      </section>
    </div>
  );
}
