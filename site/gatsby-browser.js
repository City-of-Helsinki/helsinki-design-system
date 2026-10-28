/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

const React = require('react');
const Layout = require('./src/components/layout').default;

// Wraps every page in a component
exports.wrapPageElement = ({ element, props }) => {
  if (props.location.pathname.includes('this-is-hds')) return <React.Fragment {...props}>{element}</React.Fragment>;
  return <Layout {...props}>{element}</Layout>;
};

// Handle in-page anchor links ourselves.
//
// The doc pages render markdown links like [text](#slug) and heading permalink
// icons as plain native <a href="#slug"> elements. Clicking one changes the hash
// via the browser (a `hashchange`, not a `popstate`), so it never reaches
// Gatsby/reach-router's scroll handler — meanwhile Gatsby's scroll restoration
// interferes with the native jump, which is why these links needed two clicks.
//
// A document-level delegated click listener (added once, persists across
// client-side route changes) intercepts same-page hash links and scrolls to the
// target itself, so they work on the first click. Cross-page and external links
// are left untouched.
//
// This covers only same-page hash *clicks*. The other two hash cases are handled
// elsewhere and are intentionally left alone: initial page load and cross-page
// navigation are scrolled by gatsby-remark-autolink-headers' onInitialClientRender
// / shouldUpdateScroll, and Layout's useEffect (src/components/layout.js) focuses
// the anchor when location.hash changes via the router. Keep these three in sync
// if you change one.
const getHashTarget = (hash) => {
  if (!hash || hash === '#') return null;
  const raw = hash.slice(1);
  let id = raw;
  try {
    id = decodeURIComponent(raw);
  } catch {
    // Malformed percent-encoding — fall back to the raw id.
  }
  return document.getElementById(id);
};

exports.onClientEntry = () => {
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    const target = event.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest('a[href]');
    // Respect anchors that request a different browsing context or a download.
    if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;

    const url = new URL(anchor.href, window.location.href);
    // Only handle links that stay on the current page and point at a hash.
    if (url.origin !== window.location.origin) return;
    if (url.pathname !== window.location.pathname || url.search !== window.location.search) return;
    const el = getHashTarget(url.hash);
    if (!el) return;

    event.preventDefault();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', url.hash);
    }
    // Move focus to the target for keyboard/screen-reader users.
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  });
};

