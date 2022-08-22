import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Pagination, createPaginationItemList } from './Pagination';

describe('createPaginationItemList', () => {
  it('should return an empty list when page count is 0', () => {
    expect(createPaginationItemList({ pageCount: 0, pageIndex: 1, siblingCount: 5 }).length).toEqual(0);
    expect(true).toBe(true);
  });

  it('should return only first page when page count is 1', () => {
    const paginationItemList = createPaginationItemList({ pageCount: 1, pageIndex: 1, siblingCount: 5 });
    expect(paginationItemList.length).toEqual(1);
    expect(paginationItemList[0]).toEqual(1);
  });

  it('should create pagination item list correctly with different sibling counts when selected page is low', () => {
    const noSiblingsAndPageLow = createPaginationItemList({ pageCount: 30, pageIndex: 1, siblingCount: 0 });
    expect(noSiblingsAndPageLow).toMatchSnapshot();

    const oneSiblingAndPageLow = createPaginationItemList({ pageCount: 30, pageIndex: 2, siblingCount: 1 });
    expect(oneSiblingAndPageLow).toMatchSnapshot();

    const twoSiblingsAndPageLow = createPaginationItemList({ pageCount: 30, pageIndex: 3, siblingCount: 2 });
    expect(twoSiblingsAndPageLow).toMatchSnapshot();

    const threeSiblingsAndPageLow = createPaginationItemList({ pageCount: 30, pageIndex: 4, siblingCount: 3 });
    expect(threeSiblingsAndPageLow).toMatchSnapshot();

    const fourSiblingsAndPageLow = createPaginationItemList({ pageCount: 30, pageIndex: 5, siblingCount: 4 });
    expect(fourSiblingsAndPageLow).toMatchSnapshot();

    const fiveSiblingsAndPageLow = createPaginationItemList({ pageCount: 30, pageIndex: 6, siblingCount: 5 });
    expect(fiveSiblingsAndPageLow).toMatchSnapshot();
  });

  it('should create pagination item list correctly with different sibling counts when selected page is high', () => {
    const noSiblingsAndPageHigh = createPaginationItemList({ pageCount: 30, pageIndex: 30, siblingCount: 0 });
    expect(noSiblingsAndPageHigh).toMatchSnapshot();

    const oneSiblingAndPageHigh = createPaginationItemList({ pageCount: 30, pageIndex: 29, siblingCount: 1 });
    expect(oneSiblingAndPageHigh).toMatchSnapshot();

    const twoSiblingsAndPageHigh = createPaginationItemList({ pageCount: 30, pageIndex: 28, siblingCount: 2 });
    expect(twoSiblingsAndPageHigh).toMatchSnapshot();

    const threeSiblingsAndPageHigh = createPaginationItemList({ pageCount: 30, pageIndex: 27, siblingCount: 3 });
    expect(threeSiblingsAndPageHigh).toMatchSnapshot();

    const fourSiblingsAndPageHigh = createPaginationItemList({ pageCount: 30, pageIndex: 26, siblingCount: 4 });
    expect(fourSiblingsAndPageHigh).toMatchSnapshot();

    const fiveSiblingsAndPageHigh = createPaginationItemList({ pageCount: 30, pageIndex: 25, siblingCount: 5 });
    expect(fiveSiblingsAndPageHigh).toMatchSnapshot();
  });

  it('should create pagination item list correctly with different sibling counts when selected page is in the middle', () => {
    const noSiblingsAndPageMiddle = createPaginationItemList({ pageCount: 30, pageIndex: 15, siblingCount: 0 });
    expect(noSiblingsAndPageMiddle).toMatchSnapshot();

    const oneSiblingAndPageMiddle = createPaginationItemList({ pageCount: 30, pageIndex: 15, siblingCount: 1 });
    expect(oneSiblingAndPageMiddle).toMatchSnapshot();

    const twoSiblingsAndPageMiddle = createPaginationItemList({ pageCount: 30, pageIndex: 15, siblingCount: 2 });
    expect(twoSiblingsAndPageMiddle).toMatchSnapshot();

    const threeSiblingsAndPageMiddle = createPaginationItemList({ pageCount: 30, pageIndex: 15, siblingCount: 3 });
    expect(threeSiblingsAndPageMiddle).toMatchSnapshot();

    const fourSiblingsAndPageMiddle = createPaginationItemList({ pageCount: 30, pageIndex: 15, siblingCount: 4 });
    expect(fourSiblingsAndPageMiddle).toMatchSnapshot();

    const fiveSiblingsAndPageMiddle = createPaginationItemList({ pageCount: 30, pageIndex: 15, siblingCount: 5 });
    expect(fiveSiblingsAndPageMiddle).toMatchSnapshot();
  });

  it('should create correct amount of truncation ellipsis items in edge cases', () => {
    // Low-end edge case
    // Only start-ellipsis should be visible
    const onlyEndEllipsis = createPaginationItemList({ pageCount: 25, pageIndex: 3, siblingCount: 1 });
    expect(onlyEndEllipsis).toContain('end-ellipsis');
    expect(onlyEndEllipsis).not.toContain('start-ellipsis');
    // Let's move page up by one. Now both ellipsis should be visible
    const bothEllipsisLowCase = createPaginationItemList({ pageCount: 25, pageIndex: 4, siblingCount: 1 });
    expect(bothEllipsisLowCase).toContain('end-ellipsis');
    expect(bothEllipsisLowCase).toContain('start-ellipsis');

    // High-end edge case
    // Only start-ellipsis should be visible
    const onlyStartEllipsis = createPaginationItemList({ pageCount: 25, pageIndex: 21, siblingCount: 1 });
    expect(onlyStartEllipsis).toContain('start-ellipsis');
    expect(onlyStartEllipsis).not.toContain('end-ellipsis');
    // Let's move page down by one. Now both ellipsis should be visible
    const bothEllipsisHighCase = createPaginationItemList({ pageCount: 25, pageIndex: 20, siblingCount: 1 });
    expect(bothEllipsisHighCase).toContain('start-ellipsis');
    expect(bothEllipsisHighCase).toContain('end-ellipsis');
  });
});

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
