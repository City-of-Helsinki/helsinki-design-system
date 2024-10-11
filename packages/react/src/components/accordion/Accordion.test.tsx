import React from 'react';
import { act, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import { Accordion } from './Accordion';
import { getElementAttributesMisMatches, getCommonElementTestProps } from '../../utils/testHelpers';

describe('<Accordion /> spec', () => {
  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders the component', () => {
    const { asFragment } = render(<Accordion heading="Foo">Bar</Accordion>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Accordion heading="Foo">Bar</Accordion>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Native html props are passed to the element', async () => {
    const divProps = { ...getCommonElementTestProps('div') };
    const { getByTestId } = render(
      <Accordion heading="Foo" {...divProps}>
        Bar
      </Accordion>,
    );
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
  });

  it('should open the accordion when accordion header is clicked', async () => {
    const { container } = render(
      <Accordion heading="Foo" id="accordion">
        Bar
      </Accordion>,
    );
    userEvent.click(container.querySelector('[id="accordion-heading"] button') as Element);
    expect(container.querySelector('[id="accordion-content"]')).toBeVisible();
  });

  it('should close the accordion when accordion close button is clicked', async () => {
    jest.useFakeTimers();
    const { container } = render(
      <Accordion heading="Foo" id="accordion" initiallyOpen>
        Bar
      </Accordion>,
    );

    userEvent.click(container.querySelector('[data-testid="accordion-closeButton"]') as Element);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(container.querySelector('[id="accordion-content"]')).not.toBeVisible();
  });
});
