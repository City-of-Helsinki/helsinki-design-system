import { cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useMediaQueryLessThan, useMediaQueryGreaterThan } from '../useMediaQuery';

describe('useMediaQuery', () => {
  beforeEach(cleanup);
  it('useMediaQueryLessThan returns correct value', () => {
    // By default the window.innerWidth is 1024px
    const isSmallView = renderHook(() => useMediaQueryLessThan('s'));
    const isLargeView = renderHook(() => useMediaQueryLessThan('xl'));

    expect(isSmallView.result.current).toBe(false);
    expect(isLargeView.result.current).toBe(true);
  });
  it('useMediaQueryGreaterThan returns correct value', () => {
    // By default the window.innerWidth is 1024px
    const isLargeView = renderHook(() => useMediaQueryGreaterThan('s'));
    const isXLargeView = renderHook(() => useMediaQueryGreaterThan('xl'));

    expect(isLargeView.result.current).toBe(true);
    expect(isXLargeView.result.current).toBe(false);
  });
});
