import React from 'react';

import '../../styles/base.module.css';
import styles from './Footer.module.scss';
import { Koros, KorosType, getShapeHeight } from '../koros';
import classNames from '../../utils/classNames';
import { FooterNavigation } from './components/footerNavigation/FooterNavigation';
import { FooterNavigationGroup } from './components/footerNavigationGroup/FooterNavigationGroup';
import { FooterGroupHeading } from './components/footerGroupHeading/FooterGroupHeading';
import { FooterLink } from './components/footerLink/FooterLink';
import { FooterUtilities } from './components/footerUtilities/FooterUtilities';
import { FooterUtilityGroup } from './components/footerUtilityGroup/FooterUtilityGroup';
import { FooterBase } from './components/footerBase/FooterBase';
import { FooterCustom } from './components/footerCustom/FooterCustom';
import { FooterTheme } from './Footer.interface';
import { useTheme } from '../../hooks/useTheme';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';

export type FooterProps = React.PropsWithChildren<{
  /**
   * Additional class names to apply to the footer.
   */
  className?: string;
  /**
   * Props that will be passed to the native `<footer>` element.
   */
  footerProps?: AllElementPropsWithoutRef<'footer'>;
  /**
   * Koros type to use in the footer.
   * @default 'basic'
   */
  korosType?: KorosType;
  /**
   * Defines the footer theme.
   * @default 'light'
   */
  theme?: FooterTheme;
  /**
   * The title of the service shown on top of the the footer.
   */
  title?: React.ReactNode;
}>;

export const Footer = ({
  children,
  className,
  footerProps,
  korosType = 'basic',
  theme = 'light',
  title,
}: FooterProps) => {
  // custom theme class that is applied to the root element
  const customThemeClass = useTheme<FooterTheme>(styles.footer, theme);
  const korosHeight = getShapeHeight({ type: korosType });

  return (
    <footer
      {...footerProps}
      className={classNames(
        styles.footer,
        typeof theme === 'string' && styles[`theme-${theme}`],
        customThemeClass,
        footerProps && footerProps.className,
        className,
      )}
    >
      <Koros className={classNames(styles.koros)} type={korosType} style={{ height: `${korosHeight}px` }} />
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
Footer.Link = FooterLink;
Footer.Utilities = FooterUtilities;
Footer.UtilityGroup = FooterUtilityGroup;
Footer.Base = FooterBase;
Footer.Custom = FooterCustom;
