import React, { ChangeEventHandler, CSSProperties, ReactNode, Ref } from 'react';

import styles from './RadioButton.module.css';
import classNames from '../../utils/classNames';

export type RadioButtonProps = React.ComponentPropsWithoutRef<'input'> & {
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
   * @deprecated
   */
  labelText?: string;
  /**
   * Callback fired when the state is changed
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * Override or extend the styles applied to the component
   */
  style?: CSSProperties;
  /**
   * The value of the component
   */
  value?: string;
};

const RadioButton = React.forwardRef(
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

export default RadioButton;
