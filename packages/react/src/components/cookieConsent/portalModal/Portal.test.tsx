/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-mocks-import */
import React, { useState } from 'react';
import { render, RenderResult, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Portal } from './Portal';
import { COOKIE_NAME } from '../cookieConsentController';
import mockDocumentCookie from '../__mocks__/mockDocumentCookie';
import { clickElement, commonTestProps, getContentSource, TestConsentData } from '../test.util';
import { Provider as CookieContextProvider } from '../CookieConsentContext';

const mockedCookieControls = mockDocumentCookie();
const { defaultConsentData, dataTestIds } = commonTestProps;

const testIds = {
  content: 'PortalContent',
  contentButton: 'PortalContentButton',
  target: 'PortalTarget',
  targetWithChildren: 'PortalTargetWithChildren',
};

const renderPortal = (
  { requiredConsents = [], optionalConsents = [], consents = {}, contentSourceOverrides }: TestConsentData,
  portalProps: { rootId?: string } = {},
): RenderResult => {
  const { rootId = testIds.target } = portalProps;
  const contentSource = getContentSource(requiredConsents, optionalConsents, contentSourceOverrides);
  mockedCookieControls.init({ [COOKIE_NAME]: JSON.stringify(consents) });

  const PortalContent = () => {
    const [isOpen, setIsOpen] = useState(true);
    const onClick = () => {
      setIsOpen(false);
    };
    if (!isOpen) {
      return null;
    }
    return (
      <div data-testid={testIds.content}>
        <button data-testid={testIds.contentButton} type="button" onClick={onClick}>
          Render null, please.
        </button>
      </div>
    );
  };

  const result = render(
    <div>
      <CookieContextProvider contentSource={contentSource}>
        <Portal rootId={rootId}>
          <PortalContent />
        </Portal>
      </CookieContextProvider>
      <div id={testIds.target} data-testid={testIds.target} />
      <div id={testIds.targetWithChildren} data-testid={testIds.targetWithChildren}>
        <p>I am here to prevent auto-removal</p>
      </div>
    </div>,
  );

  return result;
};

describe('<Portal /> spec', () => {
  afterEach(() => {
    mockedCookieControls.clear();
  });

  afterAll(() => {
    mockedCookieControls.restore();
  });

  it('renders the component', () => {
    const { baseElement } = renderPortal(defaultConsentData);
    expect(baseElement).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const result = renderPortal(defaultConsentData);
    const results = await axe(result.container);
    expect(results).toHaveNoViolations();
  }, 15000);
});

describe('<Portal /> ', () => {
  describe('is rendered to the given element. Other elements in the dom are left alone.', () => {
    it('If element with given id (rootId) is found, portal and its children are rendered there', () => {
      const result = renderPortal(defaultConsentData, { rootId: testIds.target });
      const targetElement = result.getByTestId(testIds.target);
      const contentElement = result.getByTestId(testIds.content);
      expect(contentElement.parentElement).toBe(targetElement);
      expect(() => result.getByTestId(testIds.targetWithChildren)).not.toThrow();
    });
    it('If element with given id (rootId) is not found, the element is created and portal and its children are rendered there', async () => {
      const result = renderPortal(defaultConsentData, { rootId: 'NewElement' });
      const targetElement = result.getByTestId(dataTestIds.htmlContainer);
      const contentElement = result.getByTestId(testIds.content);
      expect(contentElement.parentElement).toBe(targetElement);
      expect(() => result.getByTestId(testIds.targetWithChildren)).not.toThrow();
    });
    it('Added portal is the first element in the dom', async () => {
      const result = renderPortal(defaultConsentData, { rootId: 'NewElement' });
      const targetElement = result.getByTestId(dataTestIds.htmlContainer);
      expect(targetElement).toBe(result.baseElement.childNodes[0]);
    });
  });
  describe('If modal should not be shown', () => {
    const onlyRequiredConsents = {
      requiredConsents: [['requiredConsent1', 'requiredConsent2'], ['requiredConsent3']],
    };
    it('The container element is removed and content is not rendered', () => {
      const result = renderPortal(onlyRequiredConsents, { rootId: testIds.target });
      expect(() => result.getByTestId(testIds.target)).toThrow();
      expect(() => result.getByTestId(testIds.content)).toThrow();
      expect(() => result.getByTestId(testIds.targetWithChildren)).not.toThrow();
    });
    it('A new container is not added and content is not rendered', () => {
      const result = renderPortal(onlyRequiredConsents, { rootId: 'NewElement' });
      expect(() => result.getByTestId('NewElement')).toThrow();
      expect(() => result.getByTestId(testIds.content)).toThrow();
      expect(() => result.getByTestId(testIds.targetWithChildren)).not.toThrow();
    });
    it('If an existing element is used as container and it has children, it is not removed. Even if content was not rendered.', () => {
      const result = renderPortal(onlyRequiredConsents, { rootId: testIds.targetWithChildren });
      expect(() => result.getByTestId(testIds.targetWithChildren)).not.toThrow();
      expect(() => result.getByTestId(testIds.content)).toThrow();
    });
  });
  describe('If modal is closed', () => {
    it('the portal and container are not removed. There is a screen reader notification.', async () => {
      const result = renderPortal(defaultConsentData, { rootId: testIds.target });
      clickElement(result, testIds.contentButton);
      await waitFor(() => {
        expect(() => result.getByTestId(testIds.content)).toThrow();
      });
      expect(() => result.getByTestId(testIds.target)).not.toThrow();
      expect(() => result.getByTestId(testIds.targetWithChildren)).not.toThrow();
    });
  });
});
