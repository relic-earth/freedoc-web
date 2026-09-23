import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy promise | FreeDoc', description: 'How FreeDoc handles your information.' };

export default function Privacy() {
  return (
    <div className="wrap">
      <div className="article">
        <h1>Our privacy promise</h1>
        <p className="intro">Health questions are personal. FreeDoc is built to know as little about you as possible.</p>
        <h2>What we don’t do</h2>
        <ul className="list">
          <li>We don’t require an account, a name, or an email to check symptoms.</li>
          <li>We don’t save your symptom checks or answers on our servers.</li>
          <li>We don’t sell your information, and we don’t share health information with advertisers or ad networks.</li>
          <li>We don’t use ad-tracking pixels.</li>
        </ul>
        <h2>What happens when you check symptoms</h2>
        <p>Your description and answers are sent securely to our AI provider to generate your answer. They are used only to answer you and are not used to train AI models. Our AI provider may keep requests for a limited time for abuse and safety monitoring, as its own policies require.</p>
        <h2>Sharing</h2>
        <p>When you share a result, the link and image show only the answer level, such as “Urgent care today.” Your symptoms are never included. Text and email summaries are created on your own device and sent only to the people you choose.</p>
        <h2>Analytics</h2>
        <p>We use privacy-friendly, cookie-free analytics to count visits and button taps, such as how many people tapped “Share.” These counts never include what you typed.</p>
        <h2>Email sign-ups</h2>
        <p>If you join the FreeDoc Plus list or ask about sponsorships, we keep your email and the details you enter only to contact you about that request.</p>
        <p className="src">FreeDoc provides general health information, not medical advice. In an emergency, call 911.</p>
      </div>
    </div>
  );
}
