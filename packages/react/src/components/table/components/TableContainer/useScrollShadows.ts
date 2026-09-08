import { RefObject, useEffect } from 'react';

/**
 * Tolerance in pixels when comparing scroll positions. Browser zoom and scaled displays produce
 * fractional scroll positions and widths, so an exact comparison would leave the end shadow
 * visible even when the container is scrolled all the way to the end.
 */
const SCROLL_END_TOLERANCE = 1;

/**
 * The attributes are written only when the value changes, so scrolling does not invalidate styles
 * on every frame.
 */
const setShadowAttribute = (element: HTMLElement, side: 'start' | 'end', hasShadow: boolean) => {
  const attribute = `data-scroll-shadow-${side}`;
  const value = String(hasShadow);
  if (element.getAttribute(attribute) !== value) {
    element.setAttribute(attribute, value);
  }
};

/**
 * Tracks the horizontal scroll position of the table container and marks it with the
 * `data-scroll-shadow-start` and `data-scroll-shadow-end` attributes, which the stylesheet uses to
 * show or hide the scroll shadows. The attributes are set directly on the element instead of
 * through React state, so scrolling never re-renders the table.
 *
 * The shared `useResizeObserver` hook is not used here, because both the container and its content
 * need to be observed with the same observer and the changes should not be debounced.
 *
 * The shadows themselves are the pseudo elements of the container and come from the core styles.
 *
 * @param scrollContainerRef Ref to the scrolling container element.
 * @param contentRef Ref to the table element inside the scrolling container.
 */
export const useScrollShadows = (
  scrollContainerRef: RefObject<HTMLElement>,
  contentRef: RefObject<HTMLElement>,
): void => {
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return undefined;
    }

    const update = () => {
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      // scrollLeft is negative when the direction is rtl, so distances are compared instead of
      // raw values.
      const scrolled = Math.abs(scrollContainer.scrollLeft);
      const isScrollable = maxScroll > SCROLL_END_TOLERANCE;
      setShadowAttribute(scrollContainer, 'start', isScrollable && scrolled > SCROLL_END_TOLERANCE);
      setShadowAttribute(scrollContainer, 'end', isScrollable && scrolled < maxScroll - SCROLL_END_TOLERANCE);
    };

    update();
    scrollContainer.addEventListener('scroll', update, { passive: true });

    // Observing the container covers container resizing, and observing the content covers changed
    // rows, changed column widths and fonts finishing loading.
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(scrollContainer);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      scrollContainer.removeEventListener('scroll', update);
      resizeObserver.disconnect();
    };
  }, [scrollContainerRef, contentRef]);
};
