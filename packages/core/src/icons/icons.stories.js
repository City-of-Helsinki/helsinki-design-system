import path from 'path';

import './all.css';
import './icon.css';

export default {
  title: 'Icons',
  decorators: [(storyFn) => `<style>.hds-icon {margin-right: 1rem;}</style>${storyFn()}`],
};

const iconStories = require(__filename);
const req = require.context('.', false, /(icon\b-+).+?.css$/);
req.keys().forEach((fileName) => {
  const icon = path.basename(fileName, '.css').substring(5);
  iconStories[icon] = () =>
    [200, 100, 50, 25].reduce((acc, size) => {
      acc += `<span class="hds-icon hds-icon--${icon}" style="width: ${size}px; height: ${size}px;"></span>`;
      return acc;
    }, '');
});
