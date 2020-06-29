import React, { useState } from 'react';

import Navigation from './Navigation';
import { NavigationRowDisplay } from './Navigation.interface';
// import IconUser from '../../icons/ui/IconUser';

export default {
  component: Navigation,
  title: 'Components/Navigation',
  parameters: {
    layout: 'fullscreen',
  },
};

const languageOptions = [
  { label: 'Suomeksi (FI)', value: 'fi' },
  { label: 'På svenska (SV)', value: 'sv' },
  { label: 'In English (EN)', value: 'en' },
  { label: 'En français (FR)', value: 'fr' },
  { label: 'Deutsche (DE)', value: 'de' },
  { label: 'Pусский (RU)', value: 'ru' },
];

export const ASDF = () => {
  return <Navigation.Row />;
};

export const Example = () => {
  const [authenticated, setAuthenticated] = useState(true);
  const [authenticatedBlack, setAuthenticatedBlack] = useState(true);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [active, setActive] = useState(false);

  // const themes = ['white', 'black'];
  // const row = ['fullWidth', 'inline'] as NavigationRowDisplay[];
  const themes = ['white'];
  // const themes = ['black'];
  const row = ['fullWidth'] as NavigationRowDisplay[];
  // const row = ['inline'] as NavigationRowDisplay[];

  return themes.map((theme) => {
    const isBlackTheme = theme === 'black';
    const title = isBlackTheme ? 'Helsingfors Systembolaget' : 'Helsinki Design Systeemi';
    const logoLanguage = isBlackTheme ? 'sv' : 'fi';

    return row.map((display) => (
      <Navigation
        key={`nav-${theme}-${display}`}
        logoLanguage={logoLanguage}
        menuCloseAriaLabel="Close menu"
        menuOpenAriaLabel="Open menu"
        theme={theme}
        // title={title}
        title={<a href="https://google.com">{title}</a>}
        skipTo="#content"
        skipToContentText="Skip to content"
      >
        <Navigation.Row display={display}>
          <Navigation.Item active href="https://google.com" target="_blank">
            Link
          </Navigation.Item>
          <Navigation.Item active={active} as="button" type="button" onClick={() => setActive(!active)}>
            Button
          </Navigation.Item>
          {/* <Navigation.Dropdown icon={<IconUser />} label="Dropdown"> */}
          <Navigation.Dropdown label="Dropdown">
            <Navigation.Item href="https://google.com" target="_blank">
              Link
            </Navigation.Item>
            <Navigation.Item as="button" type="button" onClick={() => console.log('button click')}>
              Button
            </Navigation.Item>
          </Navigation.Dropdown>
        </Navigation.Row>
        <Navigation.Actions>
          <Navigation.Search />
          <Navigation.User
            authenticated={isBlackTheme ? authenticatedBlack : authenticated}
            onSignIn={() => (isBlackTheme ? setAuthenticatedBlack(true) : setAuthenticated(true))}
          >
            <Navigation.Item href="https://google.com" target="_blank" variant="secondary">
              Your profile
            </Navigation.Item>
            <Navigation.Item
              as="button"
              type="button"
              onClick={() => {
                console.log('Sign out');
                isBlackTheme ? setAuthenticatedBlack(false) : setAuthenticated(false);
              }}
              variant="supplementary"
            >
              Sign out
            </Navigation.Item>
          </Navigation.User>
          <Navigation.LanguageSelector
            options={languageOptions}
            formatSelectedValue={(item) => item.value}
            // todo: rename?
            onLanguageChange={setLanguage}
            value={language}
          />
        </Navigation.Actions>
      </Navigation>
    ));
  });
};

export const LinkedEvents = () => {
  const [authenticated, setAuthenticated] = useState(true);

  return (
    <Navigation
      title="Linked events"
      menuCloseAriaLabel="Close menu"
      menuOpenAriaLabel="Open menu"
      skipTo="#asd"
      skipToContentText="Skip to main content"
    >
      <Navigation.Row>
        <Navigation.Item active href="https://google.com" target="_blank">
          Tapahtumien hallinta
        </Navigation.Item>
        <Navigation.Item as="button" type="button" onClick={() => console.log('button click')}>
          Etsi tapahtumia
        </Navigation.Item>
        <Navigation.Item href="https://google.com" target="_blank">
          Lisätietoja
        </Navigation.Item>
      </Navigation.Row>
      <Navigation.Actions>
        <Navigation.User authenticated={authenticated} onSignIn={() => setAuthenticated(true)}>
          <Navigation.Item href="https://google.com" target="_blank">
            Your profile
          </Navigation.Item>
          <Navigation.Item
            as="button"
            type="button"
            onClick={() => {
              console.log('Sign out');
              setAuthenticated(false);
            }}
          >
            Sign out
          </Navigation.Item>
        </Navigation.User>
        <Navigation.LanguageSelector
          options={languageOptions}
          formatSelectedValue={(item) => item.value}
          value={languageOptions[0]}
        />
      </Navigation.Actions>
    </Navigation>
  );
};
