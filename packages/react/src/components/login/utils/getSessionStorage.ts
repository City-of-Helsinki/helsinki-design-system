import { noop } from 'lodash';

import { isSsrEnvironment } from '../../../utils/isSsrEnvironment';

export function getSessionStorage(): Storage {
  if (isSsrEnvironment()) {
    return {
      length: 0,
      clear: noop,
      removeItem: noop,
      setItem: noop,
      getItem: () => null,
      key: () => null,
    };
  }

  return window.sessionStorage;
}
