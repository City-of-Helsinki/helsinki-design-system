import React from 'react';

import { StoryWIPAlert } from '../../internal/storyWIPAlert/StoryWIPAlert';
import { Header } from '../header';
import { HeaderNavigationMenu } from '../headerNavigationMenu';
import { NavigationLink } from './NavigationLink';

export default {
  component: NavigationLink,
  title: 'Components/NavigationLink',
  parameters: {
    controls: { expanded: true },
  },
  args: {
    label: 'NavigationLink',
    href: '#',
    active: false,
  },
  argTypes: {
    // foo is the property we want to remove from the UI
    openSubNavIndex: {
      table: {
        disable: true,
      },
    },
    setOpenSubNavIndex: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = (args) => (
  <>
    <StoryWIPAlert />
    <NavigationLink {...args} />
  </>
);
export const WithDropdown = (args) => {
  return (
    <>
      <StoryWIPAlert />
      <Header>
        <HeaderNavigationMenu>
          <NavigationLink
            {...args}
            onClick={(event) => event.preventDefault()}
            dropdownLinks={[<NavigationLink href="#" label="Nested" />, <NavigationLink href="#" label="Nested" />]}
          />
          ;
        </HeaderNavigationMenu>
      </Header>
    </>
  );
};

export const WithNestedDropdown = (args) => {
  return (
    <>
      <StoryWIPAlert />
      <Header>
        <HeaderNavigationMenu>
          <NavigationLink
            {...args}
            onClick={(event) => event.preventDefault()}
            dropdownLinks={[
              <NavigationLink
                href="#"
                label="Nested"
                dropdownDirection="right"
                active
                dropdownLinks={[
                  <NavigationLink href="#" label="Deeply nested" />,
                  <NavigationLink href="#" label="Deeply nested" />,
                  <NavigationLink href="#" label="Deeply nested" />,
                ]}
              />,
              <NavigationLink
                href="#"
                label="Nested"
                dropdownDirection="right"
                dropdownLinks={[
                  <NavigationLink href="#" label="Deeply nested" />,
                  <NavigationLink href="#" label="Deeply nested" />,
                ]}
              />,
            ]}
          />
          ;
        </HeaderNavigationMenu>
      </Header>
    </>
  );
};
