import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';

import { Header } from './Header';
import { HeaderUniversalBar } from './components/headerUniversalBar/HeaderUniversalBar';
import { HeaderActionBar } from './components/headerActionBar/HeaderActionBar';
import { NavigationLink } from './components/navigationLink/NavigationLink';
import { HeaderNavigationMenu } from './components/headerNavigationMenu';
import { LanguageOption } from './LanguageContext';
import { IconSearch, IconUser } from '../../icons';
import { Link } from '../link/Link';

export default {
  component: Header,
  title: 'Components/Header',
  subcomponents: {
    HeaderUniversalBar,
    HeaderNavigationMenu,
    HeaderActionBar,
    NavigationLink,
  },
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
  },
  args: {},
};

const languageChangedAction = action('language:onChange');
const searchSubmitAction = action('search:onSubmit');
const searchChangeAction = action('search:onChange');

const languages: LanguageOption[] = [
  { label: 'Suomi', value: 'fi' },
  { label: 'Svenska', value: 'sv' },
  { label: 'English', value: 'en' },
];

export const WithFullFeatures = (args) => (
  <>
    <Header {...args} onDidChangeLanguage={languageChangedAction}>
      <Header.UniversalBar primaryLinkText="Helsingin kaupunki" primaryLinkHref="#">
        <Header.NavigationLink href="#" label="Link 1" />
        <Header.NavigationLink href="#" label="Link 2" />
        <Header.NavigationLink href="#" label="Link 3" />
      </Header.UniversalBar>

      <Header.ActionBar
        title="Helsingin kaupunki"
        titleAriaLabel="Helsingin kaupunki"
        titleUrl="https://hel.fi"
        logoAriaLabel="Service logo"
        logoUrl="https://hel.fi"
        menuButtonAriaLabel="Menu"
      >
        <Header.NavigationLanguageSelector languages={languages} ariaLabel="Kielen valinta">
          <h3>Tietoa muilla kielillä</h3>
          <Link external href="www.example.com">
            Selkosuomi
          </Link>
          <Link external href="www.example.com">
            Viittomakieli
          </Link>
        </Header.NavigationLanguageSelector>

        <Header.ActionBarItem fullWidth label="Haku" icon={<IconSearch />} id="action-bar-search">
          <Header.NavigationSearch label="Hae palvelusta" onChange={searchChangeAction} onSubmit={searchSubmitAction} />
        </Header.ActionBarItem>
      </Header.ActionBar>

      <Header.NavigationMenu>
        <Header.NavigationLink
          href="#"
          label="Link 1"
          onClick={(event) => event.preventDefault()}
          active
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Test"
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
        <Header.NavigationLink
          href="#"
          label="Link 2"
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Test"
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
        <Header.NavigationLink href="#" label="Link 3" />
        <Header.NavigationLink href="#" label="Link 4" />
        <Header.NavigationLink href="#" label="Link 5" />
        <Header.NavigationLink href="#" label="Link 6" />
        <Header.NavigationLink href="#" label="Link 7" />
        <Header.NavigationLink
          href="#"
          label="Link 8"
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Test"
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
      </Header.NavigationMenu>
    </Header>
  </>
);

export const WithFullFeaturesDarkTheme = (args) => (
  <>
    <Header {...args} onDidChangeLanguage={languageChangedAction}>
      <Header.SkipLink skipTo="#content" label="Skip To Content" />
      <Header.UniversalBar primaryLinkText="Helsingin kaupunki" primaryLinkHref="#">
        <Header.NavigationLink href="#" label="Link 1" />
        <Header.NavigationLink href="#" label="Link 2" />
        <Header.NavigationLink href="#" label="Link 3" />
      </Header.UniversalBar>

      <Header.ActionBar
        title="Helsingin kaupunki"
        titleAriaLabel="Helsingin kaupunki"
        titleUrl="https://hel.fi"
        logoAriaLabel="Service logo"
        logoUrl="https://hel.fi"
        menuButtonAriaLabel="Menu"
      >
        <Header.NavigationLanguageSelector languages={languages}>
          <h3>Tietoa muilla kielillä</h3>
          <Link external href="www.example.com">
            Selkosuomi
          </Link>
          <Link external href="www.example.com">
            Viittomakieli
          </Link>
        </Header.NavigationLanguageSelector>

        <Header.ActionBarItem fullWidth label="Haku" icon={<IconSearch />} id="action-bar-search">
          <Header.NavigationSearch label="Hae palvelusta" onChange={searchChangeAction} onSubmit={searchSubmitAction} />
        </Header.ActionBarItem>
      </Header.ActionBar>

      <Header.NavigationMenu>
        <Header.NavigationLink
          href="#"
          label="Link 1"
          onClick={(event) => event.preventDefault()}
          active
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Test"
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
        <Header.NavigationLink
          href="#"
          label="Link 2"
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Test"
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
        <Header.NavigationLink href="#" label="Link 3" />
        <Header.NavigationLink href="#" label="Link 4" />
        <Header.NavigationLink href="#" label="Link 5" />
        <Header.NavigationLink href="#" label="Link 6" />
        <Header.NavigationLink href="#" label="Link 7" />
        <Header.NavigationLink
          href="#"
          label="Link 8"
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Test"
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
      </Header.NavigationMenu>
    </Header>
  </>
);

