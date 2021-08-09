import React from 'react';

// import core base styles
import 'hds-core';
import classNames from '../../utils/classNames';
import { IconPlus } from './../../icons';
import styles from './FileInput.module.scss';
import buttonStyles from '../button/Button.module.scss';

export type FileInputProps = {
  id: string;
  name: string;
  label: string;
  accept?: string;
};

export const FileInput = ({ id, name, label = 'Add files', accept }: FileInputProps) => {
  const inputId = `${id}-input`;

  return (
    <div className={styles.fileInputWrapper}>
      <label className={classNames(styles.label, buttonStyles.button, buttonStyles.secondary)} htmlFor={inputId}>
        <IconPlus aria-hidden className={classNames(styles.icon, buttonStyles.icon)} />
        <span className={buttonStyles.label}>{label}</span>
        <input type="file" id={inputId} name={name} className={styles.fileInput} {...(accept ? { accept } : {})} />
      </label>
    </div>
  );
};
