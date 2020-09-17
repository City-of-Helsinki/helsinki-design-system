import path from 'path';

import React from 'react';
import { storiesOf } from '@storybook/react';

const Wrapper = ({ children, color = 'var(--color-black)', style = {} }) => (
  <div
    style={{
      alignItems: 'center',
      justifyContent: 'space-around',
      display: 'flex',
      maxWidth: 400,
      padding: 'var(--spacing-s)',
      color,
      ...style,
    }}
  >
    {children}
  </div>
);

const storyKindMapping = [
  { category: 'ui', name: 'UI' },
  { category: 'some', name: 'SoMe' },
];

const req = require.context('.', true, /Icon.*.tsx$/);
req.keys().forEach((fileName, index) => {
  const category = fileName.substring(fileName.indexOf('/') + 1, fileName.lastIndexOf('/'));
  const kind = storyKindMapping.find((item) => item.category === category)?.name;
  const story = storiesOf(`Icons/${kind}`, module);
  const componentName = path.basename(fileName, '.tsx');
  const Component = req(fileName)[componentName];
  Component.displayName = componentName;

  if (index === 0) {
    story.addParameters({
      component: Component,
      controls: { hideNoControlsWarning: true },
      docs: {
        disable: true,
      },
    });
  }

  story.add(componentName, () => (
    <>
      <Wrapper>
        {['xs', 's', 'm', 'l', 'xl'].map((size) => (
          <Component key={`icon-black-${size}`} size={size} />
        ))}
      </Wrapper>
      <Wrapper style={{ background: 'var(--color-black)' }}>
        {['xs', 's', 'm', 'l', 'xl'].map((size) => (
          <Component key={`icon-white-${size}`} size={size} style={{ color: '#fff' }} />
        ))}
      </Wrapper>
    </>
  ));
});
