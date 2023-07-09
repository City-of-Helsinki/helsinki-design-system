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

const req = require.context('.', true, /Icon.*.tsx$/);
req.keys().forEach((fileName, index) => {
  const story = storiesOf(`Icons/Icons`, module);
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
