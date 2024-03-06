// https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/
export async function sequentialAsyncLoop<T = unknown>(
  initialValue: T,
  loop: Array<(current: T, index: number) => Promise<T>>,
): Promise<T> {
  let error: Error | undefined;
  const finalResult = await loop.reduce(
    async (previousPromise, nextFunc, i) => {
      return previousPromise
        .then((value) => {
          if (error) {
            return Promise.reject(error);
          }
          return nextFunc(value as T, i);
        })
        .catch((e) => {
          error = e;
          return Promise.reject(e);
        });
    },
    new Promise((res) => {
      res(initialValue);
    }),
  );
  return error ? Promise.reject(error) : Promise.resolve(finalResult as T);
}
