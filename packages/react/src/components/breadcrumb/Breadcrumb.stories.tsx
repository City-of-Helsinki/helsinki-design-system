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
      { title: 'Front page', path: '/' },
      { title: 'Health and social services', path: '/path' },
      { title: 'Senior services ', path: '/path/2ndLevelPath' },
      { title: 'Informal care', path: '/path/2ndLevelPath/3rdLevelPath' },
      { title: 'Care options', path: null },
    ],
  },
};

export const Example = (args) => <Breadcrumb {...args} />;

export const ExampleInHeader = (args) => {
  return (
    <>
      <style>
        {`
          @media only screen and (min-width: 576px) {
            .breadcrumb-container {
              margin-right: var(--spacing-xs);
              margin-left: var(--spacing-xs);
            }
          }
        `}
      </style>
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
        <div className="breadcrumb-container ">
          <Breadcrumb {...args} />
        </div>
      </Header>
    </>
  );
};

ExampleInHeader.storyName = 'Breadcrumb in header';

export const LastItemIsLink = (args) => (
  <Breadcrumb
    {...args}
    list={[
      { title: 'Front page', path: '/' },
      { title: 'Health and social services', path: '/path' },
      { title: 'Senior services ', path: '/path/2ndLevelPath' },
      { title: 'Informal care', path: '/path/2ndLevelPath/3rdLevelPath' },
      { title: 'Care options', path: '/path/2ndLevelPath/3rdLevelPath/currentPage' },
    ]}
  />
);

LastItemIsLink.storyName = 'Last item a link';
