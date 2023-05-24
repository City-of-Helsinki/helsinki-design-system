import React, { useEffect, useRef, useState, useCallback } from 'react';

import {
  User,
  LoginContextProvider,
  useOidcClient,
  useSignalListener,
  useConnectedModule,
  useSignalTrackingWithReturnValue,
  useSignalTrackingWithCallback,
  useAuthenticatedUser,
  Profile,
} from './index';
import { Button } from '../button/Button';
import { Accordion } from '../accordion/Accordion';
import { Navigation } from '../navigation/Navigation';
import { Notification } from '../notification/Notification';
import { OidcClientProps } from './client/index';
import { LoginCallbackHandler } from './LoginCallbackHandler';
import { WithAuthentication } from './WithAuthentication';
import { OidcClientError } from './client/oidcClientError';
import createSessionPoller from './sessionPoller/sessionPoller';
import createApiTokenClient from './apiTokensClient/apiTokensClient';
import { useApiTokens, useApiTokensClient } from './apiTokensClient/hooks';
import {
  EventPayload,
  createTriggerForAllSignals,
  isErrorSignal,
  isEventSignal,
  isInitSignal,
  createErrorTrigger,
  StateChangeSignalPayload,
} from './beacon/signals';
import { Beacon, ConnectedModule, Signal, SignalListener } from './beacon/beacon';
import { isStateChangeSignal } from './client/signals';
import { createSessionEndedSignalTrigger } from './sessionPoller/signals';
import { IconSignout } from '../../icons';
import { Tabs } from '../tabs/Tabs';
import { useSessionPoller } from './sessionPoller/hooks';

export default {
  component: LoginContextProvider,
  title: 'Components/Login',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

const loginProps: OidcClientProps = {
  userManagerSettings: {
    authority: 'https://tunnistamo.dev.hel.ninja/',
    client_id: 'exampleapp-ui-dev',
    scope: 'openid profile email https://api.hel.fi/auth/helsinkiprofiledev https://api.hel.fi/auth/exampleappdev',
    redirect_uri: `${window.origin}/callback/`,
  },
};

function createSignalTracker(): ConnectedModule & {
  getHistory: () => Signal[];
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
      beacon.addListener(createTriggerForAllSignals(), listener);
    },
    getHistory: () => {
      return history;
    },
  };
}

const sessionPoller = createSessionPoller({ pollIntervalInMs: 10000 });
const apiTokensClient = createApiTokenClient({ url: 'https://tunnistamo.dev.hel.ninja/api-tokens/' });
const signalTracker = createSignalTracker();

