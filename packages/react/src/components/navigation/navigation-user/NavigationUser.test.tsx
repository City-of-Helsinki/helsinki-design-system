import React from 'react';
import { render } from '@testing-library/react';

import { NavigationUser } from './NavigationUser';
import { NavigationWrapper } from '../../../utils/test-utils';

describe('<Navigation.User /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NavigationUser />, { wrapper: NavigationWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
});
