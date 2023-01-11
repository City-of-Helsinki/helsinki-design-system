import React, { Children, cloneElement } from 'react';

// import base styles
import '../../styles/base.css';

import styles from './Footer.module.scss';
import { Koros, KorosType } from '../koros';
import classNames from '../../utils/classNames';
import { FooterNavigation } from './footerNavigation/FooterNavigation';
import { FooterNavigationGroup } from './footerNavigationGroup/FooterNavigationGroup';
import { FooterNavigationHeading } from './footerNavigationHeading/FooterNavigationHeading';
import { FooterNavigationLink } from './footerNavigationLink/FooterNavigationLink';
import { FooterUtilities } from './footerUtilities/FooterUtilities';
import { FooterUtilityGroup } from './footerUtilityGroup/FooterUtilityGroup';
import { FooterSoMe } from './footerSoMe/FooterSoMe';
import { FooterBase } from './footerBase/FooterBase';
import { FooterTheme } from './Footer.interface';
import { getComponentFromChildren } from '../../utils/getChildren';
import { useTheme } from '../../hooks/useTheme';

export type FooterProps = React.PropsWithChildren<{
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
   * The title of the service shown next to the logo
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
  // filter out navigation from other children so that they can be rendered separately
  const [navigation, childrenWithoutNavigation] = getComponentFromChildren(children, 'FooterNavigation');

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
    >
      <Koros className={classNames(styles.koros, styles[korosType])} type={korosType} />
      <div className={styles.footerContent}>
        <section className={classNames(styles.navigationContainer, styles.centeredNavigation)}>
          <div className={styles.titleWrapper}>{title && <h2 className={styles.title}>{title}</h2>}</div>
          {navigation}
        </section>
        {childrenWithoutNavigation}
      </div>
    </footer>
  );
};

Footer.Navigation = FooterNavigation;
Footer.NavigationGroup = FooterNavigationGroup;
Footer.NavigationHeading = FooterNavigationHeading;
Footer.NavigationLink = FooterNavigationLink;
Footer.Utilities = FooterUtilities;
Footer.UtilityGroup = FooterUtilityGroup;
Footer.SoMe = FooterSoMe;
Footer.Base = FooterBase;
