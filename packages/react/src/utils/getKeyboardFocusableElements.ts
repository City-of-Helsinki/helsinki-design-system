/**
 * Gets keyboard-focusable elements within a specified element
 * @param {HTMLElement} element
 */
export default (element = document): HTMLElement[] =>
  [
    // get all focusable elements
    ...element.querySelectorAll<HTMLElement>(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
    ),
    // filter out disabled elements
  ].filter((el) => !el.hasAttribute('disabled'));
