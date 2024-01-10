/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-mocks-import */
import React, { useState } from 'react';
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
  getElementById,
} from '../test.util';
import { CookieContentSource, createContent } from '../content.builder';
import { Content } from '../contexts/ContentContext';

const { defaultConsentData, unknownConsents, dataTestIds } = commonTestProps;

const mockedCookieControls = mockDocumentCookie({ domain: 'localhost' });

let content: Content;

const testIds = {
  content: 'cookie-consent',
  closeButton: 'cookie-consent-approve-button',
  target: 'PortalTarget',
  targetWithChildren: 'PortalTargetWithChildren',
  languageSwitcherButton: 'cookie-consent-language-selector-button',
  languageSwitcher: 'cookie-consent-language-switcher',
  languageOptionPrefix: 'cookie-consent-language-option',
  secondModalButton: 'render-second-modal',
  forceRenderButton: 'force-render',
};

const onAllConsentsGivenTracker = jest.fn();
const onConsentsParsedTracker = jest.fn();

const defaultConsentDataWithCallbackTracking = {
  ...defaultConsentData,
  contentSourceOverrides: {
    onAllConsentsGiven: onAllConsentsGivenTracker,
    onConsentsParsed: onConsentsParsedTracker,
  },
};

const renderCookieConsent = (
  { requiredConsents = [], optionalConsents = [], consents = {}, contentSourceOverrides }: TestConsentData,
  portalProps: { rootId?: string; withRealTimers?: boolean; addMultipleModals?: boolean } = { withRealTimers: false },
): RenderResult => {
  // inject unknown consents to verify those are
  // stored and handled, but not required or optional
  const consentCookieWithInjectedUnknowns = {
    ...consents,
    ...unknownConsents,
  };
  const { rootId, addMultipleModals } = portalProps;
  const contentSource = getContentSource(requiredConsents, optionalConsents, contentSourceOverrides);
  content = createContent(contentSource);
  jest.useFakeTimers();
  mockedCookieControls.init({ [COOKIE_NAME]: JSON.stringify(consentCookieWithInjectedUnknowns) });

  const WrapModalWithLanguageChanger = ({ contentSourceForModal }: { contentSourceForModal: CookieContentSource }) => {
    const [lang, setLanguage] = useState<CookieContentSource['currentLanguage']>(contentSourceForModal.currentLanguage);
    // eslint-disable-next-line no-param-reassign
    contentSourceForModal.language = contentSourceForModal.language || {};
    // eslint-disable-next-line no-param-reassign
    contentSourceForModal.language.onLanguageChange = (newLang) =>
      setLanguage(newLang as CookieContentSource['currentLanguage']);
    return <CookieModal contentSource={{ ...contentSourceForModal, currentLanguage: lang }} rootId={rootId} />;
  };

  const Component = () => {
    const [renderSecondModal, swapCookieModals] = useState(false);
    const [modalKeyPrefix, setModalKeyPrefix] = useState('modal');
    if (addMultipleModals) {
      return (
        <div>
          <button
            data-testid={testIds.forceRenderButton}
            type="button"
            onClick={() => setModalKeyPrefix('modalPrefix2')}
          >
            Force render
          </button>
          <CookieModal contentSource={contentSource} rootId={rootId} key={`${modalKeyPrefix}-1`} />
          <CookieModal contentSource={contentSource} rootId={rootId} key={`${modalKeyPrefix}-2`} />
        </div>
      );
    }
    return (
      <div>
        {!renderSecondModal && <WrapModalWithLanguageChanger contentSourceForModal={contentSource} />}
        <button id="focus-target" type="button">
          Focus me
        </button>
        <div id={testIds.target} data-testid={testIds.target} />
        <div id={testIds.targetWithChildren} data-testid={testIds.targetWithChildren}>
          <p>I am here to prevent auto-removal</p>
        </div>
        <button data-testid={testIds.secondModalButton} type="button" onClick={() => swapCookieModals(true)}>
          Render second modal
        </button>
        {renderSecondModal && <CookieModal contentSource={contentSource} rootId={rootId} />}
      </div>
    );
  };

  const result = render(<Component />);
  act(() => {
    jest.runAllTimers();
  });

  // For example, axe uses timers so sometimes the test must use real ones
  if (portalProps.withRealTimers) {
    jest.useRealTimers();
  }

  return result;
};

const getModalH1 = () => screen.queryByRole('heading', { level: 1 });

