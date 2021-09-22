import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import { Accordion } from './Accordion';

describe('<Accordion /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Accordion heading="Foo">Bar</Accordion>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Accordion heading="Foo">Bar</Accordion>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should open the accordion when accordion header is clicked', async () => {
    const { container } = render(
      <Accordion heading="Foo" id="accordion">
        Bar
      </Accordion>,
    );
    userEvent.click(container.querySelector('[id="accordion-heading"]'));
    expect(container.querySelector('[id="accordion-content"]')).toBeVisible();
  });
});
