import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';

import { LanguageSelectorProps } from '.';
import { Header } from './Header';
import { HeaderUniversalBar } from './components/headerUniversalBar/HeaderUniversalBar';
import { HeaderActionBar } from './components/headerActionBar/HeaderActionBar';
import { HeaderLink } from './components/headerLink/HeaderLink';
import { HeaderNavigationMenu } from './components/headerNavigationMenu';
import { LanguageOption } from './LanguageContext';
import { IconSearch, IconUser } from '../../icons';
import { Link } from '../link/Link';
import { Logo, logoFi, logoFiDark, logoSv, logoSvDark } from '../logo';

export default {
  component: Header,
  title: 'Components/Header',
  subcomponents: {
    HeaderUniversalBar,
    HeaderNavigationMenu,
    HeaderActionBar,
    HeaderLink,
  },
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
  },
  args: {
    theme: 'light',
  },
};

const languageChangedAction = () => {
  action('language:onChange');
};

const logoSrcFromLanguageAndTheme = (lang: string, theme: string) => {
  switch (lang) {
    case 'sv':
      if (theme === 'light' || theme === 'custom') {
        return logoSv;
      }
      return logoSvDark;
    default:
      if (theme === 'light' || theme === 'custom') {
        return logoFi;
      }
      return logoFiDark;
  }
};

const searchSubmitAction = action('search:onSubmit');
const searchChangeAction = action('search:onChange');

const languages: LanguageOption[] = [
  { label: 'Suomi', value: 'fi', isPrimary: true },
  { label: 'Svenska', value: 'sv', isPrimary: true },
  { label: 'English', value: 'en', isPrimary: true },
  { label: 'Español', value: 'es' },
];

export const WithFullFeatures = (args) => (
  <>
    <Header {...args} onDidChangeLanguage={languageChangedAction} languages={languages}>
      <Header.SkipLink skipTo="#content" label="Skip To Content" />
      <Header.UniversalBar primaryLinkText="Helsingin kaupunki" primaryLinkHref="#">
        <Header.Link href="#" label="Uutiset" />
        <Header.Link href="#" label="Asioi verkossa" />
        <Header.Link href="#" label="Anna palautetta" />
      </Header.UniversalBar>

      <Header.ActionBar
        title="Helsingin kaupunki"
        titleAriaLabel="Helsingin kaupunki"
        titleHref="https://hel.fi"
        logo={<Logo src={logoFi} alt="Helsingin kaupunki" />}
        logoAriaLabel="Service logo"
        logoHref="https://hel.fi"
        menuButtonAriaLabel="Menu"
      >
        <Header.LanguageSelector ariaLabel="Kielen valinta">
          <h3>Muut kielet</h3>
          <Link href="www.example.com" size="S" lang="de">
            Deutsch
          </Link>
          <Link href="www.example.com" size="S" lang="es">
            Español
          </Link>
          <Link href="www.example.com" size="S" lang="fr">
            Français
          </Link>
          <Link href="www.example.com" size="S" lang="ru">
            Pусский
          </Link>
          <h3>Tietoa muilla kielillä</h3>
          <Link external href="www.example.com" size="S" lang="fi">
            Selkosuomi
          </Link>
          <Link external href="www.example.com" size="S" lang="fi">
            Viittomakieli
          </Link>
          <h3>Matkailijoille</h3>
          <Link external href="www.example.com" size="S" lang="fi">
            MyHelsinki.fi
          </Link>
          <h3>Maahanmuuttajille</h3>
          <Link external href="www.example.com" size="S" lang="fi">
            InfoFinland.fi
          </Link>
        </Header.LanguageSelector>

        <Header.ActionBarItem label="Haku" icon={<IconSearch />} id="action-bar-search">
          <Header.Search label="Hae palvelusta" onChange={searchChangeAction} onSubmit={searchSubmitAction} />
        </Header.ActionBarItem>
      </Header.ActionBar>

      <Header.NavigationMenu>
        <Header.Link
          href="#"
          label="Sosiaali- ja terveyspalvelut"
          onClick={(event) => event.preventDefault()}
          active
          dropdownLinks={[
            <Header.Link
              href="#"
              label="Terveydenhoito"
              active
              dropdownLinks={[
                <Header.Link href="#" label="Hammashoito" />,
                <Header.Link href="#" label="Julkinen terveydenhoito" />,
              ]}
            />,
            <Header.Link
              href="#"
              label="Senioripalvelut"
              dropdownLinks={[
                <Header.Link href="#" label="Viriketoiminta" />,
                <Header.Link href="#" label="Kuntouttavat palvelut" />,
              ]}
            />,
          ]}
        />
        <Header.Link
          href="#"
          label="Kasvatus ja koulutus"
          dropdownLinks={[
            <Header.Link
              href="#"
              label="Kasvatus"
              active
              dropdownLinks={[
                <Header.Link href="#" label="Varhaiskasvatus" />,
                <Header.Link href="#" label="Esiopetus" />,
              ]}
            />,
            <Header.Link
              href="#"
              label="Koulutus"
              dropdownLinks={[
                <Header.Link href="#" label="Perusopetus" />,
                <Header.Link href="#" label="Toisen asteen koulutus" />,
                <Header.Link href="#" label="Työväenopistot" />,
              ]}
            />,
          ]}
        />
        <Header.Link
          href="#"
          label="Yritykset ja työ"
          dropdownLinks={[
            <Header.Link
              href="#"
              label="Työnantajat"
              active
              dropdownLinks={[<Header.Link href="#" label="Yritykset" />, <Header.Link href="#" label="Yrittäjät" />]}
            />,
            <Header.Link
              href="#"
              label="Työntekijät"
              dropdownLinks={[<Header.Link href="#" label="Avoimet työpaikat" />]}
            />,
          ]}
        />
      </Header.NavigationMenu>
    </Header>
    <div id="content" />
  </>
);

