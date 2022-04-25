/* eslint-disable jest/no-mocks-import */
import cookie from 'cookie';
import { RenderResult, waitFor } from '@testing-library/react';

import { ConsentGroup, Content } from './CookieConsentContext';
import { ConsentList, ConsentObject, COOKIE_NAME } from './cookieConsentController';
import { CookieSetOptions } from './cookieController';
import { MockedDocumentCookieActions } from './__mocks__/mockDocumentCookie';

export type TestConsentData = {
  requiredConsents?: ConsentList[];
  optionalConsents?: ConsentList[];
  cookie?: ConsentObject;
  contentModifier?: (content: Content) => Content;
};

export type TestGroupParent = typeof requiredGroupParent | typeof optionalGroupParent;

const requiredGroupParent = 'required';
const optionalGroupParent = 'optional';

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

export function verifyElementExistsByTestId(result: RenderResult, testId: string) {
  expect(result.getAllByTestId(testId)).toHaveLength(1);
}

export function verifyElementDoesNotExistsByTestId(result: RenderResult, testId: string) {
  expect(() => result.getAllByTestId(testId)).toThrow();
}

export function clickElement(result: RenderResult, testId: string) {
  result.getByTestId(testId).click();
}

export function isAccordionOpen(result: RenderResult, testId: string): boolean {
  const toggler = result.getByTestId(testId) as HTMLElement;
  return toggler.getAttribute('aria-expanded') === 'true';
}

export async function openAccordion(result: RenderResult, testId: string): Promise<void> {
  clickElement(result, testId);
  await waitFor(() => {
    expect(isAccordionOpen(result, testId)).toBeTruthy();
  });
}

export const commonTestProps = {
  dataTestIds: {
    container: 'cookie-consent',
    languageSwitcher: 'cookie-consent-language-switcher',
    approveButton: 'cookie-consent-approve-button',
    approveRequiredButton: 'cookie-consent-approve-required-button',
    settingsToggler: 'cookie-consent-settings-toggler',
    detailsComponent: 'cookie-consent-details',
    screenReaderNotification: 'cookie-consent-screen-reader-notification',
    getConsentGroupCheckboxId: (parent: TestGroupParent, index: number) => `${parent}-consents-group-${index}-checkbox`,
    getConsentGroupDetailsTogglerId: (parent: TestGroupParent, index: number) =>
      `${parent}-consents-group-${index}-details-toggler`,
    getConsentGroupTableId: (parent: TestGroupParent, index: number) => `${parent}-consents-group-${index}-table`,
    getConsentsCheckboxId: (parent: TestGroupParent) => `${parent}-consents-checkbox`,
  },
  requiredGroupParent: 'required' as TestGroupParent,
  optionalGroupParent: 'optional' as TestGroupParent,
  defaultConsentData: {
    requiredConsents: [['requiredConsent1', 'requiredConsent2'], ['requiredConsent3']],
    optionalConsents: [['optionalConsent1'], ['optionalConsent2', 'optionalConsent3']],
    cookie: {},
  },
  unknownConsents: {
    unknownConsent1: true,
    unknownConsent2: false,
  },
};
