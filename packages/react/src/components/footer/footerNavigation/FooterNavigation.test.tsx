import React from 'react';
import { render } from '@testing-library/react';

import { FooterNavigation } from './FooterNavigation';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.Navigation /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterNavigation navigationAriaLabel="Foo" />, { wrapper: FooterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
});
