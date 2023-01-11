import React from 'react';

import { DropdownDirection } from '../header/components/navigationLink';
import { Header } from '../header/Header';
import { Breadcrumb } from './Breadcrumb';

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

export const ExampleInHeader = (args) => {
  return (
    <Header>
      <Header.UniversalBar primaryLinkText="Helsingin kaupunki" primaryLinkHref="#" />
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
        <Header.NavigationLink href="#" label="Link 2" />
      </Header.NavigationMenu>
      <Breadcrumb {...args} />
    </Header>
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
