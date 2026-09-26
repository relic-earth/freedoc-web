// Free-coverage screener data. Figures: 2026 HHS poverty guidelines (Federal Register, Jan 15 2026).
// Marketplace types: CMS plan-year 2027 map. Expansion status: KFF, Aug 2026.
// Results are estimates only; the state or marketplace makes the real decision.

export const FPL = {
  base: { base: 15960, add: 5680 },
  AK: { base: 19950, add: 7100 },
  HI: { base: 18360, add: 6530 },
} as const;

export function povertyLine(state: string, size: number) {
  const t = state === 'AK' ? FPL.AK : state === 'HI' ? FPL.HI : FPL.base;
  return t.base + t.add * Math.max(0, size - 1);
}

type Expansion = 'full' | 'to100' | 'none';
export interface State {
  code: string;
  name: string;
  exp: Expansion;
  ex?: { name: string; url: string }; // own state marketplace; otherwise HealthCare.gov
}

const S = (code: string, name: string, exp: Expansion = 'full', ex?: State['ex']): State => ({ code, name, exp, ex });

export const STATES: State[] = [
  S('AL', 'Alabama', 'none'),
  S('AK', 'Alaska'),
  S('AZ', 'Arizona'),
  S('AR', 'Arkansas'),
  S('CA', 'California', 'full', { name: 'Covered California', url: 'https://www.coveredca.com/' }),
  S('CO', 'Colorado', 'full', { name: 'Connect for Health Colorado', url: 'https://connectforhealthco.com/' }),
  S('CT', 'Connecticut', 'full', { name: 'Access Health CT', url: 'https://www.accesshealthct.com/' }),
  S('DE', 'Delaware'),
  S('DC', 'District of Columbia', 'full', { name: 'DC Health Link', url: 'https://dchealthlink.com/' }),
  S('FL', 'Florida', 'none'),
  S('GA', 'Georgia', 'to100', { name: 'Georgia Access', url: 'https://georgiaaccess.gov/' }),
  S('HI', 'Hawaii'),
  S('ID', 'Idaho', 'full', { name: 'Your Health Idaho', url: 'https://www.yourhealthidaho.org/' }),
  S('IL', 'Illinois', 'full', { name: 'Get Covered Illinois', url: 'https://getcovered.illinois.gov/' }),
  S('IN', 'Indiana'),
  S('IA', 'Iowa'),
  S('KS', 'Kansas', 'none'),
  S('KY', 'Kentucky', 'full', { name: 'kynect', url: 'https://kynect.ky.gov/' }),
  S('LA', 'Louisiana'),
  S('ME', 'Maine', 'full', { name: 'CoverME.gov', url: 'https://www.coverme.gov/' }),
  S('MD', 'Maryland', 'full', { name: 'Maryland Health Connection', url: 'https://www.marylandhealthconnection.gov/' }),
  S('MA', 'Massachusetts', 'full', { name: 'Massachusetts Health Connector', url: 'https://www.mahealthconnector.org/' }),
  S('MI', 'Michigan'),
  S('MN', 'Minnesota', 'full', { name: 'MNsure', url: 'https://www.mnsure.org/' }),
  S('MS', 'Mississippi', 'none'),
  S('MO', 'Missouri'),
  S('MT', 'Montana'),
  S('NE', 'Nebraska'),
  S('NV', 'Nevada', 'full', { name: 'Nevada Health Link', url: 'https://www.nevadahealthlink.com/' }),
  S('NH', 'New Hampshire'),
  S('NJ', 'New Jersey', 'full', { name: 'Get Covered New Jersey', url: 'https://nj.gov/getcoverednj/' }),
  S('NM', 'New Mexico', 'full', { name: 'beWellnm', url: 'https://www.bewellnm.com/' }),
  S('NY', 'New York', 'full', { name: 'NY State of Health', url: 'https://nystateofhealth.ny.gov/' }),
  S('NC', 'North Carolina'),
  S('ND', 'North Dakota'),
  S('OH', 'Ohio'),
  S('OK', 'Oklahoma'),
  S('OR', 'Oregon', 'full', { name: 'Oregon Health Insurance Marketplace', url: 'https://healthcare.oregon.gov/' }),
  S('PA', 'Pennsylvania', 'full', { name: 'Pennie', url: 'https://pennie.com/' }),
  S('RI', 'Rhode Island', 'full', { name: 'HealthSource RI', url: 'https://healthsourceri.com/' }),
  S('SC', 'South Carolina', 'none'),
  S('SD', 'South Dakota'),
  S('TN', 'Tennessee', 'none'),
  S('TX', 'Texas', 'none'),
  S('UT', 'Utah'),
  S('VT', 'Vermont', 'full', { name: 'Vermont Health Connect', url: 'https://info.healthconnect.vermont.gov/' }),
  S('VA', 'Virginia', 'full', { name: 'Virginia’s Insurance Marketplace', url: 'https://www.marketplace.virginia.gov/' }),
  S('WA', 'Washington', 'full', { name: 'Washington Healthplanfinder', url: 'https://www.wahealthplanfinder.org/' }),
  S('WV', 'West Virginia'),
  S('WI', 'Wisconsin', 'to100'),
  S('WY', 'Wyoming', 'none'),
];

