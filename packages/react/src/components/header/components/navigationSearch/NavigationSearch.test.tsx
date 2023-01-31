// import React from 'react';
// import { render } from '@testing-library/react';
// import { axe } from 'jest-axe';

// import { NavigationSearch } from './NavigationSearch';
// import { NavigationWrapper } from '../../../utils/test-utils';

// describe('<Navigation.Search /> spec', () => {
//   it('renders the component', () => {
//     const { asFragment } = render(<NavigationSearch searchLabel="Search" />, { wrapper: NavigationWrapper });
//     expect(asFragment()).toMatchSnapshot();
//   });
//   it('should not have basic accessibility issues', async () => {
//     const { container } = render(<NavigationSearch searchLabel="Search" />, { wrapper: NavigationWrapper });
//     const results = await axe(container);
//     expect(results).toHaveNoViolations();
//   });
// });
