import React, { useState, useCallback } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';

import {
  User,
  useOidcClient,
  useSignalListener,
  useConnectedModule,
  useSignalTrackingWithCallback,
  Profile,
  useBeacon,
  LoginCallbackHandler,
  WithAuthentication,
  OidcClientError,
  sessionPollerNamespace,
  useApiTokens,
  useApiTokensClient,
  EventPayload,
  createTriggerPropsForAllSignals,
  isErrorSignal,
  isEventSignal,
  isInitSignal,
  StateChangeSignalPayload,
  isStateChangeSignal,
  createErrorTriggerProps,
  createErrorSignal,
  Beacon,
  ConnectedModule,
  Signal,
  SignalListener,
  useSessionPoller,
  LoginButton,
  SessionEndedHandler,
  SessionPollerError,
  sessionPollerErrors,
  LoginProvider,
  LoginProviderProps,
  useGraphQL,
  useGraphQLModule,
  createGraphQLModule,
} from './index';
import { Button } from '../button/Button';
import { Header } from '../header/Header';
import { Notification } from '../notification/Notification';
import { Tabs } from '../tabs/Tabs';
import { Logo, logoFi } from '../logo';
import { MyProfileQuery } from './graphQLModule/demoData/MyProfileQuery';
import { LoadingSpinner } from '../loadingSpinner';

type StoryArgs = {
  useKeycloak?: boolean;
};

export default {
  component: LoginProvider,
  title: 'Components/Login',
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
  },
  args: {
    useKeycloak: false,
  },
};

const useKeycloakArgs = {
  defaultValue: false,
  control: 'boolean',
  description: 'Only a storybook option. If true, Helsinki Profile OIDC is used.',
};

// To use this in localhost, copy the settings from https://hds.hel.fi/components/login/#common-settings-for-localhost and change
// with Tunnistamo
// redirect_uri: `${window.origin}/static-login/callback.html`
// or with Helsinki Profile:
// redirect_uri: `${window.origin}/static-login/callback_kc.html`
// with both
// silent_redirect_uri: `${window.origin}/static-login/silent_renew.html`
// post_logout_redirect_uri: `${window.origin}/static-login/logout.html`

// For hds-demo -site, use the localhost settings. The demo url must be https://city-of-helsinki.github.io/hds-demo/login
// because that is registered to the OIDC provider.
// All "_uri"s must be ${window.origin}/hds-demo/login/static-login/{xxx}.html
// Also make this change to html files in the storybookStatic -folder:
// const prefix = `${window.origin}/hds-demo/login/`;

const loginProviderProps: LoginProviderProps = {
  userManagerSettings: {
    authority: 'https://tunnistamo.test.hel.ninja/',
    client_id: 'exampleapp-ui-test',
    scope: 'openid profile email https://api.hel.fi/auth/helsinkiprofile https://api.hel.fi/auth/exampleapptest',
    redirect_uri: `${window.origin}/storybook/react/static-login/callback.html`,
    silent_redirect_uri: `${window.origin}/storybook/react/static-login/silent_renew.html`,
  },
  apiTokensClientSettings: { url: 'https://tunnistamo.test.hel.ninja/api-tokens/' },
  sessionPollerSettings: { pollIntervalInMs: 10000 },
};

const loginProviderPropsForKeycloak: LoginProviderProps = {
  userManagerSettings: {
    authority: 'https://tunnistus.test.hel.ninja/auth/realms/helsinki-tunnistus',
    client_id: 'exampleapp-ui-test',
    scope: 'openid profile',
    redirect_uri: `${window.origin}/static-login/callback_kc.html`,
    silent_redirect_uri: `${window.origin}/static-login/silent_renew.html`,
    post_logout_redirect_uri: `${window.origin}/static-login/logout.html`,
  },
  apiTokensClientSettings: {
    url: 'https://tunnistus.test.hel.ninja/auth/realms/helsinki-tunnistus/protocol/openid-connect/token',
    queryProps: {
      grantType: 'urn:ietf:params:oauth:grant-type:uma-ticket',
      permission: '#access',
    },
    audiences: ['exampleapp-api-test', 'profile-api-test'],
  },
  sessionPollerSettings: { pollIntervalInMs: 10000 },
};

