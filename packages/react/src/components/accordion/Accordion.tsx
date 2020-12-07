import React, { useState } from 'react';
import uniqueId from 'lodash.uniqueid';

// import core base styles
import 'hds-core';

import styles from './Accordion.module.scss';
import classNames from '../../utils/classNames';
import { IconAngleDown, IconAngleUp } from '../../icons';
import { useAccordion } from './useAccordion';

export type AccordionProps = React.PropsWithChildren<{
  /**
   * Use the card variant if `true`
   */
  card?: boolean;
  /**
   * Additional class names for accordion
   */
  className?: string;
  /**
   * The id for the accordion element
   */
  id?: string;
  /**
   * Accordion title
   */
  title: string;
}>;

export const Accordion = ({ card = false, children, className, id, title }: AccordionProps) => {
  const [accordionId] = useState(id || uniqueId('accordion-'));

  const { isOpen, buttonProps, contentProps } = useAccordion({ initiallyOpen: false });

  const icon = isOpen ? (
    <IconAngleUp aria-hidden className={styles.accordionButtonIcon} />
  ) : (
    <IconAngleDown aria-hidden className={styles.accordionButtonIcon} />
  );

  return (
    <div
      className={classNames(styles.accordion, card && styles.card, isOpen && styles.isOpen, className)}
      id={accordionId}
    >
      <div className={styles.accordionHeader}>
        <div role="heading" aria-level={2} id={`${accordionId}-heading`}>
          {title}
        </div>
        <button
          type="button"
          {...buttonProps}
          className={styles.accordionButton}
          aria-labelledby={`${accordionId}-heading`}
        >
          {icon}
        </button>
      </div>
      <div
        {...contentProps}
        id={`${accordionId}-content`}
        role="region"
        className={styles.accordionContent}
        aria-labelledby={`${accordionId}-heading`}
      >
        {children}
      </div>
    </div>
  );
};
