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
    onChange={() => null}
    paginationAriaLabel="Pagination"
    pageCount={5}
    pageIndex={0}
    pageHref={() => '#'}
    language="en"
  />
);

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const WithTruncation = (args) => (
  <>
    <Pagination
      onChange={() => null}
      paginationAriaLabel="Pagination"
      pageCount={68}
      pageIndex={7}
      pageHref={() => '#'}
      language="en"
      siblingCount={0}
    />
    <Pagination
      onChange={() => null}
      paginationAriaLabel="Pagination"
      pageCount={68}
      pageIndex={7}
      pageHref={() => '#'}
      language="en"
    />
    <Pagination
      onChange={() => null}
      paginationAriaLabel="Pagination"
      pageCount={68}
      pageIndex={7}
      pageHref={() => '#'}
      language="en"
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
      onChange={() => null}
      paginationAriaLabel="Pagination"
      pageCount={68}
      pageIndex={7}
      pageHref={() => '#'}
      language="en"
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
      onChange={(event, index) => {
        event.preventDefault();
        setPageIndex(index);
      }}
      paginationAriaLabel="Pagination"
      pageCount={25}
      pageIndex={pageIndex}
      pageHref={() => '#'}
      siblingCount={1}
      language="en"
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
      onChange={() => null}
      paginationAriaLabel="Pagination"
      pageCount={5}
      pageIndex={0}
      pageHref={() => '#'}
      language="en"
      theme={theme}
    />
  );
};
