import React from 'react';
import { render } from '@testing-library/react';

import { FooterUtilities } from './FooterUtilities';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.Utilities /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterUtilities />, { wrapper: FooterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
});