const getIFramePath = () => {
  let path = window.location.href.split('?')[0];
  if (path.includes('.') && path.lastIndexOf('/') > -1) {
    path = path.substring(0, path.lastIndexOf('/') + 1);
  }
  return `${path}iframe.html`;
};

const shouldUseKeycloakServer = (args: StoryArgs) => {
  return args && args.useKeycloak;
};

function createSignalTracker(): ConnectedModule & {
  getHistory: () => Signal[];
  emit: Beacon['emit'];
} {
  let beacon: Beacon | undefined;
  const history: Signal[] = [];
  const listener: SignalListener = (signal: Signal) => {
    history.push({ ...signal, context: undefined });
  };
  return {
    namespace: 'signalTracker',
    connect: (connectedBeacon) => {
      beacon = connectedBeacon;
      beacon.addListener(createTriggerPropsForAllSignals(), listener);
    },
    emit: (signal: Signal) => {
      if (beacon) {
        beacon.emit(signal);
      }
    },
    getHistory: () => {
      return history;
    },
  };
}

const signalTracker = createSignalTracker();
const profileGraphQL = createGraphQLModule({
  query: MyProfileQuery,
  queryOptions: {
    // this is needed with Profile BE, because it returns an error in result.data with weak authentication
    errorPolicy: 'all',
  },
  graphQLClient: new ApolloClient({ uri: 'https://profile-api.test.hel.ninja/graphql/', cache: new InMemoryCache() }),
  options: {
    apiTokenKey: 'https://api.hel.fi/auth/helsinkiprofile',
  },
});

const Wrapper = (props: React.PropsWithChildren<unknown>) => {
  return (
    <>
      <style>
        {`
          .wrapper{
            overflow: hidden;
          }
          pre{
            white-space: break-spaces;
          }
          .buttons > * {
            margin-top: 40px;
            margin-right: 20px;
          }
        `}
      </style>
      <div className="wrapper">{props.children}</div>
    </>
  );
};

const ContentAligner = (props: React.PropsWithChildren<unknown>) => {
  return (
    <>
      <style>
        {`
          .content-aligner{
            margin-left: auto;
            margin-right: auto;
            max-width: 1440px;
            padding: 0 var(--spacing-m);
            box-sizing: border-box;
          }
        `}
      </style>
      <div className="content-aligner">{props.children}</div>
    </>
  );
};

const IFrameWarning = () => {
  const openWindowInTop = () => {
    if (window.top) {
      const path = getIFramePath();
      window.top.location.href = `${path}${window.location.search}`;
    }
  };
  if (window.top !== window.self) {
    return (
      <Notification type="error">
        <p>OIDC servers do not allow login or logout to happen in an iframe.</p>
        <Button onClick={openWindowInTop}>Open this story without an iframe</Button>
      </Notification>
    );
  }
  return null;
};

const ListContainer = (props: React.PropsWithChildren<unknown>) => {
  return (
    <>
      <style>
        {`
          .list-container{
            background-color:#ddd;
            padding: 20px;
            margin-bottom: 20px;
          }
        `}
      </style>
      <div className="list-container">{props.children}</div>
    </>
  );
};

const Nav = () => {
  return (
    <Header>
      <Header.ActionBar
        frontPageLabel="Frontpage"
        title="City of Helsinki"
        titleAriaLabel="City of Helsinki"
        titleHref="https://hel.fi"
        logo={<Logo src={logoFi} alt="City of Helsinki" />}
        logoAriaLabel="Service logo"
      >
        <Header.LoginButton
          label="Log in"
          id="action-bar-login-action"
          errorLabel="Login failed!"
          errorText="Redirection to the OIDC server failed. Try again!"
          errorCloseAriaLabel="Close this error notification"
          loggingInText="Logging in"
          fixedRightPosition
        />
        <Header.UserMenuButton id="user-menu" fixedRightPosition>
          <Header.LogoutSubmenuButton
            label="Log out"
            errorLabel="Logout failed!"
            errorText="Redirection to the OIDC server failed. Try again!"
            errorCloseAriaLabel="Close this error notification"
            id="logout-button"
            loggingOutText="Logging out"
          />
        </Header.UserMenuButton>
      </Header.ActionBar>
    </Header>
  );
};

const LogoutButton = () => {
  const oidcClient = useOidcClient();
  const onButtonClick = () => {
    oidcClient.logout();
  };
  return <Button onClick={onButtonClick}>Log out</Button>;
};

