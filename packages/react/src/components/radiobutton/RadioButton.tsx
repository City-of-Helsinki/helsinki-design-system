import React, { ChangeEventHandler, CSSProperties, FC, InputHTMLAttributes, ReactNode, Ref } from 'react';

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
  label?: string | ReactNode;
  /**
   * **[DEPRECATED]** This prop will be removed in a future version. Use the `label` prop instead
   */
  labelText?: string;
  /**
   * Callback fired when the state is changed
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * Override or extend the styles applied to the component. See radio button [tokens](https://city-of-helsinki.github.io/helsinki-design-system/components/radio-button#tokens) for available CSS variables
   */
  style?: CSSProperties;
  /**
   * The value of the component
   */
  value?: string;
};

export const RadioButton: FC<RadioButtonProps> = React.forwardRef(
  (
    {
      checked = false,
      className = '',
      disabled = false,
      id,
      label,
      labelText,
      onChange = () => null,
      style,
      value,
      ...rest
    }: RadioButtonProps,
    ref: Ref<HTMLInputElement>,
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
        {label || labelText}
      </label>
    </div>
  ),
);
