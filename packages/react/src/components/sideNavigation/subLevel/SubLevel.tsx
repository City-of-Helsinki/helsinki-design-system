import React, { useContext, useEffect } from 'react';

import styles from './SubLevel.module.scss';
import SideNavigationContext from '../SideNavigationContext';
import classNames from '../../../utils/classNames';

export type SubLevelProps = {
  /**
   * If `true`, the item will be marked as active
   */
  active?: boolean;
  /**
   * The id of the side navigation sub level
   */
  id: string;
  /**
   * href attribute of the side navigation sub level
   */
  href: string;
  /**
   * Label of the side navigation sub level
   */
  label: string;
  /**
   * Index of the containing main level. The parent MainLevel component uses this property to index sub levels
   */
  mainLevelIndex?: number;
  /**
   * Additional class names to apply to the side navigation sub level
   */
  className?: string;
  /**
   * Override or extend the styles applied to the component
   */
  style?: React.CSSProperties;
} & React.ComponentPropsWithoutRef<'a'>;

export const SubLevel = ({ active, className, href, id, label, mainLevelIndex, onClick, style }: SubLevelProps) => {
  const { setActiveParentLevel, setMobileMenuOpen } = useContext(SideNavigationContext);

  useEffect(() => {
    if (active) {
      setActiveParentLevel(mainLevelIndex);
    }
  }, [active, mainLevelIndex, setActiveParentLevel]);

  return (
    <li className={classNames(styles.subLevel, active && styles.active, className)} style={style}>
      <a
        id={id}
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
