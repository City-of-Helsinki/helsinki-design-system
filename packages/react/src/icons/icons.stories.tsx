import path from 'path';

import React from 'react';
import { storiesOf } from '@storybook/react';

const Wrapper = ({ children, size }) => (
  <div
    style={{
      margin: '10px',
      width: size,
      height: size,
      display: 'inline-block',
      verticalAlign: 'middle',
    }}
  >
    {children}
  </div>
);

const stories = storiesOf('Icons', module);

const makeSvgStyleRules = (color: string) => ({
  fill: color,
  stroke: color,
  // Some icons rely on stroke for color; some will break if stroke is applied.
  // Because of that, we apply a stroke, but set it as 0 so only icons with
  // explicit stroke-width declarations will be 'stroked'.
  strokeWidth: 0,
  padding: '10px',
});

const req = require.context('.', false, /^.\/Icon.*.tsx$/);
req.keys().forEach(fileName => {
  const Component = req(fileName).default;
  const componentName = path.basename(fileName, '.tsx');
  Component.displayName = componentName;

  stories.add(componentName, () => (
    <>
      <div style={makeSvgStyleRules('#333')}>
        <Wrapper size="200px">
          <Component />
        </Wrapper>
        <Wrapper size="100px">
          <Component />
        </Wrapper>
        <Wrapper size="50px">
          <Component />
        </Wrapper>
        <Wrapper size="25px">
          <Component />
        </Wrapper>
      </div>
      <div style={{ background: '#333', ...makeSvgStyleRules('#fff') }}>
        <Wrapper size="200px">
          <Component />
        </Wrapper>
        <Wrapper size="100px">
          <Component />
        </Wrapper>
        <Wrapper size="50px">
          <Component />
        </Wrapper>
        <Wrapper size="25px">
          <Component />
        </Wrapper>
      </div>
    </>
  ));
});
