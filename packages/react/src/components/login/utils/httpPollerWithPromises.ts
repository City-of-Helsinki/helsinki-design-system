import to from 'await-to-js';

import createHttpPoller, { HttpPoller, isSuccessfulHttpResponse } from './httpPoller';
import { isAbortError } from './abortFetch';

export type RetryingPollerProps = {
  pollFunction: () => Promise<Response | undefined>;
  pollIntervalInMs?: number;
  maxRetries?: number;
};

export default async function retryPollingUntilSuccessful({
  pollFunction,
  pollIntervalInMs = 1000,
  maxRetries = 10,
}: RetryingPollerProps): Promise<Response> {
  const [err, response] = await to(pollFunction());
  if (!err && response && isSuccessfulHttpResponse(response)) {
    return Promise.resolve(response);
  }
  if (!maxRetries || (err && isAbortError(err))) {
    return Promise.reject(err);
  }
  const abortStatusCode = -1;
  let retries = maxRetries;
  let poller: HttpPoller | undefined;
  const removePoller = () => {
    if (poller) {
      poller.stop();
    }
    poller = undefined;
  };
  return new Promise((resolve, reject) => {
    poller = createHttpPoller({
      pollFunction: async () => pollFunction(),
      onSuccess: (successResponse) => {
        retries = 0;
        resolve(successResponse);
        return { keepPolling: false };
      },
      onError: (status, error) => {
        if (status === abortStatusCode) {
          retries = 0;
          reject(error);
          return { keepPolling: false };
        }
        retries -= 1;
        const keepPolling = retries > 0;
        if (!keepPolling) {
          reject(new Error('Max retries reached'));
        }
        return { keepPolling };
      },
      shouldPoll: () => retries > 0,
      pollIntervalInMs,
      onErrorStatusWhenAborted: abortStatusCode,
    });
    poller.start();
  })
    .then((r) => Promise.resolve(r as Response))
    .catch((e) => Promise.reject(e))
    .finally(() => removePoller());
}
