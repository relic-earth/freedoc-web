// Runs before any AI call, on both the client and the server.
// If a message matches, FreeDoc shows 911 / 988 right away instead of chatting.

export type EmergencyKind = 'crisis' | 'medical' | null;

const CRISIS = [
  /\bsuicid/i,
  /\bkill (my|him|her|them)sel/i,
  /\bend (my|his|her) life\b/i,
  /\bwant(s)? to die\b/i,
  /\bdon'?t want to (live|be alive)\b/i,
  /\bself[- ]?harm/i,
  /\bhurt(ing)? (my|him|her)self\b/i,
  /\bcut(ting)? (my|him|her)self\b/i,
];

const MEDICAL = [
  /\bchest (pain|pressure|tightness)\b/i,
  /\b(can'?t|cannot|can not|struggling to|hard to) breathe?\b/i,
  /\bnot breathing\b/i,
  /\bstopped breathing\b/i,
  /\bchoking\b/i,
  /\bunconscious\b/i,
  /\bwon'?t wake up\b/i,
  /\bpassed out\b/i,
  /\bunresponsive\b/i,
  /\bface (is )?droop/i,
  /\bslurred speech\b/i,
  /\bstroke\b/i,
  /\bheart attack\b/i,
  /\bseizure\b/i,
  /\bconvuls/i,
  /\b(severe|heavy|uncontrolled|won'?t stop) bleeding\b/i,
  /\bbleeding (a lot|heavily|won'?t stop)\b/i,
  /\boverdos/i,
  /\bswallowed (poison|bleach|pills|a battery|batteries)\b/i,
  /\bpoison(ed|ing)\b/i,
  /\banaphyla/i,
  /\bthroat (is )?(closing|swelling)\b/i,
  /\b(lips|face) (turning |are |is )?blue\b/i,
];

export function detectEmergency(text: string): EmergencyKind {
  if (!text) return null;
  if (CRISIS.some((r) => r.test(text))) return 'crisis';
  if (MEDICAL.some((r) => r.test(text))) return 'medical';
  return null;
}
