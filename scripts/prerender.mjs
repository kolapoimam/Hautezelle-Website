// Runs after `vite build`. Writes a complete HTML page for every route so search engines
// and AI crawlers (which often skip JavaScript) see real content, titles, links and
// structured data. Also writes sitemap.xml, robots.txt, llms.txt and llms-full.txt.
// React replaces the static content in #root as soon as the app loads.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSchema } from '../seo/schema.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const site = JSON.parse(fs.readFileSync(path.join(root, 'data/site.json'), 'utf8'));
const b = site.business;
const BASE = (process.env.SITE_URL || b.url).replace(/\/$/, '');
b.url = BASE;
const today = new Date().toISOString().slice(0, 10);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const naira = (n) => `₦${Number(n).toLocaleString('en-NG')}`;
const urlFor = (p) => (p === '/' ? `${BASE}/` : `${BASE}${p}`);
const routes = Object.keys(site.pages);
const navNames = { '/': 'Home', '/shop': 'Shop', '/academy': 'Academy', '/services': 'Services', '/about': 'About', '/contact': 'Contact' };

// ---------- static page content (mirrors what the React pages show) ----------
const nav = () =>
  `<nav aria-label="Main"><a href="/"><strong>Hautezelle Studio</strong></a> · ${routes
    .filter((r) => r !== '/')
    .map((r) => `<a href="${r}">${navNames[r]}</a>`)
    .join(' · ')}</nav>`;

const contactBlock = () => `
<section aria-label="Contact">
  <h2>Order or ask a question</h2>
  <p><strong>${esc(b.name)}</strong>, ${esc(b.address.locality)}, ${esc(b.address.region)}, ${esc(b.address.countryName)}.
  Open ${esc(b.hours.display)}.</p>
  <p>Instagram DM: <a href="${b.instagramDM}" target="_blank" rel="noopener noreferrer">${esc(b.instagramHandle)}</a> · TikTok: <a href="${b.tiktok}" target="_blank" rel="noopener noreferrer">${esc(b.tiktokHandle)}</a> · <a href="${b.whatsapp}" target="_blank" rel="noopener noreferrer">${esc(b.whatsappLabel)}</a> · Email: <a href="mailto:${b.email}">${esc(b.email)}</a></p>
</section>`;

const productItems = (list) =>
  list
    .map(
      (p) => `<article id="${p.id}">
  <img src="${p.image}" alt="${esc(p.name)} handmade by Hautezelle in Ilorin, Nigeria" width="300" height="400" loading="lazy" />
  <h3>${esc(p.name)}</h3>
  <p><strong>From ${naira(p.price)}</strong> · ${esc(p.category)}</p>
  <p>${esc(p.description)}</p>
  <p><a href="${b.instagramDM}">Order via Instagram DM</a></p>
</article>`
    )
    .join('\n');

const faqBlock = () => `
<section aria-label="Frequently asked questions">
  <h2>Frequently asked questions</h2>
  ${site.faqs.map((f) => `<h3>${esc(f.q)}</h3>\n  <p>${esc(f.a)}</p>`).join('\n  ')}
</section>`;

const body = {
  '/': () => `
<section>
  <h2>Featured collections</h2>
  ${productItems(site.products.filter((p) => ['resin-wedding-plaque', 'acrylic-wedding-plaque', 'mini-wedding-plaque', 'resin-clock', 'luxury-pearl-bag', 'journal-gift-set'].includes(p.id)))}
  <p><a href="/shop">See all ${site.products.length} pieces in the shop</a></p>
</section>
<section>
  <h2>Learn resin art</h2>
  <p>${site.courses.map((c) => `${esc(c.name)} from ${naira(c.price)}`).join(', ')}. <a href="/academy">Visit the Academy</a>.</p>
</section>
${faqBlock()}`,
  '/shop': () => `<section><h2>All pieces</h2>${productItems(site.products)}</section>`,
  '/academy': () => `
<section>
  <h2>Our Curriculum</h2>
  ${site.courses
    .map(
      (c) => `<article><h3>${esc(c.name)}</h3><p><strong>From ${naira(c.price)}</strong> · ${esc(c.level)}</p><p>${esc(c.description)}</p><ul>${c.topics
        .map((t) => `<li>${esc(t)}</li>`)
        .join('')}</ul><p><a href="${b.instagramDM}">Enrol via Instagram DM</a></p></article>`
    )
    .join('\n  ')}
</section>
<section>
  <h2>Learn Your Way</h2>
  ${site.learningModes.map((m) => `<h3>${esc(m.name)}</h3><p>${esc(m.description)}</p>`).join('\n  ')}
</section>`,
  '/services': () => `
<section>
  ${site.services.map((s) => `<article><h2>${esc(s.name)}</h2><p>${esc(s.description)}</p><p><a href="${b.instagramDM}">Book via Instagram DM</a></p></article>`).join('\n  ')}
</section>`,
  '/about': () => `
<section>
  <h2>Our Mission</h2><p>${esc(site.about.mission)}</p>
  <h2>Our Vision</h2><p>${esc(site.about.vision)}</p>
  <h2>Our Values</h2><p>${esc(site.about.values)}</p>
</section>
<section>
  <h2>The Minds Behind The Art</h2>
  ${b.founders.map((f) => `<article><img src="${f.image}" alt="${esc(f.name)}" width="160" height="160" loading="lazy" /><h3>${esc(f.name)}</h3><p>${esc(f.jobTitle)}</p></article>`).join('\n  ')}
</section>`,
  '/contact': () => '',
};

