import path from 'path';

import './all.css';
import './icon.css';

export default {
  title: 'Icons',
  decorators: [(storyFn) => `<style>.hds-icon {margin-right: var(--spacing-m);}</style>${storyFn()}`],
};

const iconStories = require(__filename);
const req = require.context('.', true, /(icon\b-+).+?.css$/);
req.keys().forEach((fileName) => {
  const icon = path.basename(fileName, '.css').substring('icon-'.length);
  iconStories[icon] = () =>
    [16, 24, 36, 48, 64].reduce((acc, size) => {
      acc += `<span class="hds-icon hds-icon--${icon}" style="width: ${size}px; height: ${size}px;"></span>`;
      return acc;
    }, '');
});
