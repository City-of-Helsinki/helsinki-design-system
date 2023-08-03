import React from 'react';

// import base styles
import '../../styles/base.css';

import styles from './Footer.module.scss';
import { Koros, KorosType } from '../koros';
import classNames from '../../utils/classNames';
import { FooterNavigation } from './components/footerNavigation/FooterNavigation';
import { FooterNavigationGroup } from './components/footerNavigationGroup/FooterNavigationGroup';
import { FooterGroupHeading } from './components/footerGroupHeading/FooterGroupHeading';
import { FooterNavigationLink } from './components/footerNavigationLink/FooterNavigationLink';
import { FooterUtilities } from './components/footerUtilities/FooterUtilities';
import { FooterUtilityGroup } from './components/footerUtilityGroup/FooterUtilityGroup';
import { FooterBase } from './components/footerBase/FooterBase';
import { FooterCustom } from './components/footerCustom/FooterCustom';
import { FooterTheme } from './Footer.interface';
import { useTheme } from '../../hooks/useTheme';

export type FooterProps = React.PropsWithChildren<{
  /**
   * aria-label for describing Footer.
   */
  ariaLabel?: string;
  /**
   * Additional class names to apply to the footer
   */
  className?: string;
  /**
   * Props that will be passed to the native `<footer>` element
   */
  footerProps?: React.ComponentPropsWithoutRef<'footer'>;
  /**
   * Koros type to use in the footer
   */
  korosType?: KorosType;
  /**
   * Defines the footer theme
   */
  theme?: FooterTheme;
  /**
   * The title of the service shown on top of the the footer
   */
  title?: React.ReactNode;
}>;

export const Footer = ({
  ariaLabel,
  children,
  className,
  footerProps,
  korosType = 'basic',
  theme = 'light',
  title,
}: FooterProps) => {
  // custom theme class that is applied to the root element
  const customThemeClass = useTheme<FooterTheme>(styles.footer, theme);

  return (
    <footer
      {...footerProps}
      className={classNames(
        styles.footer,
        styles[`koros-${korosType}`],
        typeof theme === 'string' && styles[`theme-${theme}`],
        customThemeClass,
        className,
      )}
      aria-label={ariaLabel}
    >
      <Koros className={classNames(styles.koros, styles[korosType])} type={korosType} />
      <div className={styles.footerContent}>
        <div className={styles.footerSections}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {children}
        </div>
      </div>
    </footer>
  );
};

Footer.Navigation = FooterNavigation;
Footer.NavigationGroup = FooterNavigationGroup;
Footer.GroupHeading = FooterGroupHeading;
Footer.NavigationLink = FooterNavigationLink;
Footer.Utilities = FooterUtilities;
Footer.UtilityGroup = FooterUtilityGroup;
Footer.Base = FooterBase;
Footer.Custom = FooterCustom;
