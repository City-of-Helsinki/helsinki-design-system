import to from 'await-to-js';

import HttpStatusCode from '../../../utils/httpStatusCode';
import { isAbortError } from './abortFetch';

export type HttpPoller = {
  start: () => void;
  stop: () => void;
};

export type HttpPollerProps = {
  pollFunction: () => Promise<Response | undefined>;
  shouldPoll: () => boolean;
  onError: (returnedHttpStatus?: number, error?: Error) => { keepPolling: boolean };
  onSuccess?: (response: Response) => { keepPolling: boolean };
  pollIntervalInMs?: number;
  onErrorStatusWhenAborted?: number;
};

const defaultPollIntervalInMs = 60000;

export function isSuccessfulHttpResponse(res?: Response) {
  if (!res) {
    return false;
  }
  const responseStatus = res && res.status;
  return responseStatus === HttpStatusCode.OK;
}

export default function createHttpPoller({
  pollFunction,
  shouldPoll,
  onError,
  onSuccess,
  pollIntervalInMs = defaultPollIntervalInMs,
  onErrorStatusWhenAborted,
}: HttpPollerProps): HttpPoller {
  let isPolling = false;
  let isForceStopped = false;
  let pollTimeoutId: ReturnType<typeof setTimeout> | undefined;

  const load = async (): Promise<[Error | null, Response | undefined]> => {
    isPolling = true;
    const result = await to(pollFunction());
    isPolling = false;
    return result;
  };

  const shouldCallPollFunction = (): boolean => {
    if (isPolling) {
      return false;
    }
    return shouldPoll();
  };

  const startTimer = () => {
    if (pollTimeoutId) {
      clearTimeout(pollTimeoutId);
    }
    pollTimeoutId = setTimeout(() => {
      pollTimeoutId = undefined;
      if (!shouldCallPollFunction()) {
        startTimer();
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      pollAndHandleResult();
    }, pollIntervalInMs);
  };

  const pollAndHandleResult = async (): Promise<void> => {
    const [err, data] = await load();
    if (isForceStopped) {
      return;
    }
    const responseStatus = data && data.status;
    const isErrorResponse = !isSuccessfulHttpResponse(data);
    const success = !err && !isErrorResponse;
    if (success && onSuccess) {
      const { keepPolling } = onSuccess(data as Response);
      if (!keepPolling) {
        return;
      }
    }
    if (err && isAbortError(err)) {
      if (onErrorStatusWhenAborted) {
        onError(onErrorStatusWhenAborted, err);
      }
      return;
    }
    if (success || onError(responseStatus, err).keepPolling) {
      startTimer();
    }
  };

  const stop = () => {
    if (pollTimeoutId) {
      clearTimeout(pollTimeoutId);
      pollTimeoutId = undefined;
    }
    isForceStopped = true;
  };

  return {
    start: () => {
      isForceStopped = false;
      startTimer();
    },
    stop,
  };
}
