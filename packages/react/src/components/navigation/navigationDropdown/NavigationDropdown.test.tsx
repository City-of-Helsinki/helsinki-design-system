/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react';
import { render } from '@testing-library/react';

import { NavigationDropdown } from './NavigationDropdown';
import { NavigationWrapper } from '../../../utils/test-utils';

describe('<Navigation.Dropdown /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NavigationDropdown label="Foo" />, { wrapper: NavigationWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
});
