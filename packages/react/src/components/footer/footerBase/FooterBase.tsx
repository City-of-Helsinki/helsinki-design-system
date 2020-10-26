import React from 'react';

// import core base styles
import 'hds-core';
import styles from './FooterBase.module.scss';

export type FooterBaseProps = React.PropsWithChildren<{
  /**
   * Text to be displayed next to the copyright symbol
   */
  copyrightHolder?: React.ReactNode;
  /**
   * Text to be displayed after the copyright holder text
   */
  copyrightText?: React.ReactNode;
}>;

export const FooterBase = ({ children, copyrightHolder, copyrightText }: FooterBaseProps) => {
  const year = new Date().getFullYear();

  return (
    <div className={styles.base}>
      <hr className={styles.divider} aria-hidden />
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
      {children && <div className={styles.links}>{children}</div>}
    </div>
  );
};
