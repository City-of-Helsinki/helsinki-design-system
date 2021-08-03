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
   * Optional icon of the side navigation main level.
   */
  icon?: React.ReactNode;
  /**
   * Index of the side navigation main level.
   */
  index?: number;
  /**
   * Label of the side navigation main level.
   */
  label: string;
  /**
   * A border to distinct main level item from previous item.
   */
  withDivider?: boolean;
  /**
   * Override or extend the styles applied to the component
   */
  style?: React.CSSProperties;
  /**
   * Override or extend the styles applied to the component
   */
  children?: ReactNode;
  /**
   * Callback function fired when the tag is clicked. If set, the tag will be clickable.
   */
  onClick?: (
    event:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
};

const LeftIcon = ({ icon }: { icon?: React.ReactNode }) => (
  <span className={styles.leftIcon} aria-hidden>
    {icon}
  </span>
);

const Label = ({ label }: { label: string }) => (
  <span className={styles.label}>{label}</span>
);

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
  onClick,
  style,
  ...rest
}: MainLevelProps) => {
  const menuId = `${id}-menu`;
  const { autoCollapseOthers, openMainLevels, setMobileMenuOpen, setOpenMainLevels } = useContext(
    SideNavigationContext,
  );
  const activeRef = React.useRef<boolean>(active);
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

  const handleMainLevelClick = (ev: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
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
    if (activeRef.current && !open) {
      if (autoCollapseOthers) {
        // With autoCollapseOther prop only one level can be open at same time
        setOpenMainLevels([index as number]);
      } else {
        setOpenMainLevels([...openMainLevels, index]);
      }
      activeRef.current = false;
    }
  }, [activeRef, open, autoCollapseOthers, setOpenMainLevels, openMainLevels, index]);

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
            aria-current={active ? 'page' : 'false'}
            aria-label={label}
            id={id}
            onClick={handleMainLevelClick}
          >
            {icon && <LeftIcon icon={icon} />}
            <Label label={label} />
            {hasSubLevels && (
              <span className={classNames(styles.rightIcon, styles.arrowIcon)} aria-hidden>
                <IconAngleDown aria-hidden />
              </span>
            )}
          </button>
          <ul className={styles.mainLevelListMenu} id={menuId} aria-hidden={!open} aria-labelledby={id}>
            {subLevels}
          </ul>
        </>
      ) : (
        <a
          {...rest}
          aria-current={active ? 'page' : 'false'}
          aria-label={label}
          id={id}
          onClick={handleMainLevelClick}
          href={href}
        >
          {icon && <LeftIcon icon={icon} />}
          <Label label={label} />
        </a>
      )}
    </li>
  );
};

MainLevel.componentName = 'MainLevel';
