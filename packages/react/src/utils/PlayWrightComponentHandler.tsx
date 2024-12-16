import React, { isValidElement, PropsWithChildren, useState } from 'react';

import { Button } from '../components';
import { componentContainerTestId, getPlayWrightProps, showButtonTestId, wrapperTestId } from './playWrightHelpers';

export function PlayWrightComponentHandler({ children }: PropsWithChildren<unknown>) {
  const [show, updateShow] = useState(false);

  const clone = (component: React.ReactNode) => {
    const child = [component, component && component[0]].filter(isValidElement)[0] as unknown as
      | React.FunctionComponentElement<unknown>
      | React.ReactElement
      | null;
    if (!child) {
      return null;
    }
    return React.cloneElement(child, { ...child.props, ...getPlayWrightProps() });
  };
  return (
    <div data-testid={wrapperTestId} data-json="">
      {show && <div data-testid={componentContainerTestId}>{clone(children)}</div>}
      <div data-testid="playwright-test-controls">
        <Button
          data-testid={showButtonTestId}
          onClick={() => {
            updateShow(!show);
          }}
        >
          Show/Hide
        </Button>
      </div>
    </div>
  );
}