const PRERENDER_CSS = `<style>#prerender{font-family:Gambetta,Georgia,serif;color:#13201f}#prerender h1,#prerender h2,#prerender h3{font-family:Gambetta,Georgia,serif;color:#0d7a74;line-height:1.2}#prerender h1{font-size:2.6rem;margin:1.5rem 0 1rem}#prerender h2{font-size:1.7rem;margin:2.2rem 0 .8rem}#prerender h3{font-size:1.25rem;margin:1.4rem 0 .4rem}#prerender p{margin:.4rem 0}#prerender a{color:#0d7a74;text-decoration:underline}#prerender img{border-radius:12px;max-width:100%;height:auto}#prerender nav{font-size:.9rem}#prerender article{margin-bottom:1.6rem}</style>`;

const staticContent = (p) => {
  const page = site.pages[p];
  return `${PRERENDER_CSS}<div id="prerender" style="max-width:880px;margin:0 auto;padding:110px 24px 64px;line-height:1.6">
${nav()}
<header>
  <h1>${esc(page.h1)}</h1>
  <p>${esc(page.lead)}</p>
</header>
<main>
${body[p]()}
${contactBlock()}
</main>
<footer><p>© ${new Date().getFullYear()} ${esc(b.name)}. ${esc(b.tagline)}.</p></footer>
</div>`;
};

// ---------- head ----------
const headFor = (p, { noindex = false } = {}) => {
  const page = site.pages[p] || site.pages['/'];
  const url = urlFor(p);
  const img = `${BASE}${b.ogImage}`;
  const tags = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta name="keywords" content="${esc(page.keywords)}" />`,
    noindex ? '<meta name="robots" content="noindex, follow" />' : `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="en-ng" href="${url}" />`,
    `<link rel="alternate" hreflang="x-default" href="${url}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    p === '/' ? `<link rel="preload" as="image" href="${b.image}" fetchpriority="high" />` : '',
    `<script type="application/ld+json" id="structured-data">${JSON.stringify(buildSchema(site, p)).replace(/</g, '\\u003c')}</script>`,
  ];
  return tags.filter(Boolean).join('\n    ');
};

const render = (p, opts) => {
  let html = template.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, headFor(p, opts));
  html = html.replace('<div id="root"></div>', `<div id="root">${opts?.content ?? staticContent(p)}</div>`);
  if (opts?.noindex) html = html.replace(/<meta name="robots" content="index[^"]*" \/>\n?/, '');
  return html;
};

for (const p of routes) {
  const file = p === '/' ? 'index.html' : `${p.slice(1)}.html`;
  fs.writeFileSync(path.join(dist, file), render(p));
}
fs.writeFileSync(
  path.join(dist, '404.html'),
  render('/', {
    noindex: true,
    content: `${PRERENDER_CSS}<div id="prerender" style="max-width:880px;margin:0 auto;padding:110px 24px">${nav()}<h1>Page not found</h1><p>That page does not exist. <a href="/">Go to the Hautezelle home page</a> or <a href="/shop">browse the shop</a>.</p></div>`,
  })
);

