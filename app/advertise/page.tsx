import type { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';
import { SPONSOR_MONTHLY_PRICE } from '@/lib/payments';

export const metadata: Metadata = {
  title: 'Sponsor a section of FreeDoc',
  description: 'Sponsor a FreeDoc page. Every visitor sees the same sponsor, with no personal or health-based targeting.',
};

const PACKAGES = [
  { t: 'Results page', d: 'One labeled sponsor spot below every symptom-check result. Every visitor sees the same sponsor, whatever they typed or were shown.' },
  { t: 'Symptom guides', d: 'One labeled sponsor spot on a public guide page, such as “Sore throat,” for a season. Placement is by page, never by person.' },
  { t: 'Free insurance page', d: 'One labeled sponsor spot on the coverage page. Sponsors cannot change eligibility estimates or the order of official links.' },
  { t: 'Site-wide', d: 'One labeled sponsor spot in the site footer on every page.' },
];

export default function Advertise() {
  return (
    <div className="wrap">
      <div className="article" style={{ maxWidth: 1000 }}>
        <h1>Sponsor a section</h1>
        <p className="intro">Sponsorships are sold by page, never by person. FreeDoc never uses symptoms, answers, suggested care levels, or who a check is for to choose or target a sponsor.</p>

        <h2>Sections available</h2>
        <div className="pkg-grid">
          {PACKAGES.map((p) => (
            <div key={p.t} className="pkg">
              <h3>{p.t}</h3>
              <p className="pkg-price">${SPONSOR_MONTHLY_PRICE.toLocaleString()} / month</p>
              <p>{p.d}</p>
            </div>
          ))}
        </div>

        <h2>Our rules</h2>
        <ul className="list">
          <li>No targeting of individual users, no use of health data for ads, and no health data shared with sponsors, advertisers, or ad networks.</li>
          <li>Sponsorships are clearly labeled “Sponsored” and never change a suggested care level.</li>
          <li>We review every sponsor and every message. No prescription drug ads, no unproven health claims, and no ads aimed at children.</li>
          <li>Sponsors are responsible for the accuracy and legality of their own messages and offers.</li>
        </ul>

        <h2>Pricing and payment</h2>
        <p>Every section is ${SPONSOR_MONTHLY_PRICE.toLocaleString()} per month, billed monthly in advance, with no long-term contract. Pay by card through a Stripe invoice, or by wire or ACH through a Mercury invoice. Tell us your section and payment method below, and we will send the invoice within one business day. Your sponsorship goes live when the first invoice is paid and your message passes review. We may decline or remove any sponsorship.</p>

        <h2>Book a section</h2>
        <LeadForm
          kind="sponsor"
          fields={[
            { name: 'name', label: 'Your name', required: true },
            { name: 'email', label: 'Work email', type: 'email', required: true },
            { name: 'company', label: 'Company' },
            { name: 'topic', label: 'Section of interest', options: PACKAGES.map((p) => p.t) },
            { name: 'budget', label: 'How would you like to pay?', options: ['Card (Stripe invoice)', 'Wire or ACH (Mercury invoice)'] },
            { name: 'note', label: 'Anything else?', textarea: true },
          ]}
          button="Book this section"
          done="Thanks! Your invoice will arrive within one business day."
        />
      </div>
    </div>
  );
}
