import React, { Children, cloneElement, Fragment } from 'react';

// import base styles
import '../../../styles/base.css';

import styles from './FooterBase.module.scss';
import { Logo, LogoLanguage } from '../../logo';
import { IconArrowUp } from '../../../icons';
import getKeyboardFocusableElements from '../../../utils/getKeyboardFocusableElements';
import classNames from '../../../utils/classNames';
import { useMediaQueryGreaterThan } from '../../../hooks/useMediaQuery';

export type FooterBaseProps = React.PropsWithChildren<{
  /**
   * Label for the "Back to top" button
   */
  backToTopLabel?: string | React.ReactNode;
  /**
   * Text to be displayed next to the copyright symbol
   */
  copyrightHolder?: React.ReactNode;
  /**
   * Text to be displayed after the copyright holder text
   */
  copyrightText?: React.ReactNode;
  /**
   * The language of the Helsinki-logo
   * @default 'fi'
   */
  logoLanguage?: LogoLanguage;
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

export const FooterBase = ({
  backToTopLabel,
  children,
  copyrightHolder,
  copyrightText,
  logoLanguage = 'fi',
  onBackToTopClick,
  showBackToTopButton = true,
}: FooterBaseProps) => {
  const year = new Date().getFullYear();
  const isAtleastLargeScreen = useMediaQueryGreaterThan('l');

  return (
    <div className={styles.base}>
      <hr className={styles.divider} aria-hidden />
      <div className={styles.logoWrapper}>
        <Logo size="medium" language={logoLanguage} aria-hidden />
      </div>
      {(copyrightHolder || copyrightText) && (
        <div className={styles.copyright}>
          <span className={styles.copyrightHolder}>
            © {copyrightHolder} {year}
          </span>
          {copyrightText && (
            <>
              <span className={styles.copyrightDot}>•</span>
              <span className={styles.copyrightText}>{copyrightText}</span>
            </>
          )}
        </div>
      )}
      <div className={styles.baseActions}>
        {children && (
          <div className={styles.links}>
            {Children.map(children, (child, index) => {
              if (React.isValidElement(child)) {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <Fragment key={index}>
                    {isAtleastLargeScreen && <span>|</span>}
                    {cloneElement(child as React.ReactElement, {
                      key: index,
                      className: classNames(child.props.className, styles.baseLink),
                    })}
                  </Fragment>
                );
              }
              return null;
            })}
          </div>
        )}
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
