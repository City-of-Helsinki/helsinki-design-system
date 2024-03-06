import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

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
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <input id="test" />
      </InputWrapper>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <InputWrapper {...wrapperProps}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <input id="test" />
      </InputWrapper>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
