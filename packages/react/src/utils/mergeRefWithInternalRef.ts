import React, { RefObject } from 'react';
import { isFunction } from 'lodash';

export default (ref: React.Ref<HTMLInputElement>, internalRef: RefObject<HTMLInputElement>): void => {
  if (isFunction(ref)) {
    (ref as (instance: HTMLInputElement) => void)(internalRef.current);
  } else {
    // eslint-disable-next-line no-param-reassign
    (ref as React.MutableRefObject<HTMLInputElement>).current = internalRef.current;
  }
};
