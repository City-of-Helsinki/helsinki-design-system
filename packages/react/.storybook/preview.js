import React from 'react';
import { Props, Stories, Title } from '@storybook/addon-docs/dist/blocks';
import { addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import './index.css';

const viewports = {
  ...INITIAL_VIEWPORTS,
  narrow: {
    name: 'Narrow full-height (320px)',
    styles: {
      width: '320px',
      height: '100%',
    },
  },
};

addParameters({
  options: {
    storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
  },
  viewport: {
    viewports,
  },
  docs: {
    page: () => (
      <>
        <Title>Props</Title>
        <Props />
        <Stories title="Examples" includePrimary />
      </>
    ),
  },
  backgrounds: {
    default: 'White',
    values: [
      { name: 'White', value: '#fff' },
      { name: 'Black', value: '#111' },
    ],
  },
});
