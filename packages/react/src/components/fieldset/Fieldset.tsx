import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Fieldset.module.scss';
import classNames from '../../utils/classNames';

export type FieldsetProps = {
  /**
   * Heading text inside legend element
   */
  heading: string;
  /**
   * If `true` border will be drawn around the fieldset.
   */
  border?: boolean;
  /**
   * Additional class names to apply to the card.
   */
  className?: string;
} & React.HTMLProps<HTMLFieldSetElement>;

export const Fieldset = ({ heading, border, className, children }: FieldsetProps) => (
  <fieldset className={classNames(styles.fieldset, border && styles.border, className)}>
    <legend className={styles.legend}>{heading}</legend>
    {children}
  </fieldset>
);
