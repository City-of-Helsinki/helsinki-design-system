export function isAbortError(error: Error): boolean {
  return !!error && error.name === 'AbortError';
}

export function appendAbortSignal(target: Parameters<typeof fetch>[1]): AbortController['abort'] {
  const abortController = new AbortController();
  // eslint-disable-next-line no-param-reassign
  target.signal = abortController.signal;
  return (reason?: unknown) => {
    abortController.abort(reason);
  };
}

export function createFetchAborter() {
  let isAborted = false;
  let abortController: AbortController | undefined;
  const abort = () => {
    if (isAborted || !abortController) {
      return;
    }
    isAborted = true;
    abortController.abort();
    abortController = undefined;
  };
  return {
    isAborted: () => isAborted,
    getSignal: () => {
      abort();
      isAborted = false;
      abortController = new AbortController();
      return abortController.signal;
    },
    abort,
  };
}
