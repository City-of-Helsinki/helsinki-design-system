import React, { HTMLAttributes } from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { HeaderSearch, HeaderSearchProps as NavigationSearchProps } from './HeaderSearch';
import { HeaderWrapper } from '../../../../utils/test-utils';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../../../utils/testHelpers';

describe('<Header.HeaderSearch /> spec', () => {
  const testTexts = {
    heading: 'Hae palvelusta',
    label: 'Mitä etsit?',
    buttonLabel: 'Hae',
    placeholder: 'Anna teksti hakua varten',
    assistive: 'Avustava teksti',
  };

  it('renders the component', () => {
    const { asFragment } = render(<HeaderSearch texts={testTexts} />, { wrapper: HeaderWrapper });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<HeaderSearch texts={testTexts} />, { wrapper: HeaderWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps<'div', Pick<NavigationSearchProps, 'onSubmit' | 'onChange'>>('div');
    // the role is fixed to "search" and should not be overwritten
    const { getByTestId } = render(<HeaderSearch {...divProps} role="navigation" texts={testTexts} />);
    const element = getByTestId(divProps['data-testid']);
    expect(
      getElementAttributesMisMatches(element, {
        ...(divProps as unknown as HTMLAttributes<HTMLDivElement>),
        role: 'search',
      }),
    ).toHaveLength(0);
  });
});
