/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render, RenderResult, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { act } from 'react-dom/test-utils';

import { CookieConsent } from './CookieConsent';
import { ConsentList, ConsentObject, COOKIE_NAME } from './cookieConsentController';
import { Content, Provider as CookieContextProvider } from './CookieConsentContext';
import mockDocumentCookie from './__mocks__/mockDocumentCookie';
import { extractSetCookieArguments, getContent } from './test.util';

type ConsentData = {
  requiredConsents?: ConsentList[];
  optionalConsents?: ConsentList[];
  cookie?: ConsentObject;
  contentModifier?: (content: Content) => Content;
};

const defaultConsentData = {
  requiredConsents: [['requiredConsent1', 'requiredConsent2'], ['requiredConsent3']],
  optionalConsents: [['optionalConsent1'], ['optionalConsent2', 'optionalConsent3']],
  cookie: {},
};

const unknownConsents = {
  unknownConsent1: true,
  unknownConsent2: false,
};

const mockedCookieControls = mockDocumentCookie();

const renderCookieConsent = (
  { requiredConsents = [], optionalConsents = [], cookie = {}, contentModifier }: ConsentData,
  withRealTimers = false,
): RenderResult => {
  // inject unknown consents to verify those are
  // stored and handled, but not required or optional
  const cookieWithInjectedUnknowns = {
    ...cookie,
    ...unknownConsents,
  };
  const content = getContent(requiredConsents, optionalConsents, contentModifier);
  jest.useFakeTimers();
  mockedCookieControls.init({ [COOKIE_NAME]: JSON.stringify(cookieWithInjectedUnknowns) });
  const result = render(
    <CookieContextProvider content={content}>
      <CookieConsent />
    </CookieContextProvider>,
  );
  act(() => {
    jest.runAllTimers();
  });

  // For example, axe uses timers so sometimes the test must use real ones
  if (withRealTimers) {
    jest.useRealTimers();
  }

  return result;
};

