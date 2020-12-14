import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Tabs } from './Tabs';
import { TabList } from './TabList';
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';

describe('<Tabs /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <Tabs>
        <TabList>
          <Tab>Foo</Tab>
          <Tab>Bar</Tab>
        </TabList>
        <TabPanel>Fizz</TabPanel>
        <TabPanel>Buzz</TabPanel>
      </Tabs>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <Tabs>
        <TabList>
          <Tab>Foo</Tab>
          <Tab>Bar</Tab>
        </TabList>
        <TabPanel>Fizz</TabPanel>
        <TabPanel>Buzz</TabPanel>
      </Tabs>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
