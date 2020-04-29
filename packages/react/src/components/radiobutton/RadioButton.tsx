import React, { ChangeEventHandler, CSSProperties, FC, InputHTMLAttributes, RefObject } from 'react';

import styles from './RadioButton.module.css';
import classNames from '../../utils/classNames';

export type RadioButtonProps = InputHTMLAttributes<HTMLInputElement> & {
  /**
   * If `true`, the component is checked
   */
  checked?: boolean;
  /**
   * Additional class names to apply to the radio button
   */
  className?: string;
  /**
   * If `true`, the radio button will be disabled
   */
  disabled?: boolean;
  /**
   * The id of the input element
   */
  id: string;
  /**
   * The label for the radio button
   */
  labelText?: string;
  /**
   * Callback fired when the state is changed
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * Override or extend the styles applied to the component. See radio button [tokens](https://city-of-helsinki.github.io/helsinki-design-system/components/checkbox#tokens) for available CSS variables
   */
  style?: CSSProperties;
  /**
   * The value of the component
   */
  value?: string;
};

const RadioButton: FC<RadioButtonProps> = React.forwardRef(
  (
    {
      checked = false,
      className = '',
      disabled = false,
      id,
      labelText = undefined,
      onChange = () => null,
      style,
      value,
      ...rest
    }: RadioButtonProps,
    ref: RefObject<HTMLInputElement>,
  ) => (
    <div className={classNames(styles.radioButton, className)} style={style}>
      <input
        ref={ref}
        id={id}
        className={classNames(styles.input)}
        onChange={onChange}
        value={value}
        type="radio"
        disabled={disabled}
        checked={checked}
        aria-checked={checked}
        {...rest}
      />
      <label htmlFor={id} className={classNames(styles.label)}>
        {labelText}
      </label>
    </div>
  ),
);

export default RadioButton;
