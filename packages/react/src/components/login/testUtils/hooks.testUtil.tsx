import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import { createOidcClientTestSuite, getDefaultOidcClientTestProps } from './oidcClientTestUtil';
import { useBeacon } from '../beacon/hooks';
import { OidcClientProps } from '../client/index';
import { LoginContextProvider } from '../components/LoginContext';
import { Beacon, ConnectedModule, Signal, SignalNamespace } from '../beacon/beacon';
import { getAllMockCallArgs } from '../../../utils/testHelpers';
import { UserCreationProps, createUserAndPlaceUserToStorage } from './userTestUtil';

export type ListenerData = { signal: Signal | undefined; id: string; orderNum: number; uuid: string | undefined };
export type ListenerGetter = (id: string) => jest.Mock;

type BeaconFuncs = ReturnType<typeof useBeacon>;
export type HookTestUtil = ReturnType<typeof createHookTestEnvironment>;
export type ListenerFactory = ReturnType<typeof createSignalListenerFactory>;

type TestProps = {
  children: React.ReactNodeArray;
  waitForRenderToggle?: boolean;
  userInStorage?: UserCreationProps;
  noOidcClient?: boolean;
};

const listenerFactoryNamespace = 'listenerFactory';

export const useListenerFactory = (): ListenerFactory => {
  const beacon = useBeacon();
  return beacon.getModule(listenerFactoryNamespace) as ListenerFactory;
};

const createSignalListenerFactory = () => {
  let count = 0;
  const getOrderNumber = () => {
    count += 1;
    return count;
  };
  const listeners = new Map<string, jest.Mock>();
  const getOrAdd = (id: string) => {
    const exists = listeners.has(id);

    const actualListener = exists ? (listeners.get(id) as jest.Mock) : jest.fn();
    const identifiableListener = (signal: Signal, uuid?: string) => {
      actualListener({ signal: { ...signal }, id, orderNum: getOrderNumber(), uuid });
    };
    if (!exists) {
      listeners.set(id, actualListener);
    }
    return identifiableListener as jest.Mock;
  };
  const getListener = (id: string) => {
    return listeners.get(id);
  };
  const getCalls = (id: string): ListenerData[] => {
    const listener = getListener(id);
    if (!listener) {
      return [];
    }
    return getAllMockCallArgs(listener);
  };
  const reset = () => {
    count = 0;
    listeners.clear();
  };
  return {
    namespace: listenerFactoryNamespace,
    getCalls,
    getOrAdd,
    getListener,
    reset,
    connect: () => {
      // just to make this compatible with modules
    },
  };
};

export const elementIds = {
  user: 'user-element',
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
  { userInStorage, noOidcClient, ...componentProps }: TestProps,
  additionalOidcClientProps?: Partial<OidcClientProps>,
  modules: ConnectedModule[] = [],
) {
  const listenerFactory = createSignalListenerFactory();

  const cleanUp = noOidcClient ? jest.fn() : createOidcClientTestSuite().cleanUp;

  const createModule = (namespace: SignalNamespace): Pick<Beacon, 'emit'> & ConnectedModule => {
    let beacon: Beacon;
    const emit: Beacon['emit'] = (...args) => {
      return beacon.emit(...args);
    };
    return {
      emit,
      namespace,
      connect: (targetBeacon) => {
        beacon = targetBeacon;
      },
    };
  };

  const helperModule = createModule('helper');

  let beaconFuncs: BeaconFuncs | undefined;

  const storeBeaconFuncs = (funcs: BeaconFuncs) => {
    beaconFuncs = funcs;
  };
  const getBeaconFuncs = () => {
    return beaconFuncs as BeaconFuncs;
  };

  const afterEach = () => {
    jest.restoreAllMocks();
    beaconFuncs = undefined;
    sessionStorage.clear();
    cleanUp();
  };

  const GetBeacon = ({ callback }: { callback: (beaconFuncs: BeaconFuncs) => void }) => {
    const funcs = useBeacon();
    callback(funcs);
    return <p>Beacon is here</p>;
  };

  const oidcClientProps = { ...getDefaultOidcClientTestProps(), ...additionalOidcClientProps };
  oidcClientProps.userManagerSettings.automaticSilentRenew = false;

  if (userInStorage) {
    createUserAndPlaceUserToStorage(oidcClientProps.userManagerSettings, userInStorage);
  }

  const { container } = render(
    <LoginContextProvider loginProps={oidcClientProps} modules={[...modules, helperModule, listenerFactory]}>
      <GetBeacon callback={storeBeaconFuncs} />
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
    clickElement: async (id: string, renderTimeId?: string) => {
      const currentRenderTime = renderTimeId ? getRenderTime(renderTimeId) : -1;
      act(() => {
        fireEvent.click(getElementById(id));
      });
      if (!renderTimeId) {
        return Promise.resolve();
      }
      return waitFor(() => {
        expect(getRenderTime(renderTimeId)).not.toBe(currentRenderTime);
      });
    },
    getBeaconFuncs,
    afterEach,
    getElementJSON,
    listenerFactory,
    emit: helperModule.emit,
  };
}

