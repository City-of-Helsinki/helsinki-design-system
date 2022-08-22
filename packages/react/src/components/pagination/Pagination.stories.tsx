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
  <Pagination
    onChange={() => null}
    paginationAriaLabel="Pagination"
    pageCount={68}
    pageIndex={7}
    pageHref={() => '#'}
    language="en"
  />
);

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const withoutPrevAndNextButtons = (args) => {
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

withoutPrevAndNextButtons.storyName = 'Without prev and next buttons';

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
