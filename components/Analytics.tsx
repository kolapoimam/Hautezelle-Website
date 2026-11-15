import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { track, pageType, slug } from '../lib/analytics';

/** Readable name for the part of the page an element sits in. */
const sectionOf = (el: Element): string => {
  if (el.closest('[role="dialog"]')) return 'cart';
  if (el.closest('nav')) return 'header';
  if (el.closest('footer')) return 'footer';
  const section = el.closest('[data-section], section');
  if (!section) return 'page';
  const named = (section as HTMLElement).dataset.section || section.id;
  if (named) return slug(named);
  const heading = section.querySelector('h1, h2');
  return heading?.textContent ? slug(heading.textContent) : 'section';
};

/** The nearest card or block heading, so "Register" in the Masterclass card reads as Masterclass. */
const contextOf = (el: Element): string | undefined => {
  const box = el.closest('article, figure, li, details, form');
  const heading = box?.querySelector('h2, h3, summary');
  return heading?.textContent?.trim() || undefined;
};

const textOf = (el: HTMLElement) =>
  (el.getAttribute('aria-label') || el.textContent || el.getAttribute('title') || '').replace(/\s+/g, ' ').trim();

/** Sorts a link into a channel so reports can split Instagram, TikTok, WhatsApp, email and outbound. */
const channelOf = (href: string): { event: string; channel: string } => {
  if (/instagram\.com|ig\.me/.test(href)) return { event: 'click_social', channel: /ig\.me/.test(href) ? 'instagram_dm' : 'instagram' };
  if (/tiktok\.com/.test(href)) return { event: 'click_social', channel: 'tiktok' };
  if (/wa\.me|whatsapp\.com/.test(href)) return { event: 'click_social', channel: 'whatsapp' };
  if (href.startsWith('mailto:')) return { event: 'click_contact', channel: 'email' };
  try {
    const u = new URL(href, window.location.href);
    if (u.host !== window.location.host) return { event: 'click_outbound', channel: u.host.replace(/^www\./, '') };
    if (u.pathname === window.location.pathname && u.hash) return { event: 'click_anchor', channel: 'same_page' };
  } catch {
    /* ignore malformed hrefs */
  }
  return { event: 'click_internal', channel: 'site' };
};

const Analytics: React.FC = () => {
  const location = useLocation();
  const pageStart = useRef(Date.now());

  // Page views, scroll depth, section views and time on page, reset on every route change.
  useEffect(() => {
    const path = location.pathname + location.search;
    const type = pageType(location.pathname);
    pageStart.current = Date.now();

    // Wait a beat so the SEO component has set the new title.
    const pv = window.setTimeout(() => {
      track('page_view', {
        page_location: window.location.href,
        page_path: path,
        page_title: document.title,
        page_type: type,
        page_referrer: document.referrer || undefined,
      });
    }, 80);

    // Scroll depth milestones.
    const marks = [25, 50, 75, 90, 100];
    const hit = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max <= 0 ? 100 : Math.round((window.scrollY / max) * 100);
      for (const m of marks) {
        if (pct >= m && !hit.has(m)) {
          hit.add(m);
          track('scroll_depth', { percent_scrolled: m, page_type: type });
        }
      }
    };
    // Start listening once the page has scrolled back to the top, so the old page's position is not counted.
    const listen = window.setTimeout(() => window.addEventListener('scroll', onScroll, { passive: true }), 400);

    // Each section counts as seen once half of it has been on screen.
    let io: IntersectionObserver | undefined;
    const seen = new Set<Element>();
    const observe = window.setTimeout(() => {
      if (!('IntersectionObserver' in window)) return;
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting && !seen.has(e.target)) {
              seen.add(e.target);
              track('section_view', { section_name: sectionOf(e.target), page_type: type });
            }
          }
        },
        { threshold: 0.5 },
      );
      document.querySelectorAll('main section').forEach((s) => io!.observe(s));
    }, 400);

    // Engaged time on this page, sent when the visitor moves on or leaves.
    let sent = false;
    const sendTime = () => {
      if (sent) return;
      sent = true;
      const seconds = Math.round((Date.now() - pageStart.current) / 1000);
      if (seconds >= 1) track('page_time', { seconds_on_page: seconds, page_type: type, max_scroll: Math.max(0, ...hit) });
    };
    const onHide = () => document.visibilityState === 'hidden' && sendTime();
    document.addEventListener('visibilitychange', onHide);

    return () => {
      sendTime();
      window.clearTimeout(pv);
      window.clearTimeout(listen);
      window.clearTimeout(observe);
      io?.disconnect();
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onHide);
    };
  }, [location.pathname, location.search]);

  // Every link and button click, with where it was and what it said.
  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      const el = (ev.target as Element | null)?.closest('a, button, summary') as HTMLElement | null;
      if (!el || el.closest('[data-track-skip]')) return;
      const page_type = pageType(window.location.pathname);
      const base = {
        link_text: textOf(el),
        ui_section: sectionOf(el),
        ui_context: contextOf(el),
        page_type,
      };
      if (el.tagName === 'A') {
        const href = (el as HTMLAnchorElement).getAttribute('href') || '';
        const { event, channel } = channelOf(href);
        track(event, { ...base, link_url: (el as HTMLAnchorElement).href, channel, element: el.classList.contains('btn') || /btn-/.test(el.className) ? 'button' : 'link' });
      } else if (el.tagName === 'BUTTON') {
        track('click_button', { ...base, element: 'button' });
      }
    };
    document.addEventListener('click', onClick, true);

    // JavaScript errors, so broken pages show up in reports.
    const onError = (e: ErrorEvent) => track('exception', { description: `${e.message} @ ${e.filename?.split('/').pop()}:${e.lineno}`, fatal: false });
    const onRejection = (e: PromiseRejectionEvent) => track('exception', { description: `promise: ${String(e.reason).slice(0, 80)}`, fatal: false });
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);

    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);

  return null;
};

export default Analytics;