export const WithFullFeaturesDarkTheme = (args) => (
  <>
    <Header {...args} onDidChangeLanguage={languageChangedAction} languages={languages}>
      <Header.SkipLink skipTo="#content" label="Skip To Content" />
      <Header.UniversalBar primaryLinkText="Helsingin kaupunki" primaryLinkHref="#">
        <Header.Link href="#" label="Uutiset" />
        <Header.Link href="#" label="Asioi verkossa" />
        <Header.Link href="#" label="Anna palautetta" />
      </Header.UniversalBar>

      <Header.ActionBar
        title="Helsingin kaupunki"
        titleAriaLabel="Helsingin kaupunki"
        titleHref="https://hel.fi"
        logoAriaLabel="Service logo"
        logoHref="https://hel.fi"
        logo={<Logo src={logoFiDark} alt="Helsingin kaupunki" />}
        menuButtonAriaLabel="Menu"
      >
        <Header.LanguageSelector ariaLabel="Kielen valinta">
          <h3>Muut kielet</h3>
          <Link href="www.example.com" size="S" lang="de">
            Deutsch
          </Link>
          <Link href="www.example.com" size="S" lang="es">
            Español
          </Link>
          <Link href="www.example.com" size="S" lang="fr">
            Français
          </Link>
          <Link href="www.example.com" size="S" lang="ru">
            Pусский
          </Link>
          <h3>Tietoa muilla kielillä</h3>
          <Link external href="www.example.com" size="S" lang="fi">
            Selkosuomi
          </Link>
          <Link external href="www.example.com" size="S" lang="fi">
            Viittomakieli
          </Link>
          <h3>Matkailijoille</h3>
          <Link external href="www.example.com" size="S" lang="fi">
            MyHelsinki.fi
          </Link>
          <h3>Maahanmuuttajille</h3>
          <Link external href="www.example.com" size="S" lang="fi">
            InfoFinland.fi
          </Link>
        </Header.LanguageSelector>

        <Header.ActionBarItem label="Haku" icon={<IconSearch />} id="action-bar-search">
          <Header.Search label="Hae palvelusta" onChange={searchChangeAction} onSubmit={searchSubmitAction} />
        </Header.ActionBarItem>
      </Header.ActionBar>

      <Header.NavigationMenu>
        <Header.Link
          href="#"
          label="Sosiaali- ja terveyspalvelut"
          onClick={(event) => event.preventDefault()}
          active
          dropdownLinks={[
            <Header.Link
              href="#"
              label="Terveydenhoito"
              active
              dropdownLinks={[
                <Header.Link href="#" label="Hammashoito" />,
                <Header.Link href="#" label="Julkinen terveydenhoito" />,
              ]}
            />,
            <Header.Link
              href="#"
              label="Senioripalvelut"
              dropdownLinks={[
                <Header.Link href="#" label="Viriketoiminta" />,
                <Header.Link href="#" label="Kuntouttavat palvelut" />,
              ]}
            />,
          ]}
        />
        <Header.Link
          href="#"
          label="Kasvatus ja koulutus"
          dropdownLinks={[
            <Header.Link
              href="#"
              label="Kasvatus"
              active
              dropdownLinks={[
                <Header.Link href="#" label="Varhaiskasvatus" />,
                <Header.Link href="#" label="Esiopetus" />,
              ]}
            />,
            <Header.Link
              href="#"
              label="Koulutus"
              dropdownLinks={[
                <Header.Link href="#" label="Perusopetus" />,
                <Header.Link href="#" label="Toisen asteen koulutus" />,
                <Header.Link href="#" label="Työväenopistot" />,
              ]}
            />,
          ]}
        />
        <Header.Link
          href="#"
          label="Yritykset ja työ"
          dropdownLinks={[
            <Header.Link
              href="#"
              label="Työnantajat"
              active
              dropdownLinks={[<Header.Link href="#" label="Yritykset" />, <Header.Link href="#" label="Yrittäjät" />]}
            />,
            <Header.Link
              href="#"
              label="Työntekijät"
              dropdownLinks={[<Header.Link href="#" label="Avoimet työpaikat" />]}
            />,
          ]}
        />
      </Header.NavigationMenu>
    </Header>
    <div id="content" />
  </>
);

