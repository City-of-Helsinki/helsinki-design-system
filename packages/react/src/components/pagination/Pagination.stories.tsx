import React, { useState } from 'react';

import { Pagination, PaginationProps } from './Pagination';

export default {
  component: Pagination,
  title: 'Components/Pagination',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const Basic = (args: PaginationProps) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  return (
    <Pagination
      language="en"
      onChange={(event, index) => {
        event.preventDefault();
        setPageIndex(index);
      }}
      pageCount={5}
      pageHref={() => '#'}
      pageIndex={pageIndex}
      paginationAriaLabel="Pagination"
    />
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const WithTruncation = (args: PaginationProps) => {
  const [pageIndexPagination1, setPageIndexPagination1] = useState<number>(7);
  const [pageIndexPagination2, setPageIndexPagination2] = useState<number>(7);
  const [pageIndexPagination3, setPageIndexPagination3] = useState<number>(7);

  return (
    <>
      <Pagination
        language="en"
        onChange={(event, index) => {
          event.preventDefault();
          setPageIndexPagination1(index);
        }}
        pageCount={68}
        pageHref={() => '#'}
        pageIndex={pageIndexPagination1}
        paginationAriaLabel="Pagination 1"
        siblingCount={0}
      />
      <Pagination
        language="en"
        onChange={(event, index) => {
          event.preventDefault();
          setPageIndexPagination2(index);
        }}
        pageCount={68}
        pageHref={() => '#'}
        pageIndex={pageIndexPagination2}
        paginationAriaLabel="Pagination 2"
      />
      <Pagination
        language="en"
        onChange={(event, index) => {
          event.preventDefault();
          setPageIndexPagination3(index);
        }}
        pageCount={68}
        pageHref={() => '#'}
        pageIndex={pageIndexPagination3}
        paginationAriaLabel="Pagination 3"
        siblingCount={2}
      />
    </>
  );
};

WithTruncation.storyName = 'With truncation';

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const WithoutPrevAndNextButtons = (args: PaginationProps) => {
  const [pageIndex, setPageIndex] = useState<number>(7);

  return (
    <Pagination
      hideNextButton
      hidePrevButton
      language="en"
      onChange={(event, index) => {
        event.preventDefault();
        setPageIndex(index);
      }}
      pageCount={68}
      pageHref={() => '#'}
      pageIndex={pageIndex}
      paginationAriaLabel="Pagination"
    />
  );
};

WithoutPrevAndNextButtons.storyName = 'Without prev and next buttons';

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const CustomTheme = (args: PaginationProps) => {
  const theme = {
    '--active-page-background-color': 'var(--color-bus)',
  };

  const [pageIndex, setPageIndex] = useState<number>(0);

  return (
    <Pagination
      language="en"
      onChange={(event, index) => {
        event.preventDefault();
        setPageIndex(index);
      }}
      pageCount={5}
      pageHref={() => '#'}
      pageIndex={pageIndex}
      paginationAriaLabel="Pagination"
      theme={theme}
    />
  );
};

CustomTheme.storyName = 'Custom theme';

export const Playground = (args: PaginationProps) => {
  const [pageIndex, setPageIndex] = useState<number>(7);

  return (
    <Pagination
      data-testid={args['data-testid']}
      hideNextButton={args.hideNextButton}
      hidePrevButton={args.hidePrevButton}
      language={args.language}
      onChange={(event, index) => {
        event.preventDefault();
        setPageIndex(index);
      }}
      pageCount={args.pageCount}
      pageHref={() => '#'}
      pageIndex={pageIndex}
      paginationAriaLabel={args.paginationAriaLabel}
      siblingCount={args.siblingCount}
      theme={args.theme}
    />
  );
};

Playground.parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  docs: {
    disable: true,
  },
  loki: { skip: true },
};

Playground.args = {
  'data-testid': 'hds-pagination',
  hideNextButton: false,
  hidePrevButton: false,
  language: 'en',
  pageCount: 68,
  siblingCount: 2,
  paginationAriaLabel: 'Pagination',
  theme: {
    '--active-page-background-color': 'var(--color-bus)',
  },
};

Playground.argTypes = {
  language: {
    options: ['fi', 'en', 'sv'],
    control: { type: 'radio' },
  },
};
