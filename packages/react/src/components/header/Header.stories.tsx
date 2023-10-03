import React, { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';

import { LanguageSelectorProps } from '.';
import { Header } from './Header';
import { HeaderUniversalBar } from './components/headerUniversalBar/HeaderUniversalBar';
import { HeaderActionBar } from './components/headerActionBar/HeaderActionBar';
import { HeaderLink } from './components/headerLink/HeaderLink';
import { HeaderNavigationMenu } from './components/headerNavigationMenu';
import { HeaderTheme } from './Header.type';
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
    docs: {
      source: {
        // any non-empty string here will skip jsx rendering, see:
        // https://github.com/storybookjs/storybook/blob/next/code/renderers/react/src/docs/jsxDecorator.tsx#L165
        code: 'hello world',
      },
    },
  },
  args: {
    theme: 'light',
  },
  argTypes: {
    theme: {
      options: ['light', 'dark'],
    },
  },
};

const logoSrcFromLanguageAndTheme = (lang: string, theme: HeaderTheme) => {
  switch (lang) {
    case 'sv':
      if (theme === 'light' || typeof theme === 'object') {
        return logoSv;
      }
      return logoSvDark;
    default:
      if (theme === 'light' || typeof theme === 'object') {
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
  { label: 'Français', value: 'fr' },
];

const translations = {
  en: {
    adultEducationCentres: 'Adult education centres',
    ariaLanguageSelection: 'Choose language',
    ariaLogo: 'Service logo',
    ariaMenuButton: 'Menu',
    basicEducation: 'Basic education',
    business: 'Business',
    businessAndWork: 'Business and work',
    childHoodAndEducation: 'Childhood and education',
    clearFinnish: 'Clear finnish',
    close: 'Close',
    dentalCare: 'Dental care',
    earlyChildhoodEducation: 'Early childhood education',
    education: 'Education',
    employers: 'Employers',
    entrepreneurs: 'Entrepreneurs',
    feedback: 'Give feedback',
    forImmigrants: 'For immigrants',
    forTravellers: 'For travellers',
    frontPage: 'Frontpage',
    generalUpperSecondaryEducation: 'General upper secondary education',
    headerAriaLabel: 'City of Helsinki',
    headerLogin: 'Login',
    headerMenuTitle: 'Other languages',
    headerSearch: 'Search',
    headerTitle: 'City of Helsinki',
    healtcare: 'Healt care',
    healthAndndSocialServices: 'Health and social services',
    infoOtherLanguages: 'Information in other languages',
    jobSeekers: 'Jobseekers',
    loginOptions: 'Login options',
    news: 'News',
    online: 'Online',
    openJobs: 'Open jobs',
    otherLanguages: 'Other languages',
    prePrimaryEducation: 'Pre-primary education',
    search: 'Search in the website',
    seniorServices: 'Senior services',
    signLanguage: 'Sign language',
    skipToContent: 'Skip to content',
  },
  fi: {
    adultEducationCentres: 'Työväenopistot',
    ariaLanguageSelection: 'Kielen valinta',
    ariaLogo: 'Palvelun logo',
    ariaMenuButton: 'Valikko',
    basicEducation: 'Perusopetus',
    business: 'Yritykset',
    businessAndWork: 'Yritykset ja työ',
    childHoodAndEducation: 'Kasvatus ja koulutus',
    clearFinnish: 'Selkosuomi',
    close: 'Sulje',
    dentalCare: 'Hammashoito',
    earlyChildhoodEducation: 'Varhaiskasvatus',
    education: 'Koulutus',
    employers: 'Työnantajat',
    entrepreneurs: 'Yrittäjät',
    feedback: 'Anna palautetta',
    forImmigrants: 'Maahanmuuttajille',
    forTravellers: 'Matkailijoille',
    frontPage: 'Etusivu',
    generalUpperSecondaryEducation: 'Lukiokoulutus',
    headerAriaLabel: 'Helsingin kaupunki',
    headerLogin: 'Kirjaudu',
    headerMenuTitle: 'Tietoa muilla kielillä',
    headerSearch: 'Haku',
    headerTitle: 'Helsingin kaupunki',
    healtcare: 'Terveydenhoito',
    healthAndndSocialServices: 'Sosiaali- ja terveyspalvelut',
    infoOtherLanguages: 'Tietoa muilla kielillä',
    jobSeekers: 'Työnhakijat',
    loginOptions: 'Kirjautumisvalinnat',
    news: 'Uutiset',
    online: 'Asioi verkossa',
    openJobs: 'Avoimet työpaikat',
    otherLanguages: 'Muut kielet',
    prePrimaryEducation: 'Esiopetus',
    search: 'Hae sivustolta',
    seniorServices: 'Senioripalvelut',
    signLanguage: 'Viittomakieli',
    skipToContent: 'Hyppää sisältöön',
  },
  sv: {
    adultEducationCentres: 'Arbetarinstituten',
    ariaLanguageSelection: 'Välja spräk',
    ariaLogo: 'Service logo',
    ariaMenuButton: 'Menu',
    basicEducation: 'Grundläggande utbildning',
    business: 'Företag',
    businessAndWork: 'Företag och arbete',
    childHoodAndEducation: 'Fostran och utbildning',
    clearFinnish: 'Klara finska',
    close: 'Stäng',
    dentalCare: 'Tandvård',
    earlyChildhoodEducation: 'Småbarnspedagogik',
    education: 'Utbildning',
    employers: 'Arbetsgivare',
    entrepreneurs: 'Företagare',
    feedback: 'Ge feedback',
    forImmigrants: 'För migranter',
    forTravellers: 'För turister',
    frontPage: 'Hemsida',
    generalUpperSecondaryEducation: 'Gymnasieutbildning',
    headerAriaLabel: 'Helsingfors Stad',
    headerLogin: 'Logga in',
    headerMenuTitle: 'Andra språk',
    headerSearch: 'Sök',
    headerTitle: 'Helsingfors Stad',
    healtcare: 'Hälsovärd',
    healthAndndSocialServices: 'Social- och hälsovårdstjänster',
    infoOtherLanguages: 'information på andra språk',
    jobSeekers: 'Arbetssökande',
    loginOptions: 'Logga in optioner',
    news: 'Nyheter',
    online: 'Göra affärer online',
    openJobs: 'Lediga jobb',
    otherLanguages: 'Andra språk',
    prePrimaryEducation: 'Förskoleundervisning',
    search: 'Sök på sidor',
    seniorServices: 'Seniortjänster',
    signLanguage: 'Teckenpsråk',
    skipToContent: 'Hoppa till innehåll',
  },
  fr: {
    adultEducationCentres: "Centre d'éducation des adultes",
    ariaLanguageSelection: 'Changez de langue',
    ariaLogo: 'Logo de service',
    ariaMenuButton: 'Menu',
    basicEducation: 'École élémentaire',
    business: 'Enteprises',
    businessAndWork: 'Entreprises et travail',
    childHoodAndEducation: 'Éducation',
    clearFinnish: 'Finnois simple',
    close: 'Fermer',
    dentalCare: 'Soins dentaires',
    earlyChildhoodEducation: "L'éducation de la petite enfance",
    education: 'Éducation',
    employers: 'Employeurs',
    entrepreneurs: 'Entrepreneur',
    feedback: 'Remarques',
    forImmigrants: 'Pour les immigrants',
    forTravellers: 'Pour les touristes',
    frontPage: "Page d'accueil",
    generalUpperSecondaryEducation: 'Lycèe',
    headerAriaLabel: 'Ville de Helsinki',
    headerLogin: 'Se connecter',
    headerMenuTitle: 'Autres langues',
    headerSearch: 'Reserche',
    headerTitle: 'Ville de Helsinki',
    healtcare: 'Soins de santé',
    healthAndndSocialServices: 'Services sociaux et de santé',
    infoOtherLanguages: 'Information en autres langues',
    jobSeekers: "Demandeurs d'emploi",
    loginOptions: 'Choix pour se connecter',
    news: 'Actualités',
    online: 'e-Démarches',
    openJobs: 'Emplois ouverts',
    otherLanguages: 'Autres langages',
    prePrimaryEducation: 'École maternelle',
    search: 'Reserchez sur la site',
    seniorServices: 'Service aux personnes âgées',
    signLanguage: 'Langue des signes',
    skipToContent: 'Passer au contenu',
  },
};

export const WithFullFeatures = (args) => {
  const [href, setHref] = useState('');
  const [lang, setLang] = useState<string>('fi');

  const languageChangedStateAction = (language: string) => {
    setLang(language);
  };

  const [trans, setTrans] = useState(translations.fi);

  useEffect(() => {
    setTrans(translations[lang]);
  }, [lang]);

  return (
    <>
      <Header {...args} onDidChangeLanguage={languageChangedStateAction} languages={languages}>
        <Header.SkipLink skipTo="#content" label={trans.skipToContent} />
        <Header.UniversalBar primaryLinkText={trans.headerTitle} primaryLinkHref="#">
          <Header.Link href="#uutiset" label={trans.news} />
          <Header.Link href="#asioi_verkossa" label={trans.online} />
          <Header.Link href="#anna_palautetta" label={trans.feedback} />
        </Header.UniversalBar>

        <Header.ActionBar
          title={trans.headerTitle}
          frontPageLabel={trans.frontPage}
          titleAriaLabel={trans.headerTitle}
          titleHref="https://hel.fi"
          logo={<Logo src={logoSrcFromLanguageAndTheme(lang, args.theme)} alt={trans.headerTitle} />}
          logoAriaLabel={trans.ariaLogo}
          logoHref="https://hel.fi"
          menuButtonAriaLabel={trans.ariaMenuButton}
          openFrontPageLinksAriaLabel="Avaa Etusivun linkkivalikko"
        >
          <Header.LanguageSelector ariaLabel={trans.ariaLanguageSelection} languageHeading={trans.otherLanguages}>
            <h3>{trans.infoOtherLanguages}</h3>
            <Link external href="www.example.com" size="S" lang="fi">
              {trans.clearFinnish}
            </Link>
            <Link external href="www.example.com" size="S" lang="fse">
              {trans.signLanguage}
            </Link>
            <h3>{trans.forTravellers}</h3>
            <Link external href="www.example.com" size="S" lang="fi">
              MyHelsinki.fi
            </Link>
            <h3>{trans.forImmigrants}</h3>
            <Link external href="www.example.com" size="S" lang="fi">
              InfoFinland.fi
            </Link>
          </Header.LanguageSelector>

          <Header.ActionBarItem
            label={trans.headerSearch}
            icon={<IconSearch />}
            id="action-bar-search"
            closeLabel={trans.close}
          >
            <Header.Search label={trans.search} onChange={searchChangeAction} onSubmit={searchSubmitAction} />
          </Header.ActionBarItem>
          <Header.ActionBarItem
            label={translations[lang].headerLogin}
            fixedRightPosition
            icon={<IconUser />}
            id="action-bar-login"
            closeLabel={trans.close}
          >
            <h3>{trans.loginOptions}</h3>
          </Header.ActionBarItem>
        </Header.ActionBar>

        <Header.NavigationMenu>
          <Header.Link
            label={trans.healthAndndSocialServices}
            onClick={(event) => {
              event.preventDefault();
              setHref('#sosiaali-_ja_terveyspalvelut');
            }}
            active={href.includes('#sosiaali-_ja_terveyspalvelut')}
            dropdownLinks={[
              <Header.Link
                onClick={(event) => {
                  event.preventDefault();
                  setHref('#sosiaali-_ja_terveyspalvelut#terveydenhoito');
                }}
                label={trans.healtcare}
                active={href.includes('#terveydenhoito')}
                dropdownLinks={[
                  <Header.Link
                    active={href.includes('#hammashoito')}
                    onClick={(event) => {
                      event.preventDefault();
                      setHref('#sosiaali-_ja_terveyspalvelut#terveydenhoito#hammashoito');
                    }}
                    label={trans.dentalCare}
                  />,
                ]}
              />,
              <Header.Link
                active={href.includes('#senioripalvelut')}
                onClick={(event) => {
                  event.preventDefault();
                  setHref('#sosiaali-_ja_terveyspalvelut#senioripalvelut');
                }}
                label={trans.seniorServices}
              />,
            ]}
          />
          <Header.Link
            active={href.includes('#kasvatus_ja_koulutus')}
            onClick={(event) => {
              event.preventDefault();
              setHref('#kasvatus_ja_koulutus');
            }}
            label={trans.childHoodAndEducation}
            dropdownLinks={[
              <Header.Link
                active={href.includes('#varhaiskasvatus')}
                onClick={(event) => {
                  event.preventDefault();
                  setHref('#kasvatus_ja_koulutus#varhaiskasvatus');
                }}
                label={trans.earlyChildhoodEducation}
              />,
              <Header.Link
                active={href.includes('#esiopetus')}
                onClick={(event) => {
                  event.preventDefault();
                  setHref('#kasvatus_ja_koulutus#esiopetus');
                }}
                label={trans.prePrimaryEducation}
              />,
              <Header.Link
                active={href.includes('#koulutus')}
                onClick={(event) => {
                  event.preventDefault();
                  setHref('#kasvatus_ja_koulutus#koulutus');
                }}
                label={trans.education}
                dropdownLinks={[
                  <Header.Link
                    active={href.includes('#perusopetus')}
                    onClick={(event) => {
                      event.preventDefault();
                      setHref('#kasvatus_ja_koulutus#koulutus#perusopetus');
                    }}
                    label={trans.basicEducation}
                  />,
                  <Header.Link
                    label={trans.generalUpperSecondaryEducation}
                    active={href.includes('#lukiokoulutus')}
                    onClick={(event) => {
                      event.preventDefault();
                      setHref('#kasvatus_ja_koulutus#koulutus#lukiokoulutus');
                    }}
                  />,
                  <Header.Link
                    label={trans.adultEducationCentres}
                    active={href.includes('#tyovaenopistot')}
                    onClick={(event) => {
                      event.preventDefault();
                      setHref('#kasvatus_ja_koulutus#koulutus#tyovaenopistot');
                    }}
                  />,
                ]}
              />,
            ]}
          />
          <Header.Link
            active={href.includes('#yritykset_ja_tyo')}
            onClick={(event) => {
              event.preventDefault();
              setHref('#yritykset_ja_tyo');
            }}
            label={trans.businessAndWork}
            dropdownLinks={[
              <Header.Link
                label={trans.employers}
                active={href.includes('#tyonantajat')}
                onClick={(event) => {
                  event.preventDefault();
                  setHref('#yritykset_ja_tyo#tyonantajat');
                }}
                dropdownLinks={[
                  <Header.Link
                    label={trans.business}
                    active={href.includes('#yritykset_ja_tyo#tyonantajat#yritykset')}
                    onClick={(event) => {
                      event.preventDefault();
                      setHref('#yritykset_ja_tyo#tyonantajat#yritykset');
                    }}
                  />,
                  <Header.Link
                    label={trans.entrepreneurs}
                    active={href.includes('#yrittajat')}
                    onClick={(event) => {
                      event.preventDefault();
                      setHref('#yritykset_ja_tyo#tyonantajat#yrittajat');
                    }}
                  />,
                ]}
              />,
              <Header.Link
                active={href.includes('#yritykset_ja_tyo#tyonhakijat')}
                onClick={(event) => {
                  event.preventDefault();
                  setHref('#yritykset_ja_tyo#tyonhakijat');
                }}
                label={trans.jobSeekers}
                dropdownLinks={[
                  <Header.Link
                    label={trans.openJobs}
                    active={href.includes('#yritykset_ja_tyo#tyonhakijat#avoimet_tyopaikat')}
                    onClick={(event) => {
                      event.preventDefault();
                      setHref('#yritykset_ja_tyo#tyonhakijat#avoimet_tyopaikat');
                    }}
                  />,
                ]}
              />,
            ]}
          />
        </Header.NavigationMenu>
      </Header>
      <div id="content" />
    </>
  );
};

export const Minimal = (args) => {
  const lang = 'fi';
  const trans = translations[lang];

  return (
    <>
      <Header {...args}>
        <Header.SkipLink skipTo="#content" label={trans.skipToContent} />
        <Header.ActionBar
          frontPageLabel={trans.frontPage}
          title={translations[lang].headerTitle}
          titleAriaLabel={translations[lang].headerAriaLabel}
          titleHref="https://hel.fi"
          logo={<Logo src={logoSrcFromLanguageAndTheme(lang, args.theme)} alt={translations[lang].headerTitle} />}
          logoAriaLabel={trans.ariaLogo}
        />
      </Header>
      <div id="content" />
    </>
  );
};

export const MinimalWithCustomLogo = (args) => {
  const lang = 'fi';
  const trans = translations[lang];

  return (
    <>
      <Header {...args}>
        <Header.SkipLink skipTo="#content" label={trans.skipToContent} />
        <Header.ActionBar
          frontPageLabel={trans.frontPage}
          title={translations[lang].headerTitle}
          titleAriaLabel={translations[lang].headerAriaLabel}
          titleHref="https://hel.fi"
          logo={
            <Logo
              src="https://www.turku.fi/sites/default/files/styles/site_logo/public/sites/all/themes/custom/driveturku/images/sprites/logo.png"
              alt={translations[lang].headerTitle}
            />
          }
          logoAriaLabel={trans.ariaLogo}
        />
      </Header>
      <div id="content" />
    </>
  );
};

export const ManualLanguageSorting = (args) => {
  const [href, setHref] = useState('');
  const [lang, setLang] = useState<string>('fi');

  const languageChangedStateAction = (language: string) => {
    setLang(language);
  };

  const [trans, setTrans] = useState(translations.fi);

  useEffect(() => {
    setTrans(translations[lang]);
  }, [lang]);

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

  const onlyPrimaryLanguages = languages.filter((option) => option.isPrimary);
  return (
    <Header {...args} onDidChangeLanguage={languageChangedStateAction} languages={onlyPrimaryLanguages}>
      <Header.SkipLink skipTo="#content" label={trans.skipToContent} />
      <Header.ActionBar
        frontPageLabel={trans.frontPage}
        title={trans.headerTitle}
        titleAriaLabel={trans.headerTitle}
        titleHref="https://hel.fi"
        logo={<Logo src={logoSrcFromLanguageAndTheme(lang, args.theme)} alt={trans.headerTitle} />}
      >
        <Header.LanguageSelector
          sortLanguageOptions={sortLanguageOptions}
          ariaLabel={trans.ariaLanguageSelection}
          languageHeading={trans.otherLanguages}
        />

        <Header.ActionBarItem
          fullWidth
          label={trans.headerSearch}
          icon={<IconSearch />}
          id="action-bar-search"
          closeLabel={trans.close}
        >
          <Header.Search onChange={searchChangeAction} onSubmit={searchSubmitAction} label={trans.search} />
        </Header.ActionBarItem>
        <Header.ActionBarItem
          label={translations[lang].headerLogin}
          fixedRightPosition
          icon={<IconUser />}
          id="action-bar-login"
          closeLabel={trans.close}
        >
          <h3>{trans.loginOptions}</h3>
        </Header.ActionBarItem>
      </Header.ActionBar>

      <Header.NavigationMenu>
        <Header.Link
          label={trans.healthAndndSocialServices}
          onClick={(event) => {
            event.preventDefault();
            setHref('#sosiaali-_ja_terveyspalvelut');
          }}
          active={href.includes('#sosiaali-_ja_terveyspalvelut')}
        />
        <Header.Link
          active={href.includes('#kasvatus_ja_koulutus')}
          onClick={(event) => {
            event.preventDefault();
            setHref('#kasvatus_ja_koulutus');
          }}
          label={trans.childHoodAndEducation}
        />
      </Header.NavigationMenu>
    </Header>
  );
};

export const ManualLanguageOptions = (args) => {
  const [href, setHref] = useState('');
  const [lang, setLang] = useState<string>('fi');

  const languageChangedStateAction = (language: string) => {
    setLang(language);
  };

  const [trans, setTrans] = useState(translations.fi);

  useEffect(() => {
    setTrans(translations[lang]);
  }, [lang]);

  return (
    <Header {...args} onDidChangeLanguage={languageChangedStateAction} languages={languages}>
      <Header.SkipLink skipTo="#content" label={trans.skipToContent} />
      <Header.ActionBar
        frontPageLabel={trans.frontPage}
        title={translations[lang].headerTitle}
        titleAriaLabel={translations[lang].headerAriaLabel}
        titleHref="https://hel.fi"
        logo={<Logo src={logoSrcFromLanguageAndTheme(lang, args.theme)} alt={translations[lang].headerTitle} />}
      >
        <Header.SimpleLanguageOptions languages={[languages[0], languages[1]]} />
      </Header.ActionBar>

      <Header.NavigationMenu>
        <Header.Link
          label={trans.healthAndndSocialServices}
          onClick={(event) => {
            event.preventDefault();
            setHref('#sosiaali-_ja_terveyspalvelut');
          }}
          active={href.includes('#sosiaali-_ja_terveyspalvelut')}
        />
        <Header.Link
          active={href.includes('#kasvatus_ja_koulutus')}
          onClick={(event) => {
            event.preventDefault();
            setHref('#kasvatus_ja_koulutus');
          }}
          label={trans.childHoodAndEducation}
        />
      </Header.NavigationMenu>
    </Header>
  );
};

export const WithFullFeaturesCustomTheme = (args) => {
  return <WithFullFeatures {...args} />;
};

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
    '--header-background-color': 'var(--color-engel-light)',
  },
};

WithFullFeaturesCustomTheme.argTypes = {
  theme: {
    control: { type: 'object' },
  },
};
