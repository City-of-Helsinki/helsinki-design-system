import React, { useEffect, useReducer } from 'react';

// import core base styles
import 'hds-core';
import styles from './Footer.module.scss';
import { Logo } from '../logo';
import { Koros, KorosType } from '../koros';
import classNames from '../../utils/classNames';
import setComponentTheme from '../../utils/setComponentTheme';
import { FooterNavigation } from './footerNavigation/FooterNavigation';
import { FooterItemGroup } from './footerItemGroup/FooterItemGroup';
import { FooterItem } from './footerItem/FooterItem';
import { FooterUtilities } from './footerUtilities/FooterUtilities';
import { FooterSoMe } from './footerSoMe/FooterSoMe';
import { FooterBase } from './footerBase/FooterBase';
import { FooterContext, FooterContextProps } from './FooterContext';
import { FooterCustomTheme, FooterReducerAction, FooterReducerState, FooterTheme } from './Footer.interface';
import { getComponentFromChildren } from '../../utils/getChildren';

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

/**
 * Footer reducer
 * @param {ReducerState} state
 * @param {ReducerAction} action
 */
const reducer = (state: FooterReducerState, action: FooterReducerAction): FooterReducerState =>
  action.type === 'NAVIGATION_VARIANT'
    ? {
        ...state,
        navigationVariant: action.value,
      }
    : state;

export const Footer = ({
  children,
  className,
  footerProps,
  korosType = 'basic',
  theme = 'light',
  title,
}: FooterProps) => {
  const [{ navigationVariant }, dispatch] = useReducer(reducer, {
    navigationVariant: 'default',
  });
  // handle custom themes
  useEffect(() => {
    if (theme && typeof theme !== 'string') {
      setComponentTheme<FooterCustomTheme>('Footer', theme);
    }
  }, [theme]);
  // footer context
  const context: FooterContextProps = { dispatch };
  // filter out navigation from other children so that they can be rendered separately
  const [navigation, childrenWithoutNavigation] = getComponentFromChildren(children, 'FooterNavigation');

  return (
    <FooterContext.Provider value={context}>
      <footer
        {...footerProps}
        className={classNames(
          styles.footer,
          styles[`koros-${korosType}`],
          typeof theme === 'string' ? styles[`theme-${theme}`] : 'custom',
          className,
        )}
      >
        <Koros className={classNames(styles.koros, styles[korosType])} type={korosType} />
        <section className={classNames(styles.navigationContainer, styles[navigationVariant])}>
          <div className={styles.titleWrapper}>
            <Logo size="medium" aria-hidden />
            {title && <h2 className={styles.title}>{title}</h2>}
          </div>
          {navigation}
        </section>
        {childrenWithoutNavigation}
      </footer>
    </FooterContext.Provider>
  );
};

Footer.Navigation = FooterNavigation;
Footer.ItemGroup = FooterItemGroup;
Footer.Item = FooterItem;
Footer.Utilities = FooterUtilities;
Footer.SoMe = FooterSoMe;
Footer.Base = FooterBase;
