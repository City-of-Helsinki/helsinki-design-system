import React, { cloneElement, isValidElement, ReactNode, useContext, useEffect, useState } from 'react';

import styles from './MainLevel.module.scss';
import classNames from '../../../utils/classNames';
import SideNavigationContext from '../SideNavigationContext';
import { FCWithName } from '../../../common/types';
import { IconAngleDown, IconAngleUp, IconLinkExternal } from '../../../icons';
import { getChildrenAsArray } from '../../../utils/getChildren';

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
   * The aria-label for opening main level link in a new tab
   */
  openInNewTabAriaLabel?: string;
  /**
   * The aria-label for opening main level link in an external domain
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
  const { defaultOpenMainLevels, activeParentLevel, setActiveParentLevel, setMobileMenuOpen } =
    useContext(SideNavigationContext);
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpenMainLevels.includes(index as number));
  const [isActiveParent, setIsActiveParent] = useState<boolean>(false);

  const childElements = getChildrenAsArray(children);

  const subLevels = childElements.map((child, childIndex) => {
    if (isValidElement(child) && (child.type as FCWithName).componentName === 'SubLevel') {
      return cloneElement(child as React.ReactElement<Record<string, unknown>>, {
        mainLevelIndex: index,
        // eslint-disable-next-line react/no-array-index-key
        key: childIndex,
      });
    }
    return null;
  });

  const hasSubLevels = Boolean(subLevels?.length);

  const handleMainLevelClick = (ev: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (!hasSubLevels) {
      setActiveParentLevel(undefined);
      setMobileMenuOpen(false);
    } else {
      setIsOpen(!isOpen);
    }

    if (onClick) {
      onClick(ev);
    }
  };

  useEffect(() => {
    const isActive = activeParentLevel === index;
    if (isActive) {
      setIsOpen(true);
    }
    setIsActiveParent(isActive);
  }, [activeParentLevel, index, setIsOpen, setIsActiveParent]);

  return (
    <li
      key={id}
      className={classNames(
        styles.mainLevel,
        withDivider && styles.mainLevelWithDivider,
        active && styles.active,
        isOpen && styles.open,
        className,
      )}
      style={style}
    >
      {hasSubLevels ? (
        <>
          <button
            type="button"
            aria-label={label}
            aria-current={isActiveParent}
            aria-expanded={isOpen}
            id={id}
            onClick={handleMainLevelClick}
          >
            {icon && <LeftIcon icon={icon} />}
            <Label label={label} />
            {hasSubLevels && <RightIcon icon={isOpen ? <IconAngleUp aria-hidden /> : <IconAngleDown aria-hidden />} />}
          </button>
          <ul className={styles.mainLevelListMenu} id={menuId} aria-hidden={!isOpen} aria-labelledby={id}>
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
