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
      <Header.SkipLink skipTo="#content" label="Skip To Content" />
      <Header.UniversalBar primaryLinkText="Helsingin kaupunki" primaryLinkHref="#">
        <Header.NavigationLink href="#" label="Uutiset" />
        <Header.NavigationLink href="#" label="Asioi verkossa" />
        <Header.NavigationLink href="#" label="Anna palautetta" />
      </Header.UniversalBar>

      <Header.ActionBar
        title="Helsingin kaupunki"
        titleAriaLabel="Helsingin kaupunki"
        titleHref="https://hel.fi"
        logoAriaLabel="Service logo"
        logoHref="https://hel.fi"
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
          label="Sosiaali- ja terveyspalvelut"
          onClick={(event) => event.preventDefault()}
          active
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Terveydenhoito"
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Hammashoito" />,
                <Header.NavigationLink href="#" label="Julkinen terveydenhoito" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Senioripalvelut"
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Viriketoiminta" />,
                <Header.NavigationLink href="#" label="Kuntouttavat palvelut" />,
              ]}
            />,
          ]}
        />
        <Header.NavigationLink
          href="#"
          label="Kasvatus ja koulutus"
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Kasvatus"
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Varhaiskasvatus" />,
                <Header.NavigationLink href="#" label="Esiopetus" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Koulutus"
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Perusopetus" />,
                <Header.NavigationLink href="#" label="Toisen asteen koulutus" />,
                <Header.NavigationLink href="#" label="Työväenopistot" />,
              ]}
            />,
          ]}
        />
        <Header.NavigationLink
          href="#"
          label="Yritykset ja työ"
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Työnantajat"
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Yritykset" />,
                <Header.NavigationLink href="#" label="Yrittäjät" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Työntekijät"
              dropdownLinks={[<Header.NavigationLink href="#" label="Avoimet työpaikat" />]}
            />,
          ]}
        />
      </Header.NavigationMenu>
    </Header>
  </>
);

export const Minimal = (args) => {
  return (
    <Header {...args} onDidChangeLanguage={languageChangedAction}>
      <Header.SkipLink skipTo="#content" label="Skip To Content" />
      <Header.ActionBar title="Helsingin kaupunki" titleAriaLabel="Helsingin kaupunki" titleHref="https://hel.fi">
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
        <Header.NavigationLink href="#" label="Sosiaali- ja terveyspalvelut" />
        <Header.NavigationLink href="#" label="Kasvatus ja koulutus" />
        <Header.NavigationLink href="#" label="Asuminen" />
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
      <Header.SkipLink skipTo="#content" label="Skip To Content" />
      <Header.ActionBar
        title={translations[lang]['header-title']}
        titleAriaLabel={translations[lang]['header-aria-label']}
        titleHref="https://hel.fi"
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
        <Header.NavigationLink href="#" label="Sosiaali- ja terveyspalvelut" />
        <Header.NavigationLink href="#" label="Kasvatus ja koulutus" />
        <Header.NavigationLink href="#" label="Asuminen" />
      </Header.NavigationMenu>
    </Header>
  );
};
