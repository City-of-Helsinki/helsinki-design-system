import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { StatusLabel, StatusLabelType } from './StatusLabel';

describe('<StatusLabel /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<StatusLabel />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<StatusLabel />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  (['neutral', 'info', 'success', 'alert', 'error'] as StatusLabelType[]).map((status) =>
    it(`adds ${status} class to the status label`, () => {
      const { container } = render(<StatusLabel type={status}>Status</StatusLabel>);
      expect((container.firstChild as HTMLElement).classList.contains(status)).toBe(true);
    }),
  );

  it('adds className prop to the status label', () => {
    const { container } = render(<StatusLabel className="foo">Status</StatusLabel>);
    expect((container.firstChild as HTMLElement).classList.contains('foo')).toBe(true);
  });
});
