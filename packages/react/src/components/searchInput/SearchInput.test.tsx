import React from 'react';
import { render } from '@testing-library/react';

import { SearchInput } from './SearchInput';

describe('<SearchInput /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<SearchInput onSubmit={() => null} suggestionLabelField="" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
