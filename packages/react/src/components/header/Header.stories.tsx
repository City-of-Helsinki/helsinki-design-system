import React from 'react';
import { action } from '@storybook/addon-actions';

import { Header } from './Header';
import { HeaderUniversalBar } from './components/headerUniversalBar/HeaderUniversalBar';
import { HeaderActionBar, TitleStyleType } from './components/headerActionBar/HeaderActionBar';
import { NavigationLink } from './components/navigationLink/NavigationLink';
import { HeaderNavigationMenu } from './components/headerNavigationMenu';
import { StoryWIPAlert } from '../../internal/storyWIPAlert/StoryWIPAlert';
import { DropdownDirection } from './components/navigationLink/types';
import { LanguageOption } from '../../context/languageContext';
import { IconSearch, IconUser } from '../../icons';

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

export const Example = (args) => (
  <>
    <StoryWIPAlert />
    <Header {...args}>Header</Header>
  </>
);

export const WithFullFeatures = (args) => (
  <>
    <StoryWIPAlert />
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
        titleStyle={TitleStyleType.normal}
        logoAriaLabel="Service logo"
        logoUrl="https://hel.fi"
        menuButtonAriaLabel="Menu"
      >
        <Header.NavigationLanguageSelector languages={languages}>
          <h3>Kielivalinnat</h3>
          Infoteksti
        </Header.NavigationLanguageSelector>

        <Header.ActionBarItem fullWidth label="Haku" icon={IconSearch} id="action-bar-search">
          <Header.NavigationSearch onChange={searchChangeAction} onSubmit={searchSubmitAction} />
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
              dropdownDirection={DropdownDirection.Dynamic}
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
              dropdownDirection={DropdownDirection.Dynamic}
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
              dropdownDirection={DropdownDirection.Dynamic}
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
              dropdownDirection={DropdownDirection.Dynamic}
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
        <Header.NavigationLink href="#" label="Link 3" />
        <Header.NavigationLink href="#" label="Link 3" />
        <Header.NavigationLink href="#" label="Link 3" />
        <Header.NavigationLink
          href="#"
          label="Link 2"
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownDirection={DropdownDirection.Dynamic}
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
              dropdownDirection={DropdownDirection.Dynamic}
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

export const WithUniversalBar = (args) => (
  <>
    <StoryWIPAlert />
    <Header {...args}>
      <Header.UniversalBar primaryLinkText="Helsingin kaupunki" primaryLinkHref="#">
        <Header.NavigationLink href="#" label="Link 1" />
        <Header.NavigationLink href="#" label="Link 2" />
        <Header.NavigationLink href="#" label="Link 3" />
      </Header.UniversalBar>
    </Header>
  </>
);

export const WithNavigationMenu = (args) => (
  <>
    <StoryWIPAlert />
    <Header {...args}>
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
              dropdownDirection={DropdownDirection.Dynamic}
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
              dropdownDirection={DropdownDirection.Dynamic}
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
              dropdownDirection={DropdownDirection.Dynamic}
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
              dropdownDirection={DropdownDirection.Dynamic}
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
        <Header.NavigationLink href="#" label="Link 3" />
      </Header.NavigationMenu>
    </Header>
  </>
);

export const WithActionBar = (args) => {
  return (
    <Header {...args} onDidChangeLanguage={languageChangedAction}>
      <StoryWIPAlert />

      <Header.ActionBar
        title="Helsingin kaupunki"
        titleAriaLabel="Helsingin kaupunki"
        titleUrl="https://hel.fi"
        titleStyle={TitleStyleType.black}
        onMenuButtonClick={(event) => {
          // TODO
          event.stopPropagation();
        }}
      >
        <Header.NavigationLanguageSelector languages={languages}>
          <h3>Kielivalinnat</h3>
          Infoteksti
        </Header.NavigationLanguageSelector>

        <Header.ActionBarItem fullWidth label="Haku" icon={IconSearch} id="action-bar-search">
          <Header.NavigationSearch onChange={searchChangeAction} onSubmit={searchSubmitAction} />
        </Header.ActionBarItem>

        <Header.ActionBarItem label="Kirjaudu" icon={IconUser} style={{ order: 10 }} id="action-bar-login">
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
