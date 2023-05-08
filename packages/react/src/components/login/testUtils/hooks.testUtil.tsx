import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import { createOidcClientTestSuite, getDefaultOidcClientTestProps } from './oidcClientTestUtil';
import { OidcClientProps } from '../client/oidcClient';
import { LoginContextProvider } from '../LoginContext';
import { UserCreationProps, placeUserToStorage } from './userTestUtil';

export type HookTestUtil = ReturnType<typeof createHookTestEnvironment>;

type TestProps = {
  children: React.ReactNodeArray;
  waitForRenderToggle?: boolean;
  userInStorage?: UserCreationProps;
};

const elementIds = {
  container: 'container-element',
  renderTimeSuffix: 'render-time',
  renderToggle: 'render-toggle-button',
  rerenderButton: 're-render-button',
  renderCountSuffix: 'render-count',
} as const;

export const RenderCounter = ({ idPrefix }: { idPrefix: string }) => {
  const countRef = useRef(1);
  useEffect(() => {
    countRef.current += 1;
  });
  return <div id={`${idPrefix}-${elementIds.renderCountSuffix}`}>{countRef.current}</div>;
};

const TestComponent = ({ waitForRenderToggle, children }: Pick<TestProps, 'children' | 'waitForRenderToggle'>) => {
  const [shouldRender, setShouldRender] = useState(!waitForRenderToggle);
  const [, forceRender] = useState(0);
  const RenderToggle = () => {
    return (
      <button
        type="button"
        id={elementIds.renderToggle}
        onClick={() => {
          setShouldRender((current) => !current);
        }}
      >
        Toggle
      </button>
    );
  };

  if (!shouldRender) {
    return <RenderToggle />;
  }
  return (
    <div id={elementIds.container}>
      <button
        key="button"
        type="button"
        id={elementIds.rerenderButton}
        onClick={() => {
          forceRender((count) => count + 1);
        }}
      >
        Rerender
      </button>
      <div key="children">{children}</div>
      <RenderToggle key="RenderToggle" />
      <RenderCounter key="RenderCounter" idPrefix={elementIds.container} />
    </div>
  );
};

export function createHookTestEnvironment(
  { userInStorage, ...componentProps }: TestProps,
  additionalOidcClientProps?: Partial<OidcClientProps>,
) {
  const { cleanUp } = createOidcClientTestSuite();

  const afterEach = () => {
    jest.restoreAllMocks();
    sessionStorage.clear();
    cleanUp();
  };

  const oidcClientProps = { ...getDefaultOidcClientTestProps(), ...additionalOidcClientProps };

  if (userInStorage) {
    placeUserToStorage(oidcClientProps.userManagerSettings, userInStorage);
  }

  const { container } = render(
    <LoginContextProvider loginProps={oidcClientProps}>
      <TestComponent {...componentProps} />
    </LoginContextProvider>,
  );
  const getElementById = (id: string) => container.querySelector(`#${id}`) as HTMLElement;
  const getInnerHtml = (id: string) => {
    const el = getElementById(id);
    if (!el || !el.innerHTML) {
      return '';
    }
    return el.innerHTML;
  };
  const getElementJSON = (selector: string, target?: HTMLElement) => {
    const element = target || getElementById(selector);
    if (element) {
      try {
        const textualData = element.innerHTML;
        if (!textualData) {
          return null;
        }
        return JSON.parse(textualData);
      } catch (e) {
        return null;
      }
    }
    return new Error(`${selector} element not found`);
  };
  const getInnerHtmlAsNumber = (id: string) => {
    return parseInt(getInnerHtml(id), 10);
  };

  const getRenderTime = (id: string) => {
    const selector = `${id}-${elementIds.renderTimeSuffix}`;
    return getInnerHtmlAsNumber(selector);
  };
  const getRenderCount = (id: string) => {
    const selector = `${id}-${elementIds.renderCountSuffix}`;
    return getInnerHtmlAsNumber(selector);
  };

  const waitForComponentRerender = async (id: string, previousRenderTime?: number, renderTrigger?: string) => {
    await act(async () => {
      const current = previousRenderTime || getRenderTime(id);
      if (renderTrigger) {
        fireEvent.click(getElementById(renderTrigger));
      }
      await waitFor(() => {
        expect(getRenderTime(id)).not.toBe(current);
      });
    });
  };

  return {
    getElementById,
    getInnerHtml,
    getInnerHtmlAsNumber,
    getRenderTime,
    getRenderCount,
    waitForRerender: async () => {
      await act(async () => {
        const currentCount = getRenderCount(elementIds.container);
        fireEvent.click(getElementById(elementIds.rerenderButton));
        await waitFor(() => {
          expect(getRenderCount(elementIds.container)).toBe(currentCount + 1);
        });
      });
    },
    waitForComponentRerender,
    toggleTestComponent: async () => {
      const isRendered = () => !!getElementById(elementIds.container);
      const isRenderedNow = isRendered();
      await act(async () => {
        fireEvent.click(getElementById(elementIds.renderToggle));
        await waitFor(() => {
          expect(isRendered()).not.toBe(isRenderedNow);
        });
      });
    },
    afterEach,
    getElementJSON,
  };
}
