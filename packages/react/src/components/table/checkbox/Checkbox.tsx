import React from 'react';
import classNames from 'classnames';

import styles from './checkbox.module.scss';
import IconCheck from '../../../icons/IconCheck';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox: React.SFC<Props> = ({ checked, disabled, onChange }) => {
  return (
    <label
      className={classNames(styles.checkbox, {
        [styles.checked]: checked,
        [styles.disabled]: disabled,
      })}
    >
      {checked && <IconCheck />}
      <input checked={checked} onChange={onChange} className={styles.input} type="checkbox" />
    </label>
  );
};

export default Checkbox;
