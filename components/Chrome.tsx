import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="FreeDoc home">
      <span className="logo-mark">+</span>
      <span className="logo-name">FreeDoc</span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="topbar">
      <div className="wrap topbar-in">
        <Logo />
        <nav className="nav">
          <Link href="/symptoms">Symptoms</Link>
          <Link href="/plus">Plus</Link>
          <a href="tel:911" className="call911">
            Call 911
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Logo />
            <p className="foot-note">Free AI triage that helps you decide where to go for care. It is not a doctor and does not diagnose.</p>
          </div>
          <div className="foot-links">
            <Link href="/symptoms">Symptom guides</Link>
            <Link href="/plus">FreeDoc Plus</Link>
            <Link href="/advertise">Sponsor a section</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </div>
        <p className="foot-emerg">
          Emergency: call <a href="tel:911">911</a>. Crisis or suicidal thoughts: call or text <a href="tel:988">988</a>. Poison Control:{' '}
          <a href="tel:18002221222">1‑800‑222‑1222</a>.
        </p>
        <p className="foot-legal">FreeDoc provides general health information for educational purposes. It is not medical advice, diagnosis, or treatment. Always follow the advice of a licensed clinician.</p>
      </div>
    </footer>
  );
}
