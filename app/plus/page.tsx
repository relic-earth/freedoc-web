import type { Metadata } from 'next';
import Link from 'next/link';
import LeadForm from '@/components/LeadForm';
import { PLUS_MONTHLY_URL, PLUS_YEARLY_URL } from '@/lib/payments';

export const metadata: Metadata = {
  title: 'FreeDoc Plus — health history for the whole family',
  description: 'Family profiles, saved history, doctor-ready summaries, and medicine reminders. FreeDoc triage stays free forever.',
};

type SP = Promise<{ welcome?: string }>;

export default async function Plus({ searchParams }: { searchParams: SP }) {
  const { welcome } = await searchParams;
  return (
    <div className="wrap">
      <div className="article" style={{ maxWidth: 1000 }}>
        {welcome && (
          <div className="box home" role="status">
            <h2>Welcome to FreeDoc Plus.</h2>
            <p>Your subscription is active, and Stripe has emailed your receipt. We will email you as each Plus feature goes live. To cancel, email info@island.contact and we will cancel the same day.</p>
          </div>
        )}
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
            <p className="plus-note">
              <strong>Plus is rolling out in stages.</strong> These features are not all live yet. Subscribing now locks in your price, and you get each feature the day it launches.
            </p>
            <a className="go pay" href={PLUS_MONTHLY_URL}>
              Subscribe · $7 / month
            </a>
            {PLUS_YEARLY_URL ? (
              <a className="go ghost pay" href={PLUS_YEARLY_URL}>
                Subscribe yearly · $59 / year
              </a>
            ) : null}
            <p className="fine">
              Secure checkout by Stripe. Your plan renews automatically every month (or year) at the price shown until you cancel. Cancel anytime by emailing info@island.contact; we cancel the same day and refund any unused time on request. See the <Link href="/terms">Terms</Link>.
            </p>
            {!PLUS_YEARLY_URL && (
              <>
                <p className="step-label" style={{ marginTop: 20 }}>Want the $59 yearly plan?</p>
                <LeadForm
                  kind="plus"
                  fields={[
                    { name: 'email', label: 'Your email', type: 'email', required: true },
                    { name: 'plan', label: 'Which plan?', options: ['Yearly · $59', 'Monthly · $7'] },
                  ]}
                  button="Send me the yearly checkout link"
                  done="Thanks! We’ll email you a yearly checkout link."
                />
              </>
            )}
          </div>
        </div>
        <p className="src">We never sell your health information and never use it for advertising.</p>
      </div>
    </div>
  );
}
