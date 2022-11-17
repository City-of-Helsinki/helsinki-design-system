import React from 'react';

import { Header } from './Header';
import { HeaderUniversalBar } from '../headerUniversalBar/HeaderUniversalBar';
import { NavigationLink } from '../navigationLink/NavigationLink';

export default {
  component: Header,
  title: 'Components/Header',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Example = (args) => <Header {...args}>Header</Header>;

export const WithUniversalBar = (args) => (
  <Header {...args}>
    <HeaderUniversalBar primaryLinkText="hel.fi" primaryLinkHref="#">
      <NavigationLink href="#">Link</NavigationLink>
      <NavigationLink href="#">Link</NavigationLink>
    </HeaderUniversalBar>
  </Header>
);
