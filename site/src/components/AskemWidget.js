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
 */
const AskemWidget = ({ enabled, apiKey }) => {
  const hasStatisticsConsent = useGroupConsent('statistics');
  const [mounted, setMounted] = useState(false);
  const [askemTitle, setAskemTitle] = useState('');
  const scriptInjected = useRef(false);

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

  if (!clientReady) {
    return null;
  }

  if (!apiKey) {
    return <AskemWidgetMockup />;
  }
  return <div className="askem askem-hds-overrides" />;
};

AskemWidget.propTypes = {
  enabled: PropTypes.bool.isRequired,
  apiKey: PropTypes.string,
};

export default AskemWidget;
