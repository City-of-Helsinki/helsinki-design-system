import { configure, addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withRootAttribute } from 'storybook-addon-root-attribute';
import { jsxDecorator } from 'storybook-addon-jsx';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import './index.css';
import 'hds-core/lib/engel.css';

const viewports = {
  ...INITIAL_VIEWPORTS,
  ...{
    narrow: {
      name: 'Narrow full-height (320px)',
      styles: {
        width: '320px',
        height: '100%',
      },
    },
  },
};

addDecorator(jsxDecorator);

addDecorator(withA11y);
addParameters({
  options: {
    storySort: (a, b) => a[1].id.localeCompare(b[1].id),
  },
  viewport: {
    viewports,
  },
});

addDecorator(withRootAttribute);
addParameters({
  rootAttribute: {
    defaultState: {
      name: 'Theme: default',
      value: null,
    },
    states: [
      {
        name: 'Theme: Engel',
        value: 'engel',
      },
    ],
  },
});

const req = require.context('../src', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
