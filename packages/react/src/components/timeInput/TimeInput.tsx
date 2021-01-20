import 'hds-core';
import React, { useRef, useEffect, useLayoutEffect } from 'react';
import Cleave from 'cleave.js';
import isFunction from 'lodash.isfunction';

import { TextInput, TextInputProps } from '../textInput';

export const TimeInput = React.forwardRef<HTMLInputElement, TextInputProps>((textInputProps, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Merge props.ref to the internal ref
   */
  useLayoutEffect(() => {
    if (ref) {
      if (isFunction(ref)) {
        (ref as (instance: HTMLInputElement) => void)(inputRef.current);
      } else {
        // eslint-disable-next-line no-param-reassign
        (ref as React.MutableRefObject<HTMLInputElement>).current = inputRef.current;
      }
    }
  }, [inputRef, ref]);

  /**
   * Initialize Cleave.js
   */
  useEffect(() => {
    const input = inputRef.current;
    const cleave = new Cleave(input, {
      delimiter: ':',
      time: true,
      timePattern: ['h', 'm'],
    });
    return () => {
      cleave.destroy();
    };
  }, []);

  return <TextInput {...textInputProps} placeholder="hh:mm" ref={inputRef} />;
});
