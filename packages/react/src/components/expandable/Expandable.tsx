/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from 'react';
import classNames from 'classnames';

import Icon from '../../icons/IconArrowRight';
import styles from './expandable.module.scss';
import Button from '../button/Button';

interface Props {
  label: React.ReactNode;
  onClick?: Function;
}

const Expandable: React.SFC<Props> = ({ label, onClick, children }) => {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
    onClick();
  };

  return (
    <>
      <div className={styles.expandable}>
        <div
          className={classNames(styles.headerBtn, styles.label)}
          role="button"
          onClick={handleClick}
          onKeyPress={handleClick}
        >
          {label}
        </div>
        {children && (
          <div
            className={classNames(styles.headerBtn, styles.arrow, {
              [styles.up]: expanded,
            })}
          >
            <Button color="supplementary" size="small" onClick={() => setExpanded(!expanded)}>
              <Icon />
            </Button>
          </div>
        )}
      </div>
      {children && (
        <div
          className={classNames(styles.children, {
            [styles.expanded]: expanded,
          })}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Expandable;
