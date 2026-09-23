'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { track } from '@vercel/analytics';
import { detectEmergency, type EmergencyKind } from '@/lib/emergency';
import { LEVELS, WHO, medlineUrl, type Question, type Verdict, type Who } from '@/lib/triage';
import { CARE, SPONSORS } from '@/lib/partners';

type Step = 'start' | 'loadingQ' | 'questions' | 'loadingV' | 'verdict' | 'emergency';

const EXAMPLES: Record<Who, string[]> = {
  me: ['Headache and fever since yesterday', 'Sore throat and it hurts to swallow', 'Twisted my ankle and it is swollen', 'Stomach pain on the lower right side'],
  kid: ['Fever of 102 and very tired', 'Cough that won’t stop at night', 'Rash all over after a new food', 'Threw up three times today'],
  parent: ['Dizzy when standing up', 'Fell but did not hit their head', 'More confused than usual today', 'Swollen ankles for a week'],
  someone: ['Fever and body aches', 'Deep cut on a finger', 'Bad headache that came on fast', 'Burn from a hot pan'],
};

export default function Triage({ initialText = '', initialWho = 'me' as Who, autoFocus = false }) {
  const [who, setWho] = useState<Who>(initialWho);
  const [text, setText] = useState(initialText);
  const [step, setStep] = useState<Step>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [emergency, setEmergency] = useState<EmergencyKind>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step !== 'start' && topRef.current) window.scrollTo({ top: topRef.current.getBoundingClientRect().top + window.scrollY - 96, behavior: 'smooth' });
  }, [step]);

  function goEmergency(kind: EmergencyKind) {
    setEmergency(kind);
    setStep('emergency');
    track('emergency_screen', { kind: kind || 'unknown' });
  }

  async function post(payload: any) {
    const r = await fetch('/api/triage', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error || 'Something went wrong. Please try again.');
    return j;
  }

  async function start(e?: React.FormEvent) {
    e?.preventDefault();
    setError('');
    const t = text.trim();
    if (!t) return setError('Tell us what is going on first.');
    const em = detectEmergency(t);
    if (em) return goEmergency(em);
    setStep('loadingQ');
    track('triage_start', { who });
    try {
      const j = await post({ step: 'questions', who, text: t });
      if (j.type === 'emergency') return goEmergency(j.kind);
      if (!j.questions?.length) return finish({});
      setQuestions(j.questions);
      setAnswers({});
      setStep('questions');
    } catch (err: any) {
      setError(err.message);
      setStep('start');
    }
  }

  async function finish(ans = answers) {
    setError('');
    const list = questions.map((q) => ({ q: q.text, a: (ans[q.id] || []).join(', ') || 'Not answered' }));
    const em = detectEmergency(list.map((x) => x.a).join(' '));
    if (em) return goEmergency(em);
    setStep('loadingV');
    try {
      const j = await post({ step: 'verdict', who, text: text.trim(), answers: list });
      if (j.type === 'emergency') return goEmergency(j.kind);
      setVerdict(j.verdict);
      setStep('verdict');
      track('triage_verdict', { who, level: j.verdict.level });
    } catch (err: any) {
      setError(err.message);
      setStep('questions');
    }
  }

  function pick(q: Question, opt: string) {
    setAnswers((prev) => {
      const cur = prev[q.id] || [];
      if (!q.multi) return { ...prev, [q.id]: [opt] };
      if (/^none/i.test(opt)) return { ...prev, [q.id]: cur.includes(opt) ? [] : [opt] };
      const base = cur.filter((o) => !/^none/i.test(o));
      return { ...prev, [q.id]: base.includes(opt) ? base.filter((o) => o !== opt) : [...base, opt] };
    });
  }

  function reset() {
    setStep('start');
    setVerdict(null);
    setQuestions([]);
    setAnswers({});
    setEmergency(null);
    setText('');
  }

  const summary = useMemo(() => {
    if (!verdict) return '';
    const L = LEVELS[verdict.level];
    const date = new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
    const qa = questions.map((q) => `• ${q.text} ${(answers[q.id] || []).join(', ') || 'Not answered'}`).join('\n');
    return [
      `FreeDoc symptom summary — ${date}`,
      `Who: ${WHO[who].label}`,
      ``,
      `What's going on:`,
      text.trim(),
      ``,
      `Details:`,
      qa,
      ``,
      `FreeDoc triage: ${L.emoji} ${L.label}`,
      verdict.summary,
      ``,
      `Go to the ER if:`,
      ...verdict.watchFor.map((w) => `• ${w}`),
      ``,
      `Questions for the doctor:`,
      ...verdict.askDoctor.map((w) => `• ${w}`),
      ``,
      `FreeDoc is AI guidance, not a diagnosis. freedoc.live`,
    ].join('\n');
  }, [verdict, questions, answers, who, text]);

  const shareUrl = verdict ? `https://freedoc.live/v?l=${verdict.level}` : 'https://freedoc.live';

  async function share() {
    if (!verdict) return;
    const L = LEVELS[verdict.level];
    const msg = `FreeDoc told me: ${L.emoji} ${L.label}. Free symptom check in 60 seconds.`;
    track('share_result', { level: verdict.level });
    try {
      if (navigator.share) {
        await navigator.share({ title: 'FreeDoc', text: msg, url: shareUrl });
        return;
      }
    } catch {
      return;
    }
    await navigator.clipboard.writeText(`${msg} ${shareUrl}`);
    flash('link');
  }

  function flash(what: string) {
    setCopied(what);
    setTimeout(() => setCopied(''), 2200);
  }

  async function copySummary() {
    await navigator.clipboard.writeText(summary);
    track('summary_copy');
    flash('summary');
  }

  // ---------- RENDER ----------
  return (
    <div ref={topRef} className="triage">
      {step === 'start' && (
        <form onSubmit={start} className="card start-card">
          <p className="step-label">Who is sick?</p>
          <div className="who-row" role="radiogroup" aria-label="Who is sick">
            {(Object.keys(WHO) as Who[]).map((w) => (
              <button type="button" key={w} role="radio" aria-checked={who === w} className={`who ${who === w ? 'on' : ''}`} onClick={() => setWho(w)}>
                <span className="who-emoji" aria-hidden>{WHO[w].emoji}</span>
                {WHO[w].label}
              </button>
            ))}
          </div>
          <label htmlFor="what" className="step-label">What’s wrong?</label>
          <textarea
            id="what"
            className="what"
            rows={3}
            value={text}
            autoFocus={autoFocus}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) start(e as any);
            }}
            placeholder={`e.g. ${EXAMPLES[who][0]}`}
          />
          <div className="examples">
            {EXAMPLES[who].map((ex) => (
              <button type="button" key={ex} className="chip" onClick={() => setText(ex)}>
                {ex}
              </button>
            ))}
          </div>
          {error && <p className="err">{error}</p>}
          <button className="go" type="submit">
            Check symptoms — free
          </button>
          <p className="fine">No account. We don’t store your answers. Emergency? Call 911.</p>
        </form>
      )}

      {(step === 'loadingQ' || step === 'loadingV') && (
        <div className="card loading" aria-live="polite">
          <div className="pulse" />
          <p className="big">{step === 'loadingQ' ? 'Reading your symptoms…' : 'Checking how urgent this is…'}</p>
        </div>
      )}

      {step === 'questions' && (
        <div className="card">
          <p className="step-label">A few quick questions</p>
          <p className="lede">Tap the answers that fit. This is what a nurse would ask.</p>
          {questions.map((q, i) => (
            <fieldset key={q.id} className="q">
              <legend>
                <span className="qn">{i + 1}</span> {q.text}
                {q.multi && <span className="multi"> (tap all that apply)</span>}
              </legend>
              <div className="opts">
                {q.options.map((o) => {
                  const on = (answers[q.id] || []).includes(o);
                  return (
                    <button type="button" key={o} className={`opt ${on ? 'on' : ''}`} aria-pressed={on} onClick={() => pick(q, o)}>
                      {o}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
          {error && <p className="err">{error}</p>}
          <button className="go" onClick={() => finish()}>
            Get my answer
          </button>
          <button className="link-btn" onClick={reset}>
            Start over
          </button>
        </div>
      )}

      {step === 'emergency' && (
        <div className="card emergency">
          {emergency === 'crisis' ? (
            <>
              <p className="em-title">You don’t have to go through this alone.</p>
              <p className="lede">Talk to someone right now. It’s free, private, and open 24/7.</p>
              <a className="em-btn" href="tel:988" onClick={() => track('crisis_call')}>Call 988</a>
              <a className="em-btn alt" href="sms:988">Text 988</a>
              <a className="em-btn ghost" href="tel:911">Call 911 if you are in danger now</a>
            </>
          ) : (
            <>
              <p className="em-title">🔴 This could be an emergency.</p>
              <p className="lede">Call 911 now. Don’t wait for an online answer.</p>
              <a className="em-btn" href="tel:911" onClick={() => track('emergency_call')}>Call 911</a>
              <a className="em-btn alt" href="tel:18002221222">Poison Control: 1‑800‑222‑1222</a>
            </>
          )}
          <button className="link-btn" onClick={reset}>
            This isn’t an emergency — start over
          </button>
        </div>
      )}

      {step === 'verdict' && verdict && (
        <div className="verdict-wrap">
          <div className="verdict" style={{ ['--lv' as any]: LEVELS[verdict.level].color, ['--lvbg' as any]: LEVELS[verdict.level].bg }}>
            <p className="v-kicker">FreeDoc says</p>
            <p className="v-level">
              <span aria-hidden>{LEVELS[verdict.level].emoji}</span> {LEVELS[verdict.level].label}
            </p>
            {verdict.headline && <p className="v-head">{verdict.headline}</p>}
            <p className="v-sum">{verdict.summary}</p>
          </div>

          {/* Monetization 1: referral at the moment of need */}
          <div className="card care">
            <p className="step-label">{verdict.level === 'er' ? 'Get help now' : 'Next step'}</p>
            <div className="care-grid">
              {CARE[verdict.level].map((c) => (
                <a
                  key={c.id}
                  href={c.url}
                  target={c.kind === 'call' ? undefined : '_blank'}
                  rel="noopener sponsored"
                  className={`care-btn ${c.kind}`}
                  onClick={() => track('care_click', { level: verdict.level, id: c.id })}
                >
                  <span className="care-title">{c.title} →</span>
                  <span className="care-sub">{c.sub}</span>
                </a>
              ))}
            </div>
            <p className="disclose">FreeDoc may earn a referral fee from some links. It never changes your answer.</p>
          </div>

          {/* Virality 2 + 4: share and send */}
          <div className="card actions">
            <p className="step-label">Share &amp; send</p>
            <div className="act-grid">
              <button className="act primary" onClick={share}>
                {copied === 'link' ? '✓ Link copied' : '📣 Share my result'}
              </button>
              <a className="act" href={`/api/og?l=${verdict.level}&download=1`} download="freedoc-result.png" onClick={() => track('card_download')}>
                🖼️ Save result card
              </a>
              <a className="act" href={`sms:?&body=${encodeURIComponent(summary)}`} onClick={() => track('send_family')}>
                💬 Text to family
              </a>
              <a
                className="act"
                href={`mailto:?subject=${encodeURIComponent('Symptom summary from FreeDoc')}&body=${encodeURIComponent(summary)}`}
                onClick={() => track('send_doctor')}
              >
                ✉️ Email to my doctor
              </a>
              <button className="act" onClick={copySummary}>
                {copied === 'summary' ? '✓ Summary copied' : '📋 Copy summary'}
              </button>
              <button
                className="act"
                onClick={() => {
                  track('print_summary');
                  window.print();
                }}
              >
                🖨️ Print for the visit
              </button>
            </div>
            <p className="disclose">Shared links show only the result color. Your symptoms stay private.</p>
          </div>

          <div className="grid2">
            {verdict.doNow.length > 0 && (
              <div className="card">
                <p className="step-label">Do this now</p>
                <ul className="list">{verdict.doNow.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
            )}
            {verdict.watchFor.length > 0 && (
              <div className="card danger">
                <p className="step-label">Go to the ER or call 911 if</p>
                <ul className="list">{verdict.watchFor.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
            )}
            {verdict.possibleCauses.length > 0 && (
              <div className="card">
                <p className="step-label">Possible causes</p>
                <ul className="list">
                  {verdict.possibleCauses.map((c) => (
                    <li key={c.name}>
                      <strong>{c.name}.</strong> {c.note}
                    </li>
                  ))}
                </ul>
                <p className="disclose">These are possibilities, not a diagnosis.</p>
              </div>
            )}
            {verdict.askDoctor.length > 0 && (
              <div className="card">
                <p className="step-label">Ask your doctor</p>
                <ul className="list">{verdict.askDoctor.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
            )}
          </div>

          <div className="card source-card">
            <p>
              Learn more from the U.S. National Library of Medicine:{' '}
              <a href={medlineUrl(verdict.topic)} target="_blank" rel="noopener">
                MedlinePlus on “{verdict.topic}” →
              </a>
            </p>
          </div>

          {/* Monetization 3: topic sponsorship slot (house ad until sold) */}
          <a className="sponsor" href={SPONSORS[who].url} onClick={() => track('sponsor_click', { topic: SPONSORS[who].topic })}>
            <span className="sp-tag">{SPONSORS[who].name ? 'Sponsored' : 'Sponsor this section'}</span>
            <span className="sp-line">{SPONSORS[who].name ? `${SPONSORS[who].name} — ${SPONSORS[who].line}` : SPONSORS[who].line}</span>
          </a>

          {/* Monetization 2: FreeDoc Plus */}
          <a className="plus-teaser" href="/plus" onClick={() => track('plus_teaser_click')}>
            <span className="pt-badge">FreeDoc Plus</span>
            <span className="pt-line">Keep a health history for the whole family, with doctor-ready summaries and medicine reminders.</span>
            <span className="pt-cta">See Plus →</span>
          </a>

          <button className="go ghost" onClick={reset}>
            Check another symptom
          </button>

          {/* Printed only */}
          <pre className="print-only">{summary}</pre>
        </div>
      )}
    </div>
  );
}
