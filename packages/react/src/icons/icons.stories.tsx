import path from 'path';

import React from 'react';

export default {
  title: 'Icons/Icons',
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: { disable: true },
  },
};

const sizes = ['extraSmall', 'small', 'medium', 'large', 'extraLarge'] as const;

const req = require.context('.', true, /Icon.*.tsx$/);
const icons = req.keys().map((fileName) => {
  const componentName = path.basename(fileName, '.tsx');
  const Component = req(fileName)[componentName];
  Component.displayName = componentName;
  return { componentName, Component };
});

export const AllIcons = () => (
  <div>
    {icons.map(({ componentName, Component }) => (
      <div key={componentName} style={{ marginBottom: 'var(--spacing-s)' }}>
        <div style={{ marginBottom: 'var(--spacing-2-xs)', fontWeight: 'bold' }}>{componentName}</div>
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'space-around',
            display: 'flex',
            maxWidth: 400,
            padding: 'var(--spacing-s)',
            color: 'var(--color-black)',
          }}
        >
          {sizes.map((size) => (
            <Component key={`icon-black-${size}`} size={size} />
          ))}
        </div>
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'space-around',
            display: 'flex',
            maxWidth: 400,
            padding: 'var(--spacing-s)',
            background: 'var(--color-black)',
          }}
        >
          {sizes.map((size) => (
            <Component key={`icon-white-${size}`} size={size} style={{ color: '#fff' }} />
          ))}
        </div>
      </div>
    ))}
  </div>
);
AllIcons.storyName = 'All Icons';