describe('<CookieConsent /> spec', () => {
  afterEach(() => {
    mockedCookieControls.clear();
  });

  afterAll(() => {
    mockedCookieControls.restore();
  });

  it('renders the component', () => {
    const { asFragment } = renderCookieConsent(defaultConsentData);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = renderCookieConsent(defaultConsentData, true);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('<CookieConsent /> ', () => {
  afterEach(() => {
    mockedCookieControls.clear();
  });

  afterAll(() => {
    mockedCookieControls.restore();
  });

  const getSetCookieArguments = (index = -1) => extractSetCookieArguments(mockedCookieControls, index);

  const dataTestIds = {
    container: 'cookie-consent',
    languageSwitcher: 'cookie-consent-language-switcher',
    approveButton: 'cookie-consent-approve-button',
    approveRequiredButton: 'cookie-consent-approve-required-button',
    settingsToggler: 'cookie-consent-settings-toggler',
    detailsComponent: 'cookie-consent-details',
    screenReaderNotification: 'cookie-consent-screen-reader-notification',
    getRequiredConsentGroupCheckboxId: (index: number) => `required-consents-group-${index}-checkbox`,
    getOptionalConsentGroupCheckboxId: (index: number) => `optional-consents-group-${index}-checkbox`,
    getRequiredConsentGroupDetailsTogglerId: (index: number) => `required-consents-group-${index}-details-toggler`,
    getOptionalConsentGroupDetailsTogglerId: (index: number) => `optional-consents-group-${index}-details-toggler`,
    getRequiredConsentsCheckboxId: () => `required-consents-checkbox`,
    getOptionalConsentsCheckboxId: () => `optional-consents-checkbox`,
  };

  const verifyElementExistsByTestId = (result: RenderResult, testId: string) => {
    expect(result.getAllByTestId(testId)).toHaveLength(1);
  };

  const verifyElementDoesNotExistsByTestId = (result: RenderResult, testId: string) => {
    expect(() => result.getAllByTestId(testId)).toThrow();
  };

  const clickElement = (result: RenderResult, testId: string) => {
    result.getByTestId(testId).click();
  };

  const isAccordionOpen = (result: RenderResult): boolean => {
    const toggler = result.getByTestId(dataTestIds.settingsToggler) as HTMLElement;
    return toggler.getAttribute('aria-expanded') === 'true';
  };

  const openAccordion = async (result: RenderResult): Promise<void> => {
    clickElement(result, dataTestIds.settingsToggler);
    await waitFor(() => {
      expect(isAccordionOpen(result)).toBeTruthy();
    });
  };

  describe('Cookie consent ', () => {
    it('and child components are rendered when consents have not been handled', () => {
      const result = renderCookieConsent(defaultConsentData);
      verifyElementExistsByTestId(result, dataTestIds.container);
      verifyElementExistsByTestId(result, dataTestIds.languageSwitcher);
      verifyElementExistsByTestId(result, dataTestIds.approveButton);
      verifyElementExistsByTestId(result, dataTestIds.approveRequiredButton);
    });

    it('is rendered if a required consent has not been approved. It could have been optional before', () => {
      const result = renderCookieConsent({
        ...defaultConsentData,
        cookie: {
          requiredConsent1: true,
          requiredConsent2: false,
          requiredConsent3: true,
          optionalConsent1: true,
          optionalConsent2: true,
          optionalConsent3: true,
        },
      });
      verifyElementExistsByTestId(result, dataTestIds.container);
    });

    it('is not shown when all consents have been handled and are true/false', () => {
      const result = renderCookieConsent({
        ...defaultConsentData,
        cookie: {
          requiredConsent1: true,
          requiredConsent2: true,
          requiredConsent3: true,
          optionalConsent1: false,
          optionalConsent2: true,
          optionalConsent3: false,
        },
      });
      verifyElementDoesNotExistsByTestId(result, dataTestIds.container);
      verifyElementDoesNotExistsByTestId(result, dataTestIds.screenReaderNotification);
    });
    it('changing language calls content.onLanguageChange', () => {
      const onLanguageChange = jest.fn();
      const result = renderCookieConsent({
        ...defaultConsentData,
        contentModifier: (content) => {
          // eslint-disable-next-line no-param-reassign
          content.language.onLanguageChange = onLanguageChange;
          return content;
        },
      });
      result.container.querySelector('#cookie-consent-language-selector-button').click();
      result.container.querySelector('a[lang="sv"]').click();
      expect(onLanguageChange).toHaveBeenLastCalledWith('sv');
    });
  });

  describe(`Approve button will 
            - hide the cookie consent
            - show a prompt for screen readers
            - save cookie`, () => {
    const checkCookiesAreSetAndConsentModalHidden = (result: RenderResult, assumedConsents: unknown) => {
      expect(JSON.parse(getSetCookieArguments().data)).toEqual(assumedConsents);
      verifyElementDoesNotExistsByTestId(result, dataTestIds.container);
      verifyElementExistsByTestId(result, dataTestIds.screenReaderNotification);
      expect(mockedCookieControls.mockSet).toHaveBeenCalledTimes(1);
    };

    it('Approve -button approves all consents when details are not shown', () => {
      const result = renderCookieConsent(defaultConsentData);
      const consentResult = {
        requiredConsent1: true,
        requiredConsent2: true,
        requiredConsent3: true,
        optionalConsent1: true,
        optionalConsent2: true,
        optionalConsent3: true,
        ...unknownConsents,
      };
      clickElement(result, dataTestIds.approveButton);
      checkCookiesAreSetAndConsentModalHidden(result, consentResult);
    });

    it('Approve required -button approves only required consents and clears selected consents', async () => {
      const result = renderCookieConsent(defaultConsentData);
      const consentResult = {
        requiredConsent1: true,
        requiredConsent2: true,
        requiredConsent3: true,
        optionalConsent1: false,
        optionalConsent2: false,
        optionalConsent3: false,
        ...unknownConsents,
      };
      await openAccordion(result);
      clickElement(result, dataTestIds.getOptionalConsentGroupCheckboxId(0));
      clickElement(result, dataTestIds.getOptionalConsentGroupCheckboxId(1));
      clickElement(result, dataTestIds.approveRequiredButton);
      checkCookiesAreSetAndConsentModalHidden(result, consentResult);
    });

    it('Approve -button will approve required and selected consents when details are shown', async () => {
      const result = renderCookieConsent(defaultConsentData);
      const consentResult = {
        requiredConsent1: true,
        requiredConsent2: true,
        requiredConsent3: true,
        optionalConsent1: true,
        optionalConsent2: false,
        optionalConsent3: false,
        ...unknownConsents,
      };
      await openAccordion(result);
      clickElement(result, dataTestIds.getOptionalConsentGroupCheckboxId(0));
      clickElement(result, dataTestIds.approveButton);
      checkCookiesAreSetAndConsentModalHidden(result, consentResult);
    });
  });

  describe('Accordion can be opened and in details view ', () => {
    const initDetailsView = async (data: ConsentData): Promise<RenderResult> => {
      const result = renderCookieConsent(data);
      await openAccordion(result);
      return result;
    };

    it('required and optional consent groups are rendered', async () => {
      const result = await initDetailsView(defaultConsentData);
      verifyElementExistsByTestId(result, dataTestIds.getRequiredConsentsCheckboxId());
      verifyElementExistsByTestId(result, dataTestIds.getOptionalConsentsCheckboxId());
      defaultConsentData.requiredConsents.forEach((consent, index) => {
        verifyElementExistsByTestId(result, dataTestIds.getRequiredConsentGroupCheckboxId(index));
        verifyElementExistsByTestId(result, dataTestIds.getRequiredConsentGroupDetailsTogglerId(index));
      });
      defaultConsentData.optionalConsents.forEach((consent, index) => {
        verifyElementExistsByTestId(result, dataTestIds.getOptionalConsentGroupCheckboxId(index));
        verifyElementExistsByTestId(result, dataTestIds.getOptionalConsentGroupDetailsTogglerId(index));
      });
    });

    it('Approve button text changes when accordion is open vs closed', async () => {
      const result = await initDetailsView(defaultConsentData);
      const approveButtonTextWhileOpen = (result.getByTestId(dataTestIds.approveButton) as HTMLElement).innerHTML;

      clickElement(result, dataTestIds.settingsToggler);
      await waitFor(() => {
        expect(isAccordionOpen(result)).toBeFalsy();
      });
      const approveButtonTextWhileClosed = (result.getByTestId(dataTestIds.approveButton) as HTMLElement).innerHTML;
      expect(approveButtonTextWhileOpen).not.toBe(approveButtonTextWhileClosed);
    });

    it(`clicking an optional consent group sets the all consents in that group true/false. 
        Cookie consent is not hidden until an approve -button is clicked`, async () => {
      const result = await initDetailsView(defaultConsentData);
      defaultConsentData.optionalConsents.forEach((consent, index) => {
        clickElement(result, dataTestIds.getOptionalConsentGroupCheckboxId(index));
      });
      clickElement(result, dataTestIds.getOptionalConsentGroupCheckboxId(0));
      clickElement(result, dataTestIds.approveButton);
      expect(JSON.parse(getSetCookieArguments().data)).toEqual({
        requiredConsent1: true,
        requiredConsent2: true,
        requiredConsent3: true,
        optionalConsent1: false,
        optionalConsent2: true,
        optionalConsent3: true,
        ...unknownConsents,
      });
      verifyElementDoesNotExistsByTestId(result, dataTestIds.container);
      verifyElementExistsByTestId(result, dataTestIds.screenReaderNotification);
      expect(mockedCookieControls.mockSet).toHaveBeenCalledTimes(1);
    });
  });
});