WithFullFeaturesDarkTheme.args = {
  theme: 'dark',
};

export const Minimal = (args) => {
  return (
    <Header {...args} onDidChangeLanguage={languageChangedAction}>
      <Header.ActionBar title="Helsingin kaupunki" titleAriaLabel="Helsingin kaupunki" titleUrl="https://hel.fi">
        <Header.NavigationLanguageSelector languages={languages}>
          <h3>Tietoa muilla kielillä</h3>
          <Link external href="www.example.com">
            Selkosuomi
          </Link>
          <Link external href="www.example.com">
            Viittomakieli
          </Link>
        </Header.NavigationLanguageSelector>

        <Header.ActionBarItem fullWidth label="Haku" icon={<IconSearch />} id="action-bar-search">
          <Header.NavigationSearch onChange={searchChangeAction} onSubmit={searchSubmitAction} label="Haku" />
        </Header.ActionBarItem>
        <Header.ActionBarItem label="Kirjaudu" fixedRightPosition icon={<IconUser />} id="action-bar-login">
          <h3>Kirjautumisvalinnat</h3>
        </Header.ActionBarItem>
      </Header.ActionBar>

      <Header.NavigationMenu>
        <Header.NavigationLink href="#" label="Link 1" />
        <Header.NavigationLink href="#" label="Link 2" />
        <Header.NavigationLink href="#" label="Link 3" />
      </Header.NavigationMenu>
    </Header>
  );
};

export const MinimalWithLocalization = (args) => {
  const [lang, setLang] = useState<string>('fi');

  const translations = {
    en: {
      'header-title': 'Helsinki city',
      'header-aria-label': 'Helsinki city',
      'header-login': 'Login',
      'header-search': 'Search',
      'header-menu-title': 'Other languages',
    },
    fi: {
      'header-title': 'Helsingin kaupunki',
      'header-aria-label': 'Helsingin kaupunki',
      'header-login': 'Kirjaudu',
      'header-search': 'Haku',
      'header-menu-title': 'Tietoa muilla kielillä',
    },
    sv: {
      'header-title': 'Helsingfors Stad',
      'header-aria-label': 'Helsingfors Stad',
      'header-login': 'Logga in',
      'header-search': 'Sök',
      'header-menu-title': 'Andra språk',
    },
  };

  const languageChangedAction2 = (lg: string) => setLang(lg);

  return (
    <Header {...args} onDidChangeLanguage={languageChangedAction2}>
      <Header.ActionBar
        title={translations[lang]['header-title']}
        titleAriaLabel={translations[lang]['header-aria-label']}
        titleUrl="https://hel.fi"
      >
        <Header.NavigationLanguageSelector languages={languages}>
          <h3>{translations[lang]['header-menu-title']}</h3>
          <Link external href="www.example.com">
            Selkosuomi
          </Link>
          <Link external href="www.example.com">
            Viittomakieli
          </Link>
        </Header.NavigationLanguageSelector>

        <Header.ActionBarItem
          fullWidth
          label={translations[lang]['header-search']}
          icon={<IconSearch />}
          id="action-bar-search"
        >
          <Header.NavigationSearch
            onChange={searchChangeAction}
            onSubmit={searchSubmitAction}
            label={translations[lang]['header-search']}
          />
        </Header.ActionBarItem>
        <Header.ActionBarItem
          label={translations[lang]['header-login']}
          fixedRightPosition
          icon={<IconUser />}
          id="action-bar-login"
        >
          <h3>Kirjautumisvalinnat</h3>
        </Header.ActionBarItem>
      </Header.ActionBar>

      <Header.NavigationMenu>
        <Header.NavigationLink href="#" label="Link 1" />
        <Header.NavigationLink href="#" label="Link 2" />
        <Header.NavigationLink href="#" label="Link 3" />
      </Header.NavigationMenu>
    </Header>
  );
};

