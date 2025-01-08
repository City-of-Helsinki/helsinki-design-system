class CancelledPromiseError extends Error {}

/**
 * @internal
 * Cancellable promise wrapper
 */
export const cancellablePromise = <ReturnType>(promise: Promise<ReturnType>) => {
  let isCancelled = false;
  const wrappedPromise = new Promise<ReturnType>((res, rej) => {
    promise
      .then((value) => {
        if (isCancelled) {
          throw new CancelledPromiseError();
        } else {
          res(value);
        }
      })
      .catch((error) => {
        if (!(error instanceof CancelledPromiseError)) {
          rej(error);
        }
      });
  });
  return {
    promise: wrappedPromise,
    cancel: () => {
      isCancelled = true;
    },
  };
};
