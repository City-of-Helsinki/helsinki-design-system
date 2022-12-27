import React from 'react';

import { Header } from './Header';
import { HeaderUniversalBar } from '../headerUniversalBar/HeaderUniversalBar';
import { NavigationLink } from '../navigationLink/NavigationLink';
import { StoryWIPAlert } from '../../internal/storyWIPAlert/StoryWIPAlert';
import { HeaderNavigationMenu } from '../headerNavigationMenu';

export default {
  component: Header,
  title: 'Components/Header',
  subcomponents: {
    HeaderUniversalBar,
    HeaderNavigationMenu,
    NavigationLink,
  },
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

export const WithFullFeatures = (args) => (
  <>
    <StoryWIPAlert />
    <Header {...args}>
      <HeaderUniversalBar primaryLinkText="Helsingin kaupunki" primaryLinkHref="#">
        <NavigationLink href="#" label="Link 1" />
        <NavigationLink href="#" label="Link 2" />
        <NavigationLink href="#" label="Link 3" />
      </HeaderUniversalBar>
      <HeaderNavigationMenu>
        <NavigationLink
          href="#"
          label="Link 1"
          onClick={(event) => event.preventDefault()}
          active
          dropdownLinks={[
            <NavigationLink
              href="#"
              label="Test"
              dropdownDirection="right"
              active
              dropdownLinks={[
                <NavigationLink href="#" label="Nested" />,
                <NavigationLink href="#" label="Nested" />,
                <NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <NavigationLink
              href="#"
              label="Test"
              dropdownDirection="right"
              dropdownLinks={[<NavigationLink href="#" label="Nested" />, <NavigationLink href="#" label="Nested" />]}
            />,
          ]}
        />
        <NavigationLink href="#" label="Link 2" />
        <NavigationLink href="#" label="Link 3" />
      </HeaderNavigationMenu>
    </Header>
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

export const WithNavigationMenu = (args) => (
  <>
    <StoryWIPAlert />
    <Header {...args}>
      <HeaderNavigationMenu>
        <NavigationLink
          href="#"
          label="Link 1"
          onClick={(event) => event.preventDefault()}
          active
          dropdownLinks={[
            <NavigationLink
              href="#"
              label="Test"
              dropdownDirection="right"
              active
              dropdownLinks={[
                <NavigationLink href="#" label="Nested" />,
                <NavigationLink href="#" label="Nested" />,
                <NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <NavigationLink
              href="#"
              label="Test"
              dropdownDirection="right"
              dropdownLinks={[<NavigationLink href="#" label="Nested" />, <NavigationLink href="#" label="Nested" />]}
            />,
          ]}
        />
        <NavigationLink href="#" label="Link 2" />
        <NavigationLink href="#" label="Link 3" />
      </HeaderNavigationMenu>
    </Header>
  </>
);
