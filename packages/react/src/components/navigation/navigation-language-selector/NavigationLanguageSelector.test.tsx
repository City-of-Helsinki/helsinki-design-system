import React from 'react';
import { render } from '@testing-library/react';

import { NavigationLanguageSelector } from './NavigationLanguageSelector';
import { NavigationWrapper } from '../../../utils/test-utils';

const options = [{ value: 'foo' }, { value: 'bar' }];

describe('<Navigation.LanguageSelector /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NavigationLanguageSelector options={options} value={options[0]} />, {
      wrapper: NavigationWrapper,
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
