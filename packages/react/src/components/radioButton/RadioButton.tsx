import React from 'react';

// import core base styles
import 'hds-core';
import styles from './RadioButton.module.css';
import classNames from '../../utils/classNames';

export type RadioButtonProps = {
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

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      checked = false,
      className = '',
      disabled = false,
      id,
      label,
      onChange = () => null,
      style,
      value,
      ...rest
    }: RadioButtonProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    if (label && typeof label !== 'string' && typeof label !== 'number') {
      // eslint-disable-next-line no-console
      console.warn(
        'Using ReactElement as a label is against good usability and accessibility practices. Please prefer plain strings.',
      );
    }

    return (
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
          {...rest}
        />
        <label htmlFor={id} className={classNames(styles.label)}>
          {label}
        </label>
      </div>
    );
  },
);
RadioButton.displayName = 'RadioButton';
