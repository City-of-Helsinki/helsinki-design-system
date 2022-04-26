/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-mocks-import */
import React, { useContext } from 'react';
import { render, RenderResult } from '@testing-library/react';

import { ConsentList, ConsentObject, COOKIE_NAME } from './cookieConsentController';
import { CookieConsentContext, Provider as CookieContextProvider } from './CookieConsentContext';
import mockWindowLocation from './__mocks__/mockWindowLocation';
import mockDocumentCookie from './__mocks__/mockDocumentCookie';
import { extractSetCookieArguments, getContent } from './test.util';

type ConsentData = {
  requiredConsents?: ConsentList;
  optionalConsents?: ConsentList;
  cookie?: ConsentObject;
  cookieDomain?: string;
};

describe('CookieConsentContext ', () => {
  const mockedCookieControls = mockDocumentCookie();
  const mockedWindowControls = mockWindowLocation();
  const getSetCookieArguments = (index = -1) => extractSetCookieArguments(mockedCookieControls, index);
  const allApprovedConsentData = {
    requiredConsents: ['requiredConsent1'],
    optionalConsents: ['optionalConsent1'],
    cookie: {
      requiredConsent1: true,
      optionalConsent1: true,
    },
  };
  const allNotApprovedConsentData = {
    ...allApprovedConsentData,
    cookie: {
      requiredConsent1: false,
      optionalConsent1: false,
    },
  };
  const unknownConsents = {
    unknownConsent1: true,
    unknownConsent2: false,
  };

  const createConsentData = ({
    requiredConsentCookieValue,
    optionalConsentCookieValue,
  }: {
    requiredConsentCookieValue: boolean | undefined;
    optionalConsentCookieValue: boolean | undefined;
  }): ConsentData => {
    const copyOfApprovedCookie = { ...allApprovedConsentData.cookie };
    const copyOfApprovedConsentData = { ...allApprovedConsentData };
    copyOfApprovedCookie.requiredConsent1 = requiredConsentCookieValue;
    copyOfApprovedCookie.optionalConsent1 = optionalConsentCookieValue;
    return {
      ...copyOfApprovedConsentData,
      cookie: copyOfApprovedCookie,
    };
  };

  const ContextConsumer = ({ consumerId }: { consumerId: string }) => {
    const { hasUserHandledAllConsents, approveAll } = useContext(CookieConsentContext);
    const allUserConsentsAreHandled = hasUserHandledAllConsents();
    const shouldShowCookieConsents = !allUserConsentsAreHandled;
    const onButtonClick = () => {
      approveAll();
    };
    return (
      <div>
        {allUserConsentsAreHandled && <span data-testid={`${consumerId}-all-handled`} />}
        {!allUserConsentsAreHandled && <span data-testid={`${consumerId}-all-not-handled`} />}
        {shouldShowCookieConsents && <span data-testid={`${consumerId}-should-render`} />}
        {!shouldShowCookieConsents && <span data-testid={`${consumerId}-should-not-render`} />}
        <button type="button" data-testid={`${consumerId}-approve-all-button`} onClick={() => onButtonClick()}>
          Approve all
        </button>
      </div>
    );
  };

  const onAllConsentsGiven = jest.fn();
  const onConsentsParsed = jest.fn();

  afterEach(() => {
    onAllConsentsGiven.mockReset();
    onConsentsParsed.mockReset();
    mockedCookieControls.clear();
  });

  afterAll(() => {
    mockedWindowControls.restore();
    mockedCookieControls.restore();
  });

  const verifyElementExistsByTestId = (result: RenderResult, testId: string) => {
    expect(result.getAllByTestId(testId)).toHaveLength(1);
  };

  const verifyElementDoesNotExistsByTestId = (result: RenderResult, testId: string) => {
    expect(() => result.getAllByTestId(testId)).toThrow();
  };

  const verifyConsumersShowConsentsHandled = (result: RenderResult) => {
    verifyElementExistsByTestId(result, 'consumer-1-all-handled');
    verifyElementDoesNotExistsByTestId(result, 'consumer-1-should-render');
    verifyElementExistsByTestId(result, 'consumer-2-all-handled');
    verifyElementDoesNotExistsByTestId(result, 'consumer-2-should-render');
  };
  const verifyConsumersShowConsentsNotHandled = (result: RenderResult) => {
    verifyElementDoesNotExistsByTestId(result, 'consumer-1-all-handled');
    verifyElementExistsByTestId(result, 'consumer-1-should-render');
    verifyElementDoesNotExistsByTestId(result, 'consumer-2-all-handled');
    verifyElementExistsByTestId(result, 'consumer-2-should-render');
  };

  const consumer1ApproveAllButtonSelector = 'consumer-1-approve-all-button';

  const clickElement = (result: RenderResult, testId: string) => {
    result.getByTestId(testId).click();
  };

  const renderCookieConsent = ({
    requiredConsents,
    optionalConsents,
    cookieDomain,
    cookie = {},
  }: ConsentData): RenderResult => {
    // inject unknown consents to verify those are
    // stored and handled, but not in required or optional consents
    const cookieWithInjectedUnknowns = {
      ...cookie,
      ...unknownConsents,
    };
    const content = getContent(
      requiredConsents ? [requiredConsents] : undefined,
      optionalConsents ? [optionalConsents] : undefined,
    );
    content.onAllConsentsGiven = onAllConsentsGiven;
    content.onConsentsParsed = onConsentsParsed;
    mockedCookieControls.init({ [COOKIE_NAME]: JSON.stringify(cookieWithInjectedUnknowns) });
    return render(
      <CookieContextProvider cookieDomain={cookieDomain} content={content}>
        <ContextConsumer consumerId="consumer-1" />
        <ContextConsumer consumerId="consumer-2" />
      </CookieContextProvider>,
    );
  };

  describe('Consumers should not ask for consents when hasUserHandledAllConsents() returns true. It ', () => {
    it('returns false if all required consents are not true.', () => {
      const consentsWithUnApprovedRequiredConsent = createConsentData({
        requiredConsentCookieValue: false,
        optionalConsentCookieValue: true,
      });
      verifyConsumersShowConsentsNotHandled(renderCookieConsent(consentsWithUnApprovedRequiredConsent));
    });

    it('returns false if any optional consents are undefined.', () => {
      const consentsWithUnhandledOptionalConsent = createConsentData({
        requiredConsentCookieValue: true,
        optionalConsentCookieValue: undefined,
      });
      verifyConsumersShowConsentsNotHandled(renderCookieConsent(consentsWithUnhandledOptionalConsent));
    });

    it('returns true if required consents are approved and has no unhandled optional consents', () => {
      verifyConsumersShowConsentsHandled(renderCookieConsent(allApprovedConsentData));
    });

    it('returns true if required consents are approved and optional is false', () => {
      const consentsWithDeclinedOptionalConsent = createConsentData({
        requiredConsentCookieValue: true,
        optionalConsentCookieValue: false,
      });
      verifyConsumersShowConsentsHandled(renderCookieConsent(consentsWithDeclinedOptionalConsent));
    });

    it('changes when consents are approved', () => {
      const result = renderCookieConsent(allNotApprovedConsentData);
      verifyConsumersShowConsentsNotHandled(result);
      clickElement(result, consumer1ApproveAllButtonSelector);
      verifyConsumersShowConsentsHandled(result);
    });
  });

  describe('onConsentsParsed is called when context is created and controller has read the cookie. ', () => {
    it('Arguments are ({consents}, false) when user has not handled all consents', () => {
      renderCookieConsent(allNotApprovedConsentData);
      expect(onConsentsParsed).toHaveBeenCalledTimes(1);
      expect(onConsentsParsed).toHaveBeenLastCalledWith(allNotApprovedConsentData.cookie, false);
    });

    it('Arguments are ({consents}, true) when user has given all consents', () => {
      renderCookieConsent(allApprovedConsentData);
      expect(onConsentsParsed).toHaveBeenCalledTimes(1);
      expect(onConsentsParsed).toHaveBeenLastCalledWith(allApprovedConsentData.cookie, true);
    });
  });

  describe('onAllConsentsGiven ', () => {
    it('is called after user has given all consents.', () => {
      const result = renderCookieConsent(allNotApprovedConsentData);
      expect(onAllConsentsGiven).toHaveBeenCalledTimes(0);
      clickElement(result, consumer1ApproveAllButtonSelector);
      expect(onAllConsentsGiven).toHaveBeenCalledTimes(1);
      expect(onAllConsentsGiven).toHaveBeenLastCalledWith(allApprovedConsentData.cookie);
    });

    it('is not called when all required consents are initially true and optional are true/false.', () => {
      const consentsWithDeclinedOptionalConsent = createConsentData({
        requiredConsentCookieValue: true,
        optionalConsentCookieValue: false,
      });
      renderCookieConsent(consentsWithDeclinedOptionalConsent);
      expect(onAllConsentsGiven).toHaveBeenCalledTimes(0);
    });
  });

  describe('Saving ', () => {
    it('by clicking "Approve all" sends also unknown consents', () => {
      mockedWindowControls.setUrl('https://subdomain.hel.fi');
      const result = renderCookieConsent(allNotApprovedConsentData);
      clickElement(result, consumer1ApproveAllButtonSelector);
      expect(JSON.parse(getSetCookieArguments().data)).toEqual({
        ...allApprovedConsentData.cookie,
        ...unknownConsents,
      });
      expect(getSetCookieArguments().options.domain).toEqual('hel.fi');
    });

    it('sets the domain of the cookie to given cookieDomain', () => {
      mockedWindowControls.setUrl('https://notmyhost.com');
      const cookieDomain = 'myhost.com';
      const result = renderCookieConsent({
        ...allNotApprovedConsentData,
        cookieDomain,
      });
      clickElement(result, consumer1ApproveAllButtonSelector);
      expect(getSetCookieArguments().options.domain).toEqual(cookieDomain);
    });
  });
});
