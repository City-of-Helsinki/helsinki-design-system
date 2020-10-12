import React from 'react';

// import core base styles
import 'hds-core';
import styles from './FooterUtilities.module.scss';
import { IconArrowUp } from '../../../icons';
import getKeyboardFocusableElements from '../../../utils/getKeyboardFocusableElements';
import { getComponentFromChildren } from '../../../utils/getChildren';

export type FooterUtilitiesProps = React.PropsWithChildren<{
  /**
   * Label for the "Back to top" button
   */
  backToTopLabel?: string | React.ReactNode;
  /**
   * Callback fired when the "Back to top" button is clicked
   */
  onBackToTopClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Whether the "Back to top" button should be shown
   */
  showBackToTopButton?: boolean;
}>;

/**
 * Scrolls to the top of the page and puts the focus on the first focusable element in the DOM
 */
const handleBackToTop = (): void => {
  // eslint-disable-next-line no-unused-expressions
  window?.scrollTo({ top: 0 });
  // eslint-disable-next-line no-unused-expressions
  getKeyboardFocusableElements()[0]?.focus();
};

export const FooterUtilities = ({
  children,
  backToTopLabel,
  onBackToTopClick,
  showBackToTopButton = true,
}: FooterUtilitiesProps) => {
  // filter out the SoMe group, so that other utils can be wrapped in a separate div
  const [soMeGroup, childrenWithoutSoMeGroup] = getComponentFromChildren(children, 'FooterSoMe');

  return (
    <div className={styles.utilities}>
      <hr className={styles.divider} aria-hidden />
      {soMeGroup}
      <div className={styles.links}>
        {childrenWithoutSoMeGroup}
        {showBackToTopButton && (
          <button
            type="button"
            role="link"
            className={styles.backToTopButton}
            onClick={(e) => (typeof onBackToTopClick === 'function' ? onBackToTopClick(e) : handleBackToTop())}
          >
            {backToTopLabel}
            <IconArrowUp aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};
