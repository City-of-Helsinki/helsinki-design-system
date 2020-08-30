import React from 'react';
import { render } from '@testing-library/react';

import { Checkbox } from './Checkbox';

const checkboxProps = {
  label: 'label text',
  id: 'test',
};

describe('<Checkbox /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Checkbox {...checkboxProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
