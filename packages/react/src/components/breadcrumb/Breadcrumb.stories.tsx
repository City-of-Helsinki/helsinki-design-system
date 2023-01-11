import React from 'react';

import { Navigation } from '../navigation/Navigation';
import { NavigationTheme } from '../navigation/Navigation.interface';
import { Breadcrumb } from './Breadcrumb';

const navigationProps = {
  title: 'Helsinki Design System',
  titleAriaLabel: 'Helsinki: Helsinki Design System',
  titleUrl: 'https://hel.fi',
  theme: 'light' as NavigationTheme,
  menuToggleAriaLabel: 'Menu',
  skipTo: '#content',
  skipToContentLabel: 'Skip to main content',
};

export default {
  component: Breadcrumb,
  title: 'Components/Breadcrumb',
  parameters: {
    controls: { expanded: true },
  },
  args: {
    list: [
      { title: 'home', path: '/' },
      { title: 'level 1', path: '/level1' },
      { title: 'current', path: null },
    ],
  },
};

export const ExampleInNav = (args) => {
  return (
    <>
      <Navigation {...navigationProps}>
        <Navigation.Row ariaLabel="Breadcrumb test">
          <Breadcrumb {...args} />
        </Navigation.Row>

        {/* NAVIGATION ACTIONS */}
        <Navigation.Actions>
          <Navigation.LanguageSelector label="FI">
            <Navigation.Item href="#" onClick={(e) => e.preventDefault()} lang="fi" label="Suomeksi" />
            <Navigation.Item href="#" onClick={(e) => e.preventDefault()} lang="sv" label="På svenska" />
          </Navigation.LanguageSelector>
        </Navigation.Actions>
      </Navigation>
    </>
  );
};

export const Example = (args) => <Breadcrumb {...args} />;
export const NonActiveLastItem = (args) => (
  <Breadcrumb
    {...args}
    list={[
      { title: 'home 0', path: '/' },
      { title: 'level 1', path: '/level1' },
      { title: 'level 2', path: '/level2' },
      { title: 'Current page', path: null },
    ]}
  />
);
