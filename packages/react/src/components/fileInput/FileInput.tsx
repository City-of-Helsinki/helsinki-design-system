import React from 'react';

// import core base styles
import 'hds-core';
import classNames from '../../utils/classNames';
import { IconPlus } from './../../icons';
import { InputWrapper } from '../../internal/input-wrapper/InputWrapper';
import styles from './FileInput.module.scss';
import buttonStyles from '../button/Button.module.scss';

type AcceptProps =
  | {
      accept: string;
      acceptLabel: string;
    }
  | {
      accept?: undefined;
      acceptLabel?: undefined;
    };

export type FileInputProps = {
  id: string;
  name: string;
  label: string;
  className?: string;
} & AcceptProps;

export const FileInput = ({ id, name, label = 'Add files', accept, acceptLabel, className }: FileInputProps) => {
  const inputId = `${id}-input`;

  const wrapperProps = {
    className,
    errorText: undefined,
    helperText: acceptLabel,
    id,
    label,
    hideLabel: true,
    required: false,
  };

  return (
    <InputWrapper {...wrapperProps}>
      <div className={styles.fileInputWrapper}>
        <label className={classNames(styles.label, buttonStyles.button, buttonStyles.secondary)} htmlFor={inputId}>
          <IconPlus aria-hidden className={classNames(styles.icon, buttonStyles.icon)} />
          <span className={buttonStyles.label}>{label}</span>
          <input type="file" id={inputId} name={name} className={styles.fileInput} {...(accept ? { accept } : {})} />
        </label>
      </div>
    </InputWrapper>
  );
};
