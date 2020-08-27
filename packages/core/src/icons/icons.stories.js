import path from 'path';

import './all.css';
import './icon.css';

export default {
  title: 'Icons/Icons',
  decorators: [(storyFn) => `<style>.hds-icon {margin-right: var(--spacing-m);}</style>${storyFn()}`],
};

const iconStories = require(__filename);
const req = require.context('.', true, /(icon\b-+).+?.css$/);

req.keys().forEach((fileName) => {
  const icon = path.basename(fileName, '.css').substring('icon-'.length);
  iconStories[icon] = () =>
    ['xs', 's', 'm', 'l', 'xl'].reduce((acc, size) => {
      acc += `<i class="hds-icon hds-icon--${icon} hds-icon--size-${size}" aria-hidden="true" style="vertical-align: middle"></i>`;
      return acc;
    }, '');
});
