import React from 'react';

import Icon from '../../icons/IconCheck';
import styles from './checkbox.module.css';

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox: React.SFC<CheckboxProps> = ({ checked, disabled, onChange }) => {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} />
      <span className={styles.overlay}>
        <Icon />
      </span>
    </label>
  );
};

export default Checkbox;
