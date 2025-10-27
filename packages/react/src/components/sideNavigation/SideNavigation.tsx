import React, { cloneElement, isValidElement, useEffect } from 'react';

import '../../styles/base.module.css';
import styles from './SideNavigation.module.scss';
import SideNavigationContext from './SideNavigationContext';
import { FCWithName } from '../../common/types';
import classNames from '../../utils/classNames';
import { useMobile } from '../../hooks/useMobile';
import { Button } from '../button';
import { SkipLink } from '../../internal/skipLink';
import { IconAngleDown, IconAngleUp } from '../../icons';
import { MainLevel } from './mainLevel/MainLevel';
import { SubLevel } from './subLevel/SubLevel';
import { useTheme } from '../../hooks/useTheme';
import { getChildrenAsArray } from '../../utils/getChildren';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';

export interface SideNavigationCustomTheme {
  '--side-navigation-background-color'?: string;
  '--side-navigation-active-indicator-background-color'?: string;
  '--side-navigation-icon-size'?: string;
  '--side-navigation-level-border-color'?: string;
  '--side-navigation-level-border-color-focus'?: string;
  '--side-navigation-level-border-color-hover'?: string;
  '--side-navigation-level-background-color'?: string;
  '--side-navigation-level-background-color-active'?: string;
  '--side-navigation-level-background-color-hover'?: string;
  '--side-navigation-level-color'?: string;
  '--side-navigation-level-color-active'?: string;
  '--side-navigation-level-color-hover'?: string;
  '--side-navigation-mobile-menu-border-color'?: string;
  '--side-navigation-mobile-menu-z-index'?: number;
}

export type SideNavigationProps = React.PropsWithChildren<
  AllElementPropsWithoutRef<'nav'> & {
    /**
     * Additional class names to apply to the side navigation
     */
    className?: string;
    /**
     * Default value for open main levels
     */
    defaultOpenMainLevels?: number[];
    /**
     * The id of the side navigation.
     */
    id: string;
    /**
     * aria-label for helping screen reader users to distinguish SideNavigation from other navigational components
     * @deprecated Will be replaced in the next major release with "aria-label"
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ariaLabel?: string;
    /**
     * Override or extend the styles applied to the component
     */
    // eslint-disable-next-line react/no-unused-prop-types
    style?: React.CSSProperties;
    /**
     * Custom theme styles
     */
    theme?: SideNavigationCustomTheme;
    /**
     * label for the mobile menu toggle button
     */
    toggleButtonLabel: string;
  }
>;

export const SideNavigation = ({
  children,
  className,
  defaultOpenMainLevels = [],
  id,
  ariaLabel,
  theme,
  toggleButtonLabel,
  ...rest
}: SideNavigationProps) => {
  const container = React.useRef<HTMLDivElement>(null);
  const customThemeClass = useTheme<SideNavigationCustomTheme>(styles.sideNavigation, theme);
  const menuId = `${id}-menu`;
  const [activeParentLevel, setActiveParentLevel] = React.useState<number>();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const isMobile = useMobile();
  const shouldRenderMenu = !(isMobile && !mobileMenuOpen);

  const childElements = getChildrenAsArray(children);

  const mainLevels = childElements.map((child, index) => {
    if (isValidElement(child) && (child.type as FCWithName).componentName === 'MainLevel') {
      // eslint-disable-next-line react/no-array-index-key
      return cloneElement(child as React.ReactElement<Record<string, unknown>>, { key: index, index });
    }
    return null;
  });

  const skipLink = childElements.find(
    (child) => isValidElement(child) && (child.type as FCWithName).componentName === 'SkipLink',
  );

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle additional event listeners.
  // TODO: Add a reusable hook to implement this behaviour
  useEffect(() => {
    // Close with ESC key
    const handleEscKey = (event: KeyboardEvent) => {
      const key = event.key || event.keyCode;
      if (mobileMenuOpen && (key === 'Escape' || key === 'Esc' || key === 27)) {
        setMobileMenuOpen(false);
      }
    };
    // Close with click or focusin outside the component
    const handleOutsideClickOrFocusin = (event: Event) => {
      const target = event.target as Node;
      if (mobileMenuOpen && !container.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClickOrFocusin);
    document.addEventListener('focusin', handleOutsideClickOrFocusin);
    document.addEventListener('keyup', handleEscKey);
    return () => {
      document.removeEventListener('click', handleOutsideClickOrFocusin);
      document.removeEventListener('focusin', handleOutsideClickOrFocusin);
      document.removeEventListener('keyup', handleEscKey);
    };
  });

  return (
    <SideNavigationContext.Provider
      value={{
        mobileMenuOpen,
        defaultOpenMainLevels,
        activeParentLevel,
        setMobileMenuOpen,
        setActiveParentLevel,
      }}
    >
      <nav
        {...rest}
        className={classNames(styles.sideNavigation, customThemeClass, className)}
        id={id}
        aria-label={ariaLabel}
        ref={container}
      >
        {skipLink && skipLink}
        {/* Toggle button is visible only on small screen size */}
        <Button
          aria-controls={menuId}
          aria-expanded={mobileMenuOpen}
          aria-haspopup
          className={styles.toggleButton}
          fullWidth
          iconRight={mobileMenuOpen ? <IconAngleUp aria-hidden /> : <IconAngleDown aria-hidden />}
          onClick={toggleMobileMenu}
          variant="secondary"
          type="button"
        >
          {toggleButtonLabel}
        </Button>
        {shouldRenderMenu && (
          <ul
            {...{
              className: classNames(styles.mainLevelList, mobileMenuOpen && styles.open),
              'aria-label': toggleButtonLabel,
            }}
            id={menuId}
          >
            {mainLevels}
          </ul>
        )}
      </nav>
    </SideNavigationContext.Provider>
  );
};

SideNavigation.MainLevel = MainLevel;
SideNavigation.SubLevel = SubLevel;
SideNavigation.SkipLink = SkipLink;
