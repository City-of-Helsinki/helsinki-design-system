import { cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useMediaQueryLessThan, useMediaQueryGreaterThan } from '../useMediaQuery';

/* This test suite changes window width but it's set to default 1024 after this is done. */
describe('useMediaQuery', () => {
  afterAll(cleanup);

  it('useMediaQueryLessThan returns correct value', () => {
    // Change the viewport to 500px
    global.innerWidth = 500;
    // Trigger the window resize event
    global.dispatchEvent(new Event('resize'));

    const isSmallView = renderHook(() => useMediaQueryLessThan('m'));
    const isMobileView = renderHook(() => useMediaQueryLessThan('xs'));

    expect(isSmallView.result.current).toBe(true);
    expect(isMobileView.result.current).toBe(false);
  });

  it('useMediaQueryLessThan reacts to window resize', () => {
    // Set the viewport width again just to be safe
    global.innerWidth = 600;
    // Trigger the window resize event
    global.dispatchEvent(new Event('resize'));

    const isMediumView = renderHook(() => useMediaQueryLessThan('m'));
    expect(isMediumView.result.current).toBe(true);

    // Set the viewport width again just to be safe
    global.innerWidth = 1000;
    // Trigger the window resize event
    global.dispatchEvent(new Event('resize'));

    expect(isMediumView.result.current).toBe(false);
  });

  it('useMediaQueryGreaterThan returns correct value', () => {
    // Set the viewport width again just to be safe
    global.innerWidth = 500;
    // Trigger the window resize event
    global.dispatchEvent(new Event('resize'));
    const isSmallView = renderHook(() => useMediaQueryGreaterThan('xs'));
    const isLargeView = renderHook(() => useMediaQueryGreaterThan('l'));

    expect(isSmallView.result.current).toBe(true);
    expect(isLargeView.result.current).toBe(false);
  });

  it('useMediaQueryGreaterThan reacts to window resize', () => {
    // Set the viewport width again just to be safe
    global.innerWidth = 800;
    // Trigger the window resize event
    global.dispatchEvent(new Event('resize'));

    const isMediumView = renderHook(() => useMediaQueryGreaterThan('m'));
    expect(isMediumView.result.current).toBe(true);

    // Set the viewport width again just to be safe
    global.innerWidth = 500;
    // Trigger the window resize event
    global.dispatchEvent(new Event('resize'));

    expect(isMediumView.result.current).toBe(false);
  });
});
