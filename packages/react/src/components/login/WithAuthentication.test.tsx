import React from 'react';
import { RenderResult, render } from '@testing-library/react';

import { createUserAndPlaceUserToStorage } from './testUtils/userTestUtil';
import { getDefaultOidcClientTestProps } from './testUtils/oidcClientTestUtil';
import { LoginContextProvider } from './LoginContext';
import { useOidcClient } from './client/hooks';
import { User } from './index';
import { WithAuthentication } from './WithAuthentication';
import { WithAuthenticatedUser } from './WithAuthenticatedUser';
import { WithoutAuthenticatedUser } from './WithoutAuthenticatedUser';
import { oidcClientStates } from './client';

const elementIds = {
  userName: 'user-name-element',
  state: 'state-element',
  hello: 'hello-element',
  numbers: 'numbers-element',
  strings: 'strings-element',
  unauthenticated: 'unauthenticated-element',
  unauthenticatedElement: 'unauthenticated-element-element',
  authenticated: 'authenticated-element',
};

const loginProps = getDefaultOidcClientTestProps();

afterEach(() => {
  jest.restoreAllMocks();
  sessionStorage.clear();
});

describe('"WithAuth..." components render children conditionally', () => {
  const numbers = 1234567;
  const strings = ['Just a string', 'Second string'];
  const ClientState = () => {
    const client = useOidcClient();
    return <div id={elementIds.state}>{client.getState()}</div>;
  };
  const UserCheckingComponent = ({ user }: { user?: User }) => {
    if (!user) {
      return <div id={elementIds.unauthenticated}>User does not exist!</div>;
    }
    return <div id={elementIds.authenticated}>User exists!</div>;
  };
  const renderComponent = () => {
    return render(
      <LoginContextProvider loginProps={loginProps}>
        <div id="WithAuthenticatedUser">
          <WithAuthenticatedUser>
            {({ user }) => {
              return <p id={elementIds.userName}>{user.profile.name}</p>;
            }}
            <span id={elementIds.hello}>Hello there!</span>
          </WithAuthenticatedUser>
          <WithAuthenticatedUser>
            <ClientState />
          </WithAuthenticatedUser>
          <div id={elementIds.numbers}>
            <WithAuthenticatedUser>{numbers}</WithAuthenticatedUser>
          </div>
          <div id={elementIds.strings}>
            <WithAuthenticatedUser>{strings.join('')}</WithAuthenticatedUser>
          </div>
          <WithAuthenticatedUser>{null}</WithAuthenticatedUser>
          <WithAuthenticatedUser />
          <WithAuthenticatedUser>
            <UserCheckingComponent />
          </WithAuthenticatedUser>
        </div>
        <div id="WithoutAuthenticatedUser">
          <WithoutAuthenticatedUser>
            <div id={elementIds.unauthenticatedElement}>User does not exist!</div>
            <UserCheckingComponent />
          </WithoutAuthenticatedUser>
        </div>
      </LoginContextProvider>,
    );
  };

  const getElementById = (container: RenderResult['container'], id: string) =>
    container.querySelector(`#${id}`) as HTMLElement;
  const getRenderedContent = (container: RenderResult['container'], id: string) => {
    const el = getElementById(container, id);
    return el ? el.innerHTML : undefined;
  };

  const elementIdArray = Object.keys(elementIds).map((key) => elementIds[key]);
  const filterOutAlwaysShownElements = (elementId: string) => {
    return ![elementIds.numbers, elementIds.strings].includes(elementId);
  };
  const filterOutAuthenticatedElements = (elementId: string) => {
    return [elementIds.unauthenticated, elementIds.unauthenticatedElement].includes(elementId);
  };
  const unauthenticatedElements = elementIdArray.filter(filterOutAuthenticatedElements);
  const authenticatedElements = elementIdArray.filter((id) => !filterOutAuthenticatedElements(id));

  describe('WithAuthenticatedUser', () => {
    it('Renders any kind of child element - when user is authenticated', async () => {
      const signInResponseProfileProps = { name: 'authenticated user' };
      createUserAndPlaceUserToStorage(loginProps.userManagerSettings, { signInResponseProfileProps });
      const { container } = renderComponent();
      expect(authenticatedElements).toHaveLength(6);
      authenticatedElements.filter(filterOutAlwaysShownElements).forEach((id) => {
        expect(getElementById(container, id)).not.toBeNull();
      });
      expect(getRenderedContent(container, elementIds.userName)).toBe(signInResponseProfileProps.name);
      expect(getRenderedContent(container, elementIds.state)).toBe(oidcClientStates.VALID_SESSION);
      expect(getRenderedContent(container, elementIds.numbers)).toBe(String(numbers));
      expect(getRenderedContent(container, elementIds.strings)).toBe(strings.join(''));
    });

    it('Renders nothing when user is not authenticated', async () => {
      const { container } = renderComponent();
      authenticatedElements.filter(filterOutAlwaysShownElements).forEach((id) => {
        expect(getElementById(container, id)).toBeNull();
      });
    });
  });
  describe('WithoutAuthenticatedUser', () => {
    it('Renders any kind of child element - when user is not authenticated', async () => {
      const { container } = renderComponent();
      expect(unauthenticatedElements).toHaveLength(2);
      unauthenticatedElements.filter(filterOutAlwaysShownElements).forEach((id) => {
        expect(getElementById(container, id)).not.toBeNull();
      });
    });

    it('Renders nothing when user is authenticated', async () => {
      createUserAndPlaceUserToStorage(loginProps.userManagerSettings);
      const { container } = renderComponent();
      unauthenticatedElements.forEach((id) => {
        expect(getElementById(container, id)).toBeNull();
      });
    });
  });
  describe('WithoutAuthentication', () => {
    const renderWithAuthenticationComponent = () => {
      return render(
        <LoginContextProvider loginProps={loginProps}>
          <div id="WithoutAuthentication">
            <WithAuthentication
              AuthorisedComponent={({ user }) => {
                return (
                  <>
                    <p id={elementIds.userName}>{user.profile.name}</p>
                    <span id={elementIds.hello}>Hello there!</span>
                    <div id={elementIds.numbers}>{numbers}</div>
                    <div id={elementIds.strings}>{strings.join('')}</div>
                    <ClientState />
                    <UserCheckingComponent user={user} />
                  </>
                );
              }}
              UnauthorisedComponent={() => {
                return (
                  <>
                    <div id={elementIds.unauthenticatedElement}>User does not exist!</div>
                    <UserCheckingComponent />
                  </>
                );
              }}
            />
          </div>
        </LoginContextProvider>,
      );
    };
    it('Renders authenticated elements when user is authenticated', async () => {
      const signInResponseProfileProps = { name: 'authenticated user' };
      createUserAndPlaceUserToStorage(loginProps.userManagerSettings, { signInResponseProfileProps });
      const { container } = renderWithAuthenticationComponent();
      expect(authenticatedElements).toHaveLength(6);
      authenticatedElements.filter(filterOutAlwaysShownElements).forEach((id) => {
        expect(getElementById(container, id)).not.toBeNull();
      });
    });

    it('Renders unauthenticated elements when user is not authenticated', async () => {
      const { container } = renderWithAuthenticationComponent();
      authenticatedElements.filter(filterOutAlwaysShownElements).forEach((id) => {
        expect(getElementById(container, id)).toBeNull();
      });
    });
  });
});
