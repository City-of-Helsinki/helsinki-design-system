import React from 'react';
import { render } from '@testing-library/react';

import { FooterSoMe } from './FooterSoMe';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.SoMe /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterSoMe />, { wrapper: FooterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
});
