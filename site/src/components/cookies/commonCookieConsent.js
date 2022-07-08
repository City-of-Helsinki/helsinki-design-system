const isAnalyticsInitialized = () => typeof window !== 'undefined' && window._paq;

const getCookieConsent = (language, setLanguage) => ({
  siteName: 'Helsinki Design System',
  currentLanguage: language,
  ...(setLanguage
    ? {
        language: {
          onLanguageChange: setLanguage,
        },
      }
    : {}),
  optionalCookies: {
    cookies: [
      {
        commonGroup: 'statistics',
        commonCookie: 'matomo',
      },
    ],
  },
  onAllConsentsGiven: (consents) => {
    if (isAnalyticsInitialized()) {
      if (consents.matomo && window._paq) {
        window._paq.push(['setConsentGiven']);
        window._paq.push(['setCookieConsentGiven']);
      }
    }
  },
  onConsentsParsed: (consents) => {
    if (isAnalyticsInitialized()) {
      if (consents.matomo === undefined) {
        window._paq.push(['requireConsent']);
        window._paq.push(['requireCookieConsent']);
      } else if (consents.matomo === false) {
        window._paq.push(['forgetConsentGiven']);
      }
    }
  },
});

export default getCookieConsent;
