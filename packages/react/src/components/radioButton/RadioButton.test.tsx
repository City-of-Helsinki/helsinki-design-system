import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { RadioButton } from './RadioButton';

const radioProps = {
  label: 'label text',
  id: 'test',
};

describe('<RadioButton /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<RadioButton {...radioProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<RadioButton {...radioProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
