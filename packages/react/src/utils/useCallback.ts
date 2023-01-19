import { KeyboardEventHandler, useCallback } from 'react';

export const useEnterOrSpacePressCallback = (callback: KeyboardEventHandler) => {
  const handler: KeyboardEventHandler = (event) => {
    if (!callback) return;
    if (event.key === 'Enter' || event.key === ' ') callback(event);
  };

  return useCallback(handler, [callback]);
};

export const useCallbackIfDefined = (callback) => {
  const handler = (event) => {
    if (callback) callback(event);
  };

  return useCallback(handler, [callback]);
};
