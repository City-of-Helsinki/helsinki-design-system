/* eslint-disable react/forbid-component-props */
import React, { HTMLAttributes } from 'react';
import { getAllByText, render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Pagination, PaginationProps } from './Pagination';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

const renderPagination = ({ pageCount, pageIndex, siblingCount }) => {
  const { asFragment } = render(
    <Pagination
      onChange={() => null}
      paginationAriaLabel="Pagination"
      pageCount={pageCount}
      pageIndex={pageIndex}
      pageHref={() => '#'}
      language="en"
      siblingCount={siblingCount}
      data-testid="hds-pagination"
    />,
  );

  return asFragment;
};

describe('<Pagination /> spec', () => {
  it('renders the component', () => {
    const asFragment = renderPagination({ pageCount: 68, pageIndex: 7, siblingCount: 1 });
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

  it('native html props are passed to the element', async () => {
    const navProps = getCommonElementTestProps<'nav', Pick<PaginationProps, 'paginationAriaLabel'>>('nav');
    // aria-label is from "paginationAriaLabel" prop
    navProps.paginationAriaLabel = navProps['aria-label'] as string;
    const { getByTestId } = render(
      <Pagination
        {...navProps}
        onChange={() => null}
        pageCount={68}
        pageIndex={7}
        pageHref={() => '#'}
        language="en"
      />,
    );
    const element = getByTestId(navProps['data-testid']);
    expect(
      getElementAttributesMisMatches(element, {
        ...navProps,
        paginationAriaLabel: undefined,
      } as HTMLAttributes<HTMLElement>),
    ).toHaveLength(0);
  });

  it('should render null when pageCount is zero', () => {
    const asFragment = renderPagination({ pageCount: 0, pageIndex: 7, siblingCount: 1 });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should return only first page when page count is 1', () => {
    const asFragment = renderPagination({ pageCount: 1, pageIndex: 7, siblingCount: 5 });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render pagination correctly with different sibling counts when selected page is low', () => {
    const noSiblingsAndPageLow = renderPagination({ pageCount: 30, pageIndex: 1, siblingCount: 0 });
    expect(noSiblingsAndPageLow()).toMatchSnapshot();

    const oneSiblingAndPageLow = renderPagination({ pageCount: 30, pageIndex: 2, siblingCount: 1 });
    expect(oneSiblingAndPageLow()).toMatchSnapshot();

    const twoSiblingsAndPageLow = renderPagination({ pageCount: 30, pageIndex: 3, siblingCount: 2 });
    expect(twoSiblingsAndPageLow()).toMatchSnapshot();

    const threeSiblingsAndPageLow = renderPagination({ pageCount: 30, pageIndex: 4, siblingCount: 3 });
    expect(threeSiblingsAndPageLow()).toMatchSnapshot();

    const fourSiblingsAndPageLow = renderPagination({ pageCount: 30, pageIndex: 5, siblingCount: 4 });
    expect(fourSiblingsAndPageLow()).toMatchSnapshot();

    const fiveSiblingsAndPageLow = renderPagination({ pageCount: 30, pageIndex: 6, siblingCount: 5 });
    expect(fiveSiblingsAndPageLow()).toMatchSnapshot();
  });

  it('should render pagination correctly with different sibling counts when selected page is high', () => {
    const noSiblingsAndPageHigh = renderPagination({ pageCount: 30, pageIndex: 30, siblingCount: 0 });
    expect(noSiblingsAndPageHigh()).toMatchSnapshot();

    const oneSiblingAndPageHigh = renderPagination({ pageCount: 30, pageIndex: 29, siblingCount: 1 });
    expect(oneSiblingAndPageHigh()).toMatchSnapshot();

    const twoSiblingsAndPageHigh = renderPagination({ pageCount: 30, pageIndex: 28, siblingCount: 2 });
    expect(twoSiblingsAndPageHigh()).toMatchSnapshot();

    const threeSiblingsAndPageHigh = renderPagination({ pageCount: 30, pageIndex: 27, siblingCount: 3 });
    expect(threeSiblingsAndPageHigh()).toMatchSnapshot();

    const fourSiblingsAndPageHigh = renderPagination({ pageCount: 30, pageIndex: 26, siblingCount: 4 });
    expect(fourSiblingsAndPageHigh()).toMatchSnapshot();

    const fiveSiblingsAndPageHigh = renderPagination({ pageCount: 30, pageIndex: 25, siblingCount: 5 });
    expect(fiveSiblingsAndPageHigh()).toMatchSnapshot();
  });

  it('should render pagination correctly with different sibling counts when selected page is in the middle', () => {
    const noSiblingsAndPageMiddle = renderPagination({ pageCount: 30, pageIndex: 15, siblingCount: 0 });
    expect(noSiblingsAndPageMiddle()).toMatchSnapshot();

    const oneSiblingAndPageMiddle = renderPagination({ pageCount: 30, pageIndex: 15, siblingCount: 1 });
    expect(oneSiblingAndPageMiddle()).toMatchSnapshot();

    const twoSiblingsAndPageMiddle = renderPagination({ pageCount: 30, pageIndex: 15, siblingCount: 2 });
    expect(twoSiblingsAndPageMiddle()).toMatchSnapshot();

    const threeSiblingsAndPageMiddle = renderPagination({ pageCount: 30, pageIndex: 15, siblingCount: 3 });
    expect(threeSiblingsAndPageMiddle()).toMatchSnapshot();

    const fourSiblingsAndPageMiddle = renderPagination({ pageCount: 30, pageIndex: 15, siblingCount: 4 });
    expect(fourSiblingsAndPageMiddle()).toMatchSnapshot();

    const fiveSiblingsAndPageMiddle = renderPagination({ pageCount: 30, pageIndex: 15, siblingCount: 5 });
    expect(fiveSiblingsAndPageMiddle()).toMatchSnapshot();
  });

  it('should render pagination correctly in edge cases', () => {
    // Low-end edge case
    // Only start-ellipsis should be visible
    const onlyEndEllipsisFragment = renderPagination({ pageCount: 25, pageIndex: 3, siblingCount: 1 });
    const onlyEndEllipsis = getAllByText(onlyEndEllipsisFragment().firstChild as HTMLElement, '...');
    expect(onlyEndEllipsis.length).toEqual(1);
    // Let's move page up by one. Now both ellipsis should be visible
    const bothEllipsisLowCaseFragment = renderPagination({ pageCount: 25, pageIndex: 4, siblingCount: 1 });
    const bothEllipsisLowCase = getAllByText(bothEllipsisLowCaseFragment().firstChild as HTMLElement, '...');
    expect(bothEllipsisLowCase.length).toEqual(2);

    // High-end edge case
    // Only start-ellipsis should be visible
    const onlyStartEllipsisFragment = renderPagination({ pageCount: 25, pageIndex: 21, siblingCount: 1 });
    const onlyStartEllipsis = getAllByText(onlyStartEllipsisFragment().firstChild as HTMLElement, '...');
    expect(onlyStartEllipsis.length).toEqual(1);
    // Let's move page down by one. Now both ellipsis should be visible
    const bothEllipsisHighCaseFragment = renderPagination({ pageCount: 25, pageIndex: 20, siblingCount: 1 });
    const bothEllipsisHighCase = getAllByText(bothEllipsisHighCaseFragment().firstChild as HTMLElement, '...');
    expect(bothEllipsisHighCase.length).toEqual(2);
  });

  it('should show screen reader notification when user changes page', () => {
    const { rerender, queryByText } = render(
      <Pagination
        onChange={() => null}
        paginationAriaLabel="Pagination"
        pageCount={25}
        pageIndex={3}
        pageHref={() => '#'}
        language="en"
        siblingCount={1}
      />,
    );
    expect(queryByText('Opened page 4')).not.toBeInTheDocument();

    rerender(
      <Pagination
        onChange={() => null}
        paginationAriaLabel="Pagination"
        pageCount={25}
        pageIndex={3}
        pageHref={() => '#'}
        language="en"
        siblingCount={1}
      />,
    );
    // let's test that rerendering with the same selected page should not cause screen reader notification
    expect(queryByText('Opened page 4')).not.toBeInTheDocument();

    rerender(
      <Pagination
        onChange={() => null}
        paginationAriaLabel="Pagination"
        pageCount={25}
        pageIndex={4} // increase pageIndex by one
        pageHref={() => '#'}
        language="en"
        siblingCount={1}
      />,
    );
    expect(queryByText('Opened page 5')).toBeInTheDocument();
  });
});
