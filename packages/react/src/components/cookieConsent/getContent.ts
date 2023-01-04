export function getCookieContent() {
  const commonLanguageTranslations = {
    fi: {
      description: 'Eväste vaaditaan jotta käyttäjän kielivalinta säilyisi.',
      expiration: 'Istunto',
    },
    sv: {
      description: 'Kakan krävs för att spara användarens språkval.',
      expiration: 'Session',
    },
    en: {
      description: "Required to persist the user's chosen language.",
      expiration: 'Session',
    },
  };

  const commonLoginTranslations = {
    fi: {
      description: 'Tunnistautumisistunnon säilymiseksi vaadittu eväste.',
      expiration: 'Istunto',
    },
    sv: {
      description: 'Cookie som krävs för att bevara autentiseringssession.',
      expiration: 'Session',
    },
    en: {
      description: 'Required to persist the authentication session.',
      expiration: 'Session',
    },
  };

  const commonLoadbalancerTranslations = {
    fi: {
      name: 'Satunnainen 32 merkin pituinen merkkijono',
      description: 'Verkkoliikenteen tekninen reititys.',
      expiration: 'Istunto',
    },
    sv: {
      name: 'En slumpmässig teckensträng med 32 tecken',
      description: 'Teknisk routning av webbtrafiken.',
      expiration: 'Session',
    },
    en: {
      name: 'A random 32-character long string',
      description: 'Technical routing of requests.',
      expiration: 'Session',
    },
  };

  const commonSecurityControlTranslations = {
    fi: {
      description: 'Tietoturvakontrolli',
      expiration: '365 dagar',
    },
    sv: {
      description: 'Datasäkerhetskontroll',
      expiration: 'Session',
    },
    en: {
      description: 'A security control',
      expiration: '365 days',
    },
  };

  const commonLoginGroupTranslations = {
    fi: {
      title: 'Kirjautuminen',
      text: 'Kirjautumisevästeitä käytetään käytetään käyttäjän kirjautuessa palveluun.',
      expandAriaLabel: 'Näytä kirjautumiseen liittyvien evästeiden tiedot',
      checkboxAriaDescription: 'Kirjautumisevästeitä käytetään käytetään käyttäjän kirjautuessa palveluun.',
    },
    sv: {
      title: 'Inloggning',
      text: 'Inloggningskakor används när användaren loggar in på tjänsten.',
      expandAriaLabel: 'Visa information om inloggningskakor',
      checkboxAriaDescription: 'Inloggningskakor används när användaren loggar in på tjänsten.',
    },
    en: {
      title: 'Login',
      text: 'Login cookies are used when the user logs in to the service.',
      expandAriaLabel: 'Show cookie information related to login',
      checkboxAriaDescription: 'Login cookies are used when the user logs in to the service.',
    },
  };

  const tunnistamoUrl = 'tunnistamo.hel.fi';
  const keycloakUrl = 'tunnistus.hel.fi';
  const suomiFiUrl = 'suomi.fi';

  return {
    texts: {
      sections: {
        main: {
          fi: {
            title: '{{siteName}} käyttää evästeitä',
            text:
              'Tämä sivusto käyttää välttämättömiä evästeitä sivun perustoimintojen ja suorituskyvyn varmistamiseksi. Lisäksi käytämme kohdennusevästeitä käyttäjäkokemuksen parantamiseksi, analytiikkaan ja yksilöidyn sisällön näyttämiseen.',
          },
          sv: {
            title: '{{siteName}} använder kakor',
            text:
              'Denna webbplats använder obligatoriska kakor för att säkerställa de grundläggande funktionerna och prestandan. Dessutom använder vi inriktningskakor för bättre användarupplevelse, analytik och individualiserat innehåll.',
          },
          en: {
            title: '{{siteName}} uses cookies',
            text:
              'This website uses required cookies to ensure the basic functionality and performance. In addition, we use targeting cookies to improve the user experience, perform analytics and display personalised content.',
          },
        },
        details: {
          fi: {
            title: 'Tietoa sivustolla käytetyistä evästeistä',
            text:
              'Sivustolla käytetyt evästeet on luokiteltu käyttötarkoituksen mukaan. Alla voit lukea eri luokista ja sallia tai kieltää evästeiden käytön.',
          },
          sv: {
            title: 'Information om kakor som används på webbplatsen',
            text:
              'Kakorna som används på webbplatsen har klassificerats enligt användningsändamål. Du kan läsa om de olika klasserna och acceptera eller förbjuda användningen av kakor.',
          },
          en: {
            title: 'About the cookies used on the website',
            text:
              'The cookies used on the website have been classified according to their intended use. Below, you can read about the various categories and accept or reject the use of cookies.',
          },
        },
      },
      ui: {
        fi: {
          showSettings: 'Näytä evästeasetukset',
          hideSettings: 'Piilota asetukset',
          approveAllConsents: 'Hyväksy kaikki evästeet',
          approveRequiredAndSelectedConsents: 'Hyväksy valitut evästeet',
          approveOnlyRequiredConsents: 'Hyväksy vain välttämättömät evästeet',
          settingsSaved: 'Asetukset tallennettu!',
          readMore: 'Lue lisää',
        },
        sv: {
          showSettings: 'Visa kakinställningarna',
          hideSettings: 'Stänga kakinställningarna',
          approveAllConsents: 'Acceptera alla kakor',
          approveRequiredAndSelectedConsents: 'Acceptera valda kakor',
          approveOnlyRequiredConsents: 'Acceptera endast nödvändiga',
          settingsSaved: 'Inställningar sparade!',
          readMore: 'Läs mer',
        },
        en: {
          showSettings: 'Show cookie settings',
          hideSettings: 'Hide cookie settings',
          approveAllConsents: 'Accept all cookies',
          approveRequiredAndSelectedConsents: 'Accept selected cookies',
          approveOnlyRequiredConsents: 'Accept required cookies only',
          settingsSaved: 'Settings saved!',
          readMore: 'Read more',
        },
      },
      tableHeadings: {
        fi: {
          name: 'Nimi',
          hostName: 'Evästeen asettaja',
          description: 'Käyttötarkoitus',
          expiration: 'Voimassaoloaika',
        },
        sv: {
          name: 'Namn',
          hostName: 'Den som lagrat kakan',
          description: 'Användning',
          expiration: 'Giltighetstid',
        },
        en: {
          name: 'Name',
          hostName: 'Cookie set by',
          description: 'Purpose of use',
          expiration: 'Period of validity',
        },
      },
    },
    language: {
      languageOptions: [
        { code: 'fi', label: 'Suomeksi (FI)' },
        { code: 'sv', label: 'Svenska (SV)' },
        { code: 'en', label: 'English (EN)' },
      ],
      languageSelectorAriaLabel: 'Kieli: Suomi. Vaihda kieli. Change language. Ändra språk.',
    },
    requiredCookies: {
      fi: {
        title: 'Välttämättömät evästeet',
        text:
          'Välttämättömien evästeiden käyttöä ei voi kieltää. Ne mahdollistavat sivuston toiminnan ja vaikuttavat käytettävyyteen.',
        checkboxAriaDescription:
          'Välttämättömien evästeiden käyttöä ei voi kieltää. Ne mahdollistavat sivuston toiminnan ja vaikuttavat käytettävyyteen.',
      },
      sv: {
        title: 'Nödvändig kakor',
        text:
          'Du kan inte förbjuda användningen av nödvändiga kakorna. De möjliggör webbplatsens funktioner och påverkar användbarheten.',
        checkboxAriaDescription:
          'Du kan inte förbjuda användningen av nödvändiga kakorna. De möjliggör webbplatsens funktioner och påverkar användbarheten.',
      },
      en: {
        title: 'Necessary cookies',
        text:
          'Necessary cookies cannot be rejected. They enable the proper functioning of the website and affect the usability.',
        checkboxAriaDescription:
          'Necessary cookies cannot be rejected. They enable the proper functioning of the website and affect the usability.',
      },
    },
    optionalCookies: {
      fi: {
        title: 'Valinnaiset evästeet',
        text: 'Voit hyväksyä tai kieltää valinnaiset evästeet.',
        checkboxAriaDescription: 'Voit hyväksyä tai kieltää valinnaiset evästeet.',
      },
      sv: {
        title: 'Valfri kakor',
        text: 'Du kan acceptera eller förbjuda de valfria kakorna.',
        checkboxAriaDescription: 'Du kan acceptera eller förbjuda de valfria kakorna.',
      },
      en: {
        title: 'Optional cookies',
        text: 'You can accept or reject optional cookies.',
        checkboxAriaDescription: 'You can accept or reject optional cookies.',
      },
    },
    commonGroups: {
      login: { ...commonLoginGroupTranslations },
      marketing: {
        fi: {
          title: 'Mainonta ja markkinointi',
          text: 'Markkinointievästeiden avulla sivuston käyttäjille voidaan kohdentaa sisältöjä.',
          expandAriaLabel: 'Näytä mainontaan ja markkinointiin liittyvien evästeiden tiedot',
          checkboxAriaDescription: 'Markkinointievästeiden avulla sivuston käyttäjille voidaan kohdentaa sisältöjä.',
        },
        sv: {
          title: 'Reklam och marknadsföring',
          text: 'Med hjälp av marknadsföringskakor kan innehåll riktas till webbplatsens användare.',
          expandAriaLabel: 'Visa information om reklam- och marknadsföringskakor',
          checkboxAriaDescription: 'Med hjälp av marknadsföringskakor kan innehåll riktas till webbplatsens användare.',
        },
        en: {
          title: 'Advertising and marketing',
          text: 'Marketing cookies can be used to target content to users of the website.',
          expandAriaLabel: 'Show cookie information related to advertising and marketing',
          checkboxAriaDescription: 'Marketing cookies can be used to target content to users of the website.',
        },
      },
      preferences: {
        fi: {
          title: 'Mieltymykset',
          text:
            'Mieltymysevästeet mukauttavat sivuston ulkoasua ja toimintaa käyttäjän tekemien valintojen perusteella.',
          expandAriaLabel: 'Näytä mieltymyksiin liittyvien evästeiden tiedot',
          checkboxAriaDescription:
            'Mieltymysevästeet mukauttavat sivuston ulkoasua ja toimintaa käyttäjän tekemien valintojen perusteella.',
        },
        sv: {
          title: 'Preferenser',
          text: 'Preferenskakor ändrar webbplatsens utseende och funktioner enligt användarens tidigare val.',
          expandAriaLabel: 'Visa information om preferenskakor',
          checkboxAriaDetextscription:
            'Preferenskakor ändrar webbplatsens utseende och funktioner enligt användarens tidigare val.',
        },
        en: {
          title: 'Preferences',
          text:
            'Preference cookies customise the layout and operation of the website based on the choices made by the user.',
          expandAriaLabel: 'Show cookie information related to preferences',
          checkboxAriaDescription:
            'Preference cookies customise the layout and operation of the website based on the choices made by the user.',
        },
      },
      userInputs: {
        fi: {
          title: 'Käyttäjän syötteet',
          text: 'Syöte-evästeillä voidaan tallentaa käyttäjän palveluun syöttämiä tietoja.',
          expandAriaLabel: 'Näytä käyttäjän syötteisiin liittyvien evästeiden tiedot',
          checkboxAriaDescription: 'Syöte-evästeillä voidaan tallentaa käyttäjän palveluun syöttämiä tietoja.',
        },
        sv: {
          title: 'Användarens input',
          text: 'Med inputskakor kan man lagra information som användaren matar in i tjänsten.',
          expandAriaLabel: 'Visa information om inputskakor',
          checkboxAriaDescription: 'Med inputskakor kan man lagra information som användaren matar in i tjänsten.',
        },
        en: {
          title: 'User input',
          text: 'User-input cookies can be used to store information entered by the user in the service.',
          expandAriaLabel: "Show cookie information related to the user's input",
          checkboxAriaDescription:
            'User-input cookies can be used to store information entered by the user in the service.',
        },
      },
      informationSecurity: {
        fi: {
          title: 'Tietoturva',
          text: 'Tietoturvaevästeet mahdollistavat turvallisen tiedonsiirron käyttäjän ja palvelun välillä.',
          expandAriaLabel: 'Näytä tietoturvaan liittyvien evästeiden tiedot',
          checkboxAriaDescription:
            'Tietoturvaevästeet mahdollistavat turvallisen tiedonsiirron käyttäjän ja palvelun välillä.',
        },
        sv: {
          title: 'Datasäkerhet',
          text: 'Datasäkerhetskakor möjliggör en säker dataöverföring mellan användaren och tjänsten.',
          expandAriaLabel: 'Visa information om datasäkerhetskakor',
          checkboxAriaDescription:
            'Datasäkerhetskakor möjliggör en säker dataöverföring mellan användaren och tjänsten.',
        },
        en: {
          title: 'Information security',
          text: 'Security cookies enable secure data transfer between the user and the service.',
          expandAriaLabel: 'Show cookie information related to information security',
          checkboxAriaDescription: 'Security cookies enable secure data transfer between the user and the service.',
        },
      },
      socialMedia: {
        fi: {
          title: 'Sosiaalinen media',
          text: 'Sosiaalisen median evästeet liittyvät erilaisten sosiaalisen median palveluiden ominaisuuksiin.',
          expandAriaLabel: 'Näytä sosiaaliseen mediaan liittyvien evästeiden tiedot',
          checkboxAriaDescription:
            'Sosiaalisen median evästeet liittyvät erilaisten sosiaalisen median palveluiden ominaisuuksiin.',
        },
        sv: {
          title: 'Sociala medier',
          text: 'Sociala medier-kakor förknippas med olika sociala medie-tjänsters egenskaper.',
          expandAriaLabel: 'Visa information om kakor för sociala medier',
          checkboxAriaDescription: 'Sociala medier-kakor förknippas med olika sociala medie-tjänsters egenskaper.',
        },
        en: {
          title: 'Social media',
          text: 'Social media cookies are related to the characteristics of various social media services.',
          expandAriaLabel: 'Show cookie information related to social media',
          checkboxAriaDescription:
            'Social media cookies are related to the characteristics of various social media services.',
        },
      },
      accessibility: {
        fi: {
          title: 'Saavutettavuus',
          text: 'Saavutettavuusevästeet mahdollistavat palvelun joitakin saavutettavuusominaisuuksia.',
          expandAriaLabel: 'Näytä saavutettavuuteen liittyvien evästeiden tiedot',
          checkboxAriaDescription:
            'Saavutettavuusevästeet mahdollistavat palvelun joitakin saavutettavuusominaisuuksia.',
        },
        sv: {
          title: 'Tillgänglighet',
          text: 'Tillgänglighetskakor möjliggör vissa egenskaper för tjänstens tillgänglighet.',
          expandAriaLabel: 'Visa information om tillgänglighetskakor',
          checkboxAriaDescription: 'Tillgänglighetskakor möjliggör vissa egenskaper för tjänstens tillgänglighet.',
        },
        en: {
          title: 'Accessibility',
          text: "Accessibility cookies enable some of the service's accessibility features.",
          expandAriaLabel: 'Show cookie information related to accessibility',
          checkboxAriaDescription: "Accessibility cookies enable some of the service's accessibility features.",
        },
      },
      deviceInfo: {
        fi: {
          title: 'Laitetiedot',
          text:
            'Laitetietoevästeet sisältävät sellaisia käyttäjän laitteelta kerättyjä tietoja, joilla varmistetaan palvelun toiminta.',
          expandAriaLabel: 'Näytä laitetietoihin liittyvien evästeiden tiedot',
          checkboxAriaDescription:
            'Laitetietoevästeet sisältävät sellaisia käyttäjän laitteelta kerättyjä tietoja, joilla varmistetaan palvelun toiminta.',
        },
        sv: {
          title: 'Enhetsuppgifter',
          text:
            'Kakor för enhetsuppgifterna innehåller sådana uppgifter som samlats in från användarens enhet med vilka tjänstens funktioner säkerställs.',
          expandAriaLabel: 'Visa information om kakor för enhetsuppgifterna',
          checkboxAriaDescription:
            'Kakor för enhetsuppgifterna innehåller sådana uppgifter som samlats in från användarens enhet med vilka tjänstens funktioner säkerställs.',
        },
        en: {
          title: 'Device information',
          text:
            "Device information cookies contain information collected from the user's device that ensures the functionality of the service.",
          expandAriaLabel: 'Show cookie information related to device information',
          checkboxAriaDescription:
            "Device information cookies contain information collected from the user's device that ensures the functionality of the service.",
        },
      },
      chat: {
        fi: {
          title: 'Chat-palvelut',
          text: 'Chat-palveluiden evästeet mahdollistavat yhteydenpidon käyttäjän ja palvelun välillä.',
          expandAriaLabel: 'Näytä chat-palveluihin liittyvien evästeiden tiedot',
          checkboxAriaDescription:
            'Chat-palveluiden evästeet mahdollistavat yhteydenpidon käyttäjän ja palvelun välillä.',
        },
        sv: {
          title: 'Chattjänster',
          text: 'Kakor för chattjänsterna möjliggör kontakten mellan användaren och tjänsten.',
          expandAriaLabel: 'Visa information om kakor för chattjänsterna',
          checkboxAriaDescription: 'Kakor för chattjänsterna möjliggör kontakten mellan användaren och tjänsten.',
        },
        en: {
          title: 'Chat services',
          text: 'Chat service cookies enable communication between the user and the service.',
          expandAriaLabel: 'Show cookie information related to chat services',
          checkboxAriaDescription: 'Chat service cookies enable communication between the user and the service.',
        },
      },
      thirdParty: {
        fi: {
          title: 'Kolmannen osapuolen palvelut',
          text:
            'Evästeet mahdollistavat ulkopuolisten palvelujen (kuten sosiaalisen median alustojen) toiminnan tällä sivustolla.',
          expandAriaLabel: 'Näytä kolmansiin osapuoliin liittyvien evästeiden tiedot',
          checkboxAriaDescription:
            'Evästeet mahdollistavat ulkopuolisten palvelujen (kuten sosiaalisen median alustojen) toiminnan tällä sivustolla.',
        },
        sv: {
          title: 'Tredje parts tjänster',
          text:
            'Kakor möjliggör utomstående tjänsters (såsom sociala medie-plattformar) funktioner på denna webbplats.',
          expandAriaLabel: 'Visa information om tredjepartskakor',
          checkboxAriaDescription:
            'Kakor möjliggör utomstående tjänsters (såsom sociala medie-plattformar) funktioner på denna webbplats.',
        },
        en: {
          title: 'Third-party services',
          text: 'Cookies allow external services (such as social media platforms) to operate on this website.',
          expandAriaLabel: 'Show cookie information related to third parties',
          checkboxAriaDescription:
            'Cookies allow external services (such as social media platforms) to operate on this website.',
        },
      },
      content: {
        fi: {
          title: 'Sisällön esittäminen',
          text: 'Evästeitä hyödynnetään erilaisten sisältöjen näyttämiseen käyttäjälle.',
          expandAriaLabel: 'Näytä sisällön esittämiseen liittyvien evästeiden tiedot',
          checkboxAriaDescription: 'Evästeitä hyödynnetään erilaisten sisältöjen näyttämiseen käyttäjälle.',
        },
        sv: {
          title: 'Visning av innehåll',
          text: 'Kakor utnyttjas för att visa olika innehåll för användaren.',
          expandAriaLabel: 'Visa information om kakor för visning av innehåll',
          checkboxAriaDescription: 'Kakor utnyttjas för att visa olika innehåll för användaren.',
        },
        en: {
          title: 'Content presentation',
          text: 'Cookies are used to display various types of content to the user.',
          expandAriaLabel: 'Show cookie information related to content presentation',
          checkboxAriaDescription: 'Cookies are used to display various types of content to the user.',
        },
      },
      location: {
        fi: {
          title: 'Sijainti',
          text: 'Sijaintievästeiden avulla voidaan hyödyntää käyttäjän laitteelta saatua sijaintitietoa (GPS).',
          expandAriaLabel: 'Näytä sijaintiin liittyvien evästeiden tiedot',
          checkboxAriaDescription:
            'Sijaintievästeiden avulla voidaan hyödyntää käyttäjän laitteelta saatua sijaintitietoa (GPS).',
        },
        sv: {
          title: 'Läge',
          text: 'Med hjälp av lägeskakor kan man utnyttja lägesdata som fåtts från användarens enhet (GPS).',
          expandAriaLabel: 'Visa information om lägeskakor',
          checkboxAriaDescription:
            'Med hjälp av lägeskakor kan man utnyttja lägesdata som fåtts från användarens enhet (GPS).',
        },
        en: {
          title: 'Location',
          text: "Location cookies can be used to utilise location information (GPS) received from the user's device.",
          expandAriaLabel: 'Show cookie information related to location',
          checkboxAriaDescription:
            'Location cookies can be used to utilise location information (GPS) received from the user’s device.',
        },
      },
      loadBalancing: {
        fi: {
          title: 'Kuormantasaus',
          text: 'Kuormantasausevästeiden avulla varmistetaan, että palvelu latautuu ja toimii nopeasti ja tehokkaasti.',
          expandAriaLabel: 'Näytä kuormantasaukseen liittyvien evästeiden tiedot',
          checkboxAriaDescription:
            'Kuormantasausevästeiden avulla varmistetaan, että palvelu latautuu ja toimii nopeasti ja tehokkaasti.',
        },
        sv: {
          title: 'Belastningsutjämning',
          text:
            'Med hjälp av belastningsutjämningskakor säkerställer man att tjänsten laddas och fungerar snabbt och effektivt.',
          expandAriaLabel: 'Visa information om belastningsutjämningskakor',
          checkboxAriaDescription:
            'Med hjälp av belastningsutjämningskakor säkerställer man att tjänsten laddas och fungerar snabbt och effektivt.',
        },
        en: {
          title: 'Load balancing',
          text: 'Load-balancing cookies ensure that the service loads and works quickly and efficiently.',
          expandAriaLabel: 'Show cookie information related to load-balancing',
          checkboxAriaDescription:
            'Load-balancing cookies ensure that the service loads and works quickly and efficiently.',
        },
      },
      essential: {
        fi: {
          title: 'Perustoimintoihin liittyvät evästeet',
          text: 'Sivusto ei toimi ilman näitä',
          expandAriaLabel: 'Näytä perustoimintoihin liittyvien evästeiden tiedot',
          checkboxAriaDescription: 'Sivusto ei toimi ilman näitä',
        },
        sv: {
          title: 'Kakor för grundläggande funktioner',
          text:
            'Du kan inte förbjuda användningen av kakor för grundläggande funktioner. De möjliggör webbplatsens funktioner och påverkar användbarheten.',
          expandAriaLabel: 'Visa information om kakor för grundläggande funktioner',
          checkboxAriaDescription:
            'Du kan inte förbjuda användningen av kakor för grundläggande funktioner. De möjliggör webbplatsens funktioner och påverkar användbarheten.',
        },
        en: {
          title: 'Cookies related to basic functionalities',
          text:
            'Cookies related to basic functionalities cannot be rejected. They enable the proper functioning of the website and affect the usability',
          expandAriaLabel: 'Show cookie information related to basic functionalities',
          checkboxAriaDescription:
            'Cookies related to basic functionalities cannot be rejected. They enable the proper functioning of the website and affect the usability',
        },
      },
      statistics: {
        fi: {
          title: 'Tilastointi',
          text: 'Tilastointievästeiden keräämää tietoa käytetään verkkosivuston kehittämiseen.',
          expandAriaLabel: 'Näytä tilastointiin liittyvien evästeiden tiedot',
          checkboxAriaDescription: 'Tilastointievästeiden keräämää tietoa käytetään verkkosivuston kehittämiseen.',
        },
        sv: {
          title: 'Statistik',
          text: 'Data från statistikkakorna används för att utveckla webbplatsen.',
          expandAriaLabel: 'Visa information om statistikkakor',
          checkboxAriaDescription: 'Data från statistikkakorna används för att utveckla webbplatsen.',
        },
        en: {
          title: 'Statistics',
          text: 'The information collected by statistics cookies is used to develop the website.',
          expandAriaLabel: 'Show cookie information related to statistics',
          checkboxAriaDescription: 'The information collected by statistics cookies is used to develop the website.',
        },
      },
      sharedConsents: {
        fi: {
          title: 'Yhteiset evästeet',
          text:
            'Helsingin kaupungin palvelut käyttävät yhteisiä evästeitä. Tallennamme nämä suostumukset, jottei sinun tarvitse hyväksyä samoja evästeitä uudelleen kaupungin muissa palveluissa.',
          expandAriaLabel: 'Näytä yhteisiin evästesuostumuksiin liittyvien evästeiden tiedot',
          checkboxAriaDescription:
            'Helsingin kaupungin palvelut käyttävät yhteisiä evästeitä. Tallennamme nämä suostumukset, jottei sinun tarvitse hyväksyä samoja evästeitä uudelleen muissa kaupungin palveluissa.',
        },
        sv: {
          title: 'Gemensamma kakor',
          text:
            'Helsingfors stads tjänster använder gemensamma kakor . Vi lagrar dessa samtycken så att du inte behöver godkänna samma kakor igen i stadens andra tjänster.',
          expandAriaLabel: 'Visa information om kakor för gemensamt samtycke',
          checkboxAriaDescription:
            'Helsingfors stads tjänster använder gemensamma kakor . Vi lagrar dessa samtycken så att du inte behöver godkänna samma kakor igen i stadens andra tjänster.',
        },
        en: {
          title: 'Shared consent',
          text:
            'City of Helsinki services use shared consent. We will store these consents so that you do not have to accept the same cookies again on other City services.',
          expandAriaLabel: 'Show cookie information related to shared cookie consent',
          checkboxAriaDescription:
            'City of Helsinki services use shared consent. We will store these consents so that you do not have to accept the same cookies again on other City services.',
        },
      },
      language: {
        fi: {
          title: 'Kielivalinnat',
          text: 'Kielievästeisiin tallennetaan käyttäjän tekemät kielivalinnat, jotta valittu kieli säilyisi.',
          expandAriaLabel: 'Näytä kielievästeisiin liittyvien evästeiden tiedot',
          checkboxAriaDescription:
            'Kielievästeisiin tallennetaan käyttäjän tekemät kielivalinnat, jotta valittu kieli säilyisi.',
        },
        sv: {
          title: 'Språkval',
          text: 'I språkkakorna lagras användarens språkval för att minnas vilket språk som har valts.',
          expandAriaLabel: 'Visa information om kakor för språkvalkakor',
          checkboxAriaDescription:
            'I språkkakorna lagras användarens språkval för att minnas vilket språk som har valts.',
        },
        en: {
          title: 'Language settings',
          text: 'Language cookies store the language selections by the user to remember the preferred language.',
          expandAriaLabel: 'Show cookie information related to language settings',
          checkboxAriaDescription:
            'Language cookies store the language selections by the user to remember the preferred language.',
        },
      },
      tunnistamoLogin: {
        ...commonLoginGroupTranslations,
        cookies: [
          {
            commonCookie: 'keycloak',
          },
          {
            commonCookie: 'keycloak-legacy',
          },
          {
            commonCookie: 'keycloak-generic',
          },
          {
            commonCookie: 'tunnistamo',
          },
          {
            commonCookie: 'tunnistamo-sessionid',
          },
          {
            commonCookie: 'suomifi-session',
          },
          {
            commonCookie: 'suomifi-saml',
          },
          {
            commonCookie: 'suomifi-shibstate',
          },
          {
            commonCookie: 'suomifi-shibsession',
          },
          {
            commonCookie: 'suomifi-shib-idp-session',
          },
        ],
      },
    },
    commonCookies: {
      helConsentCookie: {
        id: 'SET_IN_CODE',
        hostName: '*.hel.fi',
        commonGroup: 'SET_IN_CODE',
        fi: {
          name: 'Evästesuostumukset',
          description:
            'Sivusto käyttää tätä evästettä tietojen tallentamiseen siitä, ovatko kävijät antaneet hyväksyntänsä tai kieltäytyneet evästeiden käytöstä.',
          expiration: '1 vuosi',
        },
        sv: {
          name: 'Samtycken till kakor',
          description:
            'Webbplatsen använder denna kaka för att lagra information om huruvida besökare har godkänt användningen av kakor eller inte.',
          expiration: 'Ett år',
        },
        en: {
          name: 'Cookie consents',
          description:
            'Used by hel.fi to store information about whether visitors have given or declined the use of cookie categories used on the hel.fi site.',
          expiration: '1 year',
        },
      },
      cookiehub: {
        id: 'cookiehub',
        hostName: 'cookiehub.com',
        fi: {
          name: 'cookiehub',
          description: 'Mahdollistaa evästehallinnan hel.fi sivuilla.',
          expiration: '365 päivää',
        },
        sv: {
          name: 'cookiehub',
          description: 'Möjliggör hantering av kakor på hel.fi webbplatsen.',
          expiration: '365 dagar',
        },
        en: {
          name: 'cookiehub',
          description:
            'Used by CookieHub to store information about whether visitors have given or declined the use of cookie categories used on the hel.fi site.',
          expiration: '365 days',
        },
      },
      keycloak: {
        id: 'keycloak',
        hostName: keycloakUrl,
        name: 'AUTH_SESSION_ID',
        ...commonLoginTranslations,
      },
      matomo: {
        id: 'matomo',
        hostName: '*.hel.fi',
        fi: {
          name: '_pk_id.*',
          description: 'Eväste kerää tietoa kävijän liikkeistä sivustolla.',
          expiration: '393 päivää',
        },
        sv: {
          name: '_pk_id.*',
          description: 'Statistiksystemets kaka samlar information om hur webbplatsen används.',
          expiration: '393 dagar',
        },
        en: {
          name: '_pk_id.*',
          description: 'This cookie is used to store a few details about the user such as the unique visitor ID.',
          expiration: '393 days',
        },
      },
      'cms-session': {
        id: 'cms-session',
        hostName: 'hel.fi',
        fi: {
          name: 'SSESS*',
          description: 'Sisällönhallintajärjestelmän toimintaan liittyvä eväste.',
          expiration: '23 päivää',
        },
        sv: {
          name: 'SSESS*',
          description: 'En kaka för driften av innehållshanteringssystemet.',
          expiration: '23 dagar',
        },
        en: {
          name: 'SSESS*',
          description: 'A cookie related to the operation of the content management system.',
          expiration: '23 days',
        },
      },
      tunnistamo: {
        id: 'tunnistamo',
        hostName: tunnistamoUrl,
        name: 'sso-sessionid',
        ...commonLoginTranslations,
      },
      'suomifi-session': {
        id: 'suomifi-session',
        hostName: suomiFiUrl,
        name: 'JSESSIONID',
        ...commonLoginTranslations,
      },
      'suomifi-logtag': {
        id: 'suomifi-logtag',
        hostName: suomiFiUrl,
        name: 'E-Identification-LogTag',
        ...commonLoginTranslations,
      },
      'suomifi-saml': {
        id: 'suomifi-saml',
        hostName: suomiFiUrl,
        name: '_opensaml_req_cookie*',
        ...commonLoginTranslations,
      },
      'suomifi-shibstate': {
        id: 'suomifi-shibstate',
        hostName: suomiFiUrl,
        name: '_shibstate_*',
        ...commonLoginTranslations,
      },
      'suomifi-shibsession': {
        id: 'suomifi-shibsession',
        hostName: suomiFiUrl,
        name: '_shibsession_*',
        ...commonLoginTranslations,
      },
      'suomifi-shib-idp-session': {
        id: 'suomifi-shib-idp-session',
        hostName: suomiFiUrl,
        name: 'shib_idp_session',
        ...commonLoginTranslations,
      },
      'tunnistamo-sessionid': {
        id: 'tunnistamo-sessionid',
        hostName: tunnistamoUrl,
        name: 'tunnistamo_prod-sessionid',
        ...commonLoginTranslations,
      },
      'keycloak-legacy': {
        id: 'keycloak-legacy',
        hostName: keycloakUrl,
        name: 'AUTH_SESSION_ID_LEGACY',
        ...commonLoginTranslations,
      },
      'keycloak-generic': {
        id: 'keycloak-generic',
        hostName: keycloakUrl,
        name: 'KC_*',
        ...commonLoginTranslations,
      },
      'tunnistamo-csrftoken': {
        id: 'tunnistamo-csrftoken',
        hostName: tunnistamoUrl,
        name: 'tunnistamo_prod-csrftoken',
        ...commonSecurityControlTranslations,
      },
      'profiili-csrftoken': {
        id: 'profiili-csrftoken',
        hostName: 'api.hel.fi',
        name: 'profiili-prod-csrftoken',
        ...commonSecurityControlTranslations,
      },
      'tunnistamo-login-loadbalancer': {
        id: 'tunnistamo-login-loadbalancer',
        hostName: `${tunnistamoUrl}, ${keycloakUrl}`,
        ...commonLoadbalancerTranslations,
      },
      'keycloak-language': {
        id: 'keycloak-language',
        name: 'KEYCLOAK_LOCALE',
        hostName: keycloakUrl,
        ...commonLanguageTranslations,
      },
      'suomifi-language': {
        id: 'suomifi-language',
        name: 'E-Identification-Lang',
        hostName: suomiFiUrl,
        ...commonLanguageTranslations,
      },
    },
  };
}
