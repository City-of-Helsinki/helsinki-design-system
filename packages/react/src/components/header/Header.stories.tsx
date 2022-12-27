import React from 'react';

import { Header } from './Header';
import { HeaderUniversalBar } from './components/headerUniversalBar/HeaderUniversalBar';
import { NavigationLink } from './components/navigationLink/NavigationLink';
import { HeaderNavigationMenu } from './components/headerNavigationMenu';
import { StoryWIPAlert } from '../../internal/storyWIPAlert/StoryWIPAlert';
import { DropdownDirection } from './components/navigationLink/types';

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
      <Header.UniversalBar primaryLinkText="Helsingin kaupunki" primaryLinkHref="#">
        <Header.NavigationLink href="#" label="Link 1" />
        <Header.NavigationLink href="#" label="Link 2" />
        <Header.NavigationLink href="#" label="Link 3" />
      </Header.UniversalBar>
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
