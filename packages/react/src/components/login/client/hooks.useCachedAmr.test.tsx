import React from 'react';

import { useCachedAmr } from './hooks';
import { UserCreationProps } from '../testUtils/userTestUtil';
import { createHookTestEnvironment, HookTestUtil } from '../testUtils/hooks.testUtil';
import { Amr, OidcClient, oidcClientNamespace } from './index';

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
