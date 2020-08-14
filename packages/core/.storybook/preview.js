import { addParameters, configure } from '@storybook/html';
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

addParameters({
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
  previewTabs: {
    canvas: {
      title: 'Example',
    },
    'storybookjs/notes/panel': {
      title: 'Source',
    },
  },
});

/**
 * Custom loader function that:
 * - adds the source code of each component story to the Source tab
 * - creates an "All" story for each component that combines all their stories
 */
const loaderFn = () => {
  const exports = [];
  const req = require.context('../src', true, /\.stories\.js$/);

  req.keys().forEach((fileName) => {
    const storyModule = req(fileName);
    // add the source code of each story to the Source tab
    const moduleStories = Object.entries(storyModule)
      .filter(([key]) => key !== 'default' && key !== 'All')
      .map(([key, component]) => {
        component.story = {
          ...component.story,
          parameters: {
            notes: '```html\n' + component() + '\n```',
          },
        };
        return [key, component];
      });
    // combine all the stories in the module to create the "All" story
    storyModule.All = () =>
      moduleStories.reduce((acc, [key, component]) => {
        const label = `<h4>${component?.story?.name ?? key}</h4>`;
        acc += `${label}${component()}`;
        return acc;
      }, '');
    // add the updated story module to exports
    exports.push(storyModule);
  });

  return exports;
};

configure(loaderFn, module);
