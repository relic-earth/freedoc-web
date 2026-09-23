import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Consumer Health Data Privacy Policy | FreeDoc',
  description: 'What health information FreeDoc collects, why, who processes it, and how to exercise your rights.',
  alternates: { canonical: 'https://freedoc.live/health-data' },
};

const UPDATED = 'September 23, 2026';

export default function HealthData() {
  return (
    <div className="wrap">
      <div className="article">
        <h1>Consumer Health Data Privacy Policy</h1>
        <p className="intro">Last updated {UPDATED}. This policy explains how FreeDoc, operated by Island Global Co., handles consumer health data, including under the Washington My Health My Data Act, Nevada’s consumer health data law, and similar state laws.</p>

        <h2>Health data we collect</h2>
        <ul className="list">
          <li><strong>What you type</strong> about symptoms, such as “fever and headache since yesterday.”</li>
          <li><strong>Your answers</strong> to follow-up questions, such as how long a symptom has lasted, how severe it is, an age range, and whether danger signs are present.</li>
          <li><strong>Who the check is for,</strong> such as yourself, a child, or a parent.</li>
          <li><strong>The care level</strong> FreeDoc suggests, such as “Urgent care today.”</li>
        </ul>
        <p>We do not ask for your name, email, phone number, address, or any account to check symptoms. We do not collect precise location.</p>

        <h2>Where it comes from</h2>
        <p>All of it comes directly from you, when you use the symptom check.</p>

        <h2>Why we collect it</h2>
        <ul className="list">
          <li>To generate your follow-up questions and your suggested care level. This is the only use of what you type and your answers.</li>
          <li>To count, without anything you typed, how often each care level is shown, so we can check that FreeDoc stays careful and working.</li>
        </ul>
        <p>We do not use health data for advertising, we do not sell it, and we do not use it to build a profile of you.</p>

        <h2>Who processes it</h2>
        <ul className="list">
          <li><strong>OpenAI</strong> receives what you type and your answers, over an encrypted connection, only to produce your result. Under OpenAI’s API policies, this data is not used to train its models and may be kept for up to 30 days for abuse and safety monitoring before it is deleted.</li>
          <li><strong>Vercel</strong> hosts FreeDoc. Your request passes through Vercel’s servers to reach OpenAI. We do not write what you type to our logs or databases.</li>
          <li><strong>Vercel Web Analytics</strong> receives anonymous, cookie-free event counts, such as “a result was shown at the Urgent care level for a child.” These counts never include what you typed or your answers, and they are not tied to your identity.</li>
        </ul>
        <p>These companies act as our service providers (processors). We do not share or sell consumer health data to any other third party, including sponsors, advertisers, or the care services we link to. If you tap a link to a care service, that service does not receive your symptoms from us.</p>

        <h2>How long we keep it</h2>
        <p>FreeDoc does not store your symptom checks. Your result lives only in your browser tab and disappears when you close or reset it. Our AI provider may keep a copy for up to 30 days, as described above. Anonymous counts are kept in aggregate.</p>

        <h2>Your consent</h2>
        <p>We ask for your consent on the symptom check before collecting any health data. Tapping the check button after reading the notice above it is your consent. You can withdraw consent at any time by not using the symptom check, and by contacting us about any data you want deleted.</p>

        <h2>Your rights</h2>
        <p>Depending on where you live, you may have the right to confirm whether we collect your consumer health data, to access it, to get a list of the third parties and affiliates that received it, to delete it, and to withdraw consent. Because we do not keep symptom checks or link them to you, in most cases we will not hold any health data that we can match to you. We will still answer every request.</p>
        <p>To make a request, email <a href="mailto:info@island.contact?subject=Health%20data%20request">info@island.contact</a> with the subject line “Health data request.” We will respond within 45 days. If we deny your request, you may appeal by replying with the subject line “Appeal,” and we will respond to your appeal within 45 days. If your appeal is denied, you may contact the Washington State Attorney General or your own state’s attorney general.</p>

        <h2>Related policies</h2>
        <p>See our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Service</Link>.</p>

        <p className="src">FreeDoc provides general health information, not medical advice. In an emergency, call 911.</p>
      </div>
    </div>
  );
}
