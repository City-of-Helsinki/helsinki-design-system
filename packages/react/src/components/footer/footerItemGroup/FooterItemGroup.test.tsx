import React from 'react';
import { render } from '@testing-library/react';

import { FooterItemGroup } from './FooterItemGroup';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.ItemGroup /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterItemGroup />, { wrapper: FooterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
});
