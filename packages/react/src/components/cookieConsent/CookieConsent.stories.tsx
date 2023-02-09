import React, { useState } from 'react';

import { useCookieConsentContext } from './contexts/ConsentContext';
import { Category, CookieData, SupportedLanguage, useCookieContentContext } from './contexts/ContentContext';
import { CookieConsentContext } from './contexts/ContextComponent';
import { CookiePage } from './cookiePage/CookiePage';
import { CookieContentSource } from './content.builder';
import { Modal } from './modal/Modal';
import { Accordion } from '../accordion';
import { useCookies } from './useCookies';
import { CookieModal } from './cookieModal/CookieModal';

export default {
  component: CookieModal,
  title: 'Components/CookieConsent',
  parameters: {
    controls: { expanded: true },
    docs: { disable: true },
  },
  args: {},
};

const ForcePageScrollBarForModalTesting = () => {
  return (
    <div>
      <div style={{ height: '100vh' }}>&nbsp;</div>
      <p>Bottom page</p>
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const EnglishModalVersion = (args) => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const onLanguageChange = (newLang) => setLanguage(newLang);
  const contentSource: CookieContentSource = {
    siteName: 'Test website',
    currentLanguage: language,
    requiredCookies: {
      groups: [
        {
          commonGroup: 'login',
          cookies: [
            {
              commonCookie: 'tunnistamo',
            },
            {
              commonCookie: 'keycloak',
            },
          ],
        },
        {
          commonGroup: 'essential',
          cookies: [
            {
              commonCookie: 'cms-session',
            },
          ],
        },
        {
          commonGroup: 'loadBalancing',
          cookies: [
            {
              id: 'loadbalancer',
              name: 'Loadbalancer Cookie',
              hostName: 'CDN site',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'accessibility',
          cookies: [
            {
              id: 'accessibility',
              name: 'Accessibility cookie',
              hostName: 'CDN site',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'userInputs',
          cookies: [
            {
              id: 'userInputs',
              name: 'User inputs cookie',
              hostName: 'CDN site',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
      ],
    },
    optionalCookies: {
      groups: [
        {
          commonGroup: 'marketing',
          cookies: [
            {
              id: 'marketing',
              name: 'Custom Marketing cookie',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'preferences',
          cookies: [
            {
              id: 'preferences1',
              name: 'Preference 1',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
            {
              id: 'preferences2',
              name: 'Preference 2',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1 years',
            },
            {
              id: 'preferences3',
              name: 'Preference 3',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '2h',
            },
          ],
        },
        {
          commonGroup: 'statistics',
          cookies: [
            {
              commonCookie: 'matomo',
            },
            {
              commonCookie: 'matomoSession',
            },
            {
              commonCookie: 'matomoConsent',
            },
            {
              commonCookie: 'cookiehub',
            },
            {
              id: 'someOtherConsent',
              name: 'Other consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'location',
          cookies: [
            {
              id: 'location',
              name: 'Location consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'content',
          cookies: [
            {
              id: 'content',
              name: 'Content consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'thirdParty',
          cookies: [
            {
              id: 'thirdParty',
              name: 'ThirdParty consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'chat',
          cookies: [
            {
              id: 'chat',
              name: 'Chat consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'deviceInfo',
          cookies: [
            {
              id: 'deviceInfo',
              name: 'Device info consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'socialMedia',
          cookies: [
            {
              id: 'socialMedia',
              name: 'Social media consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'informationSecurity',
          cookies: [
            {
              id: 'informationSecurity',
              name: 'Information security consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
      ],
    },

    language: {
      onLanguageChange,
    },
    onAllConsentsGiven: (consents) => {
      if (consents.matomo) {
        //  start tracking
        // window._paq.push(['setConsentGiven']);
        // window._paq.push(['setCookieConsentGiven']);
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
        // cookie consent modal will not be shown
      }
    },
    focusTargetSelector: '#focused-element-after-cookie-consent-closed',
  };

  const MatomoCookieTracker = () => {
    const { getAllConsents } = useCookies();
    const getConsentStatus = (cookieId: string) => {
      const consents = getAllConsents();
      return consents[cookieId];
    };
    const isMatomoCookieApproved = getConsentStatus('matomo');
    return (
      <div>
        <p>Example how to track single consent.</p>
        <p>Matomo onConsentsParsed is {!isMatomoCookieApproved && <strong>NOT</strong>} set.*</p>
        <small>* This won&apos;t change in real time</small>
      </div>
    );
  };

  const Application = () => {
    return (
      <div>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <h1 className="heading-xl" id={contentSource.focusTargetSelector?.replace('#', '')} tabIndex={0}>
          This is an example application with cookie consent modal
        </h1>
        <p>The modal will be shown when required. If user has given consents, it will not be shown.</p>
        <p>If hidden, remove the cookie to see the modal again.</p>
        <MatomoCookieTracker />
        <ForcePageScrollBarForModalTesting />
      </div>
    );
  };

  return (
    <>
      <CookieModal contentSource={contentSource} />
      <Application />
    </>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const FinnishModalVersion = (args) => {
  const [language, setLanguage] = useState<SupportedLanguage>('fi');
  const onLanguageChange = (newLang) => setLanguage(newLang);
  const contentSource: CookieContentSource = {
    siteName: 'Testisivusto',
    currentLanguage: language,
    requiredCookies: {
      groups: [
        {
          commonGroup: 'login',
          cookies: [
            {
              commonCookie: 'tunnistamo',
            },
            {
              commonCookie: 'keycloak',
            },
          ],
        },
        {
          commonGroup: 'essential',
          cookies: [
            {
              commonCookie: 'cms-session',
            },
          ],
        },
        {
          commonGroup: 'loadBalancing',
          cookies: [
            {
              id: 'loadbalancer',
              name: 'Loadbalancer Cookie',
              hostName: 'CDN site',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'accessibility',
          cookies: [
            {
              id: 'accessibility',
              name: 'Accessibility cookie',
              hostName: 'CDN site',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'userInputs',
          cookies: [
            {
              id: 'userInputs',
              name: 'User inputs cookie',
              hostName: 'CDN site',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
      ],
    },
    optionalCookies: {
      groups: [
        {
          commonGroup: 'marketing',
          cookies: [
            {
              id: 'marketing',
              name: 'Custom Marketing cookie',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'preferences',
          cookies: [
            {
              id: 'preferences1',
              name: 'Preference 1',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
            {
              id: 'preferences2',
              name: 'Preference 2',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1 years',
            },
            {
              id: 'preferences3',
              name: 'Preference 3',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '2h',
            },
          ],
        },
        {
          commonGroup: 'statistics',
          cookies: [
            {
              commonCookie: 'matomo',
            },
            {
              commonCookie: 'matomoSession',
            },
            {
              commonCookie: 'matomoConsent',
            },
            {
              commonCookie: 'cookiehub',
            },
            {
              id: 'someOtherConsent',
              name: 'Other consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'location',
          cookies: [
            {
              id: 'location',
              name: 'Location consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'content',
          cookies: [
            {
              id: 'content',
              name: 'Content consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'thirdParty',
          cookies: [
            {
              id: 'thirdParty',
              name: 'ThirdParty consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'chat',
          cookies: [
            {
              id: 'chat',
              name: 'Chat consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'deviceInfo',
          cookies: [
            {
              id: 'deviceInfo',
              name: 'Device info consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'socialMedia',
          cookies: [
            {
              id: 'socialMedia',
              name: 'Social media consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'informationSecurity',
          cookies: [
            {
              id: 'informationSecurity',
              name: 'Information security consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
      ],
    },

    language: {
      onLanguageChange,
    },
    onAllConsentsGiven: (consents) => {
      if (consents.matomo) {
        //  start tracking
        // window._paq.push(['setConsentGiven']);
        // window._paq.push(['setCookieConsentGiven']);
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
        // cookie consent modal will not be shown
      }
    },
    focusTargetSelector: '#focused-element-after-cookie-consent-closed',
  };

  const MatomoCookieTrackerFinnish = () => {
    const { getAllConsents } = useCookies();
    const getConsentStatus = (cookieId: string) => {
      const consents = getAllConsents();
      return consents[cookieId];
    };
    const isMatomoCookieApproved = getConsentStatus('matomo');
    return (
      <div>
        <p>Esimerkki kuinka seurata yhden keksin suostumusta</p>
        <p>Matomo suostumusta {isMatomoCookieApproved ? 'on' : <strong>EI OLE </strong>} asetettu.*</p>
        <small>* Tämä ei päivity reaaliajassa</small>
      </div>
    );
  };

  const Application = () => {
    return (
      <div>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <h1 className="heading-xl" id={contentSource.focusTargetSelector?.replace('#', '')} tabIndex={0}>
          Tämä on esimerkkisovellus CookieConsent-komponentin käytöstä
        </h1>
        <p>
          Keksienhallintaikkuna näytetään tarpeen vaatiessa. Jos käyttäjä on suorittanut keksien hyväksymisprosessin,
          ikkunaa ei näytetä.
        </p>
        <p>Jos ikkuna on piilossa, poista keksit jotta se tulee taas näkyviin.</p>
        <MatomoCookieTrackerFinnish />
        <ForcePageScrollBarForModalTesting />
      </div>
    );
  };

  return (
    <>
      <CookieModal contentSource={contentSource} />
      <Application />
    </>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const SimpleModalVersion = (args) => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const onLanguageChange = (newLang) => setLanguage(newLang);
  const contentSource: CookieContentSource = {
    siteName: `Site title ${language}`,
    currentLanguage: language,
    optionalCookies: {
      cookies: [
        {
          commonGroup: 'essential',
          commonCookie: 'tunnistamo',
        },
      ],
    },
    language: {
      onLanguageChange,
    },
    focusTargetSelector: '#focused-element-after-cookie-consent-closed',
  };

  const Application = () => {
    return (
      <div>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <h1 className="heading-xl" id={contentSource.focusTargetSelector?.replace('#', '')} tabIndex={0}>
          Simplest cookie consent example
        </h1>
        <p>This is an example how the modal is shown with minimal content parameters.</p>
        <p>If modal is not shown, remove the cookie to see the modal again.</p>
        <p>Note: it the cookie.required would be true, the modal would never be shown.</p>
        <ForcePageScrollBarForModalTesting />
      </div>
    );
  };

  return (
    <>
      <CookieModal contentSource={contentSource} />
      <Application />
    </>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const PageVersion = (args) => {
  const contentSource: CookieContentSource = {
    siteName: 'Test website',
    currentLanguage: 'en',
    texts: {
      sections: {
        main: {
          title: 'Cookie consents as a page!',
        },
      },
    },
    requiredCookies: {
      groups: [
        {
          commonGroup: 'essential',
          cookies: [
            {
              commonCookie: 'tunnistamo',
            },
            {
              id: 'loadbalancer',
              name: 'loadbalancer cookie',
              hostName: 'CDN service',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
            {
              commonCookie: 'keycloak',
            },
          ],
        },
      ],
    },
    optionalCookies: {
      groups: [
        {
          commonGroup: 'marketing',
          cookies: [
            {
              id: 'marketing',
              name: 'Marketing 1',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'preferences',
          cookies: [
            {
              id: 'preferences1',
              name: 'Setting 1',
              hostName: 'UserPreferences',
              description:
                'Proin sodales maximus est, pulvinar tempus felis tempus quis. Aenean at vestibulum lectus. Aliquam erat volutpat. Nullam venenatis feugiat sem vitae cursus. ',
              expiration: '1 year',
            },
          ],
        },
        {
          commonGroup: 'statistics',
          cookies: [
            {
              commonCookie: 'matomo',
            },
            {
              commonCookie: 'matomoSession',
            },
            {
              commonCookie: 'matomoConsent',
            },
            {
              id: 'someOtherConsent',
              name: 'Other analytics site',
              hostName: 'Other analytics',
              description: 'Vel est molestie Quisque vel dui vel est molestie con con',
              expiration: '1 year',
            },
          ],
        },
      ],
    },

    onAllConsentsGiven: (consents) => {
      // called when consents are saved
      // handle changes like:
      if (!consents.matomo) {
        // stop matomo tracking
      }
    },
  };

  return (
    <main>
      <CookiePage contentSource={contentSource} />
    </main>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const CustomContentVersion = (args) => {
  const contentSource: CookieContentSource = {
    siteName: 'Not shown if main title is overridden',
    currentLanguage: 'en',
    texts: {
      sections: {
        main: {
          title: 'Custom main title',
          text: 'Custom main preferences',
        },
        details: {
          title: 'Custom details title',
          text: 'Custom details preferences',
        },
      },
      ui: {
        showSettings: 'Custom show settings',
        hideSettings: 'Custom hide settings',
        approveAllConsents: 'Custom approve all consents',
        approveRequiredAndSelectedConsents: 'Custom approve required and selected consents',
        approveOnlyRequiredConsents: 'Custom approve only required consents',
        settingsSaved: 'Custom settings saved text',
      },
      tableHeadings: {
        name: 'Cookie custom name',
        hostName: 'Host',
        description: 'Cookie purpose',
        expiration: 'Lifespan',
      },
    },
    requiredCookies: {
      title: 'Overridden title of required cookies',
      text: 'Overridden text of required cookies. The default text is not shown.',
      checkboxAriaDescription: 'This is the overridden checkbox aria description of required cookies',
      groups: [
        {
          id: 'my-cookie-group',
          title: 'My required cookie groupcustom title',
          text: 'My required cookie groupcustom text',
          checkboxAriaDescription: 'Custom checkbox aria description for My cookie group',
          expandAriaLabel: 'Custom expand button aria label for My cookie group',
          cookies: [
            {
              id: 'custom-cookie',
              name: 'Custom cookie',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1000 years',
            },
          ],
        },
        {
          title: 'Custom cookie group title',
          text: 'Custom cookie group text',
          checkboxAriaDescription: 'Custom checkbox aria description for custom cookies group',
          expandAriaLabel: 'Custom expand button aria label for custom cookies group',
          cookies: [
            {
              id: 'marketing',
              name: 'Marketing 1',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
      ],
      cookies: [
        {
          commonCookie: 'tunnistamo',
          groupId: 'my-cookie-group',
        },
      ],
    },
    optionalCookies: {
      title: 'Overridden title of optional cookies',
      text: 'Overridden text of optional cookies. The default text is not shown.',
      checkboxAriaDescription: 'This is the overridden checkbox aria description of optional cookies',
      groups: [
        {
          title: 'Custom cookies group title',
          text: 'Custom cookies group text',
          checkboxAriaDescription: 'Custom checkbox aria description for custom cookies group',
          expandAriaLabel: 'Custom expand button aria label for custom cookies group',
          cookies: [
            {
              id: 'some-cookie',
              name: 'Setting 1',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: 'Sessio',
            },
            {
              id: 'some-cookie2',
              name: 'Setting 2',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: 'Sessio',
            },
          ],
        },
        {
          commonGroup: 'statistics',
          cookies: [
            {
              id: 'someOtherConsent',
              name: 'Other cookie',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: 'Sessio',
            },
          ],
        },
      ],
      cookies: [
        {
          commonGroup: 'statistics',
          commonCookie: 'matomo',
        },
      ],
    },
  };

  return (
    <main>
      <CookiePage contentSource={contentSource} />
    </main>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const DebugVersion = (args) => {
  const contentSource: CookieContentSource = {
    siteName: 'Cookie consent debugging',
    currentLanguage: 'fi',
    requiredCookies: {
      cookies: [
        {
          commonGroup: 'statistics',
          commonCookie: 'matomo',
        },
      ],
    },
    optionalCookies: {
      cookies: [
        {
          commonCookie: 'tunnistamo',
          commonGroup: 'essential',
        },
        {
          id: `random-cookie-${Math.random()}-without-consent`,
          commonGroup: 'marketing',
        },
      ],
    },
    focusTargetSelector: '#focused-element-after-cookie-consent-closed',
  };

  const getCategoryCookies = (category?: Category): CookieData[] => {
    if (!category) {
      return [];
    }
    let allCookies: CookieData[] = [];
    category.groups.forEach((group) => {
      allCookies = [...allCookies, ...group.cookies];
    });
    return allCookies;
  };

  const Application = () => {
    const consentContext = useCookieConsentContext();
    const content = useCookieContentContext();
    const { hasUserHandledAllConsents } = consentContext;
    const { requiredCookies, optionalCookies } = content;
    const willRenderCookieConsentDialog = hasUserHandledAllConsents();
    const { getAllConsents } = useCookies();
    const storedConsents = getAllConsents();
    const getConsentStatus = (cookieId: string) => {
      return storedConsents[cookieId];
    };
    return (
      <div>
        <h1 className="heading-xl" id={contentSource.focusTargetSelector?.replace('#', '')}>
          Debugging example
        </h1>
        <p>This is an example how to get all data from the cookie consent context.</p>
        <p>
          The same contentSource can be passed to the context and it provides access to the content built from the
          source. There are multiple hooks for getting the context, content, texts, etc. You can also trigger actions to
          store consents.
        </p>
        <p>All consents have been given: {String(!willRenderCookieConsentDialog)}</p>
        <p>There is a random cookie, so modal is always shown.</p>
        <p>
          To see all consents in the cookie, open DevTools, goto Application tab and select Storage/Cookies from the
          side panel
        </p>
        <Accordion heading="View full content">
          <div>
            <pre>{JSON.stringify(content, null, 2)}</pre>
          </div>
        </Accordion>
        <Accordion heading="View required cookies and their consets">
          <p>The consents are read from the stored cookie</p>
          <ul>
            {getCategoryCookies(requiredCookies).map((cookie) => {
              return (
                <li key={cookie.id}>
                  <strong>{cookie.id}</strong> has consent stored in cookie: {String(getConsentStatus(cookie.id))}
                </li>
              );
            })}
          </ul>
        </Accordion>
        <Accordion heading="View optional cookies and their consents">
          <p>The consents are read from the stored cookie</p>
          <ul>
            {getCategoryCookies(optionalCookies).map((cookie) => {
              return (
                <li key={cookie.id}>
                  <strong>{cookie.id}</strong> has consent: {String(getConsentStatus(cookie.id))}
                </li>
              );
            })}
          </ul>
        </Accordion>
        <Accordion heading="View consents in the stored cookie">
          <p>The stored cookie has these user given consents:</p>
          <ul>
            {Object.keys(storedConsents).map((cookieId) => {
              return (
                <li key={cookieId}>
                  <strong>{cookieId}</strong>: {String(getConsentStatus(cookieId))}
                </li>
              );
            })}
          </ul>
        </Accordion>
      </div>
    );
  };

  return (
    <CookieConsentContext contentSource={contentSource}>
      <Application />
      <Modal />
    </CookieConsentContext>
  );
};

DebugVersion.parameters = {
  loki: { skip: true },
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const TunnistamoLoginCookies = (args) => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const onLanguageChange = (newLang) => setLanguage(newLang);
  const contentSource: CookieContentSource = {
    siteName: `Site title ${language}`,
    texts: {
      sections: {
        main: {
          title: 'List all cookies used in Tunnistamo login',
          text:
            'This is an example how to get consents for all cookies when using Tunnistamo login flow. All used session, language, load balancer and csrf cookies are listed. Tunnistamo uses Tunnistus and Suomi.fi services and cookies of those services are also listed as they have no consent queries of their own.',
        },
      },
    },
    currentLanguage: language,
    requiredCookies: {
      groups: [
        { commonGroup: 'tunnistamoLogin' },
        { commonGroup: 'loadBalancing', cookies: [{ commonCookie: 'tunnistamo-login-loadbalancer' }] },
        {
          commonGroup: 'informationSecurity',
          cookies: [{ commonCookie: 'tunnistamo-csrftoken' }],
        },
        {
          commonGroup: 'language',
          cookies: [{ commonCookie: 'keycloak-language' }, { commonCookie: 'suomifi-language' }],
        },
      ],
    },
    language: {
      onLanguageChange,
    },
    focusTargetSelector: '#focused-element-after-cookie-consent-closed',
  };

  return (
    <>
      <CookiePage contentSource={contentSource} />
    </>
  );
};

TunnistamoLoginCookies.parameters = {
  loki: { skip: true },
};