const getTitleText = () => {
  const h1 = getModalH1();
  return h1 ? h1.textContent : undefined;
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

describe('<CookieModal />', () => {
  afterEach(() => {
    mockedCookieControls.clear();
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockedCookieControls.restore();
  });

  describe('Portal and modal', () => {
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

  describe('Callbacks are called', () => {
    it('onConsentsParsedTracker is called when modal is rendered. onAllConsentsGivenTracker not until user gives consents', async () => {
      renderCookieConsent(defaultConsentDataWithCallbackTracking);
      await waitFor(() => {
        expect(onConsentsParsedTracker).toHaveBeenCalledTimes(1);
        expect(onAllConsentsGivenTracker).toHaveBeenCalledTimes(0);
      });
    });
    it('onAllConsentsGivenTracker is called when gives consents', async () => {
      const result = renderCookieConsent(defaultConsentDataWithCallbackTracking);
      clickElement(result, dataTestIds.approveButton);
      await waitFor(() => {
        verifyElementDoesNotExistsByTestId(result, dataTestIds.approveButton);
      });
      await waitFor(() => {
        expect(onConsentsParsedTracker).toHaveBeenCalledTimes(1);
        expect(onAllConsentsGivenTracker).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('Auto-focusing works also with portal and focus is', () => {
    it('shifted to the modal heading level 1 when modal is rendered', () => {
      const result = renderCookieConsent(defaultConsentData, { withRealTimers: true });
      const modalH1 = getModalH1();
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
  describe('If an existing element is used as container', () => {
    it('and it has children, the modal is not rendered', () => {
      const result = renderCookieConsent(defaultConsentData, { rootId: testIds.targetWithChildren });
      expect(() => result.getByTestId(testIds.targetWithChildren)).not.toThrow();
      expect(() => result.getByTestId(testIds.content)).toThrow();
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
      verifyElementExistsByTestId(result, dataTestIds.screenReaderNotification);
    });
  });
  describe('Language change', () => {
    it('moves the focus back to the main title', async () => {
      const result = renderCookieConsent(defaultConsentData, { rootId: testIds.target });
      const svOptionTestId = `${testIds.languageOptionPrefix}-sv`;
      const currentTitle = getTitleText();
      (getElementById(result, testIds.languageSwitcherButton) as HTMLLinkElement).click();
      await waitFor(() => {
        expect(() => result.getByTestId(svOptionTestId)).not.toThrow();
      });
      clickElement(result, svOptionTestId);
      await waitFor(() => {
        expect(getTitleText()).not.toBe(currentTitle);
      });
      await waitForElementFocus(getModalH1);
    });
    it('refocuses the language menu button if selected language is same as previous.', async () => {
      const result = renderCookieConsent(defaultConsentData, { rootId: testIds.target });
      const fiOptionTestId = `${testIds.languageOptionPrefix}-fi`;
      const languageMenuButtonId = `cookie-consent-language-selector-button`;
      (getElementById(result, testIds.languageSwitcherButton) as HTMLLinkElement).click();
      await waitFor(() => {
        expect(() => result.getByTestId(fiOptionTestId)).not.toThrow();
      });
      clickElement(result, fiOptionTestId);
      await waitFor(() => {
        expect(() => result.getByTestId(fiOptionTestId)).not.toThrow();
      });
      await waitForElementFocus(() => getElementById(result, languageMenuButtonId));
    });
  });
  describe('Multiple modal components', () => {
    it('The portal can be created twice. This can happen, if an ancestor, like React router, re-renders itself.', async () => {
      const result = renderCookieConsent(defaultConsentDataWithCallbackTracking, { rootId: testIds.target });
      await waitFor(() => {
        expect(onConsentsParsedTracker).toHaveBeenCalledTimes(1);
      });
      clickElement(result, testIds.closeButton);
      await waitFor(() => {
        expect(() => result.getByTestId(testIds.content)).toThrow();
      });
      clickElement(result, testIds.secondModalButton);
      expect(() => result.getByTestId(testIds.target)).not.toThrow();
      expect(() => result.getByTestId(testIds.targetWithChildren)).not.toThrow();
      expect(onAllConsentsGivenTracker).toHaveBeenCalledTimes(1);
    });
    it('Intentionally render two modals. An error should not be thrown. Not even if re-rendered', async () => {
      const result = renderCookieConsent(defaultConsentDataWithCallbackTracking, {
        rootId: testIds.target,
        addMultipleModals: true,
      });
      await waitFor(() => {
        expect(result.getAllByTestId(testIds.closeButton)).toHaveLength(2);
      });
      expect(onConsentsParsedTracker).toHaveBeenCalledTimes(2);
      expect(onAllConsentsGivenTracker).toHaveBeenCalledTimes(0);
      // approve one modal
      result.getAllByTestId(testIds.closeButton)[0].click();
      await waitFor(() => {
        expect(result.getAllByTestId(testIds.closeButton)).toHaveLength(1);
      });
      expect(onConsentsParsedTracker).toHaveBeenCalledTimes(2);
      expect(onAllConsentsGivenTracker).toHaveBeenCalledTimes(1);

      // approve second modal
      result.getAllByTestId(testIds.closeButton)[0].click();
      await waitFor(() => {
        expect(() => result.getByTestId(testIds.content)).toThrow();
        expect(() => result.getByTestId(testIds.closeButton)).toThrow();
      });
      expect(onConsentsParsedTracker).toHaveBeenCalledTimes(2);
      expect(onAllConsentsGivenTracker).toHaveBeenCalledTimes(2);

      // force render both again
      clickElement(result, testIds.forceRenderButton);
      await waitFor(() => {
        // called 4 times because both components are re-initialized
        expect(onConsentsParsedTracker).toHaveBeenCalledTimes(4);
      });
      expect(onAllConsentsGivenTracker).toHaveBeenCalledTimes(2);
    });
  });
});
