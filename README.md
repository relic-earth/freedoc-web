# FreeDoc (freedoc.live)

Free AI symptom triage: who's sick → quick follow-up questions → one of four answers (home / doctor in 1–2 days / urgent care today / ER now).

- Next.js 16 app router, deployed to Vercel project `freedoc-web` (team islandglobalco).
- `OPENAI_API_KEY` (optional `OPENAI_MODEL`) powers `/api/triage`.
- Emergency words skip the AI and show 911 / 988 (`lib/emergency.ts`).
- Share card: `/api/og?l=<level>`; share landing: `/v?l=<level>` (never includes symptoms).
- Symptom SEO guides: `lib/symptoms.ts` → `/symptoms/[slug]`.
- Monetization: referral slots in `lib/partners.ts` (swap in affiliate URLs), FreeDoc Plus waitlist at `/plus`, topic sponsorships at `/advertise`. Leads are saved to the private Vercel Blob store `freedoc-web-blob` under `leads/`.
- Analytics events (Vercel Web Analytics): triage_start, triage_verdict, care_click, share_result, card_download, send_family, send_doctor, sponsor_click, lead_plus, lead_sponsor.