export function getCommonListenerFunctions(
  testUtil: HookTestUtil,
  componentIds: string[],
  testElementIds: Record<string, string>,
) {
  const getComponentListener = (index: number) => {
    testUtil.listenerFactory.getOrAdd(componentIds[index]);
    return testUtil.listenerFactory.getListener(componentIds[index]) as jest.Mock;
  };

  const getComponentListeners = () => {
    return componentIds.map((id, index) => {
      return getComponentListener(index);
    });
  };

  const getReceivedSignal = (index: number) => {
    return testUtil.getElementJSON(`${componentIds[index]}`) as Signal | Error;
  };

  const resetSignalListener = async (index: number) => {
    const id = componentIds[index];
    const startTime = testUtil.getRenderTime(id);
    await act(async () => {
      fireEvent.click(testUtil.getElementById(`${id}-${testElementIds.resetButtonSuffix}`));
    });
    await testUtil.waitForComponentRerender(id, startTime);
  };

  const getReceivedSignalHistory = (index: number) => {
    const list = testUtil.getElementById(`${componentIds[index]}-history`);
    const children = Array.from(list.childNodes);
    return children.map((node) => {
      return testUtil.getElementJSON('', node as HTMLElement) as Signal;
    });
  };

  const getRenderTime = (index: number) =>
    testUtil.getInnerHtmlAsNumber(`${componentIds[index]}-${testElementIds.renderTimeSuffix}`);

  const removeSignalListener = async (assumedStartCount) => {
    const getCurrentListenerCount = () => {
      return testUtil.getInnerHtmlAsNumber(testElementIds.signalListenerCount);
    };
    const currentCount = getCurrentListenerCount();
    if (assumedStartCount !== currentCount) {
      throw new Error(
        `removeSignalListener error with assumedStartCount${assumedStartCount} and currentCount ${currentCount}`,
      );
    }
    fireEvent.click(testUtil.getElementById(testElementIds.removeSignalListenerButton));
    await waitFor(() => {
      if (getCurrentListenerCount() !== currentCount - 1) {
        throw new Error('Not removed yet');
      }
    });
  };
  const getLastListenerCall = (componentIndex: number): ListenerData => {
    testUtil.listenerFactory.getOrAdd(componentIds[componentIndex]);
    const calls = testUtil.listenerFactory.getCalls(componentIds[componentIndex]);
    const lastIndex = calls.length - 1;
    // argument #0 holds all listened data
    return calls[lastIndex][0];
  };
  return {
    getComponentListener,
    removeSignalListener,
    getRenderTime,
    getReceivedSignalHistory,
    resetSignalListener,
    getReceivedSignal,
    getComponentListeners,
    getLastListenerCall,
  };
}