// ---------- sitemap.xml ----------
const priority = { '/': '1.0', '/shop': '0.9', '/academy': '0.9', '/services': '0.8', '/about': '0.6', '/contact': '0.7' };
const imagesFor = (p) => {
  if (p === '/shop') return site.products.map((x) => ({ loc: x.image, title: x.name }));
  if (p === '/about') return b.founders.map((f) => ({ loc: f.image, title: f.name }));
  return [{ loc: b.image, title: 'Hautezelle Studio' }];
};
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
  .map(
    (p) => `  <url>
    <loc>${urlFor(p)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p === '/shop' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priority[p]}</priority>
${imagesFor(p)
  .map((i) => `    <image:image><image:loc>${BASE}${i.loc}</image:loc><image:title>${esc(i.title)}</image:title></image:image>`)
  .join('\n')}
  </url>`
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

// ---------- robots.txt (search engines and AI assistants are welcome) ----------
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot', 'Applebot-Extended', 'Bingbot', 'CCBot', 'meta-externalagent', 'Amazonbot', 'DuckAssistBot', 'YouBot'];
const robots = `# Hautezelle Studio. Search engines and AI assistants are welcome.
User-agent: *
Allow: /

${aiBots.map((u) => `User-agent: ${u}\nAllow: /`).join('\n\n')}

Sitemap: ${BASE}/sitemap.xml
`;
fs.writeFileSync(path.join(dist, 'robots.txt'), robots);

// ---------- llms.txt and llms-full.txt ----------
const llms = `# ${b.name}

> ${b.description}

Location: ${b.address.locality}, ${b.address.region}, ${b.address.countryName}. Open ${b.hours.display}.
Orders and enquiries: Instagram DM ${b.instagramHandle} (${b.instagramDM}), WhatsApp chat (${b.whatsapp}), email ${b.email}.
Founder: ${b.founders[0].name}, ${b.founders[0].jobTitle}.
Prices are in Nigerian naira and start from the amounts listed. Every piece is handmade to order and can be personalised.

## Pages

${routes.map((p) => `- [${navNames[p]}](${urlFor(p)}): ${site.pages[p].description}`).join('\n')}

## Products

${site.products.map((p) => `- ${p.name}: from ${naira(p.price)}. ${p.description}`).join('\n')}

## Academy courses

${site.courses.map((c) => `- ${c.name} (${c.level}): from ${naira(c.price)}. ${c.description}`).join('\n')}

## Services

${site.services.map((s) => `- ${s.name}: ${s.description}`).join('\n')}

## Optional

- [Full details for AI assistants](${BASE}/llms-full.txt)
- [Sitemap](${BASE}/sitemap.xml)
- [Instagram](${b.instagram})
`;

const llmsFull = `# ${b.name}: full details

> ${b.description}

## Key facts

- Name: ${b.name} (also known as Hautezelle)
- What we do: handmade luxury resin art, personalised wedding plaques, home decor, accessories, stationery, gifts and corporate souvenirs, plus resin art training and Resin N Sip events
- Location: ${b.address.locality}, ${b.address.region}, ${b.address.countryName}
- Opening hours: ${b.hours.display}
- Areas served: ${b.areaServed.join(', ')}
- Price range: ${b.priceRange}
- How to order: send a DM to ${b.instagramHandle} on Instagram (${b.instagramDM})
- WhatsApp: ${b.whatsapp}
- Email: ${b.email}
- Website: ${BASE}
- Team: ${b.founders.map((f) => `${f.name} (${f.jobTitle})`).join('; ')}

## About

Mission: ${site.about.mission}

Vision: ${site.about.vision}

Values: ${site.about.values}

## Products and prices

${site.products
  .map((p) => `### ${p.name}\n\n- Category: ${p.category}\n- Price: from ${naira(p.price)}\n- Image: ${BASE}${p.image}\n\n${p.description}\n`)
  .join('\n')}
## Hautezelle Resin Art Academy

${site.courses.map((c) => `### ${c.name}\n\n- Level: ${c.level}\n- Price: from ${naira(c.price)}\n- Topics: ${c.topics.join(', ')}\n\n${c.description}\n`).join('\n')}
How you can learn:

${site.learningModes.map((m) => `- ${m.name}: ${m.description}`).join('\n')}

## Services

${site.services.map((s) => `### ${s.name}\n\n${s.description}\n`).join('\n')}
## Frequently asked questions

${site.faqs.map((f) => `### ${f.q}\n\n${f.a}\n`).join('\n')}`;

fs.writeFileSync(path.join(dist, 'llms.txt'), llms);
fs.writeFileSync(path.join(dist, 'llm.txt'), llms);
fs.writeFileSync(path.join(dist, 'llms-full.txt'), llmsFull);

console.log(`prerendered ${routes.length} pages + 404, sitemap, robots, llms.txt for ${BASE}`);
