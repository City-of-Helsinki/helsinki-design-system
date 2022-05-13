import React, { useState } from 'react';

import { SupportedLanguage } from './CookieConsentContext';
import { ConsentsInModal } from './consentsInModal/ConsentsInModal';
import { ConsentsInPage } from './consentsInPage/ConsentsInPage';
import { getConsentStatus, hasHandledAllConsents } from './util';
import { ContentSource, pickConsentIdsFromContentSource } from './content.builder';

export default {
  component: ConsentsInModal,
  title: 'Components/CookieConsent',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

const getContentSource = (options: Partial<ContentSource>): ContentSource => {
  const { language, currentLanguage, onAllConsentsGiven, onConsentsParsed } = options;
  return {
    siteName: 'Sivuston XXX',
    currentLanguage,
    groups: [
      {
        commonGroup: 'essential',
        required: true,
        cookies: [
          {
            commonCookie: 'tunnistamo',
          },
          {
            id: 'loadbalancer',
            name: 'Kuormanjako',
            hostName: 'Osoite',
            path: 'Polku',
            description:
              'Kuvaus lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
            expiration: 'Voimassaoloaika',
            required: true,
          },
          {
            commonCookie: 'language-i18n',
            required: true,
          },
        ],
      },
      {
        commonGroup: 'marketing',
        required: false,
        cookies: [
          {
            commonCookie: 'marketing',
          },
        ],
      },
      {
        commonGroup: 'preferences',
        required: false,
        cookies: [
          {
            id: 'preferences',
            name: 'Asetus 1',
            hostName: 'Osoite',
            path: 'Polku',
            description:
              'Proin sodales maximus est, pulvinar tempus felis tempus quis. Aenean at vestibulum lectus. Aliquam erat volutpat. Nullam venenatis feugiat sem vitae cursus. ',
            expiration: 'Voimassaoloaika',
          },
        ],
      },
      {
        commonGroup: 'statistics',
        required: false,
        cookies: [
          {
            commonCookie: 'matomo',
          },
          {
            id: 'someOtherConsent',
            name: 'Joku toinen',
            hostName: 'Osoite',
            path: 'Polku',
            description: 'Vel est molestie Quisque vel dui vel est molestie con con',
            expiration: 'Voimassaoloaika',
          },
        ],
      },
    ],
    language,
    onAllConsentsGiven,
    onConsentsParsed,
  };
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const ModalVersion = (args) => {
  const [language, setLanguage] = useState<SupportedLanguage>('fi');
  const onLanguageChange = (newLang) => setLanguage(newLang);
  const focusedElementAfterCloseId = 'focused-element-after-cookie-consent-closed';

  const contentSource = getContentSource({
    currentLanguage: language,
    language: {
      onLanguageChange,
    },
    onAllConsentsGiven: (consents) => {
      if (consents.matomo) {
        //  start tracking
        // window._paq.push(['setConsentGiven']);
        // window._paq.push(['setCookieConsentGiven']);
      }
      const focusEl = document.getElementById(focusedElementAfterCloseId);
      if (focusEl) {
        focusEl.focus();
      }
    },
    onConsentsParsed: (consents, hasUserHandledAllConsents) => {
      if (consents.matomo === undefined) {
        // tell matomo to wait for consent:
        // window._paq.push(['requireConsent']);
        // window._paq.push(['requireCookieConsent']);
      } else if (consents.matomo === false) {
        // tell matomo to forget conset
        // window._paq.push(['forgetConsentGiven']);
      }
      if (hasUserHandledAllConsents) {
        // cookie consent dialog will not be shown
      }
    },
  });

  const MatomoCookieTracker = () => {
    const isMatomoCookieApproved = getConsentStatus('matomo');
    return (
      <div>
        <p>Matomo cookie is {!isMatomoCookieApproved && <strong>NOT</strong>} set.*</p>
        <small>* This won&apos;t change in real time</small>
      </div>
    );
  };

  const ForcePageScrollBarForModalTesting = () => {
    return (
      <div>
        <div style={{ height: '100vh' }}>&nbsp;</div>
        <p>Bottom page</p>
      </div>
    );
  };

  const Application = () => {
    const consentsInSource = pickConsentIdsFromContentSource(contentSource);
    const willRenderCookieConsentDialog = !hasHandledAllConsents(
      consentsInSource.required || [],
      consentsInSource.optional || [],
    );
    return (
      <div>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <h1 id={focusedElementAfterCloseId} tabIndex={0}>
          This is a dummy application
        </h1>
        {willRenderCookieConsentDialog ? (
          <>
            <p>Cookie consent modal will be shown.</p>
          </>
        ) : (
          <>
            <p>Cookie consents have been given. Remove the cookie to see the dialog again.</p>
          </>
        )}
        <MatomoCookieTracker />
        <ForcePageScrollBarForModalTesting />
      </div>
    );
  };

  return (
    <>
      <ConsentsInModal contentSource={contentSource} />
      <Application />
    </>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const PageVersion = (args) => {
  const Application = () => {
    const [language, setLanguage] = useState<SupportedLanguage>('fi');
    const onLanguageChange = (newLang) => setLanguage(newLang);

    const contentSource = getContentSource({ currentLanguage: language, language: { onLanguageChange } });
    return (
      <main>
        <ConsentsInPage contentSource={contentSource} />
      </main>
    );
  };

  return (
    <>
      <Application />
    </>
  );
};
