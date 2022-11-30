import React from 'react';

import { Header } from '../header/Header';
import { HeaderUniversalBar } from './HeaderUniversalBar';
import { NavigationLink } from '../navigationLink/NavigationLink';
import { StoryWIPAlert } from '../../internal/storyWIPAlert/StoryWIPAlert';

export default {
  component: HeaderUniversalBar,
  title: 'Components/HeaderUniversalBar',
  parameters: {
    controls: { expanded: true },
  },
  args: {
    primaryLinkHref: '#',
    primaryLinkText: 'Helsingin kaupunki',
  },
};

export const Default = (args) => (
  <>
    <StoryWIPAlert />
    <Header>
      <HeaderUniversalBar {...args}>
        <>
          <NavigationLink href="#">Link 1</NavigationLink>
          <NavigationLink href="#">Link 2</NavigationLink>
          <NavigationLink href="#">Link 3</NavigationLink>
        </>
      </HeaderUniversalBar>
    </Header>
  </>
);

export const WithoutSecondaryLinks = (args) => (
  <>
    <StoryWIPAlert />
    <HeaderUniversalBar {...args} />
  </>
);
