import React, { useRef } from 'react';
import { act, waitFor } from '@testing-library/react';

import { useOidcClientTracking } from '../client/hooks';
import { createUser, createUserAndPlaceUserToStorage, UserCreationProps } from '../testUtils/userTestUtil';
import { createHookTestEnvironment, HookTestUtil, elementIds as testUtilElementIds } from '../testUtils/hooks.testUtil';
import { isErrorSignal, EventPayload } from './signals';
import { oidcClientEvents, oidcClientStates } from '../client';
import { createOidcClientErrorSignal, createOidcClientEventSignal, getOidcClientEventPayload } from '../client/signals';
import { getDefaultOidcClientTestProps, mockSignInResponse } from '../testUtils/oidcClientTestUtil';
import { OidcClientError, oidcClientErrors } from '../client/oidcClientError';

describe('useOidcClientTracking hook', () => {
  const elementIds = {
    renderTime: 'render-time',
    lastSignal: 'last-signal-element',
    state: 'state-element',
    error: 'error-element',
    handleCallbackButton: 'handle-callback-button',
  } as const;

  const defaultOidcClientProps = getDefaultOidcClientTestProps();
  const signInResponses: UserCreationProps[] = [];

  const ErrorTracking = () => {
    const [signal, , oidcClient] = useOidcClientTracking();
    const error = signal && isErrorSignal(signal) ? (signal?.payload as OidcClientError) : null;
    const eventPayload = signal ? getOidcClientEventPayload(signal) : null;
    // useRef to store last error and payload
    const errorRef = useRef<OidcClientError | undefined>(undefined);
    const payloadRef = useRef<EventPayload | undefined>(undefined);
    if (error) {
      errorRef.current = error;
    }
    if (eventPayload) {
      payloadRef.current = eventPayload;
    }
    return (
      <div>
        <span id={elementIds.lastSignal}>{payloadRef.current ? payloadRef.current.type : ''}</span>
        <span id={elementIds.state}>{oidcClient.getState()}</span>
        <span id={elementIds.error}>{errorRef.current ? errorRef.current.type : ''}</span>
        <span id={`${elementIds.renderTime}-${testUtilElementIds.renderTimeSuffix}`}>{Date.now()}</span>;
        <button
          type="button"
          id={`${elementIds.handleCallbackButton}`}
          onClick={() => {
            if (signInResponses.length) {
              mockSignInResponse(oidcClient.getUserManager(), signInResponses.shift());
            }
            oidcClient.handleCallback().catch(jest.fn());
          }}
        >
          Reset currentSignal
        </button>
      </div>
    );
  };

  let testUtil: HookTestUtil;
  const init = ({ userProps }: { userProps?: UserCreationProps }) => {
    testUtil = createHookTestEnvironment(
      {
        userInStorage: userProps,
        waitForRenderToggle: false,
        children: [<ErrorTracking key="errorTracking" />],
        noOidcClient: true,
      },
      {},
    );
    return testUtil;
  };
  afterEach(() => {
    jest.restoreAllMocks();
    sessionStorage.clear();
    testUtil.afterEach();
    signInResponses.length = 0;
  });
  it('returns also oidcClient and, for example, state can be read.', async () => {
    const { getInnerHtml } = init({
      userProps: { invalidUser: false },
    });
    expect(getInnerHtml(elementIds.state)).toBe(oidcClientStates.VALID_SESSION);
    expect(getInnerHtml(elementIds.lastSignal)).toBe('');
    expect(getInnerHtml(elementIds.error)).toBe('');
  });
  it('tracks events when callback is processed', async () => {
    const { getInnerHtml, clickElement } = init({});
    await clickElement(elementIds.handleCallbackButton, elementIds.renderTime);
    expect(getInnerHtml(elementIds.error)).toBe(oidcClientErrors.SIGNIN_ERROR);
    signInResponses.push({ invalidUser: false });
    await clickElement(elementIds.handleCallbackButton, elementIds.renderTime);
    expect(getInnerHtml(elementIds.lastSignal)).toBe(oidcClientEvents.USER_UPDATED);
  });
  it('Tracks any signal', async () => {
    createUserAndPlaceUserToStorage(defaultOidcClientProps.userManagerSettings);
    const { emit, getInnerHtml } = init({});
    act(() => {
      emit(
        createOidcClientEventSignal({
          type: oidcClientEvents.USER_REMOVED,
          data: createUser({ signInResponseProps: { access_token: 'token2' } }),
        }),
      );
    });
    await waitFor(() => {
      expect(getInnerHtml(elementIds.lastSignal)).toBe(oidcClientEvents.USER_REMOVED);
    });
    act(() => {
      emit(createOidcClientErrorSignal(new OidcClientError('Testing', oidcClientErrors.INVALID_OR_EXPIRED_USER)));
    });
    await waitFor(() => {
      expect(getInnerHtml(elementIds.error)).toBe(oidcClientErrors.INVALID_OR_EXPIRED_USER);
    });
  });
});
