import path from 'path';

import './icons.css';
import './icon.css';

export default {
  title: 'Icons/Icons',
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: { disable: true },
  },
};

const req = require.context('.', true, /^(?!icon).+?.css$/);
const icons = req.keys().map((fileName) => {
  const icon = path.basename(fileName, '.css');
  const iconCapitalized = icon.charAt(0).toUpperCase() + icon.slice(1);
  return { icon, iconCapitalized };
});

export const AllIcons = () => {
  const html = icons.map(({ icon, iconCapitalized }) => {
    const sizes = ['xs', 's', 'm', 'l', 'xl'].map((size) =>
      `<span class="hds-icon hds-icon--${icon} hds-icon--size-${size}" aria-hidden="true" style="vertical-align: middle; margin-right: var(--spacing-m)"></span>`
    ).join('\n');
    return `<div style="margin-bottom: var(--spacing-s)"><strong>${iconCapitalized}</strong><br/>${sizes}</div>`;
  }).join('\n');
  return html;
};
AllIcons.storyName = 'All Icons';
