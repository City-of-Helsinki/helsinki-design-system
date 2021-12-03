/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { axe } from 'jest-axe';

import { CookieConsent } from './CookieConsent';
import { ConsentList, ConsentObject, COOKIE_NAME } from './cookieConsentController';
import { Provider as CookieContextProvider } from './CookieConsentContext';
import mockDocumentCookie from './__mocks__/mockDocumentCookie';
import extractSetCookieArguments from './test.util';

type ConsentData = {
  requiredConsents?: ConsentList;
  optionalConsents?: ConsentList;
  cookie?: ConsentObject;
};

describe('<CookieConsent /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<CookieConsent />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<CookieConsent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('<CookieConsent /> ', () => {
  const mockedCookieControls = mockDocumentCookie();
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
    approveAllButton: 'cookie-consent-approve-all-button',
    approveRequiredButton: 'cookie-consent-approve-required-button',
    readMoreButton: 'cookie-consent-read-more-button',
    readMoreTextButton: 'cookie-consent-read-more-text-button',
    detailsComponent: 'cookie-consent-details',
    informationComponent: 'cookie-consent-information',
    approveSelectionsButton: 'cookie-consent-approve-selections-button',
    screenReaderNotification: 'cookie-consent-screen-reader-notification',
    getOptionalConsentId: (key: string) => `optional-cookie-consent-${key}`,
    getRequiredConsentId: (key: string) => `required-cookie-consent-${key}`,
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

  const defaultConsentData = {
    requiredConsents: ['requiredConsent1', 'requiredConsent2'],
    optionalConsents: ['optionalConsent1', 'optionalConsent2'],
    cookie: {},
  };

  const unknownConsents = {
    unknownConsent1: true,
    unknownConsent2: false,
  };

  const renderCookieConsent = ({
    requiredConsents = [],
    optionalConsents = [],
    cookie = {},
  }: ConsentData): RenderResult => {
    // inject unknown consents to verify those are
    // stored and handled, but not required or optional
    const cookieWithInjectedUnknowns = {
      ...cookie,
      ...unknownConsents,
    };
    mockedCookieControls.init({ [COOKIE_NAME]: JSON.stringify(cookieWithInjectedUnknowns) });
    return render(
      <CookieContextProvider requiredConsents={requiredConsents} optionalConsents={optionalConsents}>
        <CookieConsent />
      </CookieContextProvider>,
    );
  };

  describe('Cookie consent ', () => {
    it('and child components are rendered when consents have not been handled', () => {
      const result = renderCookieConsent(defaultConsentData);
      verifyElementExistsByTestId(result, dataTestIds.container);
      verifyElementExistsByTestId(result, dataTestIds.languageSwitcher);
      verifyElementExistsByTestId(result, dataTestIds.informationComponent);
      verifyElementExistsByTestId(result, dataTestIds.approveAllButton);
      verifyElementExistsByTestId(result, dataTestIds.approveRequiredButton);
      verifyElementExistsByTestId(result, dataTestIds.readMoreTextButton);
    });

    it('is rendered if a required consent has not been approved. It could have been optional before', () => {
      const result = renderCookieConsent({
        ...defaultConsentData,
        cookie: {
          requiredConsent1: true,
          requiredConsent2: false,
          optionalConsent1: true,
          optionalConsent2: true,
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
          optionalConsent1: false,
          optionalConsent2: true,
        },
      });
      verifyElementDoesNotExistsByTestId(result, dataTestIds.container);
      verifyElementDoesNotExistsByTestId(result, dataTestIds.screenReaderNotification);
    });
  });

  describe(`Approve buttons will 
            - hide the cookie consent
            - show a prompt for screen readers
            - save cookie`, () => {
    it('Approve all -button approves all consents', () => {
      const result = renderCookieConsent(defaultConsentData);
      const consentResult = {
        requiredConsent1: true,
        requiredConsent2: true,
        optionalConsent1: true,
        optionalConsent2: true,
        ...unknownConsents,
      };
      clickElement(result, dataTestIds.approveAllButton);
      expect(JSON.parse(getSetCookieArguments().data)).toEqual(consentResult);
      verifyElementDoesNotExistsByTestId(result, dataTestIds.container);
      verifyElementExistsByTestId(result, dataTestIds.screenReaderNotification);
      expect(mockedCookieControls.mockSet).toHaveBeenCalledTimes(1);
    });

    it('Approve required -button, approves only required consents', () => {
      const result = renderCookieConsent(defaultConsentData);
      const consentResult = {
        requiredConsent1: true,
        requiredConsent2: true,
        optionalConsent1: false,
        optionalConsent2: false,
        ...unknownConsents,
      };
      clickElement(result, dataTestIds.approveRequiredButton);
      expect(JSON.parse(getSetCookieArguments().data)).toEqual(consentResult);
      verifyElementDoesNotExistsByTestId(result, dataTestIds.container);
      verifyElementExistsByTestId(result, dataTestIds.screenReaderNotification);
      expect(mockedCookieControls.mockSet).toHaveBeenCalledTimes(1);
    });
  });

  describe('In details view ', () => {
    const initDetailsView = (data: ConsentData): RenderResult => {
      const result = renderCookieConsent(data);
      clickElement(result, dataTestIds.readMoreButton);
      return result;
    };
    it('required and optional consents are rendered', () => {
      expect.assertions(4);
      const result = initDetailsView(defaultConsentData);
      defaultConsentData.requiredConsents.forEach((consent) => {
        verifyElementExistsByTestId(result, dataTestIds.getRequiredConsentId(consent));
      });
      defaultConsentData.optionalConsents.forEach((consent) => {
        verifyElementExistsByTestId(result, dataTestIds.getOptionalConsentId(consent));
      });
    });

    it(`clicking an optional consent sets the consent true/false. 
        Cookie consent is not hidden until an approve -button is clicked`, () => {
      const result = initDetailsView(defaultConsentData);
      defaultConsentData.optionalConsents.forEach((consent) => {
        clickElement(result, dataTestIds.getOptionalConsentId(consent));
      });
      clickElement(result, dataTestIds.getOptionalConsentId('optionalConsent2'));
      clickElement(result, dataTestIds.approveSelectionsButton);
      expect(JSON.parse(getSetCookieArguments().data)).toEqual({
        requiredConsent1: true,
        requiredConsent2: true,
        optionalConsent1: true,
        optionalConsent2: false,
        ...unknownConsents,
      });
      verifyElementDoesNotExistsByTestId(result, dataTestIds.container);
      verifyElementExistsByTestId(result, dataTestIds.screenReaderNotification);
      expect(mockedCookieControls.mockSet).toHaveBeenCalledTimes(1);
    });
  });
});
