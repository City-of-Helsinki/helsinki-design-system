import React, { HTMLAttributes } from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Notification, NotificationProps } from './Notification';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

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

  it('Native html props are passed to the element', async () => {
    const sectionProps: NotificationProps = getCommonElementTestProps('section');
    // the component has "notificationAriaLabel" prop
    sectionProps.notificationAriaLabel = sectionProps['aria-label'];
    const { getByTestId } = render(<Notification {...sectionProps}>{body}</Notification>);
    const element = getByTestId(sectionProps['data-testid']);
    expect(
      getElementAttributesMisMatches(element, {
        ...sectionProps,
        notificationAriaLabel: undefined,
      } as unknown as HTMLAttributes<HTMLElement>),
    ).toHaveLength(0);
  });

  // Replaces aria-atomic with role=alert and removes heading props for a better screen reader support
  it('uses toast notification props in non-inline notifications', () => {
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

  it('if headingLevel-property is not set, the aria-level of the heading element is 2 by default', () => {
    const { getByRole } = render(<Notification label={label}>{body}</Notification>);
    expect((getByRole('heading') as HTMLElement).getAttribute('aria-level')).toBe('2');
  });

  it('headingLevel-property sets the aria-level -attribute of the heading element', () => {
    const { getByRole } = render(
      <Notification label={label} headingLevel={3}>
        {body}
      </Notification>,
    );
    expect((getByRole('heading') as HTMLElement).getAttribute('aria-level')).toBe('3');
  });
});
