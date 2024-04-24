import React from 'react';
import { render } from '@testing-library/react';

import { ClassComponent } from './ClassComponent';

describe('<ClassComponent /> spec', () => {
  const targetId = 'host';
  const getTargetElement = () => {
    return document.getElementById(targetId) as HTMLElement;
  };

  const getTargetShadowRoot = () => {
    return getTargetElement().shadowRoot as ShadowRoot;
  };

  beforeEach(() => {
    const el = getTargetElement();
    if (el) {
      el.remove();
    }
  });

  it('renders the shadow dom elements', () => {
    render(<ClassComponent />);
    expect(getTargetElement()).not.toBeNull();
    expect(getTargetShadowRoot().getElementById('uid-span')).not.toBeNull();
  });
});
