import React from 'react';
import { render } from '@testing-library/react';

import { FooterBase } from './FooterBase';
import { FooterWrapper } from '../../../utils/test-utils';

describe('<Footer.Base /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<FooterBase copyrightHolder="Copyright" copyrightText="All rights reserved" />, {
      wrapper: FooterWrapper,
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
