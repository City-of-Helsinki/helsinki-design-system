import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Button, ButtonVariant } from './Button';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

describe('<Button /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Button>My Button</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders the loading button component', () => {
    const { asFragment } = render(
      <Button disabled variant={ButtonVariant.Clear}>
        Loading...
      </Button>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Button>My Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('Native html props are passed to the element', async () => {
    const buttonProps = getCommonElementTestProps<'button'>('button');
    const { getByTestId } = render(<Button {...buttonProps}>My Button</Button>);
    const element = getByTestId(buttonProps['data-testid']);
    expect(getElementAttributesMisMatches(element, buttonProps)).toHaveLength(0);
  });
});
