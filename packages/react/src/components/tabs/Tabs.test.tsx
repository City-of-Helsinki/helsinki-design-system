import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';

import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';
import { Tab } from './Tab';
import { TabList } from './TabList';
import { TabPanel } from './TabPanel';
import { Tabs } from './Tabs';

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

  it('native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps('div');
    const { getByTestId } = render(
      <Tabs {...divProps}>
        <TabPanel>Buzz</TabPanel>
      </Tabs>,
    );
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
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
