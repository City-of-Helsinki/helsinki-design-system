import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { RequiredIndicator } from './RequiredIndicator';

describe('<RequiredIndicator /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<RequiredIndicator />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<RequiredIndicator />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('adds className prop', () => {
    const { container } = render(<RequiredIndicator className="foo" />);
    expect((container.firstChild as HTMLElement).classList.contains('foo')).toBe(true);
  });
  it('adds styles', () => {
    const { container } = render(<RequiredIndicator style={{ color: 'red' }} />);
    expect((container.firstChild as HTMLElement).style.color).toBe('red');
  });
});
