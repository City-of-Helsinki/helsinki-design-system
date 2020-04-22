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
  iconStories[icon] = () => `
    <span class="hds-icon hds-icon--${icon}" style="width: 200px; height: 200px;"></span>
    <span class="hds-icon hds-icon--${icon}" style="width: 100px; height: 100px;"></span>
    <span class="hds-icon hds-icon--${icon}" style="width: 50px; height: 50px;"></span>
    <span class="hds-icon hds-icon--${icon}" style="width: 25px; height: 25px;"></span>
  `;
});
