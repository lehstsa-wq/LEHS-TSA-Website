import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

const SITE_NAME = 'Little Elm TSA';
const DEFAULT_DESC = 'Little Elm High School Technology Student Association. Compete. Innovate. Lead.';
const DEFAULT_IMAGE = '/assets/og-image.png';

const setMeta = (selector: string, attr: string, value: string) => {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const [attrName, attrVal] = selector.replace('meta[', '').replace(']', '').split('=');
    el.setAttribute(attrName.trim(), attrVal.replace(/"/g, '').trim());
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

export const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const desc = description || DEFAULT_DESC;
    const img = image || DEFAULT_IMAGE;
    const pageUrl = url || window.location.href;

    document.title = fullTitle;

    // Standard
    setMeta('meta[name="description"]',           'content', desc);

    // Open Graph
    setMeta('meta[property="og:title"]',          'content', fullTitle);
    setMeta('meta[property="og:description"]',    'content', desc);
    setMeta('meta[property="og:image"]',          'content', img);
    setMeta('meta[property="og:url"]',            'content', pageUrl);
    setMeta('meta[property="og:type"]',           'content', 'website');
    setMeta('meta[property="og:site_name"]',      'content', SITE_NAME);

    // Twitter Card
    setMeta('meta[name="twitter:card"]',          'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]',         'content', fullTitle);
    setMeta('meta[name="twitter:description"]',   'content', desc);
    setMeta('meta[name="twitter:image"]',         'content', img);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link') as HTMLLinkElement;
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;
  }, [title, description, image, url]);

  return null;
};
