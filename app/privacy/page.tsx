import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | FreeDoc',
  description: 'How FreeDoc handles your information: no account needed, what is sent to our AI provider, anonymous analytics, and how to contact us.',
  alternates: { canonical: '/privacy' },
};

export default function Privacy() {
  return (
    <div className="wrap">
      <div className="article">
        <h1>Privacy Policy</h1>
        <p className="intro">Last updated September 26, 2026. Health questions are personal. FreeDoc, operated by Island Global Company, is built to collect as little about you as possible. Health-specific details, including your rights under state health privacy laws, are in our <Link href="/health-data">Consumer Health Data Privacy Policy</Link>.</p>
        <h2>What we don’t do</h2>
        <ul className="list">
          <li>We don’t require an account, a name, or an email to check symptoms.</li>
          <li>FreeDoc is designed not to keep your symptom checks or answers in its own logs or databases. Our AI provider may keep a copy for a limited time, as described below.</li>
          <li>We don’t sell your information, and we don’t share health information with advertisers or ad networks.</li>
          <li>We don’t use ad-tracking pixels.</li>
        </ul>
        <h2>What happens when you check symptoms</h2>
        <p>Your description and answers are sent over an encrypted connection, through our host Vercel, to our AI provider, OpenAI, to generate your answer. They are used only to answer you. Under OpenAI’s API policies, they are not used to train AI models and may be kept by OpenAI for up to 30 days for abuse and safety monitoring. FreeDoc’s own code is designed not to write them to any log or database.</p>
        <h2>Health insurance finder</h2>
        <p>The coverage finder runs in your browser. Your state, household size, and income are used on your device to show an estimate and are not sent to FreeDoc.</p>
        <h2>Sharing</h2>
        <p>When you share a result, the link and image show only the suggested care level, such as “Urgent care today.” Your symptoms are never included. Text and email summaries are created on your own device and sent only to the people you choose.</p>
        <h2>Analytics</h2>
        <p>We use Vercel Web Analytics, which is cookie-free, to count page visits and button taps, such as how many people tapped “Share.” These counts are anonymous. They never include what you typed, your answers, the suggested care level, or who a check was for.</p>
        <h2>Email sign-ups</h2>
        <p>If you join the FreeDoc Plus list or ask about sponsorships, we keep your email and the details you enter, in private storage, only to contact you about that request. To have them deleted, email us.</p>
        <h2>Contact</h2>
        <p>Email <a href="mailto:info@island.contact">info@island.contact</a> with any privacy question or request. See also our <Link href="/terms">Terms of Service</Link>.</p>
        <p className="src">FreeDoc provides general health information, not medical advice. In an emergency, call 911.</p>
      </div>
    </div>
  );
}
