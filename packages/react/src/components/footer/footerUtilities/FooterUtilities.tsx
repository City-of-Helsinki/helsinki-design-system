import React, { useRef } from 'react';

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

const handleBackToTop = (): void => {
  // eslint-disable-next-line no-unused-expressions
  window?.scrollTo({ top: 0 });
  // focus the first focusable element
  // eslint-disable-next-line no-unused-expressions
  getKeyboardFocusableElements()[0]?.focus();
};

export const FooterUtilities = ({
  children,
  backToTopLabel,
  onBackToTopClick,
  showBackToTopButton = true,
}: FooterUtilitiesProps) => {
  const backTopButtonRef = useRef<HTMLButtonElement>(null);
  // filter out the SoMe group, so that other utils can be wrapped in a separate div
  const [soMeGroup, childrenWithoutSoMeGroup] = getComponentFromChildren(children, 'FooterSoMe');

  return (
    <section className={styles.utilities}>
      <hr className={styles.divider} />
      {soMeGroup}
      <div className={styles.links}>
        {childrenWithoutSoMeGroup}
        {showBackToTopButton && (
          <button
            type="button"
            ref={backTopButtonRef}
            className={styles.backToTopButton}
            onClick={(e) => (typeof onBackToTopClick === 'function' ? onBackToTopClick(e) : handleBackToTop())}
          >
            {backToTopLabel}
            <IconArrowUp aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
};
