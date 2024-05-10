global.ResizeObserver =
  global.ResizeObserver ||
  function (callBack) {
    const wrapper = (entries) => {
      callBack(global.ResizeObserverEntrySpy ? global.ResizeObserverEntrySpy(entries) : entries);
    };
    let observer = new MutationObserver(wrapper);
    return {
      disconnect: () => {
        observer.disconnect();
        observer = undefined;
      },
      observe: (el) => {
        observer.observe(el, { childList: true, attributes: true, subtree: true });
      },
      unobserve: () => observer.unobserve(),
    };
  };
