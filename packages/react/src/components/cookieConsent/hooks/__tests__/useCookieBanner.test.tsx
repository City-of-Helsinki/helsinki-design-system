import React, { useState } from 'react';
import { act, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';

import { useCookieBanner } from '../useCookieBanner';
// eslint-disable-next-line jest/no-mocks-import
import { mockCookieConsentCore } from '../../../cookieConsentCore/__mocks__/mockCookieConsentCore';
import { CookieConsentCore } from '../../../cookieConsentCore/cookieConsentCore';
import useForceRender from '../../../../hooks/useForceRender';
import { Provider } from '../../contexts/CookieConsentContext';

const mockCore = mockCookieConsentCore();

jest.mock('../../../cookieConsentCore/cookieConsentCore', () => ({
  CookieConsentCore: {
    create: (...args: Parameters<typeof CookieConsentCore.create>) => mockCore.create(...args),
  },
}));

describe('useCookieBanner', () => {
  const testIds = {
    ready: 'is-ready',
    notReady: 'is-not-ready',
    renderAgainButton: 'render-again',
    toggleMountButton: 'toggleMount',
    modalComponent: 'modal-component',
    consents: 'consents',
    isMounted: 'is-mounted',
  };

  let renderCount: number = 0;
  const ModalComponent = () => {
    const { isReady, consents } = useCookieBanner();
    return (
      <div data-testid={testIds.modalComponent}>
        <p data-testid={isReady ? testIds.ready : testIds.notReady}>Ready or not</p>
        <p data-testid={testIds.consents}>{JSON.stringify(consents)}</p>);
      </div>
    );
  };
  const HookComponent = () => {
    const [isMounted, setIsMounted] = useState(true);
    renderCount += 1;
    const forceRender = useForceRender();
    return (
      <Provider onChange={jest.fn()}>
        <div>
          {isMounted && <ModalComponent />}
          <div data-testid={testIds.isMounted}>{isMounted ? 1 : 0}</div>
          <button
            type="button"
            data-testid={testIds.renderAgainButton}
            onClick={() => {
              forceRender();
            }}
          >
            {renderCount}
          </button>
          <button
            type="button"
            data-testid={testIds.toggleMountButton}
            onClick={() => {
              setIsMounted((v) => !v);
            }}
          >
            {isMounted}
          </button>
          );
        </div>
      </Provider>
    );
  };
  afterEach(() => {
    mockCore.reset();
    renderCount = 0;
  });

  const renderTests = (showBanner = true) => {
    let result: RenderResult;
    if (showBanner) {
      mockCore.setBannerNeeded();
    }
    // delay is need, so banner is not rendered before mockCore.setRenderResult() is called
    mockCore.setReadyEventDelay(200);
    act(() => {
      result = render(<HookComponent />);
    });

    const getRenderCount = () => {
      return parseInt(result.getByTestId(testIds.renderAgainButton).innerHTML, 10);
    };

    const getConsents = () => {
      return JSON.parse(result.getByTestId(testIds.consents).innerHTML);
    };

    const renderAgain = async () => {
      const lastRender = getRenderCount();
      fireEvent.click(result.getByTestId(testIds.renderAgainButton));
      await waitFor(() => {
        expect(getRenderCount()).not.toBe(lastRender);
      });
    };

    const waitForTestId = async (testId: string) => {
      await waitFor(() => {
        expect(result.getByTestId(testId)).not.toBeNull();
      });
    };

    // @ts-ignore
    mockCore.setRenderResult(result);

    return {
      // @ts-ignore
      ...result,
      renderAgain,
      getConsents,
      waitForReady: async () => {
        // mockCore.triggerReadyEvent();
        await waitForTestId(testIds.ready);
      },
    };
  };

  it('renders the banner when needed', async () => {
    const result = renderTests();
    await result.waitForReady();
    expect(result.getAllByTestId(mockCore.getBannerTestId())).toHaveLength(1);
  });
  it('does not render the banner when not needed', async () => {
    const result = renderTests(false);
    await result.waitForReady();
    expect(() => result.getAllByTestId(mockCore.getBannerTestId())).toThrow();
  });
  it('returns consents', async () => {
    const initialConsents = ['group1', 'group2'].map((group) => ({ group, consented: true }));
    mockCore.setConsents(initialConsents);
    const result = renderTests();
    const { getConsents, waitForReady } = result;
    await waitForReady();
    expect(getConsents()).toEqual(initialConsents);
    const updatedConsentData = ['group3', 'group4'];
    act(() => {
      mockCore.triggerChangeEvent(updatedConsentData);
    });
    await waitFor(() => {
      expect(getConsents()).toEqual(updatedConsentData.map((group) => ({ group, consented: true })));
    });
  });
});
