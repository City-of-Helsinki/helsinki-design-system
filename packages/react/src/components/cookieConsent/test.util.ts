/* eslint-disable jest/no-mocks-import */
import cookie from 'cookie';
import { RenderResult, waitFor } from '@testing-library/react';

import { CookieGroup, Content } from './CookieConsentContext';
import { ConsentList, ConsentObject, COOKIE_NAME } from './cookieConsentController';
import { CookieSetOptions } from './cookieController';
import { MockedDocumentCookieActions } from './__mocks__/mockDocumentCookie';
import { ContentSource } from './content.builder';

export type TestConsentData = {
  requiredConsents?: ConsentList[];
  optionalConsents?: ConsentList[];
  consents?: ConsentObject;
  contentSourceOverrides?: Partial<ContentSource>;
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

const createCookieGroup = (id: string, consents: ConsentList): CookieGroup => {
  return {
    title: `Cookie group title for ${id}`,
    text: `Cookie group description for ${id}`,
    expandAriaLabel: `expandAriaLabel for ${id}`,
    checkboxAriaDescription: `checkboxAriaLabel for ${id}`,
    cookies: consents.map((consent) => {
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

export const getContentSource = (
  requiredCookieGroups?: ConsentList[],
  optionalConsentsGroups?: ConsentList[],
  contentSourceOverrides?: Partial<ContentSource>,
): ContentSource => {
  const contentOverrides: Partial<ContentSource> = {};

  if (requiredCookieGroups) {
    contentOverrides.requiredCookies = {
      title: 'Title for required cookies',
      text: 'Text for required cookies',
      checkboxAriaDescription: 'checkboxAriaLabel',
      groups: requiredCookieGroups.map((consents, index) => createCookieGroup(`requiredCookieGroup${index}`, consents)),
    };
  }
  if (optionalConsentsGroups) {
    contentOverrides.optionalCookies = {
      title: 'Title for optional cookies',
      text: 'Text for optional cookies',
      checkboxAriaDescription: 'checkboxAriaLabel',
      groups: optionalConsentsGroups.map((consents, index) =>
        createCookieGroup(`optionalCookieGroups${index}`, consents),
      ),
    };
  }
  return {
    siteName: 'Test site',
    noCommonConsentCookie: true,
    currentLanguage: 'fi',
    ...contentOverrides,
    ...contentSourceOverrides,
  };
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
    saveNotification: 'cookie-consent-save-notification',
    getCookieGroupCheckboxId: (parent: TestGroupParent, index: number) => `${parent}-consents-group-${index}-checkbox`,
    getCookieGroupDetailsTogglerId: (parent: TestGroupParent, index: number) =>
      `${parent}-consents-group-${index}-details-toggler`,
    getCookieGroupTableId: (parent: TestGroupParent, index: number) => `${parent}-consents-group-${index}-table`,
    getConsentsCheckboxId: (parent: TestGroupParent) => `${parent}-consents-checkbox`,
  },
  requiredGroupParent: 'required' as TestGroupParent,
  optionalGroupParent: 'optional' as TestGroupParent,
  defaultConsentData: {
    requiredConsents: [['requiredConsent1', 'requiredConsent2'], ['requiredConsent3']],
    optionalConsents: [['optionalConsent1'], ['optionalConsent2', 'optionalConsent3']],
    consents: {},
  },
  unknownConsents: {
    unknownConsent1: true,
    unknownConsent2: false,
  },
};

function createConsentObject(consentList: ConsentList, source: TestConsentData, approved: boolean): ConsentObject {
  const flattenArrayReducer = (acc: unknown[], val: unknown) => acc.concat(val);
  const flatRequired = source.requiredConsents.reduce(flattenArrayReducer, []) as ConsentList;
  const flatOptional = source.optionalConsents.reduce(flattenArrayReducer, []) as ConsentList;
  const allConsents = [...flatRequired, ...flatOptional];
  const consents = allConsents.reduce((currentValue, currentConsent) => {
    // eslint-disable-next-line no-param-reassign
    currentValue[currentConsent] = !approved;
    return currentValue;
  }, {});
  consentList.forEach((consent) => {
    consents[consent] = approved;
  });
  return consents;
}

export function createConsentObjectWithSelectedApprovals(
  approvedConsents: ConsentList,
  source: TestConsentData = commonTestProps.defaultConsentData,
): ConsentObject {
  return createConsentObject(approvedConsents, source, true);
}

export function createConsentObjectWithSelectedRejections(
  approvedConsents: ConsentList,
  source: TestConsentData = commonTestProps.defaultConsentData,
): ConsentObject {
  return createConsentObject(approvedConsents, source, false);
}

export async function openAllAccordions(
  result: RenderResult,
  content: Content,
  dataTestIds: typeof commonTestProps['dataTestIds'],
): Promise<void> {
  const openAccordions = async (groupParent: TestGroupParent) => {
    const list = groupParent === 'required' ? content.requiredConsents.groups : content.optionalConsents.groups;
    let index = 0;
    /* eslint-disable no-restricted-syntax */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const groups of list) {
      // eslint-disable-next-line no-await-in-loop
      await openAccordion(result, dataTestIds.getCookieGroupDetailsTogglerId(groupParent, index));
      expect(result.getByTestId(dataTestIds.getCookieGroupTableId(groupParent, index))).toBeVisible();
      index += 1;
    }
    /* eslint-enable no-restricted-syntax */
  };
  await openAccordions('required');
  await openAccordions('optional');
}
