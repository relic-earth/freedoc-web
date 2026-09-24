import Link from 'next/link';
import Triage from '@/components/Triage';
import { LEVELS, type Level } from '@/lib/triage';
import { SYMPTOMS } from '@/lib/symptoms';
import { BotLine, Reactor } from '@/components/Chrome';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="day-div">
            <span>Today</span>
          </div>
          <div className="hero-grid">
            <div className="hero-msg">
              <BotLine note="pinned to #triage" />
              <h1>Should I go to the ER?</h1>
              <p className="sub">Answer a few quick questions and get a clear answer in about 60 seconds. Free, private, no account.</p>
              <div className="levels-strip" aria-label="Possible answers">
                {(Object.keys(LEVELS) as Level[]).map((l) => (
                  <span key={l} className="lv-pill" style={{ ['--lv' as any]: LEVELS[l].color }}>
                    {LEVELS[l].emoji} {LEVELS[l].label}
                  </span>
                ))}
              </div>
            </div>
            <div className="hero-hud" aria-hidden>
              <Reactor />
              <div className="readouts">
                <p><span>STATUS</span> ONLINE</p>
                <p><span>RESPONSE</span> ~60 SEC</p>
                <p><span>COST</span> $0.00</p>
                <p><span>ACCOUNT</span> NONE</p>
              </div>
            </div>
          </div>
          <Triage />
          <Link className="ins-teaser" href="/insurance">
            <span className="pt-badge">No insurance?</span>
            <span className="pt-line">See if you qualify for free health insurance, like Medicaid or CHIP. It takes about 30 seconds.</span>
            <span className="pt-cta">Check now →</span>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="kicker">How it works</p>
          <h2>Like calling a nurse line, without the hold music.</h2>
          <div className="steps">
            <div className="stepbox">
              <div className="n">1</div>
              <h3>Say who’s sick</h3>
              <p>You, your kid, or your parent. Age changes everything, so we ask first.</p>
            </div>
            <div className="stepbox">
              <div className="n">2</div>
              <h3>Tap a few answers</h3>
              <p>FreeDoc asks the questions a triage nurse would ask, including the danger signs.</p>
            </div>
            <div className="stepbox">
              <div className="n">3</div>
              <h3>Get a clear answer</h3>
              <p>One of four answers, what to do now, and a summary you can send to your doctor or family.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="kicker">Four possible answers</p>
          <h2>No vague “see a doctor.” A real answer.</h2>
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
          <p className="kicker">Why you can trust it</p>
          <h2>Careful by design.</h2>
          <div className="trust">
            <div className="stepbox">
              <h3>Safety first</h3>
              <p>Emergency words like “chest pain” or “can’t breathe” skip the chat and go straight to 911. When unsure, FreeDoc picks the safer answer.</p>
            </div>
            <div className="stepbox">
              <h3>Built on public guidance</h3>
              <p>Answers follow common triage practice and link to MedlinePlus from the U.S. National Library of Medicine.</p>
            </div>
            <div className="stepbox">
              <h3>Private by default</h3>
              <p>No account and no saved chats. Shared results show only the answer color, never your symptoms. <Link href="/privacy">Read our privacy promise</Link>.</p>
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
