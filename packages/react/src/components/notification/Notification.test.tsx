import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Notification } from './Notification';

const label = 'This is the label text';
const body =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';

describe('<Notification /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Notification label={label}>{body}</Notification>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the component without optional label', () => {
    const { asFragment } = render(<Notification>{body}</Notification>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('adds role="alert" for non-inline notifications', () => {
    const { asFragment } = render(
      <Notification label={label} position="bottom-center">
        {body}
      </Notification>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Notification label={label}>{body}</Notification>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('adds className prop to notification classes', () => {
    const { container } = render(
      <Notification label={label} className="testClass">
        {body}
      </Notification>,
    );
    expect((container.firstChild as HTMLElement).classList.contains('testClass')).toBe(true);
  });

  it('should be closable', () => {
    const { getByRole } = render(
      <Notification label={label} dismissible closeButtonLabelText="test">
        {body}
      </Notification>,
    );
    expect(getByRole('button')).toBeDefined();
  });
});
