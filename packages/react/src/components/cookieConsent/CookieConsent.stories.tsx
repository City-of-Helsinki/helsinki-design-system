import React, { useMemo, useState } from 'react';

import { commonConsents, COOKIE_NAME } from './cookieConsentController';
import { ConsentData, Content } from './CookieConsentContext';
import { ConsentsInModal } from './consentsInModal/ConsentsInModal';
import { Page } from './page/Page';
import { getConsentStatus, hasHandledAllConsents } from './util';

type ContentOptions = {
  currentLanguage: Content['language']['current'];
  onLanguageChange: Content['language']['onLanguageChange'];
};

export default {
  component: ConsentsInModal,
  title: 'Components/CookieConsent',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

const createContent = (options: ContentOptions): Content => {
  const { onLanguageChange, currentLanguage } = options;
  const consentForStoringCookieConsents: ConsentData = {
    id: COOKIE_NAME,
    name: 'Suostumusvalinnat',
    hostName: 'Osoite',
    path: 'Polku',
    description: 'Tallennetaan Helsingin kaupungin yhteiset evästesuostumukset.',
    expiration: '1 vuosi',
  };

  return {
    texts: {
      sections: {
        main: {
          title: 'Eväste\u00ADsuostumukset',
          text: `Tämä sivusto käyttää välttämättömiä evästeitä suorituskyvyn varmistamiseksi sekä yleisen käytön seurantaan.
            Lisäksi käytämme kohdennusevästeitä käyttäjäkokemuksen parantamiseksi, analytiikkaan ja kohdistetun sisällön
            näyttämiseen. Jatkamalla sivuston käyttöä ilman asetusten muuttamista hyväksyt välttämättömien evästeiden
            käytön.`,
        },
        details: {
          title: 'Tietoa sivustolla käytetyistä evästeistä',
          text: `Sivustolla käytetyt evästeet on luokiteltu käyttötarkoituksen mukaan. Alla voit lukea tietoa jokaisesta
            kategoriasta ja sallia tai kieltää evästeiden käytön.`,
        },
      },
      ui: {
        showSettings: 'Näytä asetukset',
        hideSettings: 'Piilota asetukset',
        approveAllConsents: 'Hyväksy kaikki evästeet',
        approveRequiredAndSelectedConsents: 'Hyväksy valitut ja pakolliset evästeet',
        approveOnlyRequiredConsents: 'Hyväksy vain pakolliset evästeet',
        settingsSaved: 'Asetukset tallennettu!',
      },
      tableHeadings: {
        name: 'Nimi',
        hostName: 'Osoite',
        path: 'Polku',
        description: 'Kuvaus',
        expiration: 'Voimassaoloaika',
      },
    },
    requiredConsents: {
      title: 'Välttämättömät evästeet',
      text:
        'Välttämättömien evästeiden käyttöä ei voi kieltää. Ne mahdollistavat sivuston toiminnan ja vaikuttavat sivuston käyttäjäystävällisyyteen.',
      groupList: [
        {
          title: 'Evästeet sivuston perustoimintoja varten',
          text: 'Näitä eväisteitä käytetään sivuston perustoiminnoissa',
          expandAriaLabel: 'Näytä perustoimintoihin littyvien evästeiden tiedot',
          checkboxAriaDescription:
            'Näitä eväisteitä käytetään sivuston perustoiminnoissa. Perustoimintoihin littyvien evästeiden käyttöä ei voi kieltää.',
          consents: [
            {
              id: commonConsents.tunnistamo,
              name: 'Kuormanjako',
              hostName: 'Osoite',
              path: 'Polku',
              description:
                'Kuvaus lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: 'Voimassaoloaika',
            },
            {
              id: commonConsents.language,
              name: 'Kielivalinta',
              hostName: 'Osoite',
              path: 'Polku',
              description: 'Quisque vest molestie convallis. Don el dui vel.',
              expiration: 'Voimassaoloaika',
            },
            consentForStoringCookieConsents,
          ],
        },
        {
          title: 'Evästeet kirjautumista varten',
          text: 'Näitä eväisteitä käytetään kirjautumisessa',
          expandAriaLabel: 'Näytä kirjautumiseen littyvien evästeiden tiedot',
          checkboxAriaDescription:
            'Näitä eväisteitä käytetään kirjautumisessa. Kirjautumiseen littyvien evästeiden käyttöä ei voi kieltää.',
          consents: [
            {
              id: commonConsents.tunnistamo,
              name: 'Tunnistamo',
              hostName: 'Osoite',
              path: 'Polku',
              description:
                'Kuvaus lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: 'Voimassaoloaika',
            },
            {
              id: 'keycloak',
              name: 'Tunnistus',
              hostName: 'Osoite',
              path: 'Polku',
              description: 'Quisque vest molestie convallis. Don el dui vel.',
              expiration: 'Voimassaoloaika',
            },
          ],
        },
      ],
    },
    optionalConsents: {
      title: 'Muut evästeet',
      text:
        'Voit hyväksyä tai jättää hyväksymättä muut evästeet. Praesent vel vestibulum nunc, at eleifend sapien. Integer cursus ut orci eu pretium. Ut a orci felis. In eu eros turpis. Sed ullamcorper lacinia lorem, id ullamcorper dui accumsan in. Integer dictum fermentum mi, sit amet accumsan lacus facilisis id. Quisque blandit lacus ac sem porta.',
      groupList: [
        {
          title: 'Markkinointievästeet',
          text:
            'Markkinointievästeillä kohdennetaan markkinointia. Nulla facilisi. Nullam mattis sapien sem, nec venenatis lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus.',
          expandAriaLabel: 'Näytä markkinointievästeiden tiedot',
          checkboxAriaDescription:
            'Markkinointievästeillä kohdennetaan markkinointia. Hyväksy tai jätä hyväksymättä kaikki markkinointiin liittyvät evästeet',
          consents: [
            {
              id: commonConsents.marketing,
              name: 'Marketing',
              hostName: 'Osoite',
              path: 'Polku',
              description: 'Quisque vel dui vel est molestie convallis.',
              expiration: 'Voimassaoloaika',
            },
          ],
        },
        {
          title: 'Asetuksiin liittyvät evästeet',
          text:
            'Evästeisiin tallennetaan käyttäjän tekemiä Donec lacus ligula, consequat id ligula sed, dapibus blandit nunc. Phasellus efficitur nec tellus et tempus. Sed tempor tristique purus, at auctor lectus. Ut pretium rutrum viverra. Sed felis arcu, sodales fermentum finibus in, pretium id tellus. Morbi eget eros congue, pulvinar leo ut, aliquam lectus. Cras consectetur sit amet tortor nec vulputate. Integer scelerisque dignissim auctor. Fusce pharetra dui nulla, vel elementum leo mattis vitae.',
          expandAriaLabel: 'Näytä asetuksiin liittyvien evästeiden tiedot',
          checkboxAriaDescription:
            'Evästeisiin tallennetaan käyttäjän tekemiä valintoja. Hyväksy tai jätä hyväksymättä kaikki asetuksiin liittyvät evästeet',
          consents: [
            {
              id: commonConsents.preferences,
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
          title: 'Tilastointiin liittyvät evästeet',
          text: 'Tilastoinnilla parannetaan...',
          expandAriaLabel: 'Näytä tilastointiin liittyvien evästeiden tiedot',
          checkboxAriaDescription:
            'Tilastoinnilla parannetaan sivustoa. Hyväksy tai jätä hyväksymättä kaikki tilastointiin liittyvät evästeet',
          consents: [
            {
              id: commonConsents.matomo,
              name: 'Matomo',
              hostName: 'Osoite',
              path: 'Polku',
              description: 'Quisque vel dui vel est molestie con.',
              expiration: 'Voimassaoloaika',
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
    },
    language: {
      languageOptions: [
        { code: 'fi', label: 'Suomeksi (FI)' },
        { code: 'sv', label: 'På svenska (SV)' },
        { code: 'en', label: 'English (EN)' },
      ],
      current: currentLanguage,
      languageSelectorAriaLabel: 'Kieli: Suomi. Vaihda kieli. Change language. Ändra språk.',
      onLanguageChange,
    },
    onAllConsentsGiven: (consents) => {
      if (consents.matomo) {
        //  start tracking
        // window._paq.push(['setConsentGiven']);
        // window._paq.push(['setCookieConsentGiven']);
      }
      const focusEl = document.getElementById('focused-element-after-cookie-consent-closed');
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
  };
};

export const ModalVersion = () => {
  const [language, setLanguage] = useState('fi');
  const onLanguageChange = (newLang) => setLanguage(newLang);

  const content: Content = useMemo((): Content => {
    return createContent({ currentLanguage: language, onLanguageChange });
  }, [language]);

  const MatomoCookieTracker = () => {
    const isMatomoCookieApproved = getConsentStatus(commonConsents.matomo);
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
        <h1 id="focused-element-after-cookie-consent-closed" tabIndex={0}>
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

export const PageVersion = () => {
  const Application = () => {
    const [language, setLanguage] = useState('fi');
    const onLanguageChange = (newLang) => setLanguage(newLang);

    const content: Content = useMemo((): Content => {
      return createContent({ currentLanguage: language, onLanguageChange });
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