const RenewUserButton = () => {
  const oidcClient = useOidcClient();
  const onButtonClick = async () => {
    await oidcClient.renewUser().catch(() => undefined);
  };
  return <Button onClick={onButtonClick}>Renew user tokens</Button>;
};

const RenewApiTokensButton = () => {
  const apiTokens = useApiTokensClient();
  const oidcClient = useOidcClient();
  const onButtonClick = async () => {
    const user = oidcClient.getUser();
    if (user) {
      await apiTokens.fetch(user).catch(() => undefined);
    }
  };
  return <Button onClick={onButtonClick}>Renew api tokens</Button>;
};

const StartSessionPollingButton = () => {
  const poller = useSessionPoller();
  const onButtonClick = () => {
    poller.stop();
    poller.start();
  };
  return <Button onClick={onButtonClick}>Poll session</Button>;
};
const SimulateSessionEndButton = () => {
  const { getModule } = useBeacon();
  const onButtonClick = () => {
    const tracker = getModule(signalTracker.namespace) as ReturnType<typeof createSignalTracker>;
    tracker.emit({
      ...createErrorSignal(
        sessionPollerNamespace,
        new SessionPollerError('Simulation', sessionPollerErrors.SESSION_ENDED),
      ),
    });
  };
  return <Button onClick={onButtonClick}>Simulate session end</Button>;
};

const UserData = ({ user }: { user: User }) => {
  const profile = user.profile as Profile;
  const expiresAt = new Date();
  expiresAt.setTime(user.expires_at ? user.expires_at * 1000 : Date.now());
  const timezoneOffset = expiresAt.getTimezoneOffset();
  return (
    <div>
      <p>
        Hi, <strong>{profile.given_name}</strong>!
      </p>
      <p>
        Your fullname is <strong>{profile.name}</strong>.
      </p>
      <p>
        Your email, <strong>{profile.email}</strong>, is {profile.email_verified ? '' : 'not'} verified.
      </p>
      <p>
        Your level of assurance is <strong>&quot;{profile.loa}&quot;</strong>.
      </p>
      <p>
        Your tokens will expire{' '}
        {new Intl.DateTimeFormat('en-FI', { dateStyle: 'full', timeStyle: 'long', timeZone: 'GMT' }).format(expiresAt)}
        {timezoneOffset !== 0 ? `+ ${timezoneOffset / -60} hour(s)` : ''}
      </p>
    </div>
  );
};
const ChangeList = ({ list }: { list: Signal[] }) => {
  const getChangeText = (signal: Signal): string => {
    if (isEventSignal(signal)) {
      return `New event: ${(signal.payload as EventPayload).type as string}`;
    }
    if (isErrorSignal(signal)) {
      return `New error: ${(signal.payload as OidcClientError).type as string}`;
    }
    if (isStateChangeSignal(signal)) {
      return `New oidcClient state: ${(signal.payload as StateChangeSignalPayload).state as string}`;
    }
    if (isStateChangeSignal(signal)) {
      return `New oidcClient state: ${(signal.payload as StateChangeSignalPayload).state as string}`;
    }
    if (isInitSignal(signal)) {
      return `Initialized ${signal.namespace}`;
    }
    return `Unknown signal:${JSON.stringify(signal)}`;
  };
  if (list.length === 0) {
    return <p>No signals...</p>;
  }
  return (
    <>
      <style>
        {`
          .list{
            list-style: none;
            padding: 0 10px;
          }
          .list li{
            padding: 0 10px;
          }
        `}
      </style>
      <ul className="list">
        {list.map((change, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <li key={`item-${index}`}>{getChangeText(change)}</li>;
        })}
      </ul>
    </>
  );
};

