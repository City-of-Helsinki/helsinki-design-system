import uniqueId from 'lodash.uniqueid';
import React, { useContext, useEffect } from 'react';

import styles from './SubLevel.module.scss';
import SideNavigationContext from '../SideNavigationContext';
import classNames from '../../../utils/classNames';

export type SubLevelProps = React.ComponentPropsWithoutRef<'a'> & {
  /**
   * If `true`, the item will be marked as active
   */
  active?: boolean;
  /**
   * Additional class names to apply to the side navigation sub level
   */
  className?: string;
  /**
   * href attribute of the side navigation main level
   */
  href: string;
  /**
   * The id of the side navigation main level.
   */
  id?: string;
  /**
   * Label of the side navigation sub level.
   */
  label: string;
  /**
   * Index of the containing main level
   */
  mainLevelIndex?: number;
  /**
   * Override or extend the styles applied to the component
   */
  style?: React.CSSProperties;
};

export const SubLevel = ({
  active,
  className,
  href,
  id: _id,
  label,
  mainLevelIndex,
  onClick,
  style,
}: SubLevelProps) => {
  const [id] = React.useState(() => _id || uniqueId('sub-level-'));

  const { autoCollapseOthers, openMainLevels, setMobileMenuOpen, setOpenMainLevels } = useContext(
    SideNavigationContext,
  );

  const openMainLevel = () => {
    if (autoCollapseOthers) {
      // With autoCollapseOther prop only one level can be open at same time
      setOpenMainLevels([mainLevelIndex as number]);
    } else {
      setOpenMainLevels([...openMainLevels, mainLevelIndex]);
    }
  };

  useEffect(() => {
    // Ensure that active subLevel's main level is initially open
    if (active && !openMainLevels.includes(mainLevelIndex as number)) {
      openMainLevel();
    }
  }, [active]);

  return (
    <li id={id} className={classNames(styles.subLevel, active && styles.active, className)} style={style}>
      <a
        aria-current={active ? 'page' : 'false'}
        onClick={(ev: React.MouseEvent<HTMLAnchorElement>) => {
          setMobileMenuOpen(false);

          if (onClick) {
            onClick(ev);
          }
        }}
        href={href}
      >
        {label}
      </a>
    </li>
  );
};

SubLevel.componentName = 'SubLevel';
