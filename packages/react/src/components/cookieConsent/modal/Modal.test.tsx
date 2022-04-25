/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render, RenderResult, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { act } from 'react-dom/test-utils';

import { Modal } from './Modal';
import { COOKIE_NAME } from '../cookieConsentController';
import { Content, Provider as CookieContextProvider } from '../CookieConsentContext';
import mockDocumentCookie from '../__mocks__/mockDocumentCookie';
import {
  clickElement,
  extractSetCookieArguments,
  getContent,
  isAccordionOpen,
  openAccordion,
  verifyElementDoesNotExistsByTestId,
  verifyElementExistsByTestId,
  commonTestProps,
  TestConsentData,
  TestGroupParent,
  createCookieDataWithSelectedRejections,
} from '../test.util';

const { requiredGroupParent, optionalGroupParent, defaultConsentData, unknownConsents, dataTestIds } = commonTestProps;

const mockedCookieControls = mockDocumentCookie();

let content: Content;

const renderCookieConsent = (
  { requiredConsents = [], optionalConsents = [], cookie = {}, contentModifier }: TestConsentData,
  withRealTimers = false,
): RenderResult => {
  // inject unknown consents to verify those are
  // stored and handled, but not required or optional
  const cookieWithInjectedUnknowns = {
    ...cookie,
    ...unknownConsents,
  };
  content = getContent(requiredConsents, optionalConsents, contentModifier);
  jest.useFakeTimers();
  mockedCookieControls.init({ [COOKIE_NAME]: JSON.stringify(cookieWithInjectedUnknowns) });
  const result = render(
    <CookieContextProvider content={content}>
      <Modal />
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

describe('<ModalContent /> spec', () => {
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

  const initDetailsView = async (data: TestConsentData): Promise<RenderResult> => {
    const result = renderCookieConsent(data);
    await openAccordion(result, dataTestIds.settingsToggler);
    return result;
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
        cookie: createCookieDataWithSelectedRejections(['requiredConsent2']),
      });
      verifyElementExistsByTestId(result, dataTestIds.container);
    });

    it('is not shown when all consents have been handled and are true/false', () => {
      const result = renderCookieConsent({
        ...defaultConsentData,
        cookie: createCookieDataWithSelectedRejections(['optionalConsent1', 'optionalConsent3']),
      });
      verifyElementDoesNotExistsByTestId(result, dataTestIds.container);
      verifyElementDoesNotExistsByTestId(result, dataTestIds.screenReaderNotification);
    });
    it('changing language calls content.onLanguageChange', () => {
      const onLanguageChange = jest.fn();
      const result = renderCookieConsent({
        ...defaultConsentData,
        contentModifier: (currentContent) => {
          // eslint-disable-next-line no-param-reassign
          currentContent.language.onLanguageChange = onLanguageChange;
          return currentContent;
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
        ...createCookieDataWithSelectedRejections([]),
        ...unknownConsents,
      };
      clickElement(result, dataTestIds.approveButton);
      checkCookiesAreSetAndConsentModalHidden(result, consentResult);
    });

    it('Approve required -button approves only required consents and clears selected consents', async () => {
      const result = renderCookieConsent(defaultConsentData);
      const consentResult = {
        ...createCookieDataWithSelectedRejections(['optionalConsent1', 'optionalConsent2', 'optionalConsent3']),
        ...unknownConsents,
      };
      await openAccordion(result, dataTestIds.settingsToggler);
      clickElement(result, dataTestIds.getConsentGroupCheckboxId(optionalGroupParent, 0));
      clickElement(result, dataTestIds.getConsentGroupCheckboxId(optionalGroupParent, 1));
      clickElement(result, dataTestIds.approveRequiredButton);
      checkCookiesAreSetAndConsentModalHidden(result, consentResult);
    });

    it('Approve -button will approve required and selected consents when details are shown', async () => {
      const result = renderCookieConsent(defaultConsentData);
      const consentResult = {
        ...createCookieDataWithSelectedRejections(['optionalConsent2', 'optionalConsent3']),
        ...unknownConsents,
      };
      await openAccordion(result, dataTestIds.settingsToggler);
      clickElement(result, dataTestIds.getConsentGroupCheckboxId(optionalGroupParent, 0));
      clickElement(result, dataTestIds.approveButton);
      checkCookiesAreSetAndConsentModalHidden(result, consentResult);
    });
  });

  describe('Settings accordion can be opened and in details view ', () => {
    it('required and optional consent groups are rendered', async () => {
      const result = await initDetailsView(defaultConsentData);
      verifyElementExistsByTestId(result, dataTestIds.getConsentsCheckboxId(requiredGroupParent));
      verifyElementExistsByTestId(result, dataTestIds.getConsentsCheckboxId(optionalGroupParent));
      defaultConsentData.requiredConsents.forEach((consent, index) => {
        verifyElementExistsByTestId(result, dataTestIds.getConsentGroupCheckboxId(requiredGroupParent, index));
        verifyElementExistsByTestId(result, dataTestIds.getConsentGroupDetailsTogglerId(requiredGroupParent, index));
      });
      defaultConsentData.optionalConsents.forEach((consent, index) => {
        verifyElementExistsByTestId(result, dataTestIds.getConsentGroupCheckboxId(optionalGroupParent, index));
        verifyElementExistsByTestId(result, dataTestIds.getConsentGroupDetailsTogglerId(optionalGroupParent, index));
      });
    });

    it('Approve button text changes when accordion is open vs closed', async () => {
      const result = await initDetailsView(defaultConsentData);
      const approveButtonTextWhileOpen = (result.getByTestId(dataTestIds.approveButton) as HTMLElement).innerHTML;

      clickElement(result, dataTestIds.settingsToggler);
      await waitFor(() => {
        expect(isAccordionOpen(result, dataTestIds.settingsToggler)).toBeFalsy();
      });
      const approveButtonTextWhileClosed = (result.getByTestId(dataTestIds.approveButton) as HTMLElement).innerHTML;
      expect(approveButtonTextWhileOpen).not.toBe(approveButtonTextWhileClosed);
    });

    it(`clicking an optional consent group sets the all consents in that group true/false. 
        Cookie consent is not hidden until an approve -button is clicked`, async () => {
      const result = await initDetailsView(defaultConsentData);
      defaultConsentData.optionalConsents.forEach((consent, index) => {
        clickElement(result, dataTestIds.getConsentGroupCheckboxId(optionalGroupParent, index));
      });
      clickElement(result, dataTestIds.getConsentGroupCheckboxId(optionalGroupParent, 0));
      clickElement(result, dataTestIds.approveButton);
      expect(JSON.parse(getSetCookieArguments().data)).toEqual({
        ...createCookieDataWithSelectedRejections(['optionalConsent1']),
        ...unknownConsents,
      });
      verifyElementDoesNotExistsByTestId(result, dataTestIds.container);
      verifyElementExistsByTestId(result, dataTestIds.screenReaderNotification);
      expect(mockedCookieControls.mockSet).toHaveBeenCalledTimes(1);
    });
  });
  describe('Accordions of each consent group can be opened and ', () => {
    it('all consents in the group are rendered', async () => {
      const result = await initDetailsView(defaultConsentData);
      const checkConsentsExist = async (groupParent: TestGroupParent) => {
        const list =
          groupParent === 'required' ? content.requiredConsents.groupList : content.optionalConsents.groupList;
        let index = 0;
        // cannot use async/await with array.forEach
        // eslint-disable-next-line no-restricted-syntax
        for (const groups of list) {
          expect(result.getByTestId(dataTestIds.getConsentGroupTableId(groupParent, index))).not.toBeVisible();
          // eslint-disable-next-line no-await-in-loop
          await openAccordion(result, dataTestIds.getConsentGroupDetailsTogglerId(groupParent, index));
          expect(result.getByTestId(dataTestIds.getConsentGroupTableId(groupParent, index))).toBeVisible();
          index += 1;
          groups.consents.forEach((consent) => {
            expect(result.getAllByText(consent.name)).toHaveLength(1);
          });
        }
      };
      await checkConsentsExist('required');
      await checkConsentsExist('optional');
    });
  });
});
