import React from 'react';

/**
 * Utility function to prevent focus and pointer events on elements outside a modal container.
 * Used by HeaderActionBar mobile menu and HeaderActionBarItem dropdowns.
 */
export const addDocumentFocusPrevention = (
  modalContainer: HTMLElement,
  originalTabIndexes: React.MutableRefObject<Map<Element, string | null>>,
  blockPointerEvents = false,
) => {
  // Get all focusable elements that are outside the modal container
  const focusableElements = [
    ...Array.from(
      document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), details, summary',
      ),
    ),
    // Also add elements with a tabindex attribute
    ...Array.from(document.querySelectorAll('[tabindex]')),
    // And elements that can scroll
    ...Array.from(document.querySelectorAll('[style*="overflow"]')),
  ].filter((element) => !modalContainer.contains(element));

  // Save original tabindex values and set to -1
  focusableElements.forEach((element) => {
    const currentTabindex = element.getAttribute('tabindex');
    originalTabIndexes.current.set(element, currentTabindex);
    element.setAttribute('tabindex', '-1');

    // Also block pointer events if requested
    if (blockPointerEvents) {
      const htmlElement = element as HTMLElement;
      const originalPointerEvents = htmlElement.style.pointerEvents;
      // Store the original pointer events value (we'll use a data attribute for this)
      htmlElement.dataset.originalPointerEvents = originalPointerEvents || '';
      htmlElement.style.pointerEvents = 'none';
    }
  });

  // Return cleanup function
  return () => {
    originalTabIndexes.current.forEach((originalValue, element) => {
      if (originalValue === null) {
        element.removeAttribute('tabindex');
      } else {
        element.setAttribute('tabindex', originalValue);
      }

      // Restore pointer events if they were blocked
      if (blockPointerEvents) {
        const htmlElement = element as HTMLElement;
        const { dataset } = htmlElement;
        const { originalPointerEvents } = dataset;
        if (originalPointerEvents !== undefined) {
          htmlElement.style.pointerEvents = originalPointerEvents;
          delete dataset.originalPointerEvents;
        }
      }
    });
    originalTabIndexes.current.clear();
  };
};
