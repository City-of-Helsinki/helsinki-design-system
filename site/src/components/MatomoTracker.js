import { useEffect, useRef } from 'react';
import { useGroupConsent } from 'hds-react';

/**
 * Matomo analytics tracker component.
 * Only loads and initializes Matomo tracking when the user has given consent
 * for the "statistics" cookie group via the HDS CookieConsent banner.
 */
const MatomoTracker = () => {
  const hasStatisticsConsent = useGroupConsent('statistics');
  const matomoInitialized = useRef(false);

  useEffect(() => {
    if (hasStatisticsConsent && !matomoInitialized.current) {
      matomoInitialized.current = true;

      // Initialize Matomo
      const _paq = (window._paq = window._paq || []);
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);

      const u = 'https://matomo.hel.fi/';
      _paq.push(['setTrackerUrl', u + 'matomo.php']);
      _paq.push(['setSiteId', '63']);

      const d = document;
      const g = d.createElement('script');
      const s = d.getElementsByTagName('script')[0];
      g.async = true;
      g.src = u + 'matomo.js';
      s.parentNode.insertBefore(g, s);
    }
  }, [hasStatisticsConsent]);

  // Track page views on route changes (Gatsby SPA navigation)
  useEffect(() => {
    if (hasStatisticsConsent && typeof window !== 'undefined' && window._paq) {
      window._paq.push(['setCustomUrl', window.location.pathname + window.location.search]);
      window._paq.push(['setDocumentTitle', document.title]);
      window._paq.push(['trackPageView']);
    }
  });

  return null;
};

export default MatomoTracker;
