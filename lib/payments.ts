// Stripe Payment Links (Island Global Company Stripe account). No API keys live in this repo:
// checkout happens entirely on buy.stripe.com, and Stripe redirects back to /plus?welcome=1.
export const PLUS_MONTHLY_URL = 'https://buy.stripe.com/eVq8wP6uHavs6kre6ecIE01';

// Paste the yearly ($59) Payment Link here once it exists; until then the page offers a yearly request form.
export const PLUS_YEARLY_URL: string | null = null;

// Topic sponsorships: $500 per section per month, paid by Stripe card invoice or Mercury wire/ACH invoice.
export const SPONSOR_MONTHLY_PRICE = 500;
