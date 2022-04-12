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

  const ContextConsumer = ({ consumerId }: { consumerId: string }) => {
    const { willRenderCookieConsentDialog, hasUserHandledAllConsents, approveAll } = useContext(CookieConsentContext);
    const allUserConsentsAreHandled = hasUserHandledAllConsents();
    const onButtonClick = () => {
      approveAll();
    };
    return (
      <div>
        {allUserConsentsAreHandled && <span data-testid={`${consumerId}-all-handled`} />}
        {!allUserConsentsAreHandled && <span data-testid={`${consumerId}-all-not-handled`} />}
        {willRenderCookieConsentDialog && <span data-testid={`${consumerId}-should-render`} />}
        {!willRenderCookieConsentDialog && <span data-testid={`${consumerId}-should-not-render`} />}
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
    // stored and handled, but not required or optional
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

  describe('willRenderCookieConsentDialog ', () => {
    it('is false if all required consents are not true or any optional consent is undefined.', () => {
      verifyConsumersShowConsentsNotHandled(renderCookieConsent(allNotApprovedConsentData));
    });

    it('is true if user has unhandled consents', () => {
      verifyConsumersShowConsentsHandled(renderCookieConsent(allApprovedConsentData));
    });

    it('reflects the value of hasUserHandledAllConsents and both change with approval', () => {
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
      renderCookieConsent(allNotApprovedConsentData);
      expect(onConsentsParsed).toHaveBeenCalledTimes(1);
      expect(onConsentsParsed).toHaveBeenLastCalledWith(allNotApprovedConsentData.cookie, false);
    });
  });

  describe('onAllConsentsGiven ', () => {
    it('is called only when user has given all consents.', () => {
      const result = renderCookieConsent(allNotApprovedConsentData);
      expect(onAllConsentsGiven).toHaveBeenCalledTimes(0);
      clickElement(result, consumer1ApproveAllButtonSelector);
      expect(onAllConsentsGiven).toHaveBeenCalledTimes(1);
      expect(onAllConsentsGiven).toHaveBeenLastCalledWith(allApprovedConsentData.cookie);
    });

    it('is not called even if consents are initially given', () => {
      renderCookieConsent(allApprovedConsentData);
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
