import xor from 'lodash.xor';
import React, { cloneElement, isValidElement, ReactNode, useContext } from 'react';

import classNames from '../../../utils/classNames';
import styles from './MainLevel.module.scss';
import SideNavigationContext from '../SideNavigationContext';
import { FCWithName } from '../../../common/types';
import { IconAngleDown } from '../../../icons';

export type MainLevelProps = {
  /**
   * If `true`, the item will be marked as active
   */
  active?: boolean;
  /**
   * Additional class names to apply to the side navigation main level
   */
  className?: string;
  /**
   * The id of the side navigation main level.
   */
  id: string;
  /**
   * href attribute of the side navigation main level
   */
  href?: string;
  /**
   * Icon of the side navigation main level.
   */
  icon: React.ReactNode;
  /**
   * Index of the side navigation main level.
   */
  index?: number;
  /**
   * Label of the side navigation main level.
   */
  label: string;
  /**
   * Override or extend the styles applied to the component
   */
  style?: React.CSSProperties;
};

export const MainLevel = ({
  active,
  children,
  className,
  href,
  icon,
  id,
  index,
  label,
  onClick,
  style,
  ...rest
}: MainLevelProps) => {
  const menuId = `${id}-menu`;
  const { autoCollapseOthers, openMainLevels, setMobileMenuOpen, setOpenMainLevels } = useContext(
    SideNavigationContext,
  );

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

  const handleMainLevelClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (autoCollapseOthers) {
      // With autoCollapseOther prop only one level can be open at same time
      setOpenMainLevels([index as number]);
    } else {
      // Handle toggle: either remove index if exists or add if it doesn't
      setOpenMainLevels(xor(openMainLevels, [index]));
    }

    if (!hasSubLevels) {
      setMobileMenuOpen(false);
    }

    if (onClick) {
      onClick(ev);
    }
  };

  React.useEffect(() => {
    // Ensure that active main level is initially open
    if (active && !openMainLevels.includes(index as number)) {
      if (autoCollapseOthers) {
        // With autoCollapseOther prop only one level can be open at same time
        setOpenMainLevels([index as number]);
      } else {
        setOpenMainLevels([...openMainLevels, index]);
      }
    }
  }, []);

  return (
    <li className={classNames(styles.mainLevel, active && styles.active, open && styles.open, className)} style={style}>
      <a
        {...rest}
        aria-current={active ? 'page' : 'false'}
        aria-label={label}
        id={buttonId}
        onClick={handleMainLevelClick}
        href={href}
      >
        <span className={styles.iconWrapper} aria-hidden>
          {icon}
        </span>
        <span>{label}</span>
        {hasSubLevels && (
          <span className={styles.arrowIcon} aria-hidden>
            <IconAngleDown aria-hidden />
          </span>
        )}
      </a>

      {hasSubLevels && (
        <ul className={styles.mainLevelListMenu} id={menuId} aria-hidden={!open} aria-labelledby={buttonId}>
          {subLevels}
        </ul>
      )}
    </li>
  );
};

MainLevel.componentName = 'MainLevel';
