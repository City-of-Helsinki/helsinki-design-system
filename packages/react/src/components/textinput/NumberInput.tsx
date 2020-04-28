import React from 'react';

import InputWrapper, { InputWrapperProps } from './InputWrapper';
import styles from './InputWrapper.module.css';

export type NumberInputProps = {
  step?: number;
  defaultValue?: number;
  value?: number;
  min?: number;
  max?: number;
} & InputWrapperProps;

const NumberInput: React.FC<NumberInputProps> = ({ step, defaultValue, value, min, max, ...props }) => {
  const { labelledBy, disabled, id, readOnly, onChange, placeholder } = props;
  return (
    <InputWrapper {...props}>
      <input
        type="number"
        step={step}
        className={styles.input}
        defaultValue={defaultValue}
        aria-labelledby={labelledBy}
        disabled={disabled}
        id={id}
        readOnly={readOnly}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        min={min}
        max={max}
      />
    </InputWrapper>
  );
};

export default NumberInput;
