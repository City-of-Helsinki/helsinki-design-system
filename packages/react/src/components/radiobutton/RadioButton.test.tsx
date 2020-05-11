import React from 'react';
import { render } from '@testing-library/react';

import RadioButton from './RadioButton';

const radioProps = {
  labelText: 'label text',
  id: 'test',
};

describe('<RadioButton /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<RadioButton {...radioProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
