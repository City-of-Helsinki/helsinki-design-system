global.ResizeObserver =
  global.ResizeObserver ||
  function (callBack) {
    let observer = new MutationObserver(callBack);
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