export const LINKS = {
  healthcareGov: 'https://www.healthcare.gov/screener/',
  localHelp: 'https://localhelp.healthcare.gov/',
  medicaidState: 'https://www.medicaid.gov/about-us/beneficiary-resources/index.html',
  chip: 'https://www.insurekidsnow.gov/coverage',
  healthCenter: 'https://findahealthcenter.hrsa.gov/',
  medicare: 'https://www.medicare.gov/basics/get-started-with-medicare',
  msp: 'https://www.medicare.gov/basics/costs/help/medicare-savings-programs',
  hillBurton: 'https://www.hrsa.gov/get-health-care/affordable/hill-burton',
  sep: 'https://www.healthcare.gov/coverage-outside-open-enrollment/special-enrollment-period/',
  marketplacePhone: 'tel:18003182596',
};

export type Tone = 'free' | 'low' | 'gap' | 'full';
export interface Result {
  tone: Tone;
  who: string; // who this result is for
  title: string;
  body: string;
  cta: { label: string; url: string }[];
  track: string;
}

export interface Answers {
  state: string;
  size: number;
  income: number; // yearly household income
  kids: boolean;
  pregnant: boolean;
  senior: boolean;
  adults: boolean; // adults 19–64 need coverage
}

export function screen(a: Answers): { pct: number; line: number; results: Result[] } {
  const st = STATES.find((s) => s.code === a.state)!;
  const line = povertyLine(a.state, a.size);
  const pct = Math.round((a.income / line) * 100);
  const mkt = st.ex ?? { name: 'HealthCare.gov', url: LINKS.healthcareGov };
  const applyAll = { label: `Apply free at ${mkt.name}`, url: mkt.url };
  const medicaidDirect = { label: `Apply with ${st.name} Medicaid`, url: LINKS.medicaidState };
  const out: Result[] = [];

  if (a.kids) {
    if (pct <= 200)
      out.push({ tone: 'free', who: 'Your kids', title: 'Your kids may qualify for free coverage.', body: `At this income, children in ${st.name} often qualify for Medicaid or CHIP, which typically cover doctor visits, checkups, shots, dental, and prescriptions at low or no cost. You can apply any day of the year.`, cta: [{ label: 'Apply for kids’ coverage (CHIP)', url: LINKS.chip }, applyAll], track: 'kids_free' });
    else if (pct <= 300)
      out.push({ tone: 'low', who: 'Your kids', title: 'Your kids may qualify for free or low-cost CHIP.', body: `Many states cover children well above this income, often for a small monthly fee. ${st.name}’s limit decides it, so apply and let them check. You can apply any day of the year.`, cta: [{ label: 'Check kids’ coverage (CHIP)', url: LINKS.chip }, applyAll], track: 'kids_low' });
  }

  if (a.pregnant) {
    if (pct <= 200)
      out.push({ tone: 'free', who: 'Pregnancy', title: 'Pregnancy coverage may be free for you.', body: `Every state offers Medicaid for pregnancy, and many states cover pregnant people at or near this income, including prenatal care, delivery, and care after the birth. Limits differ by state, so apply and let your state decide.`, cta: [applyAll, medicaidDirect], track: 'preg_free' });
    else
      out.push({ tone: 'low', who: 'Pregnancy', title: 'Pregnancy is a reason to apply now.', body: `Some states cover pregnant people above this income. If you do not qualify, pregnancy can still be covered through a marketplace plan with help paying the premium.`, cta: [applyAll], track: 'preg_check' });
  }

  if (a.senior) {
    out.push({ tone: pct <= 135 ? 'free' : 'low', who: 'Age 65 and older', title: pct <= 135 ? 'Medicare, plus possible help paying for it.' : 'Medicare is the main coverage at 65.', body: pct <= 135 ? 'At this income, a Medicare Savings Program or Medicaid may help pay Medicare premiums and other costs. Rules also depend on savings and other assets, and your state decides.' : 'Many people get Part A without a premium after about 10 years of work. Signing up around your 65th birthday can help you avoid late-enrollment penalties.', cta: pct <= 135 ? [{ label: 'Get started with Medicare', url: LINKS.medicare }, { label: 'Medicare Savings Programs', url: LINKS.msp }] : [{ label: 'Get started with Medicare', url: LINKS.medicare }], track: 'senior' });
  }

  if (a.adults) {
    const limit = st.exp === 'full' ? 138 : st.exp === 'to100' ? 100 : 0;
    if (pct <= limit) {
      out.push({ tone: 'free', who: 'Adults', title: 'You may qualify for free Medicaid.', body: `${st.name} generally covers adults with income up to about ${limit}% of the poverty line, and you are at about ${pct}%. Medicaid often costs $0 per month, with little to pay at the doctor. You can apply any day of the year. Some states also require work or community activities for some adults, and your state makes the final decision.${st.code === 'GA' ? ' Georgia’s program (Pathways) requires 80 hours a month of work, school, or volunteering.' : ''}`, cta: [applyAll, medicaidDirect], track: 'adult_medicaid' });
    } else if (pct < 100) {
      out.push({ tone: 'gap', who: 'Adults', title: 'You may be in the coverage gap, but you still have free options.', body: `${st.name} has not expanded Medicaid, so adults without kids at this income often do not qualify, and marketplace help starts at 100% of the poverty line. Still apply, since parents, people with disabilities, and others can qualify. Community health centers treat you on a sliding scale, often for $0 to $40 a visit, and many hospitals must offer free or reduced-cost care.`, cta: [applyAll, { label: 'Find a free or low-cost clinic', url: LINKS.healthCenter }, { label: 'Free hospital care (Hill-Burton)', url: LINKS.hillBurton }], track: 'adult_gap' });
    } else if (pct <= 400) {
      out.push({ tone: 'low', who: 'Adults', title: 'You may qualify for help paying for a marketplace plan.', body: `At about ${pct}% of the poverty line, you may get a tax credit that lowers your monthly premium. The amount depends on current law, your age, and plans in your area. ${pct <= 250 ? 'Silver plans may also come with lower deductibles and copays at your income. ' : ''}Open Enrollment for 2027 generally runs November 1, 2026, to January 15, 2027, and some states differ. You may be able to sign up sooner if you recently lost coverage, moved, married, or had a baby.`, cta: [{ label: `See prices at ${mkt.name}`, url: mkt.url }, { label: 'Can I sign up now?', url: LINKS.sep }], track: 'adult_subsidy' });
    } else {
      out.push({ tone: 'full', who: 'Adults', title: 'You can compare marketplace plans.', body: `Above 400% of the poverty line, you may not get a premium tax credit under current law. Compare marketplace plans during Open Enrollment (November 1 to January 15), or look at other options below if you need coverage now.`, cta: [{ label: `Compare plans at ${mkt.name}`, url: mkt.url }], track: 'adult_full' });
    }
  }

  return { pct, line, results: out };
}

