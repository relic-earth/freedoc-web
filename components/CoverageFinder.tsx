'use client';
import { useMemo, useState } from 'react';
import { track } from '@vercel/analytics';
import { STATES, screen, LINKS, type Answers } from '@/lib/insurance';
import { BotLine } from '@/components/Chrome';

const SIZES = [1, 2, 3, 4, 5, 6, 7, 8];
const TONE_LABEL = { free: 'FREE', low: 'LOW COST', gap: 'FREE CARE OPTIONS', full: 'FULL PRICE' } as const;

export default function CoverageFinder() {
  const [state, setState] = useState('');
  const [size, setSize] = useState(1);
  const [income, setIncome] = useState('');
  const [per, setPer] = useState<'year' | 'month'>('year');
  const [who, setWho] = useState({ adults: true, kids: false, pregnant: false, senior: false });
  const [shown, setShown] = useState<Answers | null>(null);
  const [err, setErr] = useState('');

  const out = useMemo(() => (shown ? screen(shown) : null), [shown]);

  function go(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    const n = Number(String(income).replace(/[^0-9.]/g, ''));
    if (!state) return setErr('Pick your state.');
    if (income === '' || Number.isNaN(n)) return setErr('Enter your household income. Enter 0 if you have no income.');
    if (!who.adults && !who.kids && !who.pregnant && !who.senior) return setErr('Pick who needs coverage.');
    const a: Answers = { state, size, income: per === 'month' ? n * 12 : n, ...who };
    setShown(a);
    track('ins_check');
    setTimeout(() => document.getElementById('ins-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  const toggle = (k: keyof typeof who) => setWho((w) => ({ ...w, [k]: !w[k] }));

  return (
    <>
      <form className="card start-card ins-form" onSubmit={go} id="finder">
        <div className="composer-h">
          <span className="hud-mono">Free coverage finder</span>
          <span className="hud-mono dim">Estimate only · not sent to FreeDoc</span>
        </div>

        <fieldset className="q">
          <legend>
            <span className="qn">1</span> Who needs coverage?
          </legend>
          <div className="opts">
            {(
              [
                ['adults', 'Me or other adults (19–64)'],
                ['kids', 'Kids under 19'],
                ['pregnant', 'Someone pregnant'],
                ['senior', 'Someone 65 or older'],
              ] as const
            ).map(([k, label]) => (
              <button type="button" key={k} className={`opt ${who[k] ? 'on' : ''}`} aria-pressed={who[k]} onClick={() => toggle(k)}>
                {who[k] ? '✓ ' : ''}
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="q">
          <legend>
            <span className="qn">2</span> Where do you live, and how many people are in your household?
          </legend>
          <div className="ins-row">
            <select className="ins-in" value={state} onChange={(e) => setState(e.target.value)} aria-label="Your state">
              <option value="">Pick your state</option>
              {STATES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
            <select className="ins-in" value={size} onChange={(e) => setSize(Number(e.target.value))} aria-label="People in your household">
              {SIZES.map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'person' : 'people'} in household
                </option>
              ))}
            </select>
          </div>
          <p className="ins-hint">Count yourself, your spouse, and anyone you claim on your taxes.</p>
        </fieldset>

        <fieldset className="q">
          <legend>
            <span className="qn">3</span> What is your household income before taxes?
          </legend>
          <div className="ins-row">
            <div className="ins-money">
              <span aria-hidden>$</span>
              <input className="ins-in" inputMode="numeric" placeholder="0" value={income} onChange={(e) => setIncome(e.target.value)} aria-label="Household income" />
            </div>
            <div className="opts">
              <button type="button" className={`opt ${per === 'year' ? 'on' : ''}`} onClick={() => setPer('year')}>
                Per year
              </button>
              <button type="button" className={`opt ${per === 'month' ? 'on' : ''}`} onClick={() => setPer('month')}>
                Per month
              </button>
            </div>
          </div>
          <p className="ins-hint">A best guess is fine. No job right now? Enter 0.</p>
        </fieldset>

        {err && <p className="err">{err}</p>}
        <button className="go">Show my possible options</button>
        <p className="fine">Your answers are calculated in your browser and are not sent to FreeDoc. This is an estimate only, and your state or the marketplace makes the final decision.</p>
      </form>

      {out && shown && (
        <section id="ins-result" className="ins-result" aria-live="polite">
          <BotLine />
          <p className="ins-pct">
            Your household is at about <strong>{out.pct}%</strong> of the poverty line (${out.line.toLocaleString()} a year for {shown.size}).
          </p>
          {out.results.map((r) => (
            <div key={r.track} className={`ins-card t-${r.tone}`}>
              <p className="ins-tag">
                <span>{TONE_LABEL[r.tone]}</span> {r.who}
              </p>
              <h3>{r.title}</h3>
              <p className="ins-body">{r.body}</p>
              <div className="ins-cta">
                {r.cta.map((c, i) => (
                  <a key={c.url + i} className={i === 0 ? 'go' : 'go ghost'} href={c.url} target="_blank" rel="noopener" onClick={() => track('ins_apply')}>
                    {c.label} →
                  </a>
                ))}
              </div>
            </div>
          ))}
          <div className="ins-help">
            <div>
              <h3>Want a person to help, free?</h3>
              <p>The official HealthCare.gov local help directory lists trained assisters who can help you apply at no cost.</p>
            </div>
            <div className="ins-help-btns">
              <a className="act primary" href={LINKS.localHelp} target="_blank" rel="noopener" onClick={() => track('ins_help')}>
                Find free local help
              </a>
              <a className="act" href={LINKS.marketplacePhone} onClick={() => track('ins_help')}>
                Marketplace: 1‑800‑318‑2596
              </a>
            </div>
          </div>
          <div className="card ins-ready">
            <span className="step-label">Have these ready when you apply</span>
            <ul className="list">
              <li>Social Security numbers for everyone applying (or document numbers for lawfully present immigrants)</li>
              <li>Recent pay stubs, or your best estimate of this year’s income</li>
              <li>Any job-based insurance that someone in the household could get</li>
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
