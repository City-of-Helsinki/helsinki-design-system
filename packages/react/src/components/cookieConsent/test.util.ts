/* eslint-disable jest/no-mocks-import */
import cookie from 'cookie';

import { ConsentGroup, Content } from './CookieConsentContext';
import { ConsentList, COOKIE_NAME } from './cookieConsentController';
import { CookieSetOptions } from './cookieController';
import { MockedDocumentCookieActions } from './__mocks__/mockDocumentCookie';

export function extractSetCookieArguments(
  mockedCookieControls: MockedDocumentCookieActions,
  index = -1,
): {
  cookieName: string;
  data: string;
  options: CookieSetOptions;
} {
  const mockCalls = mockedCookieControls.mockSet.mock.calls;
  const pos = index > -1 ? index : mockCalls.length - 1;
  const callArgs = mockCalls[pos];
  const dataStr = callArgs[0] || '';
  const parsed = callArgs ? cookie.parse(dataStr) : {};
  const keyFound = Object.keys(parsed).includes(COOKIE_NAME);
  const data = parsed[COOKIE_NAME];
  return {
    cookieName: keyFound ? COOKIE_NAME : '',
    data,
    options: mockedCookieControls.extractCookieOptions(dataStr, COOKIE_NAME),
  };
}

const createConsentGroup = (id: string, consents: ConsentList): ConsentGroup => {
  return {
    title: `Consent group title for ${id}`,
    text: `Consent group description for ${id}`,
    expandAriaLabel: `expandAriaLabel for ${id}`,
    checkboxAriaDescription: `checkboxAriaLabel for ${id}`,
    consents: consents.map((consent) => {
      return {
        id: consent,
        name: `Name of ${consent}`,
        hostName: `HostName of ${consent}`,
        path: `Path of ${consent}`,
        description: `Description of ${consent}`,
        expiration: `Expiration of ${consent}`,
      };
    }),
  };
};

export const getContent = (
  requiredConsentGroups?: ConsentList[],
  optionalConsentsGroups?: ConsentList[],
  contentModifier?: (content: Content) => Content,
): Content => {
  const content: Content = {
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
        hostName: 'Host name',
        path: 'Path',
        description: 'Description',
        expiration: 'Expiration',
      },
    },
    language: {
      languageOptions: [
        { code: 'fi', label: 'Suomeksi (FI)' },
        { code: 'sv', label: 'Svenska (SV)' },
        { code: 'en', label: 'English (EN)' },
      ],
      current: 'fi',
      languageSelectorAriaLabel: 'Kieli: Suomi. Vaihda kieli. Change language. Ändra språk.',
      onLanguageChange: () => undefined,
    },
  };
  if (requiredConsentGroups) {
    content.requiredConsents = {
      title: 'Title for required consents',
      text: 'Text for required consents',
      checkboxAriaDescription: 'checkboxAriaLabel',
      groupList: requiredConsentGroups.map((consents, index) =>
        createConsentGroup(`requiredConsentGroup${index}`, consents),
      ),
    };
  }
  if (optionalConsentsGroups) {
    content.optionalConsents = {
      title: 'Title for optional consents',
      text: 'Text for optional consents',
      checkboxAriaDescription: 'checkboxAriaLabel',
      groupList: optionalConsentsGroups.map((consents, index) =>
        createConsentGroup(`optionalConsentGroups${index}`, consents),
      ),
    };
  }
  if (contentModifier) {
    return contentModifier(content);
  }
  return content;
};
