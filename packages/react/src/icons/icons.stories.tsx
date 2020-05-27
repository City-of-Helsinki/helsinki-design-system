import path from 'path';

import React from 'react';
import { storiesOf } from '@storybook/react';

// todo: remove wrapper
const Wrapper = ({ children, color = 'var(--color-black)', style = {} }) => (
  <div
    style={{
      margin: '10px',
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
        {['xs', 's', 'm', 'l', 'xl'].map((size) => (
          <Wrapper key={`size-${size}`}>
            <Component size={size} />
          </Wrapper>
        ))}
      </div>
      <div style={{ background: 'var(--color-black)' }}>
        {['xs', 's', 'm', 'l', 'xl'].map((size) => (
          <Wrapper key={`size-${size}`} style={{ color: '#fff' }}>
            <Component size={size} />
          </Wrapper>
        ))}
      </div>
    </>
  ));
});
