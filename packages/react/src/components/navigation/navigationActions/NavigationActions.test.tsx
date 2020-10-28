import React from 'react';
import { render } from '@testing-library/react';

import { NavigationActions } from './NavigationActions';
import { NavigationWrapper } from '../../../utils/test-utils';

describe('<Navigation.Actions /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NavigationActions />, { wrapper: NavigationWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
});
