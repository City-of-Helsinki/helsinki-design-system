import React, { useMemo, useState } from 'react';

import { Content, SupportedLanguage } from './CookieConsentContext';
import { ConsentsInModal } from './consentsInModal/ConsentsInModal';
import { Page } from './page/Page';
import { getConsentStatus, hasHandledAllConsents } from './util';
import { ContentSource, createContent } from './content.builder';

type ContentOptions = {
  currentLanguage: SupportedLanguage;
  onLanguageChange: Content['language']['onLanguageChange'];
  onAllConsentsGiven?: Content['onAllConsentsGiven'];
  onConsentsParsed?: Content['onConsentsParsed'];
};

export default {
  component: ConsentsInModal,
  title: 'Components/CookieConsent',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

const getContent = (options: ContentOptions): Content => {
  const { onLanguageChange, currentLanguage, onAllConsentsGiven, onConsentsParsed } = options;

  const contentSource: ContentSource = {
    siteName: 'Sivuston XXX',
    currentLanguage,
    groups: [
      {
        commonGroup: 'essential',
        required: true,
        consents: [
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
        consents: [
          {
            commonCookie: 'marketing',
          },
        ],
      },
      {
        commonGroup: 'preferences',
        required: false,
        consents: [
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
        consents: [
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

    language: {
      onLanguageChange,
    },
    onAllConsentsGiven,
    onConsentsParsed,
  };

  return createContent(contentSource);
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const ModalVersion = (args) => {
  const [language, setLanguage] = useState<SupportedLanguage>('fi');
  const onLanguageChange = (newLang) => setLanguage(newLang);
  const focusedElementAfterCloseId = 'focused-element-after-cookie-consent-closed';

  const content: Content = useMemo((): Content => {
    return getContent({
      currentLanguage: language,
      onLanguageChange,
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
  }, [language]);

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
    const willRenderCookieConsentDialog = !hasHandledAllConsents(
      content.requiredConsents || [],
      content.optionalConsents || [],
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
      <ConsentsInModal content={content} />
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

    const content: Content = useMemo((): Content => {
      return getContent({ currentLanguage: language, onLanguageChange });
    }, [language]);
    return (
      <main>
        <Page content={content} />
      </main>
    );
  };

  return (
    <>
      <Application />
    </>
  );
};
