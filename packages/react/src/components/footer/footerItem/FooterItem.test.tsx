import React from 'react';
import { render } from '@testing-library/react';

import { FooterItem } from './FooterItem';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.Item /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterItem value="Foo" />, { wrapper: FooterWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
});
