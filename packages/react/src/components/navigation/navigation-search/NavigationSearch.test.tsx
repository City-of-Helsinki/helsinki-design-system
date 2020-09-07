import React from 'react';
import { render } from '@testing-library/react';

import { NavigationSearch } from './NavigationSearch';
import { NavigationWrapper } from '../../../utils/test-utils';

describe('<Navigation.Search /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NavigationSearch />, { wrapper: NavigationWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
});
