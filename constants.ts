// Every call to action on the site opens a DM with Hautezelle on Instagram.
export const INSTAGRAM_HANDLE = 'hautezelle';
export const INSTAGRAM_DM = `https://ig.me/m/${INSTAGRAM_HANDLE}`;
export const INSTAGRAM_PROFILE = `https://instagram.com/${INSTAGRAM_HANDLE}`;

import site from './data/site.json';

// Change the live address in data/site.json (business.url) when a custom domain is connected.
export const SITE_URL = site.business.url;
export const img = (name: string) => `/images/${name}`;
