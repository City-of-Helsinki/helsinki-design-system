import React from 'react';
import { render } from '@testing-library/react';

import { NavigationItem } from './NavigationItem';
import { NavigationWrapper } from '../../../utils/test-utils';

describe('<Navigation.Item /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NavigationItem />, { wrapper: NavigationWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
});
