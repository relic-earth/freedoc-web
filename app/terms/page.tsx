import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | FreeDoc',
  description: 'The terms for using FreeDoc, a free AI symptom-triage tool that is not medical care.',
  alternates: { canonical: 'https://freedoc.live/terms' },
};

const UPDATED = 'September 26, 2026';

export default function Terms() {
  return (
    <div className="wrap">
      <div className="article">
        <h1>Terms of Service</h1>
        <p className="intro">Last updated {UPDATED}. By using FreeDoc, you agree to these terms. If you do not agree, please do not use FreeDoc.</p>

        <div className="box er">
          <h2>FreeDoc is not for emergencies</h2>
          <p>If you think someone may be having a medical emergency, call 911 or go to the nearest emergency room now. Do not wait for an online answer. For a mental health crisis, call or text 988. For a possible poisoning, call Poison Control at 1‑800‑222‑1222.</p>
        </div>

        <h2>1. Who we are</h2>
        <p>FreeDoc (freedoc.live) is operated by Island Global Company (“FreeDoc,” “we,” “us”). You can reach us at <a href="mailto:info@island.contact">info@island.contact</a>.</p>

        <h2>2. FreeDoc is not medical care</h2>
        <p>FreeDoc is an automated tool that uses artificial intelligence to share general health information and to suggest how soon someone may want to seek care. When you use FreeDoc, you are interacting with AI, not a person. FreeDoc is not a doctor, nurse, or other licensed clinician, is not a healthcare provider, and does not practice medicine or nursing. It does not examine anyone, diagnose any condition, or prescribe or recommend any treatment. Suggested care levels are general suggestions, not instructions.</p>
        <p>Using FreeDoc does not create a doctor–patient or any other clinician relationship. Anything FreeDoc shows you, including a suggested care level, a list of things a doctor may check for, or steps to take, is general information only. It is not medical advice and it is not a substitute for advice from a licensed clinician who can evaluate the person in need.</p>
        <p>AI can be wrong, incomplete, or out of date, and FreeDoc only knows what you tell it. Always use your own judgment. If a symptom is severe, getting worse, or worrying you, seek care in person, even if FreeDoc suggested a lower level of care. Never ignore or delay professional medical advice because of something you read on FreeDoc.</p>

        <h2>3. Who can use FreeDoc</h2>
        <p>You must be at least 18 years old and live in the United States to use FreeDoc. If you are under 18, please ask a parent or another trusted adult for help. You may use FreeDoc to help think through care for a child or another person in your care, but you are responsible for decisions about that person’s care. FreeDoc is not directed to children, and children should not use it themselves.</p>

        <h2>4. Your information</h2>
        <p>Our <Link href="/privacy">Privacy Policy</Link> and <Link href="/health-data">Consumer Health Data Privacy Policy</Link> explain what we collect and how we use it. When you check symptoms, you consent to the processing described in those policies.</p>

        <h2>5. Links, referrals, and sponsors</h2>
        <p>FreeDoc may link to third-party care options, such as telehealth services, urgent care finders, and pharmacies, and may show sponsored content. We do not provide, control, or endorse those services, and you use them under their own terms. We may earn a fee when you use some links. Fees and sponsorships never change the care level FreeDoc shows you, and sponsors are never chosen from your symptoms, answers, or results.</p>

        <h2>5b. Health insurance information</h2>
        <p>The coverage finder gives a rough estimate based on general program rules and the numbers you enter. It is not a determination of eligibility, and only your state Medicaid agency, CHIP program, Medicare, or the health insurance marketplace can decide eligibility. FreeDoc is not a government agency, an insurance company, or a licensed insurance agent or broker. FreeDoc does not sell insurance, is not affiliated with Medicaid, CHIP, Medicare, CMS, or HealthCare.gov, and does not recommend any plan. Third-party plans linked from FreeDoc, such as short-term or discount plans, may not be ACA-compliant health insurance and may not be available where you live. Information on FreeDoc is not insurance, tax, or legal advice.</p>

        <h2>5a. FreeDoc Plus and sponsorships</h2>
        <p>FreeDoc Plus is in development and is not currently for sale. Joining the waitlist is free and does not commit you to buy anything. Before Plus launches, we will publish its features, price, renewal terms, and how to cancel. Anyone who paid for Plus before it was available can email <a href="mailto:info@island.contact?subject=Cancel%20FreeDoc%20Plus">info@island.contact</a> to cancel and receive a full refund. The free symptom check does not require a subscription.</p>
        <p>Page sponsorships are billed monthly in advance by invoice, payable by card through Stripe or by wire or ACH through Mercury. Sponsorships can be canceled before the next billing period. Sponsored content is labeled, is reviewed before it runs, and never changes the care level FreeDoc shows.</p>

        <h2>6. Acceptable use</h2>
        <p>Do not misuse FreeDoc. That includes trying to break, overload, or reverse engineer it, scraping it, using it to build a competing service, or entering other people’s personal information without their permission.</p>

        <h2>7. No warranties</h2>
        <p>FreeDoc is provided “as is” and “as available,” without warranties of any kind, whether express or implied, including warranties of accuracy, merchantability, fitness for a particular purpose, and non-infringement. We do not promise that FreeDoc will be accurate, complete, uninterrupted, or error-free.</p>

        <h2>8. Limitation of liability</h2>
        <p>To the fullest extent the law allows, FreeDoc and Island Global Company, and their owners, employees, and partners, will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any injury, illness, or loss that results from relying on FreeDoc instead of seeking professional medical care. Our total liability for any claim relating to FreeDoc is limited to one hundred U.S. dollars ($100). Some places do not allow these limits, so they may not fully apply to you.</p>

        <h2>9. Indemnity</h2>
        <p>If you use FreeDoc in violation of these terms or the law, you agree to cover the reasonable costs, including legal fees, that we incur as a result.</p>

        <h2>10. Disputes and arbitration</h2>
        <p>Please contact us first at <a href="mailto:info@island.contact">info@island.contact</a> so we can try to resolve any concern informally. If we cannot resolve it within 60 days, you and we agree that any dispute relating to FreeDoc will be resolved by binding individual arbitration administered by the American Arbitration Association under its Consumer Arbitration Rules, rather than in court. Either party may instead bring an individual claim in small claims court.</p>
        <p><strong>You and we each waive the right to a jury trial and to take part in a class action or class arbitration.</strong> You may opt out of this arbitration section by emailing us within 30 days of first using FreeDoc with the subject line “Arbitration opt-out.”</p>

        <h2>11. Changes and ending use</h2>
        <p>We may update FreeDoc or these terms at any time. When we make important changes, we will update the date at the top of this page. Continuing to use FreeDoc after a change means you accept the updated terms. We may suspend or end access to FreeDoc at any time.</p>

        <h2>12. General</h2>
        <p>These terms are governed by the laws of the United States and the State of Delaware, without regard to conflict-of-law rules. If any part of these terms is found unenforceable, the rest stays in effect. These terms, together with our privacy policies, are the entire agreement between you and us about FreeDoc.</p>

        <p className="src">
          Questions? Email <a href="mailto:info@island.contact">info@island.contact</a>.
        </p>
      </div>
    </div>
  );
}
