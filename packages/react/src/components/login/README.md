# Settings for hds-demo site

Tunnistamo and Keycloak require registered callback urls. For the demo site, it must be

https://city-of-helsinki.github.io/hds-demo/login/

### Paths in html files

Callback htmls in `/storybookStatic` folder must be changed:

- callback.html
- callback_kc.html
- logout.html

Change `${window.origin}/storybook/react/` to `${window.origin}/hds-demo/login/`

### Story settings

In `Login.stories.tsx` change settings to

```jsx
const loginProviderProps: LoginProviderProps = {
  userManagerSettings: {
    authority: 'https://tunnistamo.dev.hel.ninja/',
    client_id: 'exampleapp-ui-dev',
    scope: 'openid profile email https://api.hel.fi/auth/helsinkiprofiledev https://api.hel.fi/auth/exampleappdev',
    redirect_uri: `${window.origin}/hds-demo/login/static-login/callback.html`,
    silent_redirect_uri: `${window.origin}/hds-demo/login/static-login/silent_renew.html`,
    post_logout_redirect_uri: `${window.origin}/hds-demo/login/static-login/logout.html`,
  },
  apiTokensClientSettings: { url: 'https://tunnistamo.dev.hel.ninja/api-tokens/' },
  sessionPollerSettings: { pollIntervalInMs: 10000 },
};

const loginProviderPropsForKeycloak: LoginProviderProps = {
  userManagerSettings: {
    authority: 'https://tunnistus.dev.hel.ninja/auth/realms/helsinki-tunnistus',
    client_id: 'exampleapp-ui-dev',
    scope: 'openid profile',
    redirect_uri: `${window.origin}/hds-demo/login/static-login/callback_kc.html`,
    silent_redirect_uri: `${window.origin}/hds-demo/login/static-login/silent_renew.html`,
    post_logout_redirect_uri: `${window.origin}/hds-demo/login/static-login/logout.html`,
  },
  apiTokensClientSettings: {
    url: 'https://tunnistus.dev.hel.ninja/auth/realms/helsinki-tunnistus/protocol/openid-connect/token',
    queryProps: {
      grantType: 'urn:ietf:params:oauth:grant-type:uma-ticket',
      permission: '#access',
    },
    audiences: ['exampleapp-api-test', 'profile-api-test'],
  },
  sessionPollerSettings: { pollIntervalInMs: 10000 },
};

```

and in `createGraphQLModule()` settings

```jsx
const profileGraphQL = createGraphQLModule({
  query: MyProfileQuery,
  queryOptions: {
    // this is needed with Profile BE, because it returns an error in result.data with weak authentication
    errorPolicy: 'all',
  },
  graphQLClient: new ApolloClient({ uri: 'https://profile-api.dev.hel.ninja/graphql/', cache: new InMemoryCache() }),
  options: {
    apiTokenKey: 'https://api.hel.fi/auth/helsinkiprofiledev',
  },
});
```

# Settings for localhost

In `Login.stories.tsx` change settings to

```jsx
const loginProviderProps: LoginProviderProps = {
  userManagerSettings: {
    authority: 'https://tunnistamo.dev.hel.ninja/',
    client_id: 'exampleapp-ui-dev',
    scope: 'openid profile email https://api.hel.fi/auth/helsinkiprofiledev https://api.hel.fi/auth/exampleappdev',
    redirect_uri: `${window.origin}/static-login/callback.html`,
    silent_redirect_uri: `${window.origin}/static-login/silent_renew.html`,
    post_logout_redirect_uri: `${window.origin}/static-login/logout.html`,
  },
  apiTokensClientSettings: { url: 'https://tunnistamo.dev.hel.ninja/api-tokens/' },
  sessionPollerSettings: { pollIntervalInMs: 10000 },
};
```

`createGraphQLModule` settings are the same as for hds-demo site (above)