// Paid options for people who need coverage fast or fall outside free programs.
// To earn commission, set the env var named in `env` to the tracked affiliate link;
// until then the button goes straight to the provider.
export interface Offer {
  id: string;
  name: string;
  what: string;
  line: string;
  url: string;
  env: string;
  tag: string;
}

const pick = (v: string | undefined, fallback: string) => (v && /^https:\/\//.test(v) ? v : fallback);

export const OFFERS: Offer[] = [
  { id: 'ehealth-stm', name: 'eHealth', what: 'Short-term health plans', line: 'A third-party site for comparing short-term plans. Check plan limits and state availability before you buy.', url: pick(process.env.NEXT_PUBLIC_AFF_EHEALTH, 'https://www.ehealthinsurance.com/short-term-health-insurance'), env: 'NEXT_PUBLIC_AFF_EHEALTH', tag: 'Third-party site' },
  { id: 'pivot', name: 'Pivot Health', what: 'Short-term medical', line: 'A third-party short-term medical plan provider. Short-term plans are not available in every state.', url: pick(process.env.NEXT_PUBLIC_AFF_PIVOT, 'https://www.pivothealth.com/'), env: 'NEXT_PUBLIC_AFF_PIVOT', tag: 'Third-party site' },
  { id: 'dentalplans', name: 'DentalPlans.com', what: 'Dental savings plans', line: 'A third-party dental savings plan marketplace. Discount plans are not insurance.', url: pick(process.env.NEXT_PUBLIC_AFF_DENTALPLANS, 'https://www.dentalplans.com/'), env: 'NEXT_PUBLIC_AFF_DENTALPLANS', tag: 'Third-party site' },
  { id: 'vsp', name: 'VSP Individual', what: 'Vision insurance', line: 'A third-party provider of individual vision plans for eye exams, glasses, and contacts.', url: pick(process.env.NEXT_PUBLIC_AFF_VSP, 'https://www.vsp.com/'), env: 'NEXT_PUBLIC_AFF_VSP', tag: 'Third-party site' },
];
