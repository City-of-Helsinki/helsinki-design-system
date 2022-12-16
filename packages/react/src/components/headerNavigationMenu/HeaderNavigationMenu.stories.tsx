import React from 'react';

import { HeaderNavigationMenu } from './HeaderNavigationMenu';
import { Header } from '../header/Header';
import { NavigationLink } from '../navigationLink/NavigationLink';

export default {
  component: HeaderNavigationMenu,
  title: 'Components/HeaderNavigationMenu',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Example = (args) => {
  // const [open, setOpen] = React.useState<boolean>(false);
  // const open = false;
  return (
    <Header>
      <HeaderNavigationMenu {...args}>
        <NavigationLink
          href="#"
          label="Test"
          onClick={(event) => event.preventDefault()}
          active
          dropdownLinks={[
            <NavigationLink
              href="#"
              label="Test"
              dropdownDirection="right"
              active
              dropdownLinks={[
                <NavigationLink href="#" label="Test" />,
                <NavigationLink href="#" label="Test" />,
                <NavigationLink href="#" label="Test" />,
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
        <NavigationLink
          href="#"
          label="Test"
          dropdownLinks={[
            <NavigationLink
              href="#"
              label="Test"
              dropdownDirection="right"
              dropdownLinks={[
                <NavigationLink href="#" label="Test" />,
                <NavigationLink href="#" label="Test" />,
                <NavigationLink href="#" label="Test" />,
              ]}
            />,
            <NavigationLink
              href="#"
              label="Test"
              dropdownDirection="right"
              dropdownLinks={[<NavigationLink href="#" label="Test" />, <NavigationLink href="#" label="Test" />]}
            />,
          ]}
        />
        <NavigationLink
          href="#"
          label="Test"
          dropdownLinks={[
            <NavigationLink
              href="#"
              label="Test"
              dropdownDirection="right"
              dropdownLinks={[
                <NavigationLink href="#" label="Test" />,
                <NavigationLink href="#" label="Test" />,
                <NavigationLink href="#" label="Test" />,
              ]}
            />,
            <NavigationLink
              href="#"
              label="Test"
              dropdownDirection="right"
              dropdownLinks={[<NavigationLink href="#" label="Test" />, <NavigationLink href="#" label="Test" />]}
            />,
          ]}
        />
        <NavigationLink href="#" label="Test" onClick={(event) => event.preventDefault()} />
        <NavigationLink href="#" label="Test" onClick={(event) => event.preventDefault()} />
        <NavigationLink href="#" label="Test" onClick={(event) => event.preventDefault()} />
        <NavigationLink href="#" label="Test" onClick={(event) => event.preventDefault()} />
        <NavigationLink href="#" label="Test" onClick={(event) => event.preventDefault()} />
      </HeaderNavigationMenu>
    </Header>
  );
};
