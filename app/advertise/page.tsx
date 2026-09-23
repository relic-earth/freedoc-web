import type { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Sponsor a section of FreeDoc',
  description: 'Reach people at the moment they need care, with topic sponsorships and no personal targeting.',
};

const PACKAGES = [
  { t: "Kids' health", d: 'Shown when a parent checks symptoms for a child. Ideal for pediatric urgent care, children’s medicine, and family health brands.' },
  { t: 'Caring for parents', d: 'Shown to adult children checking on an older parent. Ideal for home care, senior living, and caregiver services.' },
  { t: 'Everyday health', d: 'Shown on adult symptom checks. Ideal for pharmacies, urgent care chains, and telehealth.' },
  { t: 'Symptom guides', d: 'Own a guide like “Fever in a child” or “Sore throat” for a season. Great for cold and flu campaigns.' },
];

export default function Advertise() {
  return (
    <div className="wrap">
      <div className="article" style={{ maxWidth: 1000 }}>
        <h1>Sponsor a section</h1>
        <p className="intro">Reach people at the exact moment they are deciding where to get care. Sponsorships are sold by topic, never by person.</p>

        <h2>Sections available</h2>
        <div className="pkg-grid">
          {PACKAGES.map((p) => (
            <div key={p.t} className="pkg">
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>

        <h2>Our rules</h2>
        <ul className="list">
          <li>No targeting of individual users, and no health data shared with advertisers or ad networks.</li>
          <li>Sponsorships are clearly labeled and never change a triage answer.</li>
          <li>Health-related, trustworthy brands only. We review every sponsor.</li>
        </ul>

        <h2>Get in touch</h2>
        <LeadForm
          kind="sponsor"
          fields={[
            { name: 'name', label: 'Your name', required: true },
            { name: 'email', label: 'Work email', type: 'email', required: true },
            { name: 'company', label: 'Company' },
            { name: 'topic', label: 'Section of interest', options: PACKAGES.map((p) => p.t) },
            { name: 'budget', label: 'Monthly budget', options: ['Under $1,000', '$1,000–$5,000', '$5,000–$20,000', '$20,000+'] },
            { name: 'note', label: 'Anything else?', textarea: true },
          ]}
          button="Request sponsorship info"
          done="Thanks! We’ll be in touch within two business days."
        />
      </div>
    </div>
  );
}
