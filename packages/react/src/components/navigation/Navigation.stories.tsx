import React, { useState } from 'react';
import { radios, withKnobs, boolean } from '@storybook/addon-knobs';

import Navigation from './Navigation';

export default {
  component: Navigation,
  title: 'Components/Navigation',
  decorators: [withKnobs],
  parameters: {
    layout: 'fullscreen',
  },
};

type LanguageOption = { label: string; value: string };

const languageOptions: LanguageOption[] = [
  { label: 'Suomeksi', value: 'fi' },
  { label: 'På svenska', value: 'sv' },
  { label: 'In English', value: 'en' },
  { label: 'En français', value: 'fr' },
  { label: 'Auf deutsch', value: 'de' },
  { label: 'По-русски', value: 'ru' },
];

export const Example = () => {
  const theme = radios('Theme', { white: 'white', black: 'black' }, 'white');
  const display = radios('Display', { inline: 'inline', subNav: 'subNav' }, 'subNav');
  const fixed = boolean('Fixed', false);

  const [authenticated, setAuthenticated] = useState(false);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [active, setActive] = useState<'link' | 'button' | 'dropdown'>();
  // const [menuOpen, setMenuOpen] = useState(false);

  // show helsingfors logo if swedish is selected as the language
  const logoLanguage = language.value === 'sv' ? 'sv' : 'fi';

  const title = language.value === 'sv' ? 'Helsingfors Systembolaget' : 'Helsinki Design System';

  // formats the selected value
  const formatSelectedValue = ({ value }: LanguageOption): string => value.toUpperCase();

  // formats each option label
  const formatOptionLabel = ({ value, label }: LanguageOption): string => `${label} (${value.toUpperCase()})`;

  return (
    <Navigation
      fixed={fixed}
      logoLanguage={logoLanguage}
      menuCloseAriaLabel="Close menu"
      menuOpenAriaLabel="Open menu"
      // menuOpen={menuOpen}
      // onMenuToggle={() => setMenuOpen(!menuOpen)}
      theme={theme}
      title={title}
      titleUrl="https://google.com"
      skipTo="#content"
      skipToContentLabel="Skip to main content"
    >
      {/* NAVIGATION ROW */}
      <Navigation.Row display={display}>
        <Navigation.Item active={active === 'link'} label="Link" tabIndex={0} onClick={() => setActive('link')} />
        <Navigation.Item
          active={active === 'button'}
          as="button"
          label="Button"
          type="button"
          onClick={() => {
            // setMenuOpen(false);
            setActive('button');
          }}
        />
        <Navigation.Dropdown active={active === 'dropdown'} label="Dropdown">
          <Navigation.Item label="Link to hel.fi" href="https://hel.fi" target="_blank" />
          <Navigation.Item
            as="button"
            type="button"
            onClick={() => setActive('dropdown')}
            label="Make dropdown active"
          />
        </Navigation.Dropdown>
      </Navigation.Row>

      {/* NAVIGATION ACTIONS */}
      <Navigation.Actions>
        {/* SEARCH */}
        <Navigation.Search searchLabel="Search" searchPlaceholder="Search page" />

        {/* LANGUAGE SELECTOR */}
        <Navigation.LanguageSelector
          ariaLabel="Selected language"
          options={languageOptions}
          formatSelectedValue={formatSelectedValue}
          formatOptionLabel={formatOptionLabel}
          onLanguageChange={setLanguage}
          value={language}
        />

        {/* USER */}
        <Navigation.User
          authenticated={authenticated}
          label="Sign in"
          onSignIn={() => setAuthenticated(true)}
          userName="John Doe"
        >
          <Navigation.Item label="Your profile" href="https://hel.fi" target="_blank" variant="primary" />
          <Navigation.Item
            as="button"
            type="button"
            onClick={() => setAuthenticated(false)}
            variant="secondary"
            label="Sign out"
          >
            Sign out
          </Navigation.Item>
        </Navigation.User>
      </Navigation.Actions>
    </Navigation>
  );
};

export const Jassari = () => {
  const jassariLanguageOptions: LanguageOption[] = [
    { label: 'Suomeksi', value: 'fi' },
    { label: 'Svenska', value: 'sv' },
    { label: 'English', value: 'en' },
  ];
  const i18n = {
    title: {
      fi: 'Nuorisopalvelut',
      sv: 'Ungdomstjänster',
      en: 'Youth services',
    },
    login: {
      fi: 'Kirjaudu sisään',
      sv: 'Logga in',
      en: 'Log in',
    },
    logout: {
      fi: 'Kirjaudu ulos',
      sv: 'Logga ut',
      en: 'Log out',
    },
    skip: {
      fi: 'Siirry sivun pääsisältöön',
      sv: 'Gå till huvudinnehåll',
      en: 'Skip to main content',
    },
  };
  const [authenticated, setAuthenticated] = useState(false);
  const [language, setLanguage] = useState(languageOptions[0]);

  // show helsingfors logo if swedish is selected as the language
  const logoLanguage = language.value === 'sv' ? 'sv' : 'fi';
  // formats the selected value
  const formatSelectedValue = ({ value }: LanguageOption): string => value.toUpperCase();

  return (
    <Navigation
      logoLanguage={logoLanguage}
      menuCloseAriaLabel="Close menu"
      menuOpenAriaLabel="Open menu"
      title={i18n.title[language.value]}
      titleUrl="https://jassari.hel.fi/login"
      skipTo="#content"
      skipToContentLabel={i18n.skip[language.value]}
    >
      <Navigation.Actions>
        <Navigation.User
          authenticated={authenticated}
          label={i18n.login[language.value]}
          onSignIn={() => setAuthenticated(true)}
          userName="Paavo Pesusieni"
        >
          <Navigation.Item
            as="button"
            label={i18n.logout[language.value]}
            onClick={() => setAuthenticated(false)}
            type="button"
            variant="secondary"
          />
        </Navigation.User>

        <Navigation.LanguageSelector
          formatSelectedValue={formatSelectedValue}
          onLanguageChange={setLanguage}
          options={jassariLanguageOptions}
          value={language}
        />
      </Navigation.Actions>
    </Navigation>
  );
};

Jassari.story = {
  name: 'Jässäri',
};
