import React from 'react';

import styles from './RadioButton.module.css';
import classNames from '../../utils/classNames';

export type RadioButtonProps = React.InputHTMLAttributes<HTMLInputElement> & {
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
    }: RadioButtonProps,
    ref: React.RefObject<HTMLInputElement>,
  ) => (
    <div className={classNames(styles.radioButton, className)}>
      <input
        ref={ref}
        id={id}
        onChange={onChange}
        value={value}
        name={name}
        type="radio"
        disabled={disabled}
        checked={checked}
        aria-checked={checked}
        {...rest}
      />
      <label htmlFor={id}>{labelText}</label>
    </div>
  ),
);
