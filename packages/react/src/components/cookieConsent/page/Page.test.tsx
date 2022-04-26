/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Page } from './Page';
import { COOKIE_NAME } from '../cookieConsentController';
import { Content } from '../CookieConsentContext';
import mockDocumentCookie from '../__mocks__/mockDocumentCookie';
import {
  clickElement,
  extractSetCookieArguments,
  getContent,
  openAccordion,
  verifyElementExistsByTestId,
  commonTestProps,
  TestConsentData,
  TestGroupParent,
  createCookieDataWithSelectedRejections,
  openAllAccordions,
} from '../test.util';

const { requiredGroupParent, optionalGroupParent, defaultConsentData, unknownConsents, dataTestIds } = commonTestProps;

const mockedCookieControls = mockDocumentCookie();

let content: Content;

const renderCookieConsent = ({
  requiredConsents = [],
  optionalConsents = [],
  cookie = {},
  contentModifier,
}: TestConsentData): RenderResult => {
  // inject unknown consents to verify those are
  // stored and handled, but not required or optional
  const cookieWithInjectedUnknowns = {
    ...cookie,
    ...unknownConsents,
  };
  content = getContent(requiredConsents, optionalConsents, contentModifier);
  mockedCookieControls.init({ [COOKIE_NAME]: JSON.stringify(cookieWithInjectedUnknowns) });
  const result = render(<Page content={content} />);

  return result;
};

describe('<Page /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = renderCookieConsent(defaultConsentData);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const result = renderCookieConsent(defaultConsentData);
    await openAllAccordions(result, content, dataTestIds);
    const results = await axe(result.container);
    expect(results).toHaveNoViolations();
  }, 15000);
});

describe('<Page /> ', () => {
  afterEach(() => {
    mockedCookieControls.clear();
  });

  afterAll(() => {
    mockedCookieControls.restore();
  });

  const getSetCookieArguments = (index = -1) => extractSetCookieArguments(mockedCookieControls, index);

  describe('Cookie consent ', () => {
    it('and child components are rendered even if consents have been handled', () => {
      const result = renderCookieConsent({
        ...defaultConsentData,
        cookie: createCookieDataWithSelectedRejections([]),
      });
      verifyElementExistsByTestId(result, dataTestIds.container);
      verifyElementExistsByTestId(result, dataTestIds.approveButton);
      verifyElementExistsByTestId(result, dataTestIds.approveRequiredButton);
    });
  });

  describe(`Approve buttons`, () => {
    const checkCookiesAreSetAndSaveNotificationShown = (result: RenderResult, assumedConsents: unknown) => {
      expect(JSON.parse(getSetCookieArguments().data)).toEqual(assumedConsents);
      verifyElementExistsByTestId(result, dataTestIds.saveNotification);
      expect(mockedCookieControls.mockSet).toHaveBeenCalledTimes(1);
    };

    it('Approve required -button approves only required consents and clears selected consents', async () => {
      const result = renderCookieConsent(defaultConsentData);
      const consentResult = {
        ...createCookieDataWithSelectedRejections(['optionalConsent1', 'optionalConsent2', 'optionalConsent3']),
        ...unknownConsents,
      };
      clickElement(result, dataTestIds.getConsentGroupCheckboxId(optionalGroupParent, 0));
      clickElement(result, dataTestIds.getConsentGroupCheckboxId(optionalGroupParent, 1));
      clickElement(result, dataTestIds.approveRequiredButton);
      checkCookiesAreSetAndSaveNotificationShown(result, consentResult);
    });

    it('Approve selected and required -button will approve required and selected consents', async () => {
      const result = renderCookieConsent(defaultConsentData);
      const consentResult = {
        ...createCookieDataWithSelectedRejections(['optionalConsent2', 'optionalConsent3']),
        ...unknownConsents,
      };
      clickElement(result, dataTestIds.getConsentGroupCheckboxId(optionalGroupParent, 0));
      clickElement(result, dataTestIds.approveButton);
      checkCookiesAreSetAndSaveNotificationShown(result, consentResult);
    });
  });

  describe('Details are shown and ', () => {
    it('required and optional consent groups are rendered', async () => {
      const result = renderCookieConsent(defaultConsentData);
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

    it(`clicking an optional consent group sets the all consents in that group true/false.`, async () => {
      const result = renderCookieConsent(defaultConsentData);
      const consentState = {
        ...createCookieDataWithSelectedRejections(['optionalConsent1', 'optionalConsent2', 'optionalConsent3']),
        ...unknownConsents,
      };
      defaultConsentData.optionalConsents.forEach((consentGroup, index) => {
        clickElement(result, dataTestIds.getConsentGroupCheckboxId(optionalGroupParent, index));
        consentGroup.forEach((consent) => {
          consentState[consent] = true;
        });
        clickElement(result, dataTestIds.approveButton);
        expect(JSON.parse(getSetCookieArguments().data)).toEqual(consentState);
        verifyElementExistsByTestId(result, dataTestIds.saveNotification);
        expect(mockedCookieControls.mockSet).toHaveBeenCalledTimes(index + 1);
      });
    });
  });
  describe('Accordions of each consent group can be opened and ', () => {
    it('all consents in the group are rendered', async () => {
      const result = renderCookieConsent(defaultConsentData);
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
