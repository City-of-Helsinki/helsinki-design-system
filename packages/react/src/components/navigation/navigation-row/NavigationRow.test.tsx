import React from 'react';
import { render } from '@testing-library/react';

import { NavigationRow } from './NavigationRow';
import { NavigationWrapper } from '../../../utils/test-utils';

describe('<Navigation.Row /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NavigationRow />, { wrapper: NavigationWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
});