WithFullFeaturesDarkTheme.args = {
  theme: 'dark',
};

export const Minimal = (args) => {
  return (
    <>
      <Header {...args} onDidChangeLanguage={languageChangedAction} languages={languages}>
        <Header.SkipLink skipTo="#content" label="Skip To Content" />
        <Header.ActionBar
          title="Helsingin kaupunki"
          titleAriaLabel="Helsingin kaupunki"
          titleHref="https://hel.fi"
          logo={<Logo src={logoSrcFromLanguageAndTheme('fi', args.theme)} alt="Helsingin kaupunki" />}
        >
          <Header.LanguageSelector>
            <h3>Tietoa muilla kielillä</h3>
            <Link external href="www.example.com" size="S" lang="fi">
              Selkosuomi
            </Link>
            <Link external href="www.example.com" size="S" lang="fi">
              Viittomakieli
            </Link>
          </Header.LanguageSelector>

          <Header.ActionBarItem label="Haku" icon={<IconSearch />} id="action-bar-search">
            <Header.Search onChange={searchChangeAction} onSubmit={searchSubmitAction} label="Haku" />
          </Header.ActionBarItem>
          <Header.ActionBarItem label="Kirjaudu" fixedRightPosition icon={<IconUser />} id="action-bar-login">
            <h3>Kirjautumisvalinnat</h3>
          </Header.ActionBarItem>
        </Header.ActionBar>

        <Header.NavigationMenu>
          <Header.Link href="#" label="Sosiaali- ja terveyspalvelut" />
          <Header.Link href="#" label="Kasvatus ja koulutus" />
          <Header.Link href="#" label="Asuminen" />
        </Header.NavigationMenu>
      </Header>
      <div id="content" />
    </>
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
    es: {
      'header-title': 'Helsingin kaupunki ES',
      'header-aria-label': 'Helsingin kaupunki  ES',
      'header-login': 'Kirjaudu  ES',
      'header-search': 'Haku  ES',
      'header-menu-title': 'Tietoa muilla kielillä  ES',
    },
  };

  const languageChangedStateAction = (language: string) => {
    setLang(language);
  };

  return (
    <>
      <Header {...args} onDidChangeLanguage={languageChangedStateAction} languages={languages}>
        <Header.SkipLink skipTo="#content" label="Skip To Content" />
        <Header.ActionBar
          title={translations[lang]['header-title']}
          titleAriaLabel={translations[lang]['header-aria-label']}
          titleHref="https://hel.fi"
          logo={<Logo src={logoSrcFromLanguageAndTheme(lang, args.theme)} alt={translations[lang]['header-title']} />}
        >
          <Header.LanguageSelector languageHeading="Muut kielet" ariaLabel="Valitse kieli">
            <h3>{translations[lang]['header-menu-title']}</h3>
            <Link external href="www.example.com" size="S" lang="fi">
              Selkosuomi
            </Link>
            <Link external href="www.example.com" size="S" lang="fi">
              Viittomakieli
            </Link>
          </Header.LanguageSelector>

          <Header.ActionBarItem
            fullWidth
            label={translations[lang]['header-search']}
            icon={<IconSearch />}
            id="action-bar-search"
          >
            <Header.Search
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
          <Header.Link href="#" label="Sosiaali- ja terveyspalvelut" />
          <Header.Link href="#" label="Kasvatus ja koulutus" />
          <Header.Link href="#" label="Asuminen" />
        </Header.NavigationMenu>
      </Header>
      <div id="content" />
    </>
  );
};

