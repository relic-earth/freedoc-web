'use client';
import { useState } from 'react';
import { track } from '@vercel/analytics';

type Field = { name: string; label: string; type?: string; options?: string[]; textarea?: boolean; required?: boolean };

export default function LeadForm({ kind, fields, button, done }: { kind: 'plus' | 'sponsor'; fields: Field[]; button: string; done: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'ok'>('idle');
  const [err, setErr] = useState('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr('');
    setState('sending');
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const r = await fetch('/api/lead', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...data, kind }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      track(`lead_${kind}`);
      setState('ok');
    } catch (e: any) {
      setErr(e.message || 'Something went wrong. Please try again.');
      setState('idle');
    }
  }

  if (state === 'ok') return <p className="ok">✓ {done}</p>;

  return (
    <form className="form" onSubmit={submit}>
      {fields.map((f) =>
        f.options ? (
          <select key={f.name} name={f.name} aria-label={f.label} defaultValue="">
            <option value="" disabled>
              {f.label}
            </option>
            {f.options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        ) : f.textarea ? (
          <textarea key={f.name} name={f.name} placeholder={f.label} aria-label={f.label} rows={3} />
        ) : (
          <input key={f.name} name={f.name} type={f.type || 'text'} placeholder={f.label} aria-label={f.label} required={f.required} />
        )
      )}
      <input name="website" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px' }} aria-hidden />
      {err && <p className="err">{err}</p>}
      <button className="go" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : button}
      </button>
    </form>
  );
}
