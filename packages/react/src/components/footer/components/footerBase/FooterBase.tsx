import React, { cloneElement, Fragment, isValidElement, MouseEventHandler } from 'react';

import '../../../../styles/base.module.css';
import styles from './FooterBase.module.scss';
import { Logo } from '../../../logo';
import { IconArrowUp } from '../../../../icons';
import getKeyboardFocusableElements from '../../../../utils/getKeyboardFocusableElements';
import { FooterLink } from '../footerLink/FooterLink';
import { getChildElementsEvenIfContainersInbetween } from '../../../../utils/getChildren';
import { FooterVariant } from '../../Footer.interface';
import { useCallbackIfDefined } from '../../../../utils/useCallback';
import { AllElementPropsWithoutRef } from '../../../../utils/elementTypings';
import classNames from '../../../../utils/classNames';

export type FooterBaseProps = React.PropsWithChildren<
  AllElementPropsWithoutRef<'div'> & {
    /**
     * Label for the "Back to top" button.
     */
    backToTopLabel?: string | React.ReactNode;
    /**
     * Text to be displayed next to the copyright symbol.
     */
    copyrightHolder?: React.ReactNode;
    /**
     * Text to be displayed after the copyright holder text.
     */
    copyrightText?: React.ReactNode;
    /**
     * Link for the logo. Should direct to the main page.
     */
    logoHref?: string;
    /**
     * Logo to use
     */
    logo: React.ReactElement<typeof Logo>;
    /**
     * Callback fired when the "Back to top" button is clicked.
     */
    onBackToTopClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Callback fired when the logo is clicked.
     */
    onLogoClick?: MouseEventHandler;
    /**
     * ARIA role to describe the contents.
     */
    role?: string;
    /**
     * Whether the "Back to top" button should be shown.
     */
    showBackToTopButton?: boolean;
    /**
     * Set the year for copyright text. This can be useful in automated tests when a static year is set so the tests don't fail after a new year.
     */
    year?: number;
  }
>;

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
  logo,
  logoHref,
  onBackToTopClick,
  onLogoClick,
  showBackToTopButton = true,
  year = new Date().getFullYear(),
  className,
  ...rest
}: FooterBaseProps) => {
  const childElements = getChildElementsEvenIfContainersInbetween(children);
  const handleLogoClick = useCallbackIfDefined(onLogoClick);
  return (
    <div {...rest} className={classNames(styles.base, className)}>
      <hr className={styles.divider} aria-hidden />
      <div className={styles.logoWrapper}>
        <FooterLink tabIndex={0} icon={logo} href={logoHref} onClick={handleLogoClick} />
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
            {childElements.map((child, index) => {
              if (isValidElement(child)) {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <Fragment key={index}>
                    <span className={styles.separator} aria-hidden>
                      |
                    </span>
                    {cloneElement(child as React.ReactElement, {
                      variant: FooterVariant.Base,
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
            <IconArrowUp />
          </button>
        )}
      </div>
    </div>
  );
};
