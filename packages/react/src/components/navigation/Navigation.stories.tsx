import React, { useState } from 'react';
import { radios, withKnobs, boolean } from '@storybook/addon-knobs';

import Navigation from './Navigation';
// import IconUser from '../../icons/ui/IconUser';

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
  const display = radios('Display', { inline: 'inline', fullWidth: 'fullWidth' }, 'fullWidth');
  const fixed = boolean('Fixed', false);

  const [authenticated, setAuthenticated] = useState(true);
  const [language, setLanguage] = useState(languageOptions[0]);
  // const language = languageOptions[0];
  const [active, setActive] = useState(false);
  // const [menuOpen, setMenuOpen] = useState(false);

  const logoLanguage = language.value === 'sv' ? 'sv' : 'fi';
  const title = language.value === 'sv' ? 'Helsingfors Systembolaget' : 'Helsinki Design System';

  // formats the selected value
  const formatSelectedValue = ({ value }: LanguageOption): string => value.toUpperCase();

  // formats each option label
  const formatOptionLabel = ({ value, label }: LanguageOption): string => `${label} (${value.toUpperCase()})`;

  return (
    <>
      <Navigation
        fixed={fixed}
        logoLanguage={logoLanguage}
        menuCloseAriaLabel="Close menu"
        // menuOpen={menuOpen}
        menuOpenAriaLabel="Open menu"
        // onMenuToggle={() => setMenuOpen(!menuOpen)}
        // onTitleClick={() => console.log('title clicked')}
        theme={theme}
        title={title}
        titleUrl="https://google.com"
        skipTo="#content"
        skipToContentText="Skip to main content"
      >
        <Navigation.Row display={display}>
          <Navigation.Item active label="Link" href="https://google.com" target="_blank" />
          <Navigation.Item
            active={active}
            as="button"
            label="Button"
            type="button"
            onClick={() => {
              // setMenuOpen(false);
              setActive(!active);
            }}
          />
          {/* <Navigation.Dropdown icon={<IconUser />} label="Dropdown"> */}
          <Navigation.Dropdown label="Dropdown">
            <Navigation.Item label="Link" href="https://google.com" target="_blank" />
            <Navigation.Item as="button" type="button" onClick={() => console.log('button click')} label="Button" />
          </Navigation.Dropdown>
        </Navigation.Row>
        <Navigation.Actions>
          <Navigation.Search
            searchLabel="Search"
            searchPlaceholder="Search page"
            onBlur={(e) => console.log('NavigationSearch - onBlur', e)}
            onFocus={(e) => console.log('NavigationSearch - onFocus', e)}
            onSearchChange={(e) => console.log('NavigationSearch - onSearchChange', e)}
            onSearchEnter={(e) => console.log('NavigationSearch - onSearchEnter', e)}
          />
          <Navigation.User
            authenticated={authenticated}
            label="Sign in"
            onSignIn={() => {
              console.log('NavigationUser - onSignIn');
              setAuthenticated(true);
            }}
            userName="John Doe"
          >
            <Navigation.Item label="Your profile" target="_blank" variant="secondary" />
            <Navigation.Item
              as="button"
              type="button"
              onClick={() => {
                console.log('Sign out');
                setAuthenticated(false);
              }}
              variant="supplementary"
              label="Sign out"
            />
          </Navigation.User>
          <Navigation.LanguageSelector
            ariaLabel="Selected language"
            options={languageOptions}
            formatSelectedValue={formatSelectedValue}
            formatOptionLabel={formatOptionLabel}
            onLanguageChange={setLanguage}
            value={language}
          />
        </Navigation.Actions>
      </Navigation>
    </>
  );
};
