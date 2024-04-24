import React, { useCallback, useMemo, useState } from 'react';

import { Button } from '../../button';
import { TestClass } from '../classes/testClass';

// This is used to test "/classes" in React and Storybook
// See also https://github.com/Wildhoney/ReactShadow
export const ClassComponent = () => {
  const [count, force] = useState(0);
  const forceRender = useCallback(() => {
    force((p) => p + 1);
  }, []);
  const instanceRef = useMemo(() => {
    return new TestClass();
  }, []);
  return (
    <div>
      <Button onClick={forceRender}>Re-render</Button>
      <p>Render count is {count}.</p>
      <p>Test class uid is {instanceRef.uid}</p>
    </div>
  );
};
