export const scrollIntoViewIfNeeded = (target: HTMLElement) => {
  const isOptsSupported = 'scrollBehavior' in document.documentElement.style;

  // Target is outside the viewport from the bottom
  if (target.getBoundingClientRect().bottom > window.innerHeight) {
    target.scrollIntoView(isOptsSupported ? { block: 'end', inline: 'nearest', behavior: 'smooth' } : false);
  }

  // Target is outside the view from the top
  if (target.getBoundingClientRect().top < 0) {
    target.scrollIntoView(isOptsSupported ? { block: 'start', inline: 'nearest', behavior: 'smooth' } : true);
  }
};
