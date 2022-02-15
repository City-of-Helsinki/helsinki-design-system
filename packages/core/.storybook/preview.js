import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import './index.css';
import '../src/base.css';

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

export const parameters = {
  options: {
    storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
  },
  viewport: {
    viewports,
  },
  backgrounds: {
    default: 'White',
    values: [
      { name: 'White', value: '#fff' },
      { name: 'Black', value: '#111' },
    ],
  },
};
