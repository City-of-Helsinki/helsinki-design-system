import path from 'path';
import { storiesOf } from "@storybook/html";

import './icons.css';
import './icon.css';

const req = require.context('.', true, /(icon\b-+).+?.css$/);

req.keys().forEach((fileName) => {
  const story = storiesOf(`Icons/Icons`, module)
  const icon = path.basename(fileName, '.css');
  const iconCapitalized = icon.charAt(0).toUpperCase() + icon.slice(1)
  const allSizes = () => {
    const all = ['xs', 's', 'm', 'l', 'xl'].reduce((acc, size) => {
      acc += `\n<span class="hds-icon hds-icon--${icon} hds-icon--size-${size}" aria-hidden="true" style="vertical-align: middle"></span>`;
      return acc;
    }, '');

    return `<style>.hds-icon {margin-right: var(--spacing-m);}</style>${all}`
  }

  story.add(iconCapitalized, allSizes);
});
