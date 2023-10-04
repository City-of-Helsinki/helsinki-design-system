import { cleanup, fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useMediaQueryLessThan, useMediaQueryGreaterThan } from '../useMediaQuery';

/* This test suite changes window width but it's set to default 1024 after this is done. */
describe('useMediaQuery', () => {
  const defaultInnerWidth = global.innerWidth;
  afterAll(() => {
    cleanup();
    global.innerWidth = defaultInnerWidth;
  });

  it('useMediaQueryLessThan returns correct value', () => {
    // Trigger the window resize event
    act(() => {
      // Change the viewport to 500px
      global.innerWidth = 500;
      fireEvent(window, new Event('resize'));
    });

    const isSmallView = renderHook(() => useMediaQueryLessThan('m'));
    const isMobileView = renderHook(() => useMediaQueryLessThan('xs'));

    expect(isSmallView.result.current).toBe(true);
    expect(isMobileView.result.current).toBe(false);
  });

  it('useMediaQueryLessThan reacts to window resize', () => {
    // Trigger the window resize event
    act(() => {
      // Set the viewport width to be under medium breakpoint
      global.innerWidth = 600;
      fireEvent(window, new Event('resize'));
    });

    const isMediumView = renderHook(() => useMediaQueryLessThan('m'));
    expect(isMediumView.result.current).toBe(true);

    // Trigger the window resize event
    act(() => {
      // Set the viewport width to over medium breakpoint
      global.innerWidth = 1000;
      fireEvent(window, new Event('resize'));
    });

    expect(isMediumView.result.current).toBe(false);
  });

  it('useMediaQueryGreaterThan returns correct value', () => {
    // Trigger the window resize event
    act(() => {
      // Set the viewport width to small
      global.innerWidth = 500;
      fireEvent(window, new Event('resize'));
    });
    const isSmallView = renderHook(() => useMediaQueryGreaterThan('xs'));
    const isLargeView = renderHook(() => useMediaQueryGreaterThan('l'));

    expect(isSmallView.result.current).toBe(true);
    expect(isLargeView.result.current).toBe(false);
  });

  it('useMediaQueryGreaterThan reacts to window resize', () => {
    // Trigger the window resize event
    act(() => {
      // Set the viewport width to over medium
      global.innerWidth = 800;
      fireEvent(window, new Event('resize'));
    });

    const isMediumView = renderHook(() => useMediaQueryGreaterThan('m'));
    expect(isMediumView.result.current).toBe(true);

    // Trigger the window resize event
    act(() => {
      // Set the viewport width to small
      global.innerWidth = 500;
      fireEvent(window, new Event('resize'));
    });

    expect(isMediumView.result.current).toBe(false);
  });
});
