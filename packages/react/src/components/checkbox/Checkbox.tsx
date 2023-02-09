import React, { useEffect, useRef } from 'react';

// import core base styles
import 'hds-core';
import styles from './Checkbox.module.css';
import classNames from '../../utils/classNames';
import mergeRefWithInternalRef from '../../utils/mergeRefWithInternalRef';

export type CheckboxProps = {
  /**
   * If `true`, the component is checked
   */
  checked?: boolean;
  /**
   * Additional class names to apply to the checkbox
   */
  className?: string;
  /**
   * If `true`, the checkbox will be disabled
   */
  disabled?: boolean;
  /**
   * The error text content that will be shown below the checkbox
   */
  errorText?: string;
  /**
   * The id of the input element
   */
  id: string;
  /**
   * Boolean indicating indeterminate status of the checkbox
   */
  indeterminate?: boolean;
  /**
   * The label for the checkbox
   */
  label?: string | React.ReactNode;
  /**
   * Callback fired when the state is changed
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Override or extend the styles applied to the component
   */
  style?: React.CSSProperties;
  /**
   * The value of the component
   */
  value?: string;
} & React.ComponentPropsWithoutRef<'input'>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked = false,
      className,
      disabled = false,
      errorText,
      id,
      indeterminate,
      label,
      onChange = () => null,
      style,
      value,
      ...rest
    }: CheckboxProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (ref) {
        /**
         * Merge props.ref to the internal ref. This is needed because we need the ref ourself and cannot rely on
         * component user to provide it.
         */
        mergeRefWithInternalRef(ref, inputRef);
      }
      inputRef.current.indeterminate = indeterminate;
    }, [inputRef, ref, indeterminate]);

    if (label && typeof label !== 'string' && typeof label !== 'number') {
      // eslint-disable-next-line no-console
      console.warn(
        'Using ReactElement as a label is against good usability and accessibility practices. Please prefer plain strings.',
      );
    }

    return (
      <div className={classNames(styles.checkbox, className)} style={style}>
        <input
          ref={inputRef}
          id={id}
          className={classNames(styles.input)}
          onChange={onChange}
          value={value}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          aria-describedby={errorText ? `${id}-error` : null}
          {...rest}
        />
        <label htmlFor={id} className={classNames(styles.label)}>
          {label}
        </label>
        {errorText && (
          <div className={styles.errorText} id={`${id}-error`}>
            {errorText}
          </div>
        )}
      </div>
    );
  },
);