export const ManualLanguageSorting = (args) => {
  const [lang, setLang] = useState<string>('fi');

  // Force Finnish language to be always visible
  const sortLanguageOptions: LanguageSelectorProps['sortLanguageOptions'] = (options, activeLanguage) => {
    const finnishOption = options.find((option) => option.value === 'fi') as LanguageOption;
    const selectedOption = options.find((option) => option.value === activeLanguage) as LanguageOption;
    const primaryLanguages = [selectedOption];
    if (finnishOption.value !== selectedOption.value) {
      primaryLanguages.push(finnishOption);
    }
    const secondaryLanguages = options.filter((option) => {
      return option.value !== finnishOption.value && option.value !== selectedOption.value;
    });
    return [primaryLanguages, secondaryLanguages];
  };

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
    es: {
      'header-title': 'Helsingin kaupunki ES',
      'header-aria-label': 'Helsingin kaupunki  ES',
      'header-login': 'Kirjaudu  ES',
      'header-search': 'Haku  ES',
      'header-menu-title': 'Tietoa muilla kielillä  ES',
    },
  };

  const languageChangedStateAction = (language: string) => setLang(language);
  const onlyPrimaryLanguages = languages.filter((option) => option.isPrimary);
  return (
    <Header {...args} onDidChangeLanguage={languageChangedStateAction} languages={onlyPrimaryLanguages}>
      <Header.SkipLink skipTo="#content" label="Skip To Content" />
      <Header.ActionBar
        title={translations[lang]['header-title']}
        titleAriaLabel={translations[lang]['header-aria-label']}
        titleHref="https://hel.fi"
        logo={<Logo src={logoSrcFromLanguageAndTheme('fi', args.theme)} alt="Helsingin kaupunki" />}
      >
        <Header.LanguageSelector sortLanguageOptions={sortLanguageOptions} />

        <Header.ActionBarItem
          fullWidth
          label={translations[lang]['header-search']}
          icon={<IconSearch />}
          id="action-bar-search"
        >
          <Header.Search
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
        <Header.Link href="#" label="Sosiaali- ja terveyspalvelut" />
        <Header.Link href="#" label="Kasvatus ja koulutus" />
        <Header.Link href="#" label="Asuminen" />
      </Header.NavigationMenu>
    </Header>
  );
};

export const ManualLanguageOptions = (args) => {
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
    es: {
      'header-title': 'Helsingin kaupunki ES',
      'header-aria-label': 'Helsingin kaupunki  ES',
      'header-login': 'Kirjaudu  ES',
      'header-search': 'Haku  ES',
      'header-menu-title': 'Tietoa muilla kielillä  ES',
    },
  };

  const languageChangedStateAction = (language: string) => setLang(language);
  return (
    <Header {...args} onDidChangeLanguage={languageChangedStateAction} languages={languages}>
      <Header.SkipLink skipTo="#content" label="Skip To Content" />
      <Header.ActionBar
        title={translations[lang]['header-title']}
        titleAriaLabel={translations[lang]['header-aria-label']}
        titleHref="https://hel.fi"
        logo={<Logo src={logoSrcFromLanguageAndTheme('fi', args.theme)} alt="Helsingin kaupunki" />}
      >
        <Header.LanguageButton {...languages[0]} />
        <Header.LanguageButton {...languages[1]} />
      </Header.ActionBar>

      <Header.NavigationMenu>
        <Header.Link href="#" label="Sosiaali- ja terveyspalvelut" />
        <Header.Link href="#" label="Kasvatus ja koulutus" />
        <Header.Link href="#" label="Asuminen" />
      </Header.NavigationMenu>
    </Header>
  );
};

