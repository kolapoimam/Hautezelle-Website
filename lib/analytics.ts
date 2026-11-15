/**
 * Google Analytics 4 helpers for Hautezelle.
 *
 * gtag.js is loaded in index.html with send_page_view turned off. Page views are sent here on every
 * route change, so each visit counts once, including the first page. Ecommerce events use GA4's
 * recommended names (view_item_list, add_to_cart, view_cart, begin_checkout, generate_lead) so they
 * fill the built-in Monetisation reports. Every price is the "from" price in NGN.
 */
import { Product } from '../types';

export const GA_ID = 'G-5K6CX06E5S';
export const CURRENCY = 'NGN';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

type Params = Record<string, string | number | boolean | undefined | null | object>;

const isDebug = () => {
  try {
    return /[?&]ga_debug=1/.test(window.location.search) || window.sessionStorage.getItem('ga_debug') === '1';
  } catch {
    return false;
  }
};

/** Sends one GA4 event. Safe to call before gtag loads, with an ad blocker, or during prerender. */
export function track(name: string, params: Params = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  const clean: Params = {};
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === '') continue;
    clean[k] = typeof v === 'string' ? v.slice(0, 100) : v;
  }
  if (isDebug()) clean.debug_mode = true;
  window.gtag('event', name, clean);
}

/** "From ₦35,000" becomes 35000. */
export const priceFrom = (p: Product) => Number((p.priceRange.match(/[\d,]+/) || ['0'])[0].replace(/,/g, '')) || 0;
export const naira = (n: number) => `₦${n.toLocaleString('en-NG')}`;

/** The price of one piece at a given quantity, using bulk tiers where the product has them. */
export const unitPrice = (p: Product, qty = 1) => {
  const tier = [...(p.bulkPricing || [])].sort((a, b) => b.minQty - a.minQty).find((t) => qty >= t.minQty);
  return tier ? tier.price : priceFrom(p);
};

/** Short text for a product's bulk tiers, e.g. "51+ pieces ₦5,000 each · 100+ pieces ₦4,000 each". */
export const bulkSummary = (p: Product) =>
  (p.bulkPricing || [])
    .slice()
    .sort((a, b) => a.minQty - b.minQty)
    .map((t) => `${t.minQty}+ pieces ${naira(t.price)} each`)
    .join(' · ');

/** A product in the GA4 item shape. */
export const gaItem = (p: Product, extra: { quantity?: number; index?: number; item_list_name?: string; item_list_id?: string } = {}) => ({
  item_id: p.id,
  item_name: p.name,
  item_brand: 'Hautezelle',
  item_category: p.category,
  price: unitPrice(p, extra.quantity ?? 1),
  quantity: extra.quantity ?? 1,
  ...(extra.index !== undefined ? { index: extra.index } : {}),
  ...(extra.item_list_name ? { item_list_name: extra.item_list_name } : {}),
  ...(extra.item_list_id ? { item_list_id: extra.item_list_id } : {}),
});

export const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 60);

/** The page a path belongs to, used as page_type on every event. */
export const pageType = (path: string) => {
  const p = path.replace(/\/+$/, '') || '/';
  if (p === '/') return 'home';
  return p.slice(1).split('/')[0] || 'home';
};
