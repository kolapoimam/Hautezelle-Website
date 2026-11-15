// Every call to action on the site opens a DM with Hautezelle on Instagram.
export const INSTAGRAM_HANDLE = 'hautezelle';
export const INSTAGRAM_DM = `https://ig.me/m/${INSTAGRAM_HANDLE}`;
export const INSTAGRAM_PROFILE = `https://instagram.com/${INSTAGRAM_HANDLE}`;

import site from './data/site.json';

// Change the live address in data/site.json (business.url) when a custom domain is connected.
export const SITE_URL = site.business.url;
export const img = (name: string) => `/images/${name}`;

// Other channels. Every social link opens in a new tab.
export const TIKTOK_HANDLE = 'hautezelle';
export const TIKTOK_PROFILE = `https://www.tiktok.com/@${TIKTOK_HANDLE}`;
export const WHATSAPP_NUMBER = '2349030799342';
export const WHATSAPP_CHAT = `https://wa.me/${WHATSAPP_NUMBER}`;
