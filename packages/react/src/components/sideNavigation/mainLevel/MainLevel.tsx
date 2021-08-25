import xor from 'lodash.xor';
import React, { cloneElement, isValidElement, ReactNode, useContext } from 'react';

import classNames from '../../../utils/classNames';
import styles from './MainLevel.module.scss';
import SideNavigationContext from '../SideNavigationContext';
import { FCWithName } from '../../../common/types';
import { IconAngleDown, IconAngleUp, IconLinkExternal } from '../../../icons';

type MainLevelCommonProps = {
  /**
   * The id of the side navigation main level
   */
  id: string;
  /**
   * href attribute of the side navigation main level
   */
  href?: string;
  /**
   * Optional icon of the side navigation main level
   */
  icon?: React.ReactNode;
  /**
   * Index of the side navigation main level. The parent SideNavigation component uses this property to index main levels
   */
  index?: number;
  /**
   * Label of the side navigation main level
   */
  label: string;
  /**
   * A border that distinguishes the main level from the previous item
   */
  withDivider?: boolean;
  /**
   * Additional class names to apply to the side navigation main level
   */
  className?: string;
  /**
   * Override or extend the styles applied to the component
   */
  style?: React.CSSProperties;
  /**
   * Children components for the main level. Usually subLevels
   */
  children?: ReactNode;
  /**
   * Callback function fired when the main level is clicked
   */
  onClick?: (
    event:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
};

type MainLevelLinkProps = {
  /**
   * href attribute of the side navigation main level
   */
  href?: string;
  active?: boolean;
  external?: undefined;
  openInNewTab?: undefined;
  openInNewTabAriaLabel?: undefined;
  openInExternalDomainAriaLabel?: undefined;
};

type MainLevelExternalLinkProps = {
  /**
   * href attribute of the side navigation main level
   */
  href?: string;
  /**
   * Boolean indicating whether the main level link will lead user to external domain.
   */
  external?: boolean;
  /**
   * Boolean indicating whether the main level link will open in new tab or not.
   */
  openInNewTab?: boolean;
  /**
   * Aria label for opening main level link in a new tab
   */
  openInNewTabAriaLabel?: string;
  /**
   * Aria label for opening main level link in an external domain
   */
  openInExternalDomainAriaLabel?: string;
  active?: undefined;
};

type MainLevelAccordionProps = {
  href?: undefined;
  active?: undefined;
  external?: undefined;
  openInNewTab?: undefined;
  openInNewTabAriaLabel?: undefined;
  openInExternalDomainAriaLabel?: undefined;
};

export type MainLevelProps = MainLevelCommonProps &
  (MainLevelLinkProps | MainLevelExternalLinkProps | MainLevelAccordionProps);

const composeAriaLabel = ({
  openInNewTab,
  openInNewTabAriaLabel,
  openInExternalDomainAriaLabel,
  label,
}: {
  openInNewTab?: boolean;
  openInNewTabAriaLabel?: string;
  openInExternalDomainAriaLabel?: string;
  label;
}) => {
  const newTabText = openInNewTab ? openInNewTabAriaLabel || 'Avautuu uudessa välilehdessä.' : '';
  const externalText = openInExternalDomainAriaLabel || 'Siirtyy toiseen sivustoon.';

  return [label.slice(-1) !== '.' ? `${label}.` : label, newTabText, externalText].filter((text) => text).join(' ');
};

const LeftIcon = ({ icon }: { icon: React.ReactNode }) => (
  <span className={styles.leftIcon} aria-hidden>
    {icon}
  </span>
);

const RightIcon = ({ icon, className = '' }: { icon: React.ReactNode; className?: string }) => (
  <span className={classNames(styles.rightIcon, className)} aria-hidden>
    {icon}
  </span>
);

const Label = ({ label }: { label: string }) => <span className={styles.label}>{label}</span>;

export const MainLevel = ({
  active,
  children,
  className,
  href,
  icon,
  id,
  index,
  label,
  withDivider,
  external,
  openInNewTab,
  openInNewTabAriaLabel,
  openInExternalDomainAriaLabel,
  onClick,
  style,
  ...rest
}: MainLevelProps) => {
  const menuId = `${id}-menu`;
  const { openMainLevels, setMobileMenuOpen, setOpenMainLevels } = useContext(SideNavigationContext);
  const open = openMainLevels.includes(index as number);

  const subLevels = React.Children.map(children, (child) => {
    if (isValidElement(child) && (child.type as FCWithName).componentName === 'SubLevel') {
      return cloneElement(child, {
        mainLevelIndex: index,
      });
    }
    return null;
  });

  const hasSubLevels = Boolean(subLevels?.length);
  const hasActiveSubLevel: boolean = hasSubLevels && !!subLevels.find((subLevel) => subLevel.props.active);

  const handleMainLevelClick = (ev: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
    // Handle toggle: either remove index if exists or add if it doesn't
    setOpenMainLevels(xor(openMainLevels, [index]));

    if (!hasSubLevels) {
      setMobileMenuOpen(false);
    }

    if (onClick) {
      onClick(ev);
    }
  };

  return (
    <li
      key={id}
      className={classNames(
        styles.mainLevel,
        withDivider && styles.mainLevelWithDivider,
        active && styles.active,
        open && styles.open,
        className,
      )}
      style={style}
    >
      {hasSubLevels ? (
        <>
          <button
            type="button"
            aria-label={label}
            aria-current={hasActiveSubLevel}
            aria-expanded={open}
            id={id}
            onClick={handleMainLevelClick}
          >
            {icon && <LeftIcon icon={icon} />}
            <Label label={label} />
            {hasSubLevels && <RightIcon icon={open ? <IconAngleUp aria-hidden /> : <IconAngleDown aria-hidden />} />}
          </button>
          <ul className={styles.mainLevelListMenu} id={menuId} aria-hidden={!open} aria-labelledby={id}>
            {subLevels}
          </ul>
        </>
      ) : (
        <a
          {...rest}
          aria-current={active ? 'page' : 'false'}
          aria-label={external ? `${label} ${openInExternalDomainAriaLabel || 'Siirtyy toiseen sivustoon'}` : label}
          id={id}
          onClick={handleMainLevelClick}
          href={href}
          {...(external &&
            openInNewTab && {
              target: '_blank',
              rel: 'noopener',
              'aria-label': composeAriaLabel({
                label,
                openInNewTab,
                openInNewTabAriaLabel,
                openInExternalDomainAriaLabel,
              }),
            })}
        >
          {icon && <LeftIcon icon={icon} />}
          <Label label={label} />
          {external && <RightIcon icon={<IconLinkExternal aria-hidden />} />}
        </a>
      )}
    </li>
  );
};

MainLevel.componentName = 'MainLevel';
