import React, { useState } from 'react';

import { Pagination } from './Pagination';

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
export const Basic = (args) => (
  <Pagination
    language="en"
    onChange={() => null}
    pageCount={5}
    pageHref={() => '#'}
    pageIndex={0}
    paginationAriaLabel="Pagination"
  />
);

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const WithTruncation = (args) => (
  <>
    <Pagination
      language="en"
      onChange={() => null}
      pageCount={68}
      pageHref={() => '#'}
      pageIndex={7}
      paginationAriaLabel="Pagination"
      siblingCount={0}
    />
    <Pagination
      language="en"
      onChange={() => null}
      pageCount={68}
      pageHref={() => '#'}
      pageIndex={7}
      paginationAriaLabel="Pagination"
    />
    <Pagination
      language="en"
      onChange={() => null}
      pageCount={68}
      pageHref={() => '#'}
      pageIndex={7}
      paginationAriaLabel="Pagination"
      siblingCount={2}
    />
  </>
);

WithTruncation.storyName = 'With truncation';

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const WithoutPrevAndNextButtons = (args) => {
  return (
    <Pagination
      hideNextButton
      hidePrevButton
      language="en"
      onChange={() => null}
      pageCount={68}
      pageHref={() => '#'}
      pageIndex={7}
      paginationAriaLabel="Pagination"
    />
  );
};

WithoutPrevAndNextButtons.storyName = 'Without prev and next buttons';

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const InteractableExample = (args) => {
  const [pageIndex, setPageIndex] = useState<number>(5);

  return (
    <Pagination
      language="en"
      onChange={(event, index) => {
        event.preventDefault();
        setPageIndex(index);
      }}
      pageCount={25}
      pageHref={() => '#'}
      pageIndex={pageIndex}
      paginationAriaLabel="Pagination"
      siblingCount={1}
    />
  );
};

InteractableExample.storyName = 'Interactable example';

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const CustomTheme = (args) => {
  const theme = {
    '--active-page-background-color': 'var(--color-bus)',
  };

  return (
    <Pagination
      language="en"
      onChange={() => null}
      pageCount={5}
      pageHref={() => '#'}
      pageIndex={0}
      paginationAriaLabel="Pagination"
      theme={theme}
    />
  );
};

CustomTheme.storyName = 'Custom theme';
