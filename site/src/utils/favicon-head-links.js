import React from 'react';

/** Favicon and apple-touch-icon links (matches former Seo.js Helmet output). */
const FAVICON_LINKS = [
  {
    rel: 'icon',
    type: 'image/svg+xml',
    href: '/favicon/light/favicon.svg',
    media: '(prefers-color-scheme: light)',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    href: '/favicon/light/favicon-192x192.png',
    media: '(prefers-color-scheme: light)',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '512x512',
    href: '/favicon/light/favicon-512x512.png',
    media: '(prefers-color-scheme: light)',
  },
  {
    rel: 'apple-touch-icon',
    href: '/favicon/light/apple-touch-icon.png',
    media: '(prefers-color-scheme: light)',
  },
  {
    rel: 'icon',
    sizes: 'any',
    href: '/favicon/light/favicon-32x32.ico',
    media: '(prefers-color-scheme: light)',
  },
  {
    rel: 'icon',
    type: 'image/svg+xml',
    href: '/favicon/dark/favicon.svg',
    media: '(prefers-color-scheme: dark)',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    href: '/favicon/dark/favicon-192x192.png',
    media: '(prefers-color-scheme: dark)',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '512x512',
    href: '/favicon/dark/favicon-512x512.png',
    media: '(prefers-color-scheme: dark)',
  },
  {
    rel: 'apple-touch-icon',
    href: '/favicon/dark/apple-touch-icon.png',
    media: '(prefers-color-scheme: dark)',
  },
  {
    rel: 'icon',
    sizes: 'any',
    href: '/favicon/dark/favicon-32x32.ico',
    media: '(prefers-color-scheme: dark)',
  },
  // Fallback when the browser does not support media on icon links.
  {
    rel: 'icon',
    type: 'image/svg+xml',
    href: '/favicon/light/favicon.svg',
  },
  {
    rel: 'icon',
    sizes: 'any',
    href: '/favicon/light/favicon-32x32.ico',
  },
];

/**
 * @param {(path: string) => string} withPrefix Gatsby withPrefix (or identity)
 * @returns {import('react').ReactElement[]}
 */
export function getFaviconHeadComponents(withPrefix) {
  const prefix = typeof withPrefix === 'function' ? withPrefix : (path) => path;

  return FAVICON_LINKS.map((link, index) => {
    const props = {
      key: `hds-favicon-${index}`,
      rel: link.rel,
      href: prefix(link.href),
    };

    if (link.type) {
      props.type = link.type;
    }
    if (link.sizes) {
      props.sizes = link.sizes;
    }
    if (link.media) {
      props.media = link.media;
    }

    return React.createElement('link', props);
  });
}
