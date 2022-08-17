/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { act } from 'react-dom/test-utils';

import { PortalModal } from './PortalModal';
import { COOKIE_NAME } from '../cookieConsentController';
import { Content } from '../CookieConsentContext';
import mockDocumentCookie from '../__mocks__/mockDocumentCookie';
import {
  clickElement,
  getContentSource,
  openAccordion,
  openAllAccordions,
  verifyElementDoesNotExistsByTestId,
  verifyElementExistsByTestId,
  commonTestProps,
  TestConsentData,
  createConsentObjectWithSelectedRejections,
  getActiveElement,
  waitForElementFocus,
} from '../test.util';
import { createContent } from '../content.builder';

const { defaultConsentData, unknownConsents, dataTestIds } = commonTestProps;

const mockedCookieControls = mockDocumentCookie();

let content: Content;

const renderCookieConsent = (
  { requiredConsents = [], optionalConsents = [], consents = {}, contentSourceOverrides }: TestConsentData,
  withRealTimers = false,
): RenderResult => {
  // inject unknown consents to verify those are
  // stored and handled, but not required or optional
  const consentCookieWithInjectedUnknowns = {
    ...consents,
    ...unknownConsents,
  };
  const contentSource = getContentSource(requiredConsents, optionalConsents, contentSourceOverrides);
  content = createContent(contentSource);
  jest.useFakeTimers();
  mockedCookieControls.init({ [COOKIE_NAME]: JSON.stringify(consentCookieWithInjectedUnknowns) });
  const result = render(
    <div>
      <PortalModal contentSource={contentSource} />
      <button id="focus-target" type="button">
        Focus me
      </button>
    </div>,
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

describe('<PortalModal /> spec', () => {
  afterEach(() => {
    mockedCookieControls.clear();
  });

  afterAll(() => {
    mockedCookieControls.restore();
  });

  it('renders the component', () => {
    const { baseElement } = renderCookieConsent(defaultConsentData);
    expect(baseElement).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const result = renderCookieConsent(defaultConsentData, true);
    await openAccordion(result, dataTestIds.settingsToggler);
    await openAllAccordions(result, content, dataTestIds);
    const results = await axe(result.container);
    expect(results).toHaveNoViolations();
  }, 15000);
});

describe('<PortalModal /> ', () => {
  afterEach(() => {
    mockedCookieControls.clear();
  });

  afterAll(() => {
    mockedCookieControls.restore();
  });

  describe('Portal and modal ', () => {
    it('and child components are rendered when consents have not been handled', () => {
      const result = renderCookieConsent(defaultConsentData);
      verifyElementExistsByTestId(result, dataTestIds.container);
      verifyElementExistsByTestId(result, dataTestIds.languageSwitcher);
      verifyElementExistsByTestId(result, dataTestIds.approveButton);
      verifyElementExistsByTestId(result, dataTestIds.approveRequiredButton);
    });

    it('is not shown when all consents have been handled and are true/false', () => {
      const result = renderCookieConsent({
        ...defaultConsentData,
        consents: createConsentObjectWithSelectedRejections(['optionalConsent1', 'optionalConsent3']),
      });
      verifyElementDoesNotExistsByTestId(result, dataTestIds.container);
      verifyElementDoesNotExistsByTestId(result, dataTestIds.screenReaderNotification);
    });

    it('portal and modal will remain once rendered. Modal is showing consents or screen reader notification.', async () => {
      const result = renderCookieConsent(defaultConsentData);
      verifyElementExistsByTestId(result, dataTestIds.htmlContainer);
      clickElement(result, dataTestIds.approveButton);
      await waitFor(() => {
        verifyElementDoesNotExistsByTestId(result, dataTestIds.approveButton);
      });
      verifyElementExistsByTestId(result, dataTestIds.htmlContainer);
    });
  });

  describe('Auto-focusing works also with portal and focus is', () => {
    it('shifted to the modal heading level 1 when modal is rendered', () => {
      const result = renderCookieConsent(defaultConsentData, true);
      const modalH1 = screen.queryByRole('heading', { level: 1 });
      expect(getActiveElement(result.container)).toEqual(modalH1);
    });

    it('shifted to the element defined in content.focusTargetSelector when modal is closed', async () => {
      const result = renderCookieConsent(defaultConsentData, true);
      const elementGetter = () => result.container.querySelector(content.focusTargetSelector as string);
      clickElement(result, dataTestIds.approveButton);
      await waitForElementFocus(elementGetter);
    });
  });
});
