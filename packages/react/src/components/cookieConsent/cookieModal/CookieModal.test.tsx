/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { act } from 'react-dom/test-utils';

import { CookieModal } from './CookieModal';
import { COOKIE_NAME } from '../cookieConsentController';
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
import { Content } from '../contexts/ContentContext';

const { defaultConsentData, unknownConsents, dataTestIds } = commonTestProps;

const mockedCookieControls = mockDocumentCookie();

let content: Content;

const testIds = {
  content: 'cookie-consent',
  closeButton: 'cookie-consent-approve-button',
  target: 'PortalTarget',
  targetWithChildren: 'PortalTargetWithChildren',
};

const renderCookieConsent = (
  { requiredConsents = [], optionalConsents = [], consents = {}, contentSourceOverrides }: TestConsentData,
  portalProps: { rootId?: string; withRealTimers?: boolean } = { withRealTimers: false },
): RenderResult => {
  // inject unknown consents to verify those are
  // stored and handled, but not required or optional
  const consentCookieWithInjectedUnknowns = {
    ...consents,
    ...unknownConsents,
  };
  const { rootId } = portalProps;
  const contentSource = getContentSource(requiredConsents, optionalConsents, contentSourceOverrides);
  content = createContent(contentSource);
  jest.useFakeTimers();
  mockedCookieControls.init({ [COOKIE_NAME]: JSON.stringify(consentCookieWithInjectedUnknowns) });
  const result = render(
    <div>
      <CookieModal contentSource={contentSource} rootId={rootId} />
      <button id="focus-target" type="button">
        Focus me
      </button>
      <div id={testIds.target} data-testid={testIds.target} />
      <div id={testIds.targetWithChildren} data-testid={testIds.targetWithChildren}>
        <p>I am here to prevent auto-removal</p>
      </div>
    </div>,
  );
  act(() => {
    jest.runAllTimers();
  });

  // For example, axe uses timers so sometimes the test must use real ones
  if (portalProps.withRealTimers) {
    jest.useRealTimers();
  }

  return result;
};

describe('<CookieModal /> spec', () => {
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
    const result = renderCookieConsent(defaultConsentData, { withRealTimers: true });
    await openAccordion(result, dataTestIds.settingsToggler);
    await openAllAccordions(result, content, dataTestIds);
    const results = await axe(result.container);
    expect(results).toHaveNoViolations();
  }, 15000);
});

describe('<CookieModal /> ', () => {
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
      const result = renderCookieConsent(defaultConsentData, { withRealTimers: true });
      const modalH1 = screen.queryByRole('heading', { level: 1 });
      expect(getActiveElement(result.container)).toEqual(modalH1);
    });

    it('shifted to the element defined in content.focusTargetSelector when modal is closed', async () => {
      const result = renderCookieConsent(defaultConsentData, { withRealTimers: true });
      const elementGetter = () => result.container.querySelector(content.focusTargetSelector as string);
      clickElement(result, dataTestIds.approveButton);
      await waitForElementFocus(elementGetter);
    });
  });
  describe('Is rendered to the given element. Other elements in the dom are left alone.', () => {
    it('If element with given id (rootId) is found, portal and its children are rendered there', () => {
      const result = renderCookieConsent(defaultConsentData, { rootId: testIds.target });
      const targetElement = result.getByTestId(testIds.target);
      const contentElement = result.getByTestId(testIds.content);
      // not using expect(elementA).toBe(elementB), if it fails it throws unrelated error
      // https://github.com/testing-library/dom-testing-library/issues/875
      expect(contentElement.parentElement === targetElement).toBeTruthy();
      expect(() => result.getByTestId(testIds.targetWithChildren)).not.toThrow();
    });
    it('If element with given id (rootId) is not found, the element is created and portal and its children are rendered there', async () => {
      const result = renderCookieConsent(defaultConsentData);
      const targetElement = result.getByTestId(dataTestIds.htmlContainer);
      const contentElement = result.getByTestId(testIds.content);
      expect(contentElement.parentElement === targetElement).toBeTruthy();
      expect(() => result.getByTestId(testIds.targetWithChildren)).not.toThrow();
    });
    it('Added portal is the first element in the dom', async () => {
      const result = renderCookieConsent(defaultConsentData);
      const targetElement = result.getByTestId(dataTestIds.htmlContainer);
      expect(!!targetElement).toBeTruthy();
      expect(targetElement === result.baseElement.childNodes[0]).toBeTruthy();
    });
  });
  describe('If modal should not be shown', () => {
    const onlyRequiredConsents = {
      requiredConsents: [['requiredConsent1', 'requiredConsent2'], ['requiredConsent3']],
    };
    it('The container element is removed and content is not rendered', () => {
      const result = renderCookieConsent(onlyRequiredConsents, { rootId: testIds.target });
      expect(() => result.getByTestId(testIds.target)).toThrow();
      expect(() => result.getByTestId(testIds.content)).toThrow();
      expect(() => result.getByTestId(testIds.targetWithChildren)).not.toThrow();
    });
    it('A new container is not added and content is not rendered', () => {
      const result = renderCookieConsent(onlyRequiredConsents);
      expect(() => result.getByTestId('NewElement')).toThrow();
      expect(() => result.getByTestId(testIds.content)).toThrow();
      expect(() => result.getByTestId(testIds.targetWithChildren)).not.toThrow();
    });
    it('If an existing element is used as container and it has children, it is not removed. Even if content was not rendered.', () => {
      const result = renderCookieConsent(onlyRequiredConsents, { rootId: testIds.targetWithChildren });
      expect(() => result.getByTestId(testIds.targetWithChildren)).not.toThrow();
      expect(() => result.getByTestId(testIds.content)).toThrow();
    });
  });
  describe('If modal is closed', () => {
    it('the portal and container are not removed. There is a screen reader notification.', async () => {
      const result = renderCookieConsent(defaultConsentData, { rootId: testIds.target });
      clickElement(result, testIds.closeButton);
      await waitFor(() => {
        expect(() => result.getByTestId(testIds.content)).toThrow();
      });
      expect(() => result.getByTestId(testIds.target)).not.toThrow();
      expect(() => result.getByTestId(testIds.targetWithChildren)).not.toThrow();
    });
  });
});
