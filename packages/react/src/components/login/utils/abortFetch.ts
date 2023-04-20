export function isAbortError(error: Error): boolean {
  return !!error && error.name === 'AbortError';
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
