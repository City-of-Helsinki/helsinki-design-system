import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('should call onClick when user clicks tab', () => {
    const onClick = jest.fn();
    render(
      <Tabs>
        <TabList>
          <Tab onClick={onClick}>Foo</Tab>
          <Tab onClick={onClick}>Bar</Tab>
        </TabList>
        <TabPanel>Fizz</TabPanel>
        <TabPanel>Buzz</TabPanel>
      </Tabs>,
    );
    userEvent.click(screen.getByLabelText('Foo'));
    waitFor(() => expect(onClick).toHaveBeenCalled());
  });

  it('should call onClick when user presses enter on tab', () => {
    const onClick = jest.fn();
    render(
      <Tabs>
        <TabList>
          <Tab onClick={onClick}>Foo</Tab>
          <Tab onClick={onClick}>Bar</Tab>
        </TabList>
        <TabPanel>Fizz</TabPanel>
        <TabPanel>Buzz</TabPanel>
      </Tabs>,
    );
    userEvent.type(screen.getByLabelText('Foo'), '{Enter}');
    waitFor(() => expect(onClick).toHaveBeenCalled());
  });
});