const Wrapper = (props: React.PropsWithChildren<unknown>) => {
  return (
    <>
      <style>
        {`
          .wrapper{
            max-width: 100%;
            overflow: hidden;
            padding:20px;
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

const IFrameWarning = () => {
  const openWindowInTop = () => {
    if (window.top) {
      window.top.location.href = `/iframe.html${window.location.search}`;
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
  const user = useAuthenticatedUser();
  const { login, logout } = useOidcClient();
  const authenticated = !!user;
  const userName = user && user.profile.given_name;
  const label = authenticated ? 'Log out' : 'Log in';
  const onClick = () => {
    if (authenticated) {
      logout();
    } else {
      login();
    }
  };
  return (
    // @ts-ignore
    <Navigation>
      <Navigation.Actions>
        <Navigation.User authenticated={authenticated} label={label} userName={userName} onSignIn={onClick}>
          <Navigation.Item
            label={label}
            href="#"
            icon={<IconSignout aria-hidden />}
            variant="supplementary"
            onClick={onClick}
          />
        </Navigation.User>
      </Navigation.Actions>
    </Navigation>
  );
};

const LoginButton = () => {
  const oidcClient = useOidcClient();
  const onButtonClick = () => {
    oidcClient.login();
  };
  return <Button onClick={onButtonClick}>Log in</Button>;
};

const LogoutButton = () => {
  const oidcClient = useOidcClient();
  const onButtonClick = () => {
    oidcClient.logout();
  };
  return <Button onClick={onButtonClick}>Log out</Button>;
};

const LoginComponent = () => {
  return (
    <div>
      <Nav />
      <h1>Welcome to the login demo application!</h1>
      <p>Click button below, or in the navigation, to start the login process</p>
      <LoginButton />
    </div>
  );
};

const RenewUserButton = () => {
  const oidcClient = useOidcClient();
  const onButtonClick = () => {
    oidcClient.renewUser();
  };
  return <Button onClick={onButtonClick}>Renew user tokens</Button>;
};

const RenewApiTokensButton = () => {
  const apiTokens = useApiTokensClient();
  const oidcClient = useOidcClient();
  const onButtonClick = () => {
    const user = oidcClient.getUser();
    if (user) {
      apiTokens.fetch(user);
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

const UserData = ({ user }: { user: User }) => {
  const profile = user.profile as Profile;
  const expiresAt = new Date();
  expiresAt.setTime(user.expires_at ? user.expires_at * 1000 : Date.now());
  const timezoneOffset = expiresAt.getTimezoneOffset();
  return (
    <div>
      <p>Hi, {profile.given_name}!</p>
      <p>Your fullname is {profile.name}.</p>
      <p>
        Your email, {profile.email} is {profile.email_verified ? '' : 'not'} verified.
      </p>
      <p>Your level of assurance is &quot;{profile.loa}&quot;.</p>
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
    return <p>Nothing to react yet...</p>;
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

const RenderCounter = () => {
  const countRef = useRef(1);
  useEffect(() => {
    countRef.current += 1;
  });
  return <div>Component render count is {countRef.current}</div>;
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
  return (
    <div>
      <p>This is your api tokens object:</p>
      <pre>{JSON.stringify(tokens, null, 2)}</pre>
    </div>
  );
};

const NotifyIfSessionEnds = () => {
  const [endSignal] = useSignalTrackingWithReturnValue(createSessionEndedSignalTrigger());
  const oidcClient = useOidcClient();
  if (!endSignal) {
    return null;
  }

  return (
    <ListContainer>
      <h2>Session has ended!</h2>
      <p>Your session ended on the server!</p>
      <p>You will be logged out!</p>
      <Button onClick={() => oidcClient.logout()}>Clear session here</Button>
    </ListContainer>
  );
};

const NotifyIfErrorOccurs = () => {
  const [history, setHistory] = useState<Signal[]>([]);
  const listener = useCallback(
    (signal) => {
      setHistory((current) => {
        return [signal, ...current];
      });
    },
    [setHistory],
  );
  useSignalTrackingWithCallback(createErrorTrigger(), listener);

  return (
    <ListContainer>
      <h2>List of errors</h2>
      <ChangeList list={history} />
      {history.length === 0 && <p>No errors</p>}
    </ListContainer>
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
      <RenderCounter />
    </ListContainer>
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
      </Tabs.TabList>
      <Tabs.TabPanel>
        <UserData user={user} />
        <Accordion heading="Show full user info">
          <UserProfileOutput user={user} />
        </Accordion>
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
    </Tabs>
  );
};

const AuthenticatedContent = ({ user }: { user: User }) => {
  return (
    <Wrapper>
      <Nav />
      <NotifyIfSessionEnds />
      <AuthorizedContent user={user} />
      <div className="buttons">
        <LogoutButton />
        <RenewUserButton />
        <RenewApiTokensButton />
        <StartSessionPollingButton />
      </div>
    </Wrapper>
  );
};

export const ExampleApplication = () => {
  return (
    <LoginContextProvider loginProps={loginProps} modules={[sessionPoller, apiTokensClient, signalTracker]}>
      <IFrameWarning />
      <WithAuthentication AuthorisedComponent={AuthenticatedContent} UnauthorisedComponent={LoginComponent} />
    </LoginContextProvider>
  );
};

export const Callback = () => {
  const [userOrError, setUserOrError] = useState<User | OidcClientError | undefined>(undefined);
  const onSuccess = (user: User) => {
    const target = window.top || window.self;
    target.location.href = `/iframe.html?path=/story/components-login--example-application`;
    setUserOrError(user);
  };
  const onError = (error?: OidcClientError) => {
    setUserOrError(error);
  };

  if (userOrError instanceof Error) {
    return (
      <div>
        <LoginContextProvider loginProps={loginProps}>
          <p>Login failed!</p>
          <p>...or perhaps you just landed on this page. This page handles the result of the login process.</p>
          <a href="/iframe.html?path=/story/components-login--example-application">Go to the demo application</a>
        </LoginContextProvider>
      </div>
    );
  }

  return (
    <LoginContextProvider loginProps={loginProps}>
      <LoginCallbackHandler onSuccess={onSuccess} onError={onError}>
        <div>Logging in...</div>
      </LoginCallbackHandler>
    </LoginContextProvider>
  );
};
