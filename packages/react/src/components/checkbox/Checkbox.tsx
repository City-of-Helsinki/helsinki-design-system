import React from 'react';

import styles from './Checkbox.module.css';
import classNames from '../../utils/classNames';

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  id: string;
  labelText?: string;
};

export default React.forwardRef(
  (
    {
      checked = false,
      className = '',
      disabled = false,
      id,
      labelText = undefined,
      name = undefined,
      onChange = () => null,
      value,
      ...rest
    }: CheckboxProps,
    ref: React.RefObject<HTMLInputElement>,
  ) => (
    <div className={classNames(styles.checkbox, className)}>
      <input
        ref={ref}
        id={id}
        onChange={onChange}
        value={value}
        name={name}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        aria-checked={checked}
        {...rest}
      />
      <label htmlFor={id}>{labelText}</label>
    </div>
  ),
);
