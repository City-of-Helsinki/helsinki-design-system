import React, { useEffect, useRef, useState } from 'react';
import { useGroupConsent } from 'hds-react';
import PropTypes from 'prop-types';

import './AskemWidget.scss';
import AskemWidgetMockup from './AskemWidgetMockup';

const ASKEM_SCRIPT_URL = 'https://cdn.askem.com/plugin/askem.js';

/**
 * Askem feedback widget. Shown only on non-frontpage pages.
 * On production (hds.hel.fi) and test (city-of-helsinki.github.io) loads the real widget (when statistics consent is given);
 * on other hosts shows a dummy placeholder.
 * Pass `routeKey` (e.g. path without version) so `window.askem.reset()` runs on SPA navigation.
 */
const AskemWidget = ({ enabled, apiKey, routeKey }) => {
  const hasStatisticsConsent = useGroupConsent('statistics');
  const [mounted, setMounted] = useState(false);
  const [askemTitle, setAskemTitle] = useState('');
  const scriptInjected = useRef(false);
  const prevRouteKeyRef = useRef(undefined);

  useEffect(() => {
    if (globalThis.window === undefined) {
      return;
    }
    const host = globalThis.window.location.hostname;
    setAskemTitle(
      host === 'hds.hel.fi' ? 'Helsinki Design System' : 'Helsinki Design System Test',
    );
    setMounted(true);
  }, []);

  // Parent enabled + client hydrated: safe to render any Askem UI.
  const clientReady = enabled && mounted;

  // Inject script only when needed conditions are met.
  useEffect(() => {
    if (
      !clientReady ||
      !hasStatisticsConsent ||
      !apiKey ||
      scriptInjected.current
    ) {
      return;
    }
    scriptInjected.current = true;
    globalThis.window.askem = {
      settings: {
        apiKey,
        title: askemTitle,
        disableFonts: true,
      },
    };
    const s = document.createElement('script');
    s.src = ASKEM_SCRIPT_URL;
    document.body.appendChild(s);
  }, [clientReady, hasStatisticsConsent, apiKey, askemTitle]);

  // Askem SPA: reset widget state on client-side route changes (see Askem docs).
  useEffect(() => {
    if (!clientReady || !apiKey || !hasStatisticsConsent || routeKey === undefined) {
      return;
    }

    const prev = prevRouteKeyRef.current;
    if (prev !== undefined && prev !== routeKey) {
      const tryReset = () => {
        const reset = globalThis.window?.askem?.reset;
        if (typeof reset === 'function') {
          reset();
          return true;
        }
        return false;
      };
      if (!tryReset()) {
        requestAnimationFrame(() => {
          tryReset();
        });
      }
    }
    prevRouteKeyRef.current = routeKey;
  }, [routeKey, clientReady, apiKey, hasStatisticsConsent]);

  if (!clientReady) {
    return null;
  }

  if (!apiKey) {
    return <AskemWidgetMockup routeKey={routeKey} />;
  }
  return <div className="askem askem-hds-overrides" />;
};

AskemWidget.propTypes = {
  enabled: PropTypes.bool.isRequired,
  apiKey: PropTypes.string,
  routeKey: PropTypes.string,
};

export default AskemWidget;
