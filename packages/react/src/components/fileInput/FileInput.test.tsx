import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FileInput } from './FileInput';

describe('<FileInput /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FileInput id="test-file-input" label="Add files" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<FileInput id="test-file-input" label="Add files" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
