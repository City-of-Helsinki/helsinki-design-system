import React, { useRef } from 'react';
import { User } from 'oidc-client-ts';
import { waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { useAuthenticatedUser, useCachedAmr, useOidcClientTracking } from './hooks';
import { UserCreationProps, createUser, createUserAndPlaceUserToStorage } from '../testUtils/userTestUtil';
import { createHookTestEnvironment, HookTestUtil, elementIds as testUtilElementIds } from '../testUtils/hooks.testUtil';
import { Amr, OidcClient, oidcClientEvents, oidcClientNamespace, oidcClientStates } from './index';
import { isErrorSignal, EventPayload } from '../beacon/signals';
import { getDefaultOidcClientTestProps, mockSignInResponse } from '../testUtils/oidcClientTestUtil';
import { OidcClientError, oidcClientErrors } from './oidcClientError';
import { getOidcClientEventPayload, createOidcClientEventSignal, createOidcClientErrorSignal } from './signals';

describe('Client hooks', () => {
  describe('useAuthenticatedUser hook', () => {
    const elementIds = {
      user: 'user-element',
    } as const;

    const TestUserFunctionalities = () => {
      const user = useAuthenticatedUser();
      return <span id={elementIds.user}>{user ? user.toStorageString() : ''}</span>;
    };

    let testUtil: HookTestUtil;
    const getUser = () => {
      return testUtil.getElementJSON(elementIds.user) as User | Error;
    };
    const init = (userProps: UserCreationProps) => {
      testUtil = createHookTestEnvironment({
        userInStorage: userProps,
        children: [<TestUserFunctionalities key="user" />],
      });
    };
    afterEach(() => {
      jest.restoreAllMocks();
      sessionStorage.clear();
      testUtil.afterEach();
    });
    it('Returns an user object, if valid user is found', async () => {
      init({ invalidUser: false });
      expect((getUser() as unknown as User).access_token).not.toBeUndefined();
    });
    it('Returns null, if a valid user is not found', async () => {
      init({
        invalidUser: false,
        expiredUser: true,
      });
      expect(getUser()).toBeNull();
    });
  });
  describe('useCachedAmr hook', () => {
    const elementIds = {
      amr: 'amr-element',
    } as const;

    const AmrComponent = () => {
      const amr = useCachedAmr();
      return (
        <div>
          <span id={elementIds.amr}>{amr ? JSON.stringify(amr) : undefined}</span>
        </div>
      );
    };

    let testUtil: HookTestUtil;
    const getAmrValue = () => {
      return testUtil.getElementJSON(elementIds.amr) as Amr | Error;
    };
    const init = (userProps: UserCreationProps) => {
      testUtil = createHookTestEnvironment({
        userInStorage: userProps,
        waitForRenderToggle: true,
        children: [<AmrComponent key="amr" />],
      });
    };
    afterEach(() => {
      jest.restoreAllMocks();
      sessionStorage.clear();
      testUtil.afterEach();
    });
    describe('useCachedAmr hook', () => {
      let getAmrSpy: jest.SpyInstance;
      const amrValue = ['myAmr'];
      it('calls client.getAmr() only once', async () => {
        init({ invalidUser: false });
        const { getBeaconFuncs, toggleTestComponent, waitForRerender } = testUtil;
        const oidcClient = getBeaconFuncs().getModule(oidcClientNamespace) as OidcClient;
        getAmrSpy = jest.spyOn(oidcClient, 'getAmr').mockReturnValue(amrValue);
        await toggleTestComponent();
        expect(getAmrSpy).toHaveBeenCalledTimes(1);
        expect(getAmrValue()).toEqual(amrValue);
        await waitForRerender();
        await waitForRerender();
        expect(getAmrSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
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
});
