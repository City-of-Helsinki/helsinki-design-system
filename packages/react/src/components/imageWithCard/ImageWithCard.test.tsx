import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ImageWithCard } from './ImageWithCard';

describe('<ImageWithCard /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<ImageWithCard src="" />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<ImageWithCard src="" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