const UserProfileOutput = ({ user }: { user: User }) => {
  return (
    <div>
      <p>This is your user object:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

const ApiTokenOutput = () => {
  const { getStoredApiTokens } = useApiTokens();
  const [, tokens] = getStoredApiTokens();
  const listener = useCallback(() => true, []);
  useSignalListener(listener);

  const apiTokensClient = useApiTokensClient();
  const oidcClient = useOidcClient();

  const isRenewing = apiTokensClient.isRenewing() || oidcClient.isRenewing();
  if (isRenewing) {
    return (
      <>
        <LoadingSpinner small />
        <span>Renewing data...</span>
      </>
    );
  }

  return (
    <div>
      <p>This are your api tokens:</p>
      <pre>{JSON.stringify(tokens, null, 2)}</pre>
    </div>
  );
};

const NotifyIfErrorOccurs = () => {
  const [history, setHistory] = useState<Signal[]>([]);
  const listener = useCallback(
    (signal) => {
      setHistory((current) => {
        return [{ ...signal }, ...current];
      });
    },
    [setHistory],
  );
  useSignalTrackingWithCallback(createErrorTriggerProps(), listener);

  return (
    <ListContainer>
      <h2>List of errors</h2>
      <ChangeList list={history} />
    </ListContainer>
  );
};

const ProfileData = () => {
  const [, { data, error, loading }] = useGraphQL();
  const module = useGraphQLModule();
  const clientErrors = module.getClientErrors();
  const profile = data && data.myProfile;
  const hasCriticalError = !profile && (!!error || clientErrors.length > 0);
  if (loading) {
    return (
      <div>
        <LoadingSpinner small loadingText="Loading profile" loadingFinishedText="Profile loaded" />
        Loading...
      </div>
    );
  }
  return (
    <div>
      <h2>Profile</h2>
      {!!clientErrors.length && (
        <Notification type={hasCriticalError ? 'error' : 'alert'}>
          {clientErrors.map((err) => {
            if (error && error.message === err.message) {
              return null;
            }
            if (hasCriticalError) {
              return <p key={err.message}>An error occured: {err.message}</p>;
            }
            return <p key={err.message}>An ignorable error was returned with results: {err.message}</p>;
          })}{' '}
        </Notification>
      )}
      <pre>{profile ? JSON.stringify(profile, null, 2) : 'No profile'}</pre>
      <div className="buttons">
        <Button
          onClick={() => {
            module.queryServer().catch(() => {});
          }}
          key="reload"
        >
          Reload from server
        </Button>
        <Button
          onClick={() => {
            module.clear();
          }}
          key="clear"
        >
          Clear all data
        </Button>
      </div>
    </div>
  );
};

const TrackAllSignals = () => {
  const tracker = useConnectedModule<ReturnType<typeof createSignalTracker>>('signalTracker');
  // if a listener returns true, component using useSignalListener is re-rendered
  // this component should render on each change
  const listener = useCallback(() => true, []);
  useSignalListener(listener);
  if (!tracker) {
    return null;
  }

  return (
    <ListContainer>
      <h2>Event log</h2>
      <ChangeList list={tracker.getHistory()} />
    </ListContainer>
  );
};

const DynamicUserData = () => {
  const apiTokensClient = useApiTokensClient();
  const oidcClient = useOidcClient();
  const listener = useCallback(() => true, []);
  useSignalListener(listener);

  const isRenewing = apiTokensClient.isRenewing() || oidcClient.isRenewing();
  if (isRenewing) {
    return (
      <>
        <LoadingSpinner small />
        <span>Renewing data...</span>
      </>
    );
  }

  const user = oidcClient.getUser() as User;
  if (!user) {
    return null;
  }
  const expiresAt = new Date();
  expiresAt.setTime(user.expires_at ? user.expires_at * 1000 : Date.now());
  const timezoneOffset = expiresAt.getTimezoneOffset();
  return (
    <div>
      <p>
        Your tokens will expire{' '}
        {new Intl.DateTimeFormat('en-FI', { dateStyle: 'full', timeStyle: 'long', timeZone: 'GMT' }).format(expiresAt)}
        {timezoneOffset !== 0 ? `+ ${timezoneOffset / -60} hour(s)` : ''}
      </p>
      <UserProfileOutput user={user} />
    </div>
  );
};

const AuthorizedContent = ({ user }: { user: User }) => {
  return (
    <Tabs>
      <Tabs.TabList className="example-tablist">
        <Tabs.Tab>User data</Tabs.Tab>
        <Tabs.Tab>Api tokens</Tabs.Tab>
        <Tabs.Tab>Log</Tabs.Tab>
        <Tabs.Tab>Show errors</Tabs.Tab>
        <Tabs.Tab>Profile data</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanel>
        <UserData user={user} />
        <DynamicUserData />
      </Tabs.TabPanel>
      <Tabs.TabPanel>
        <ApiTokenOutput />
      </Tabs.TabPanel>
      <Tabs.TabPanel>
        <TrackAllSignals />
      </Tabs.TabPanel>
      <Tabs.TabPanel>
        <NotifyIfErrorOccurs />
      </Tabs.TabPanel>
      <Tabs.TabPanel>
        <ProfileData />
      </Tabs.TabPanel>
    </Tabs>
  );
};

export const ExampleApplication = (args: StoryArgs) => {
  // The following lines are not needed when only one oidc server is used.
  // HDS uses both Tunnistamo and Helsinki Profile (Keycloak) and uses Storybook args to define which is used.
  const isUsingKeycloak = shouldUseKeycloakServer(args);
  const loginProps = isUsingKeycloak ? loginProviderPropsForKeycloak : loginProviderProps;

  const AuthenticatedContent = ({ user }: { user: User }) => {
    return (
      <Wrapper>
        <Nav />
        <SessionEndedHandler
          content={{
            title: 'Session has ended!',
            text: 'Your session on the server has ended. You will be logged out in this window too.',
            buttonText: 'Logout',
            closeButtonLabelText: 'Logout',
          }}
        />
        <ContentAligner>
          <AuthorizedContent user={user} />
          <div className="buttons">
            <LogoutButton />
            <RenewUserButton />
            <RenewApiTokensButton />
            <StartSessionPollingButton />
            <SimulateSessionEndButton />
          </div>
        </ContentAligner>
      </Wrapper>
    );
  };
  const LoginComponent = () => {
    return (
      <Wrapper>
        <Nav />
        <ContentAligner>
          <h1>Welcome to the login demo application!</h1>
          <p>
            Click button below, or in the navigation, to start the login process with{' '}
            <strong>{isUsingKeycloak ? 'Helsinki Profile' : 'Tunnistamo'}</strong>.
          </p>
          <LoginButton errorText="Login failed. Try again!" loggingInText="Logging in">
            Log in{' '}
          </LoginButton>
        </ContentAligner>
      </Wrapper>
    );
  };

  return (
    <LoginProvider {...loginProps} modules={[signalTracker, profileGraphQL]}>
      <IFrameWarning />
      <WithAuthentication AuthorisedComponent={AuthenticatedContent} UnauthorisedComponent={LoginComponent} />
    </LoginProvider>
  );
};

ExampleApplication.argTypes = {
  useKeycloak: useKeycloakArgs,
};

export const Callback = (args: StoryArgs) => {
  // The following lines are not needed when only one oidc server is used.
  // HDS uses Tunnistamo and Tunnistus (Keycloak) and uses url params to define which is used.
  const isUsingKeycloak = shouldUseKeycloakServer(args);
  const loginProps = isUsingKeycloak ? loginProviderPropsForKeycloak : loginProviderProps;

  const [userOrError, setUserOrError] = useState<User | OidcClientError | undefined>(undefined);
  const path = getIFramePath();
  const onSuccess = (user: User) => {
    const target = window.top || window.self;

    target.location.href = `${path}?path=/story/components-login--example-application&args=useKeycloak:${String(
      isUsingKeycloak,
    )}`;
    setUserOrError(user);
  };
  const onError = (error?: OidcClientError) => {
    setUserOrError(error);
  };

  if (userOrError instanceof Error) {
    return (
      <div>
        <p>Login failed!</p>
        <p>...or perhaps you just landed on this page. This page handles the result of the login process.</p>
        <p>
          Currently selected OIDC server is <strong>{isUsingKeycloak ? 'Helsinki Profile' : 'Tunnistamo'}</strong>. This
          can be changed in Addons (press &quot;A&quot;) or by selecting the server below.
        </p>
        <p>
          <a href={`${getIFramePath()}?path=/story/components-login--example-application&args=useKeycloak:false`}>
            Go to the demo application and login with Tunnistamo
          </a>
        </p>
        <p>
          <a href={`${getIFramePath()}?path=/story/components-login--example-application&args=useKeycloak:true`}>
            Go to the demo application and login with Helsinki Profile
          </a>
        </p>
      </div>
    );
  }
  if (userOrError) {
    return <div>Redirecting...</div>;
  }

  return (
    <LoginProvider {...loginProps}>
      <LoginCallbackHandler onSuccess={onSuccess} onError={onError}>
        <div>Logging in...</div>
      </LoginCallbackHandler>
    </LoginProvider>
  );
};

Callback.argTypes = {
  useKeycloak: useKeycloakArgs,
};
