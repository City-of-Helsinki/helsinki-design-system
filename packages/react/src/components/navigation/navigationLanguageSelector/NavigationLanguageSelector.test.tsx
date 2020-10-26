import React from 'react';
import { render } from '@testing-library/react';

import { NavigationLanguageSelector } from './NavigationLanguageSelector';
import { NavigationWrapper } from '../../../utils/test-utils';

describe('<Navigation.LanguageSelector /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<NavigationLanguageSelector label="Foo" />, {
      wrapper: NavigationWrapper,
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
