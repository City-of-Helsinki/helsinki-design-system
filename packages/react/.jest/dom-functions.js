Object.defineProperties(window.HTMLElement.prototype, {
  scrollIntoView: {
    configurable: true,
    enumerable: true,
    get() {
      return () => {};
    },
  },
});