export const WithFullFeaturesCustomTheme = (args) => (
  <>
    <Header {...args} onDidChangeLanguage={languageChangedAction} languages={languages}>
      <Header.SkipLink skipTo="#content" label="Skip To Content" />
      <Header.UniversalBar primaryLinkText="Helsingin kaupunki" primaryLinkHref="#">
        <Header.Link href="#" label="Uutiset" />
        <Header.Link href="#" label="Asioi verkossa" />
        <Header.Link href="#" label="Anna palautetta" />
      </Header.UniversalBar>

      <Header.ActionBar
        title="Helsingin kaupunki"
        titleAriaLabel="Helsingin kaupunki"
        titleHref="https://hel.fi"
        logoAriaLabel="Service logo"
        logoHref="https://hel.fi"
        logo={<Logo src={logoSrcFromLanguageAndTheme('fi', 'custom')} alt="Helsingin kaupunki" />}
        menuButtonAriaLabel="Menu"
      >
        <Header.LanguageSelector ariaLabel="Kielen valinta">
          <h3>Tietoa muilla kielillä</h3>
          <Link external href="www.example.com" size="S" lang="fi">
            Selkosuomi
          </Link>
          <Link external href="www.example.com" size="S" lang="fi">
            Viittomakieli
          </Link>
          <h3>Matkailijoille</h3>
          <Link external href="www.example.com" size="S" lang="fi">
            MyHelsinki.fi
          </Link>
          <h3>Maahanmuuttajille</h3>
          <Link external href="www.example.com" size="S" lang="fi">
            InfoFinland.fi
          </Link>
        </Header.LanguageSelector>

        <Header.ActionBarItem label="Haku" icon={<IconSearch />} id="action-bar-search">
          <Header.Search label="Hae palvelusta" onChange={searchChangeAction} onSubmit={searchSubmitAction} />
        </Header.ActionBarItem>
      </Header.ActionBar>

      <Header.NavigationMenu>
        <Header.Link
          href="#"
          label="Sosiaali- ja terveyspalvelut"
          onClick={(event) => event.preventDefault()}
          active
          dropdownLinks={[
            <Header.Link
              href="#"
              label="Terveydenhoito"
              active
              dropdownLinks={[
                <Header.Link href="#" label="Hammashoito" />,
                <Header.Link href="#" label="Julkinen terveydenhoito" />,
              ]}
            />,
            <Header.Link
              href="#"
              label="Senioripalvelut"
              dropdownLinks={[
                <Header.Link href="#" label="Viriketoiminta" />,
                <Header.Link href="#" label="Kuntouttavat palvelut" />,
              ]}
            />,
          ]}
        />
        <Header.Link
          href="#"
          label="Kasvatus ja koulutus"
          dropdownLinks={[
            <Header.Link
              href="#"
              label="Kasvatus"
              active
              dropdownLinks={[
                <Header.Link href="#" label="Varhaiskasvatus" />,
                <Header.Link href="#" label="Esiopetus" />,
              ]}
            />,
            <Header.Link
              href="#"
              label="Koulutus"
              dropdownLinks={[
                <Header.Link href="#" label="Perusopetus" />,
                <Header.Link href="#" label="Toisen asteen koulutus" />,
                <Header.Link href="#" label="Työväenopistot" />,
              ]}
            />,
          ]}
        />
        <Header.Link
          href="#"
          label="Yritykset ja työ"
          dropdownLinks={[
            <Header.Link
              href="#"
              label="Työnantajat"
              active
              dropdownLinks={[<Header.Link href="#" label="Yritykset" />, <Header.Link href="#" label="Yrittäjät" />]}
            />,
            <Header.Link
              href="#"
              label="Työntekijät"
              dropdownLinks={[<Header.Link href="#" label="Avoimet työpaikat" />]}
            />,
          ]}
        />
      </Header.NavigationMenu>
    </Header>
    <div id="content" />
  </>
);

WithFullFeaturesCustomTheme.args = {
  theme: {
    '--color-focus-outline': 'var(--color-metro-dark)',
    '--header-color': 'var(--color-black)',
    '--header-focus-outline-color': 'var(--color-metro-dark)',
    '--actionbar-background-color': 'var(--color-engel)',
    '--nav-background-color': 'var(--color-engel-light)',
    '--nav-border-color': 'var(--color-black)',
    '--nav-link-hover-color': 'var(--color-black)',
    '--universal-bar-background-color': 'var(--color-black-20)',
    '--nav-link-dropdown-background-color': 'var(--color-engel-light)',
    '--nav-button-background-color': 'var(--color-black-20)',
    '--nav-button-hover-background-color': 'var(--color-black-40)',
    '--nav-drop-down-icon-color': 'var(--color-black)',
    '--header-background-color': 'transparent',
  },
};
