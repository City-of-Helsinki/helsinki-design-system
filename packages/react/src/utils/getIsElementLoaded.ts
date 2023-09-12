/**
 * Query the DOM element with the given selector until it's found
 * @param {string} selector
 * @example
 * ```ts
 * const element = await isElementLoaded('#example');
 * ```
 */
export default async (selector: string): Promise<HTMLElement | null> => {
  while (document.querySelector(selector) === null) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
  return document.querySelector(selector) as HTMLElement;
};
