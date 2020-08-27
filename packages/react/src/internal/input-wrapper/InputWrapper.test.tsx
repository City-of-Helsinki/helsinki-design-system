import React from 'react';
import { render } from '@testing-library/react';

import { InputWrapper } from './InputWrapper';

const wrapperProps = {
  helperText: 'helper text',
  label: 'label text',
  id: 'test',
};

describe('<InputWrapper /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <InputWrapper {...wrapperProps}>
        <input id="test" />
      </InputWrapper>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
