import React, { useMemo, useState } from 'react';

import { commonConsents } from './cookieConsentController';
import { Content, getConsentsFromConsentGroup } from './CookieConsentContext';
import { CookieConsentModal } from './CookieConsentModal';
import { getConsentStatus, hasHandledAllConsents } from './util';

export default {
  component: CookieConsentModal,
  title: 'Components/CookieConsent',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Example = () => {
  const [language, setLanguage] = useState('fi');
  const onLanguageChange = (newLang) => setLanguage(newLang);

  const content: Content = useMemo((): Content => {
    return {
      texts: {
        sections: {
          main: {
            title: 'Evästesuostumukset',
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
          name: 'Name',
          hostName: 'Osoite',
          path: 'Polku',
          description: 'Kuvaus',
          expiration: 'Voimassaoloaika',
        },
      },
      requiredConsents: {
        groupId: 'required',
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
        groupId: 'optional',
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
          { code: 'en', label: 'English (EN)' },
        ],
        current: language,
        languageSelectorAriaLabel: 'Kieli: Suomi. Vaihda kieli. Change language. Ändra språk.',
        onLanguageChange,
      },
      onAllConsentsGiven: (consents) => {
        if (consents.matomo) {
          //  start tracking
          // window._paq.push(['setConsentGiven']);
          // window._paq.push(['setCookieConsentGiven']);
        }
        document.getElementById('focused-element-after-cookie-consent-closed').focus();
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

  const Application = () => {
    const requiredConsents = content.requiredConsents
      ? getConsentsFromConsentGroup(content.requiredConsents.groupList)
      : [];
    const optionalConsents = content.optionalConsents
      ? getConsentsFromConsentGroup(content.optionalConsents.groupList)
      : [];
    const willRenderCookieConsentDialog = !hasHandledAllConsents(requiredConsents, optionalConsents);
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
        <MatomoCookieTracker />
      </div>
    );
  };

  return (
    <>
      <CookieConsentModal content={content} />
      <Application />
    </>
  );
};
