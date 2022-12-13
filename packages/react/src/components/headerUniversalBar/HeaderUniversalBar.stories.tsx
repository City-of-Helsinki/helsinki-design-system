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
          <NavigationLink href="#" label="Link 1" />
          <NavigationLink href="#" label="Link 2" />
          <NavigationLink href="#" label="Link 3" />
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
