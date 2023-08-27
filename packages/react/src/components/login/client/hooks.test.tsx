import React from 'react';
import { User } from 'oidc-client-ts';

import { useAuthenticatedUser, useCachedAmr } from './hooks';
import { UserCreationProps } from '../testUtils/userTestUtil';
import { createHookTestEnvironment, HookTestUtil } from '../testUtils/hooks.testUtil';
import { Amr, OidcClient, oidcClientNamespace } from './index';

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
      expect(((getUser() as unknown) as User).access_token).not.toBeUndefined();
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
});