export const WithSkipLink = (args) => {
  return (
    <Header {...args} onDidChangeLanguage={languageChangedAction}>
      <Header.SkipLink skipTo="#content" label="Skip To Content" />
      <Header.ActionBar title="Helsingin kaupunki" titleAriaLabel="Helsingin kaupunki" titleUrl="https://hel.fi">
        <Header.NavigationLanguageSelector languages={languages}>
          <h3>Tietoa muilla kielillä</h3>
          <Link external href="www.example.com">
            Selkosuomi
          </Link>
          <Link external href="www.example.com">
            Viittomakieli
          </Link>
        </Header.NavigationLanguageSelector>

        <Header.ActionBarItem label="Kirjaudu" fixedRightPosition icon={<IconUser />} id="action-bar-login">
          <h3>Kirjautumisvalinnat</h3>
        </Header.ActionBarItem>
      </Header.ActionBar>

      <Header.NavigationMenu>
        <Header.NavigationLink href="#" label="Link 1" />
        <Header.NavigationLink href="#" label="Link 2" />
        <Header.NavigationLink href="#" label="Link 3" />
      </Header.NavigationMenu>
    </Header>
  );
};

export const WithFullFeaturesCustomTheme = (args) => (
  <>
    <Header {...args} onDidChangeLanguage={languageChangedAction}>
      <Header.SkipLink skipTo="#content" label="Skip To Content" />
      <Header.UniversalBar primaryLinkText="Helsingin kaupunki" primaryLinkHref="#">
        <Header.NavigationLink href="#" label="Link 1" />
        <Header.NavigationLink href="#" label="Link 2" />
        <Header.NavigationLink href="#" label="Link 3" />
      </Header.UniversalBar>

      <Header.ActionBar
        title="Helsingin kaupunki"
        titleAriaLabel="Helsingin kaupunki"
        titleUrl="https://hel.fi"
        logoAriaLabel="Service logo"
        logoUrl="https://hel.fi"
        menuButtonAriaLabel="Menu"
      >
        <Header.NavigationLanguageSelector languages={languages}>
          <h3>Tietoa muilla kielillä</h3>
          <Link external href="www.example.com">
            Selkosuomi
          </Link>
          <Link external href="www.example.com">
            Viittomakieli
          </Link>
        </Header.NavigationLanguageSelector>

        <Header.ActionBarItem fullWidth label="Haku" icon={IconSearch} id="action-bar-search">
          <Header.NavigationSearch label="Hae palvelusta" onChange={searchChangeAction} onSubmit={searchSubmitAction} />
        </Header.ActionBarItem>
      </Header.ActionBar>

      <Header.NavigationMenu>
        <Header.NavigationLink
          href="#"
          label="Link 1"
          onClick={(event) => event.preventDefault()}
          active
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Test"
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
        <Header.NavigationLink
          href="#"
          label="Link 2"
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Test"
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
        <Header.NavigationLink href="#" label="Link 3" />
        <Header.NavigationLink href="#" label="Link 4" />
        <Header.NavigationLink href="#" label="Link 5" />
        <Header.NavigationLink href="#" label="Link 6" />
        <Header.NavigationLink href="#" label="Link 7" />
        <Header.NavigationLink
          href="#"
          label="Link 8"
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Test"
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
      </Header.NavigationMenu>
    </Header>
  </>
);

WithFullFeaturesCustomTheme.args = {
  theme: {
    '--color-focus-outline': 'var(--color-metro-dark)',
    '--header-color': '#000',
    '--actionbar-background-color': 'var(--color-engel)',
    '--navigation-background-color': '#fff',
    '--nav-border-color': '#000',
    '--nav-link-hover-color': '#000',
    '--universal-bar-background-color': 'var(--color-black-60)',
    '--navigation-link-button-background-color': 'var(--color-black-60)',
    '--nav-link-dropdown-background-color': '#fff',
    '--nav-button-background-color': 'var(--color-black-60)',
    '--nav-button-hover-background-color': 'var(--color-black-40)',
    '--nav-drop-down-icon-color': '#000',
    '--header-base-background-color': 'transparent',
  },
};
