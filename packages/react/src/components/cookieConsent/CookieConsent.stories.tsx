import React, { useContext, useMemo, useState } from 'react';

import { commonConsents } from './cookieConsentController';
import { CookieConsentContext, Provider as CookieContextProvider, Content } from './CookieConsentContext';
import { CookieConsent } from './CookieConsent';

export default {
  component: CookieConsent,
  title: 'Components/CookieConsent',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Example = () => {
  const Application = () => {
    const { willRenderCookieConsentDialog } = useContext(CookieConsentContext);
    return (
      <div
        style={willRenderCookieConsentDialog ? { overflow: 'hidden', maxHeight: '100vh' } : {}}
        aria-hidden={willRenderCookieConsentDialog ? 'true' : 'false'}
      >
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <h1 id="focused-element-after-cookie-consent-closed" tabIndex={0}>
          This is a dummy application
        </h1>
        {willRenderCookieConsentDialog ? (
          <>
            <p>Cookie consent dialog will be shown.</p>
          </>
        ) : (
          <>
            <p>Cookie consents have been given. Remove the cookie to see the dialog again.</p>
          </>
        )}
      </div>
    );
  };

  const [language, setLanguage] = useState('fi');
  const onLanguageChange = (newLang) => setLanguage(newLang);
  const content: Content = useMemo(() => {
    return {
      mainTitle: 'Evästesuostumukset',
      mainText: `Tämä sivusto käyttää välttämättömiä evästeitä suorituskyvyn varmistamiseksi sekä yleisen käytön seurantaan.
      Lisäksi käytämme kohdennusevästeitä käyttäjäkokemuksen parantamiseksi, analytiikkaan ja kohdistetun sisällön
      näyttämiseen. Jatkamalla sivuston käyttöä ilman asetusten muuttamista hyväksyt välttämättömien evästeiden
      käytön. (${language})`,
      detailsTitle: 'Tietoa sivustolla käytetyistä evästeistä',
      detailsText: `Sivustolla käytetyt evästeet on luokiteltu käyttötarkoituksen mukaan. Alla voit lukea tietoa jokaisesta
      kategoriasta ja sallia tai kieltää evästeiden käytön.`,
      requiredConsentsTitle: 'Välttämättömät evästeet',
      requiredConsentsText:
        'Välttämättömien evästeiden käyttöä ei voi kieltää. Ne mahdollistavat sivuston toiminnan ja vaikuttavat sivuston käyttäjäystävällisyyteen.',
      optionalConsentsTitle: 'Muut evästeet',
      optionalConsentsText: 'Voit hyväksyä tai jättää hyväksymättä muut evästeet.',
      showSettings: 'Näytä asetukset',
      hideSettings: 'Piilota asetukset',
      approveAllConsents: 'Hyväksy kaikki evästeet',
      approveRequiredAndSelectedConsents: 'Hyväksy valitut ja pakolliset evästeet',
      approveOnlyRequiredConsents: 'Hyväksy vain pakolliset evästeet',
      settingsSaved: 'Asetukset tallennettu!',
      consents: {
        matomoTitle: 'Tilastointievästeet',
        matomoText: 'Tilastointievästeiden keräämää tietoa käytetään verkkosivuston kehittämiseen',
        tunnistamoTitle: 'Kirjautumiseväste',
        tunnistamoText: 'Sivuston pakollinen eväste mahdollistaa kävijän vierailun sivustolla.',
        languageTitle: 'Kielieväste',
        languageText: 'Tallennamme valitsemasi käyttöliittymäkielen',
        preferencesTitle: 'Mieltymysevästeet',
        preferencesText:
          'Mieltymysevästeet mukauttavat sivuston ulkoasua ja toimintaa käyttäjän aiemman käytön perusteella.',
        marketingTitle: 'Markkinointievästeet',
        marketingText: 'Markkinointievästeiden avulla sivuston käyttäjille voidaan kohdentaa sisältöjä.',
        someOtherConsentTitle: 'Palvelun oma eväste',
        someOtherConsentText: 'Palvelun omaa eväste on demoa varten',
      },
      languageOptions: [
        { code: 'fi', label: 'Suomeksi (FI)' },
        { code: 'en', label: 'English (EN)' },
      ],
      language,
      languageSelectorAriaLabel: 'Kieli: Suomi. Vaihda kieli. Change language. Ändra språk.',
      onLanguageChange,
    };
  }, [language]);

  return (
    <CookieContextProvider
      requiredConsents={[commonConsents.tunnistamo, commonConsents.language]}
      optionalConsents={[
        commonConsents.matomo,
        commonConsents.preferences,
        commonConsents.marketing,
        'someOtherConsent',
      ]}
      onAllConsentsGiven={(consents) => {
        if (consents.matomo) {
          //  start tracking
          // window._paq.push(['setConsentGiven']);
          // window._paq.push(['setCookieConsentGiven']);
        }
        document.getElementById('focused-element-after-cookie-consent-closed').focus();
      }}
      onConsentsParsed={(consents, hasUserHandledAllConsents) => {
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
      }}
      content={content}
    >
      <CookieConsent />
      <Application />
    </CookieContextProvider>
  );
};
