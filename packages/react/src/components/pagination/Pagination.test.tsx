import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Pagination } from './Pagination';

describe('<Pagination /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <Pagination
        onChange={() => null}
        paginationAriaLabel="Pagination"
        pageCount={68}
        pageIndex={7}
        pageHref={() => '#'}
        language="en"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <Pagination
        onChange={() => null}
        paginationAriaLabel="Pagination"
        pageCount={68}
        pageIndex={7}
        pageHref={() => '#'}
        language="en"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
