/**
 * Google Analytics 4, loaded only when VITE_GA_MEASUREMENT_ID is set.
 *
 * With no ID configured nothing is injected and no request leaves the browser,
 * so the site ships without a third-party tag until someone opts in.
 */

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let loaded = false;

export const analyticsEnabled = (): boolean =>
  Boolean(MEASUREMENT_ID) && typeof window !== 'undefined';

export const initAnalytics = (): void => {
  if (loaded || !analyticsEnabled()) return;
  loaded = true;

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) { window.dataLayer!.push(args); };
  window.gtag('js', new Date());
  // Page views are sent per route change below, not on script load, because a
  // hash-router navigation never triggers a fresh document load.
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });
};

export const trackPageView = (path: string, title?: string): void => {
  if (!analyticsEnabled() || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
};
