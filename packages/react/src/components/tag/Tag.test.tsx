import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Tag } from './Tag';

describe('<Tag /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Tag>Foo</Tag>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Tag>Foo</Tag>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
