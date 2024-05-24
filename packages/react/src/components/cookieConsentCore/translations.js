/* eslint-disable no-param-reassign */
/* eslint-disable no-template-curly-in-string */

const translations = {
  bannerAriaLabel: {
    fi: 'Evästeasetukset',
    sv: 'Inställningar för kakor',
    en: 'Cookie settings',
  },
  heading: {
    fi: '${siteName} käyttää evästeitä',
    sv: '${siteName} använder kakor',
    en: '${siteName} uses cookies',
  },
  description: {
    fi: 'Tämä sivusto käyttää välttämättömiä evästeitä sivun perustoimintojen ja suorituskyvyn varmistamiseksi. Lisäksi käytämme kohdennusevästeitä käyttäjäkokemuksen parantamiseksi, analytiikkaan ja yksilöidyn sisällön näyttämiseen.',
    sv: 'Denna webbplats använder obligatoriska kakor för att säkerställa de grundläggande funktionerna och prestandan. Dessutom använder vi inriktningskakor för bättre användarupplevelse, analytik och individualiserat innehåll.',
    en: 'This website uses required cookies to ensure the basic functionality and performance. In addition, we use targeting cookies to improve the user experience, perform analytics and display personalised content.',
  },
  showDetails: {
    fi: 'Näytä yksityiskohdat',
    sv: 'Visa detaljer',
    en: 'Show details',
  },
  hideDetails: {
    fi: 'Piilota yksityiskohdat',
    sv: 'Stänga detaljer',
    en: 'Hide details',
  },
  form_heading: {
    fi: 'Tietoa sivustolla käytetyistä evästeistä',
    sv: 'Information om kakor som används på webbplatsen',
    en: 'About the cookies used on the website',
  },
  form_text: {
    fi: 'Sivustolla käytetyt evästeet on luokiteltu käyttötarkoituksen mukaan. Alla voit lukea eri luokista ja sallia tai kieltää evästeiden käytön.',
    sv: 'Kakorna som används på webbplatsen har klassificerats enligt användningsändamål. Du kan läsa om de olika klasserna och acceptera eller förbjuda användningen av kakor.',
    en: 'The cookies used on the website have been classified according to their intended use. Below, you can read about the various categories and accept or reject the use of cookies.',
  },
  showCookieSettings: {
    fi: 'Näytä evästeasetukset',
    sv: 'Visa kakinställningarna',
    en: 'Show cookie settings',
  },
  hideCookieSettings: {
    fi: 'Piilota evästeasetukset',
    sv: 'Stänga kakinställningarna',
    en: 'Hide cookie settings',
  },
  tableHeadingsName: {
    fi: 'Nimi',
    sv: 'Namn',
    en: 'Name',
  },
  tableHeadingsHostName: {
    fi: 'Evästeen asettaja',
    sv: 'Den som lagrat kakan',
    en: 'Cookie set by',
  },
  tableHeadingsDescription: {
    fi: 'Käyttötarkoitus',
    sv: 'Användning',
    en: 'Purpose of use',
  },
  tableHeadingsExpiration: {
    fi: 'Voimassaoloaika',
    sv: 'Giltighetstid',
    en: 'Period of validity',
  },
  tableHeadingsType: {
    fi: 'Tyyppi',
    sv: 'Typ',
    en: 'Type',
  },
  approveAllConsents: {
    fi: 'Hyväksy kaikki evästeet',
    sv: 'Acceptera alla kakor',
    en: 'Accept all cookies',
  },
  approveRequiredAndSelectedConsents: {
    fi: 'Hyväksy valitut evästeet',
    sv: 'Acceptera valda kakor',
    en: 'Accept selected cookies',
  },
  approveOnlyRequiredConsents: {
    fi: 'Hyväksy vain välttämättömät evästeet',
    sv: 'Acceptera endast nödvändiga',
    en: 'Accept required cookies only',
  },
  settingsSaved: {
    fi: 'Asetukset tallennettu!',
    sv: 'Inställningar sparade!',
    en: 'Settings saved!',
  },
  type_1: {
    fi: 'Eväste',
    sv: 'Kakan',
    en: 'Cookie',
  },
  type_2: 'localStorage',
  type_3: 'sessionStorage',
  type_4: 'IndexedDB',
  type_5: 'Cache Storage',
};

/**
 * Retrieves a translation based on the provided key, language, and parameters.
 *
 * @param {string} key - The translation key.
 * @param {string} lang - The language code.
 * @param {object} parameters - The parameters used to replace placeholders in the translation.
 * @return {string} - The translated string.
 * @throws {Error} - If the translation is missing for the provided key and language.
 */
export function getTranslation(key, lang, parameters) {
  // Normal strings as template strings, use like:
  // index({ a: 1, b: 2 }, "${a} is smaller than ${b}")
  // returns: 1 is smaller than 2
  // https://stackoverflow.com/a/41540381
  function index(obj, is, value) {
    if (typeof is === 'string') {
      is = is.split('.');
    }
    if (is.length === 1 && value !== undefined) {
      obj[is[0]] = value;
      return value;
    }
    if (is.length === 0) {
      return obj;
    }
    return index(obj[is[0]], is.slice(1), value);
  }

  // Find translation based on key, fallback to English
  let translation = null;
  if (translations[key]) {
    if (typeof translations[key] === 'string') {
      translation = translations[key];
    } else if (typeof translations[key] === 'object') {
      translation = translations[key][lang] || translations[key].en || null;
    }
  }

  if (translation) {
    // Replace dollar strings in translation with corresponding data from parameters
    return translation.replace(/\$\{.+?\}/g, (match) => {
      const stripDollarAndParenthesis = match.replace(/(^\$\{|\}$)/g, '');
      const parameter = index(parameters, stripDollarAndParenthesis);

      // Parameters may be either string or an language object
      if (typeof parameter === 'object') {
        if (parameter[lang]) {
          return parameter[lang];
        }

        // Use English as fallback language where possible
        if (parameter.en) {
          return parameter.en;
        }
      }
      return parameter;
    });
  }
  throw new Error(`Missing translation: ${key}:${lang}`);
}

/**
 * Retrieves the translation keys from the translations object.
 * @return {string[]} An array of translation keys.
 */
export function getTranslationKeys() {
  // console.log('getTranslationKeys', Object.keys(translations));
  return Object.keys(translations);
}
