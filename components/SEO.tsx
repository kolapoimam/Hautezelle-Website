import React, { useEffect } from 'react';
import site from '../data/site.json';
import { buildSchema } from '../seo/schema.js';

// Keeps the <head> in step with the current page when visitors navigate inside the app.
// The same values are written into static HTML at build time by scripts/prerender.mjs,
// so crawlers that do not run JavaScript still get them.

type PagePath = keyof typeof site.pages;

interface SEOProps {
  page: PagePath;
}

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const SEO: React.FC<SEOProps> = ({ page }) => {
  useEffect(() => {
    const meta = site.pages[page];
    const base = site.business.url;
    const url = page === '/' ? `${base}/` : `${base}${page}`;
    const image = `${base}${site.business.ogImage}`;

    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setMeta('name', 'keywords', meta.keywords);
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    setMeta('name', 'twitter:image', image);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);

    let script = document.getElementById('structured-data');
    if (!script) {
      script = document.createElement('script');
      script.id = 'structured-data';
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(buildSchema(site, page));
  }, [page]);

  return null;
};

export default SEO;
