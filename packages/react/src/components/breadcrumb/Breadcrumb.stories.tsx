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
      { title: 'Helsinki', path: '/' },
      { title: 'Nuorten Helsinki', path: '/nuoret' },
      { title: 'Hyvinvointi ja mielenterveysneuvonta ', path: '/nuoret/hyvinvointi' },
      { title: 'Opiskelijan kehon- ja mielenhuolto-opas', path: '/nuoret/hyvinvointi/opiskelijat' },
      { title: 'Kaikki Helsingin kaupungin tarpeelliset linkit', path: '/nuoret/hyvinvointi/opiskelijat/linkit' },
      { title: 'Tämänhetkisen sivun pitkä otsikko', path: null },
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
      { title: 'Home', path: '/' },
      { title: 'Level 1', path: '/level1' },
      { title: 'Level 2', path: '/level1/level2' },
      { title: 'Level 3', path: '/level1/level2/level3' },
    ]}
  />
);

LastItemIsLink.storyName = 'Last item a link';
