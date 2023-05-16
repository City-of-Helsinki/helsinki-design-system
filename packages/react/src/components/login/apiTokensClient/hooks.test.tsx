import React, { useState } from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import HttpStatusCode from 'http-status-typed';
import { disableFetchMocks, enableFetchMocks } from 'jest-fetch-mock';

import { getDefaultOidcClientTestProps } from '../testUtils/oidcClientTestUtil';
import { useApiTokens, useApiTokensClient } from './hooks';
import { useBeacon } from '../hooks';
import { LoginContextProvider } from '../LoginContext';
import { createUser, createUserAndPlaceUserToStorage } from '../testUtils/userTestUtil';
import { ConnectedModule } from '../beacon/beacon';
import { ApiTokenClientProps, TokenData, apiTokensClientNamespace } from '.';
import { Responder, createControlledFetchMockUtil } from '../testUtils/fetchMockTestUtil';
import createApiTokenClient, { setApiTokensToStorage, setUserReferenceToStorage } from './apiTokensClient';
// eslint-disable-next-line jest/no-mocks-import
import apiTokens from '../__mocks__/apiTokens.json';
import { createOidcClientEventTrigger } from '../client/signals';

type BeaconFuncs = ReturnType<typeof useBeacon>;

describe('apiToken hooks testing', () => {
  type DataGetters = {
    waitForRerender: () => Promise<void>;
    toggleTestComponent: () => Promise<void>;
    getElementById: (id: string) => HTMLElement | null;
    getInnerHtml: (id: string) => string;
    getTokens: () => TokenData | undefined;
    getTokensError: () => string | undefined;
    getTokensAreRenewing: () => boolean;
    emitUserUpdatedSignal: () => void;
  };

  type TestFunctionality = 'tokens' | 'client';
  type TestProps = {
    functionalities?: Array<TestFunctionality>;
    waitForRenderToggle?: boolean;
  };

  // type ElementId = typeof elementIds[keyof typeof elementIds];
  const elementIds = {
    clientNamespace: 'client-namespace-element',
    clientError: 'client-error-element',
    tokens: 'tokens-element',
    tokensError: 'tokens-error-element',
    tokensIsRenewing: 'tokens-isRenewing-element',
    container: 'container-element',
    renderTimeSuffix: 'render-time',
    renderToggle: 'render-toggle-button',
    rerenderButton: 're-render-button',
    renderCount: 'render-count',
    emitUserUpdatedSignal: 'emit-user-updated-signal',
  } as const;

  type ResponseType = {
    returnedStatus?: HttpStatusCode;
    body?: string;
    error?: boolean;
  };

  const defaultOidcClientProps = getDefaultOidcClientTestProps();

  describe(`apiTokenClient`, () => {
    const endPointPath = '/api-tokens';
    const renewedTokens = { newTokens: 'token' };
    const successfulResponse: ResponseType = { returnedStatus: HttpStatusCode.OK };
    const renewalResponse: ResponseType = { returnedStatus: HttpStatusCode.OK, body: JSON.stringify(renewedTokens) };

    const retryInterval = 20000;
    const defaultClientProps: ApiTokenClientProps = {
      url: `http://userinfo.net${endPointPath}`,
      maxRetries: 0,
      retryInterval,
    };

    const apiTokensResponder: Responder = { id: 'apiTokensResponder', path: endPointPath };

    const {
      waitUntilRequestFinished,
      waitUntilRequestStarted,
      cleanUp,
      setResponders,
      addResponse,
    } = createControlledFetchMockUtil([{ path: endPointPath }]);

    const getApiTokenResponseBody = () => {
      return {
        body: JSON.stringify(apiTokens),
      };
    };

    const addFetchResponse = ({ returnedStatus, body }: ResponseType) => {
      if (returnedStatus === HttpStatusCode.OK) {
        const bodyObject = body ? { body } : getApiTokenResponseBody();
        addResponse({ status: returnedStatus, ...bodyObject });
      } else if (returnedStatus) {
        addResponse({ status: returnedStatus, body: `Error ${returnedStatus}` });
      } else {
        addResponse(new Error('Fetch failed'));
      }
    };

    const Client = () => {
      try {
        const client = useApiTokensClient();
        return (
          <div>
            <span id={elementIds.clientNamespace}>{client.namespace}</span>
          </div>
        );
      } catch (error) {
        return <span id={elementIds.clientError}>{error ? error.message : ''}</span>;
      }
    };

    const Tokens = () => {
      const { getStoredApiTokens, isRenewing } = useApiTokens();
      const [error, tokens] = getStoredApiTokens();
      return (
        <div>
          <span id={elementIds.tokens}>{tokens ? JSON.stringify(tokens) : ''}</span>
          <span id={elementIds.tokensIsRenewing}>{String(isRenewing())}</span>
          <span id={elementIds.tokensError}>{error ? error.message : ''}</span>
        </div>
      );
    };

    const TestComponent = (props: TestProps) => {
      const { functionalities, waitForRenderToggle } = props;
      const shouldTestFunctionality = (func: TestFunctionality) => {
        return !functionalities || functionalities.includes(func);
      };
      const [shouldRender, setShouldRender] = useState(!waitForRenderToggle);
      const [renderCount, setRenderCount] = useState(0);

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
          {shouldTestFunctionality('client') && <Client />}
          {shouldTestFunctionality('tokens') && <Tokens />}
          <button
            type="button"
            id={elementIds.rerenderButton}
            onClick={() => {
              setRenderCount((count) => count + 1);
            }}
          >
            Rerender
          </button>
          <span id={elementIds.renderCount}>{renderCount}</span>
          <RenderToggle />
        </div>
      );
    };

    const TestController = (props: TestProps) => {
      const beacon = useBeacon();
      const emitUserUpdatedSignal = async () => {
        await (beacon as BeaconFuncs).emitAsync({
          ...createOidcClientEventTrigger(),
          payload: { type: 'USER_UPDATED', data: createUser({ signInResponseProps: { access_token: 'token2' } }) },
        });
      };
      return (
        <div>
          <TestComponent {...props} />
          <button
            type="button"
            id={elementIds.emitUserUpdatedSignal}
            onClick={() => {
              emitUserUpdatedSignal();
            }}
          >
            Rerender
          </button>
        </div>
      );
    };

    const renderTestComponent = (
      props: TestProps,
      responses?: ResponseType[],
      modules?: ConnectedModule[],
    ): DataGetters => {
      if (responses && responses.length > 0) {
        responses.forEach((response) => {
          addFetchResponse(response);
        });
      } else {
        addFetchResponse(successfulResponse);
      }
      const { container } = render(
        <LoginContextProvider loginProps={defaultOidcClientProps} modules={modules}>
          <TestController {...props} />
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

      const getElementJSON = (selector: string) => {
        const element = getElementById(selector);
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
      return {
        getElementById,
        getInnerHtml,
        waitForRerender: async () => {
          await act(async () => {
            const getRenderCount = () => parseInt(getInnerHtml(elementIds.renderCount), 10);
            const currentCount = getRenderCount();
            fireEvent.click(getElementById(elementIds.rerenderButton));
            await waitFor(() => {
              expect(getRenderCount()).toBe(currentCount + 1);
            });
          });
        },
        toggleTestComponent: async () => {
          const isRendered = () => !!getElementById(elementIds.renderCount);
          const isRenderedNow = isRendered();
          await act(async () => {
            fireEvent.click(getElementById(elementIds.renderToggle));
            await waitFor(() => {
              expect(isRendered()).not.toBe(isRenderedNow);
            });
          });
        },
        emitUserUpdatedSignal: () => {
          fireEvent.click(getElementById(elementIds.emitUserUpdatedSignal));
        },
        getTokens: () => {
          return getElementJSON(elementIds.tokens) as TokenData | undefined;
        },
        getTokensError: () => {
          return getInnerHtml(elementIds.tokensError);
        },
        getTokensAreRenewing: () => {
          return getInnerHtml(elementIds.tokensIsRenewing) === 'true';
        },
      };
    };

    beforeAll(() => {
      enableFetchMocks();
    });

    beforeEach(() => {
      jest.useFakeTimers();
      apiTokensResponder.responses = [];
      setResponders([apiTokensResponder]);
    });

    afterEach(async () => {
      sessionStorage.clear();
      await cleanUp();
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
      jest.clearAllMocks();
    });

    afterAll(() => {
      disableFetchMocks();
    });
    describe('useApiTokensClient hook', () => {
      const userTestProps: TestProps = { functionalities: ['client'] };
      it('Returns the client', async () => {
        const modules = [createApiTokenClient(defaultClientProps)];
        const { getInnerHtml } = renderTestComponent(userTestProps, [], modules);
        expect(getInnerHtml(elementIds.clientNamespace)).toBe(apiTokensClientNamespace);
      });
      it('Throws an error if apiTokensClient does not exist', async () => {
        const { getInnerHtml } = renderTestComponent(userTestProps);
        expect(getInnerHtml(elementIds.clientError).length > 1).toBeTruthy();
      });
    });
    describe('useApiTokens hook', () => {
      const userTestProps: TestProps = { functionalities: ['tokens'] };
      describe('Returns getStoredApiTokens function ', () => {
        it('which returns apiTokens, if user is authenticated and apiTokens are fetched', async () => {
          const modules = [createApiTokenClient(defaultClientProps)];
          const user = createUserAndPlaceUserToStorage(defaultOidcClientProps.userManagerSettings);
          setUserReferenceToStorage(user.access_token);
          setApiTokensToStorage(apiTokens);
          const { getTokens } = renderTestComponent(userTestProps, [], modules);
          expect(getTokens()).toMatchObject(apiTokens);
        });
        it('which returns null, if user is authenticated', async () => {
          const modules = [createApiTokenClient(defaultClientProps)];
          createUserAndPlaceUserToStorage(defaultOidcClientProps.userManagerSettings);
          const { getTokens } = renderTestComponent(userTestProps, [], modules);
          expect(getTokens()).toBeNull();
        });
        it('Returns an error if user is not authenticated', async () => {
          const modules = [createApiTokenClient(defaultClientProps)];
          const { getElementById, getTokensError } = renderTestComponent(userTestProps, [], modules);
          expect(getElementById(elementIds.tokens)).not.toBeNull();
          expect(getTokensError()).not.toBeUndefined();
        });
      });
      describe('Returns isRenewing function ', () => {
        it('which returns true, if apiTokens are renewing', async () => {
          const modules = [createApiTokenClient(defaultClientProps)];
          createUserAndPlaceUserToStorage(defaultOidcClientProps.userManagerSettings);
          const { getTokensAreRenewing, getTokens, waitForRerender } = renderTestComponent(userTestProps, [], modules);
          await waitUntilRequestStarted();
          expect(getTokensAreRenewing()).toBeTruthy();
          await waitUntilRequestFinished();
          await waitForRerender();
          expect(getTokensAreRenewing()).toBeFalsy();
          expect(getTokens()).toMatchObject(apiTokens);
        });
        it('which returns false, if apiTokens are not renewing', async () => {
          const modules = [createApiTokenClient(defaultClientProps)];
          const user = createUserAndPlaceUserToStorage(defaultOidcClientProps.userManagerSettings);
          setUserReferenceToStorage(user.access_token);
          setApiTokensToStorage(apiTokens);
          const { getTokensAreRenewing, emitUserUpdatedSignal, getTokens, waitForRerender } = renderTestComponent(
            userTestProps,
            [renewalResponse],
            modules,
          );
          expect(getTokensAreRenewing()).toBeFalsy();
          emitUserUpdatedSignal();
          await waitUntilRequestStarted();
          await waitForRerender();
          expect(getTokensAreRenewing()).toBeTruthy();
          await waitUntilRequestFinished();
          await waitForRerender();
          expect(getTokensAreRenewing()).toBeFalsy();
          expect(getTokens()).toMatchObject(renewedTokens);
        });
      });
    });
  });
});
