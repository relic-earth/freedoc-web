import type { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'FreeDoc Plus — health history for the whole family',
  description: 'Family profiles, saved history, doctor-ready summaries, and medicine reminders. FreeDoc triage stays free forever.',
};

export default function Plus() {
  return (
    <div className="wrap">
      <div className="article" style={{ maxWidth: 1000 }}>
        <h1>FreeDoc Plus</h1>
        <p className="intro">The symptom check stays free forever. Plus keeps your whole family’s health in one place, so you never have to remember it all in the waiting room.</p>

        <div className="price-grid">
          <div className="price">
            <h3>Free</h3>
            <div className="amt">
              $0 <small>forever</small>
            </div>
            <ul>
              <li>Unlimited symptom checks</li>
              <li>Clear four-level answer</li>
              <li>Share and send summaries</li>
              <li>Emergency shortcuts</li>
            </ul>
          </div>
          <div className="price hot">
            <h3>Plus</h3>
            <div className="amt">
              $7 <small>/ month · or $59 / year</small>
            </div>
            <ul>
              <li>Profiles for every family member</li>
              <li>Saved symptom history and timelines</li>
              <li>One-tap, doctor-ready visit summaries</li>
              <li>Medicine and dose reminders</li>
              <li>Follow-up check-ins: “Is the fever better?”</li>
              <li>Priority answers during flu season</li>
            </ul>
            <p className="step-label" style={{ marginTop: 8 }}>Get early access and your first 3 months free</p>
            <LeadForm
              kind="plus"
              fields={[
                { name: 'email', label: 'Your email', type: 'email', required: true },
                { name: 'plan', label: 'Which plan?', options: ['Monthly · $7', 'Yearly · $59'] },
              ]}
              button="Join FreeDoc Plus early access"
              done="You’re on the list. We’ll email you when Plus opens."
            />
          </div>
        </div>
        <p className="src">We never sell your health information and never use it for advertising.</p>
      </div>
    </div>
  );
}
