import Link from 'next/link';
import Triage from '@/components/Triage';
import { LEVELS, type Level } from '@/lib/triage';
import { SYMPTOMS } from '@/lib/symptoms';

export default function Home() {
  return (
    <>
      <section className="hero hero-ask">
        <div className="wrap">
          <p className="ask-kicker">Free AI symptom check · No account</p>
          <h1>Should I go to the ER?</h1>
          <p className="hero-legal">Type what’s going on and get a suggested next step in about 60 seconds. FreeDoc is an AI tool, not a doctor or nurse, and it does not diagnose. In an emergency, call 911.</p>
          <Triage autoFocus />
          <Link className="ins-teaser" href="/insurance">
            <span className="pt-badge">No insurance?</span>
            <span className="pt-line">See if you may qualify for free or low-cost health insurance, like Medicaid or CHIP. It takes about 30 seconds.</span>
            <span className="pt-cta">Check now →</span>
          </Link>
        </div>
      </section>
      <section className="section why">
        <div className="wrap why-grid">
          <div>
            <p className="kicker">Why FreeDoc</p>
            <h2>Free, fast, and careful.</h2>
            <p className="why-sub">No account, no insurance, and no saved symptom checks. Emergency words show 911 right away.</p>
            <div className="levels-strip" aria-label="Suggested care levels">
              {(Object.keys(LEVELS) as Level[]).map((l) => (
                <span key={l} className="lv-pill" style={{ ['--lv' as any]: LEVELS[l].color }}>
                  {LEVELS[l].emoji} {LEVELS[l].label}
                </span>
              ))}
            </div>
          </div>
          <div className="hero-hud">
            <div className="scene">
                <div className="orb" aria-hidden>
                  <span className="orb-ring r1" />
                  <span className="orb-ring r2" />
                  <svg className="ecg" viewBox="0 0 120 40" aria-hidden>
                    <path d="M0 22 H34 L40 22 L45 8 L52 34 L58 16 L62 22 H120" />
                  </svg>
                </div>
                <div className="stack">
                  <div className="ghost g2" aria-hidden />
                  <div className="ghost g1" aria-hidden>
                    <span className="gl" style={{ ['--lv' as any]: '#16a34a' }} />
                    <span className="gl" style={{ ['--lv' as any]: '#ca8a04' }} />
                    <span className="gl" style={{ ['--lv' as any]: '#ea580c' }} />
                    <span className="gl" style={{ ['--lv' as any]: '#dc2626' }} />
                  </div>
                  <div className="trust-card">
                    <h2>Why people use FreeDoc</h2>
                    <ul>
                      <li><b className="tk" aria-hidden>✓</b><div>Free for everyone<span>No insurance or account needed</span></div></li>
                      <li><b className="tk" aria-hidden>✓</b><div>Private by design<span>FreeDoc does not save your symptom checks</span></div></li>
                      <li><b className="tk" aria-hidden>✓</b><div>Safety first<span>Emergency words show 911 right away</span></div></li>
                      <li><b className="tk" aria-hidden>✓</b><div>A suggested next step<span>Home care, doctor, urgent care, or ER</span></div></li>
                    </ul>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>


      <section className="section">
        <div className="wrap">
          <p className="kicker">How it works</p>
          <h2>Quick questions. A suggested next step.</h2>
          <div className="steps">
            <div className="stepbox">
              <div className="n">1</div>
              <h3>Say who’s sick</h3>
              <p>You, your kid, or your parent. Age changes everything, so we ask first.</p>
            </div>
            <div className="stepbox">
              <div className="n">2</div>
              <h3>Tap a few answers</h3>
              <p>FreeDoc asks follow-up questions based on public triage guidance, including common warning signs.</p>
            </div>
            <div className="stepbox">
              <div className="n">3</div>
              <h3>See a suggested next step</h3>
              <p>One of four care levels, steps to consider, and a summary you can bring to a clinician or share with family.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="kicker">Four suggested care levels</p>
          <h2>A clear starting point. You stay in charge.</h2>
          <div className="lvl-grid">
            {(Object.keys(LEVELS) as Level[]).map((l) => (
              <div key={l} className="lvl" style={{ ['--lv' as any]: LEVELS[l].color }}>
                <div className="e">{LEVELS[l].emoji}</div>
                <h3>{LEVELS[l].label}</h3>
                <p>{LEVELS[l].blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="kicker">How FreeDoc stays careful</p>
          <h2>Careful by design.</h2>
          <div className="trust">
            <div className="stepbox">
              <h3>Safety first</h3>
              <p>Emergency words like “chest pain” or “can’t breathe” skip the chat and show 911 right away. FreeDoc’s AI is instructed to lean toward the more urgent level when unsure.</p>
            </div>
            <div className="stepbox">
              <h3>Informed by public guidance</h3>
              <p>Suggestions are generated by AI using general, public triage guidance, and each result links to MedlinePlus for more reading. AI can be wrong, so always use your own judgment.</p>
            </div>
            <div className="stepbox">
              <h3>Private by default</h3>
              <p>No account, and FreeDoc does not save your symptom checks. Shared links show only the care level, never your symptoms. <Link href="/privacy">Read our Privacy Policy</Link>.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="kicker">Common questions</p>
          <h2>Symptom guides</h2>
          <div className="sym-grid">
            {SYMPTOMS.slice(0, 12).map((s) => (
              <Link key={s.slug} href={`/symptoms/${s.slug}`} className="sym-link">
                {s.name}
                <span>{s.question}</span>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 18, fontSize: 20, fontWeight: 800 }}>
            <Link href="/symptoms">See all symptom guides →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
