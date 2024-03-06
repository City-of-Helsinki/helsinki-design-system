/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-mocks-import */
import React, { useContext } from 'react';
import { render, RenderResult } from '@testing-library/react';

import { ConsentList, ConsentObject, COOKIE_NAME } from '../cookieConsentController';
import { ConsentContext } from './ConsentContext';
import { CookieConsentContext } from './ContextComponent';
import mockWindowLocation from '../../../utils/mockWindowLocation';
import mockDocumentCookie from '../__mocks__/mockDocumentCookie';
import { extractSetCookieArguments, getContentSource } from '../test.util';

type TestConsentData = {
  requiredConsents?: ConsentList;
  optionalConsents?: ConsentList;
  consents?: ConsentObject;
  cookieDomain?: string;
};

describe('ContextComponent', () => {
  const mockedCookieControls = mockDocumentCookie();
  const mockedWindowControls = mockWindowLocation();
  const getSetCookieArguments = (index = -1) => extractSetCookieArguments(mockedCookieControls, index);
  const allApprovedConsentData: TestConsentData = {
    requiredConsents: ['requiredConsent1'],
    optionalConsents: ['optionalConsent1'],
    consents: {
      requiredConsent1: true,
      optionalConsent1: true,
    },
  };
  const allNotApprovedConsentData: TestConsentData = {
    ...allApprovedConsentData,
    consents: {
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
  }): TestConsentData => {
    const copyOfApprovedConsents = { ...allApprovedConsentData.consents };
    const copyOfApprovedConsentData = { ...allApprovedConsentData };
    copyOfApprovedConsents.requiredConsent1 = requiredConsentCookieValue as boolean;
    copyOfApprovedConsents.optionalConsent1 = optionalConsentCookieValue as boolean;
    return {
      ...copyOfApprovedConsentData,
      consents: copyOfApprovedConsents,
    };
  };

  const ContextConsumer = ({ consumerId }: { consumerId: string }) => {
    const { hasUserHandledAllConsents, onAction } = useContext(ConsentContext);
    const allUserConsentsAreHandled = hasUserHandledAllConsents();
    const shouldShowCookieConsents = !allUserConsentsAreHandled;
    const onButtonClick = () => {
      onAction('approveAll');
    };
    const approveOptional = () => {
      onAction('approveOptional');
    };
    const unapproveOptional = () => {
      onAction('unapproveOptional');
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
        <button type="button" data-testid={`${consumerId}-approve-optional-button`} onClick={() => approveOptional()}>
          Approve optional
        </button>
        <button
          type="button"
          data-testid={`${consumerId}-unapprove-optional-button`}
          onClick={() => unapproveOptional()}
        >
          Unapprove optional
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
  const consumer1ApproveOptionalButtonSelector = 'consumer-1-approve-optional-button';
  const consumer1UnapproveOptionalButtonSelector = 'consumer-1-unapprove-optional-button';

  const clickElement = (result: RenderResult, testId: string) => {
    result.getByTestId(testId).click();
  };

  const renderCookieConsent = ({
    requiredConsents,
    optionalConsents,
    cookieDomain,
    consents = {},
  }: TestConsentData): RenderResult => {
    // inject unknown consents to verify those are
    // stored and handled, but not in required or optional consents
    const cookieWithInjectedUnknowns = {
      ...consents,
      ...unknownConsents,
    };
    const contentSource = getContentSource(
      requiredConsents ? [requiredConsents] : undefined,
      optionalConsents ? [optionalConsents] : undefined,
      {
        onAllConsentsGiven,
        onConsentsParsed,
      },
    );
    mockedCookieControls.init({ [COOKIE_NAME]: JSON.stringify(cookieWithInjectedUnknowns) });
    return render(
      <CookieConsentContext cookieDomain={cookieDomain} contentSource={contentSource}>
        <ContextConsumer consumerId="consumer-1" />
        <ContextConsumer consumerId="consumer-2" />
      </CookieConsentContext>,
    );
  };

  describe('Consumers should not ask for consents when hasUserHandledAllConsents() returns true. It', () => {
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

  describe('onConsentsParsed is called when context is created and controller has read the cookie.', () => {
    it('Arguments are ({consents}, false) when user has not handled all consents', () => {
      renderCookieConsent(allNotApprovedConsentData);
      expect(onConsentsParsed).toHaveBeenCalledTimes(1);
      expect(onConsentsParsed).toHaveBeenLastCalledWith(allNotApprovedConsentData.consents, false);
    });

    it('Arguments are ({consents}, true) when user has given all consents', () => {
      renderCookieConsent(allApprovedConsentData);
      expect(onConsentsParsed).toHaveBeenCalledTimes(1);
      expect(onConsentsParsed).toHaveBeenLastCalledWith(allApprovedConsentData.consents, true);
    });
    it('callback is not called more than once', () => {
      const result = renderCookieConsent(allNotApprovedConsentData);
      expect(onConsentsParsed).toHaveBeenCalledTimes(1);
      clickElement(result, consumer1ApproveAllButtonSelector);
      expect(onAllConsentsGiven).toHaveBeenCalledTimes(1);
      expect(onConsentsParsed).toHaveBeenCalledTimes(1);
      clickElement(result, consumer1ApproveOptionalButtonSelector);
      clickElement(result, consumer1UnapproveOptionalButtonSelector);
      expect(onConsentsParsed).toHaveBeenCalledTimes(1);
    });
  });

  describe('onAllConsentsGiven', () => {
    it('is called after user has given all consents.', () => {
      const result = renderCookieConsent(allNotApprovedConsentData);
      expect(onAllConsentsGiven).toHaveBeenCalledTimes(0);
      clickElement(result, consumer1ApproveAllButtonSelector);
      expect(onAllConsentsGiven).toHaveBeenCalledTimes(1);
      expect(onAllConsentsGiven).toHaveBeenLastCalledWith(allApprovedConsentData.consents);
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

  describe('Saving', () => {
    it('by clicking "Approve all" sends also unknown consents', () => {
      mockedWindowControls.setUrl('https://subdomain.hel.fi');
      const result = renderCookieConsent(allNotApprovedConsentData);
      clickElement(result, consumer1ApproveAllButtonSelector);
      expect(JSON.parse(getSetCookieArguments().data)).toEqual({
        ...allApprovedConsentData.consents,
        ...unknownConsents,
      });
      expect(getSetCookieArguments().options.domain).toEqual('subdomain.hel.fi');
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
