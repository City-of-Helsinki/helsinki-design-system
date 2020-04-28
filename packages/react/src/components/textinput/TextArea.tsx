import React from 'react';

import InputWrapper, { InputWrapperProps } from './InputWrapper';
import styles from './InputWrapper.module.css';

export type TextAreaProps = {
  rows?: number;
  cols?: number;
} & InputWrapperProps;

const TextArea: React.FC<TextAreaProps> = ({ rows, cols, ...props }) => {
  const { defaultValue, labelledBy, disabled, id, readOnly, onChange, placeholder, value } = props;
  return (
    <InputWrapper {...props}>
      <textarea
        className={styles.input}
        defaultValue={defaultValue}
        aria-labelledby={labelledBy}
        disabled={disabled}
        id={id}
        readOnly={readOnly}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        rows={rows}
        cols={cols}
      />
    </InputWrapper>
  );
};

export default TextArea;
