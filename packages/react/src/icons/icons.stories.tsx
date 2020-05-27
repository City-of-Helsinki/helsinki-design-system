import path from 'path';

import React from 'react';
import { storiesOf } from '@storybook/react';

const Wrapper = ({ children, size, color = 'var(--color-black)', style = {} }) => (
  <div
    style={{
      margin: '10px',
      width: size,
      height: size,
      display: 'inline-block',
      verticalAlign: 'middle',
      color,
      ...style,
    }}
  >
    {children}
  </div>
);

const stories = storiesOf('Components/Icons', module);

const req = require.context('.', true, /Icon.*.tsx$/);
req.keys().forEach((fileName, index) => {
  const Component = req(fileName).default;
  const componentName = path.basename(fileName, '.tsx');
  Component.displayName = componentName;

  if (index === 0) {
    stories.addParameters({
      component: Component,
      docs: {
        disable: true,
      },
    });
  }

  stories.add(componentName, () => (
    <>
      <div>
        {[16, 24, 36, 48, 64].map((size) => (
          <Wrapper key={`size-${size}`} size={`${size}px`}>
            <Component />
          </Wrapper>
        ))}
      </div>
      <div style={{ background: 'var(--color-black)' }}>
        {[16, 24, 36, 48, 64].map((size) => (
          <Wrapper key={`size-${size}`} size={`${size}px`} style={{ color: '#fff' }}>
            <Component />
          </Wrapper>
        ))}
      </div>
    </>
  ));
});
