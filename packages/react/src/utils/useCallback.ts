import { EventHandler, useCallback } from 'react';

export const useCallbackIfDefined = (callback) => {
  const handler = (event) => {
    if (callback) callback(event);
  };

  return useCallback(handler, [callback]);
};

export const useEnterOrSpacePressCallback = (callback) => {
  const handler = (event) => {
    if (event.key === 'Enter' || event.key === ' ') callback(event);
  };

  return useCallbackIfDefined(handler);
};

export const withDefaultPrevented = (callback: EventHandler<never>) =>
  function patchedCallback(event) {
    event.preventDefault();
    return callback.call(callback, event);
  };

export const withPropagationStopping = (callback: EventHandler<never>) =>
  function patchedCallback(event) {
    event.stopPropagation();
    return callback.call(callback, event);
  };
