import React from 'react';

import { Header } from './Header';
import { HeaderUniversalBar } from '../headerUniversalBar/HeaderUniversalBar';
import { NavigationLink } from '../navigationLink/NavigationLink';
import { StoryWIPAlert } from '../../internal/storyWIPAlert/StoryWIPAlert';

export default {
  component: Header,
  title: 'Components/Header',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Example = (args) => (
  <>
    <StoryWIPAlert />
    <Header {...args}>Header</Header>
  </>
);

export const WithUniversalBar = (args) => (
  <>
    <StoryWIPAlert />
    <Header {...args}>
      <HeaderUniversalBar primaryLinkText="Helsingin kaupunki" primaryLinkHref="#">
        <NavigationLink href="#" label="Link 1" />
        <NavigationLink href="#" label="Link 2" />
        <NavigationLink href="#" label="Link 3" />
      </HeaderUniversalBar>
    </Header>
  </>
);
