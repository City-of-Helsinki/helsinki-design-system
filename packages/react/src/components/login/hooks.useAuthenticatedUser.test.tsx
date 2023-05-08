import React from 'react';
import { User } from 'oidc-client-ts';

import { useAuthenticatedUser } from './hooks';
import { UserCreationProps } from './testUtils/userTestUtil';
import { createHookTestEnvironment, HookTestUtil } from './testUtils/hooks.testUtil';

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
