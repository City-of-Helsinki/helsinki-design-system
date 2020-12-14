import React, { useContext, useEffect, useRef, useState } from 'react';

// import core base styles
import 'hds-core';
import styles from './Tabs.module.scss';
import classNames from '../../utils/classNames';
import { FCWithName } from '../../common/types';
import { TabsContext } from './TabsContext';

export type TabListProps = React.PropsWithChildren<{
  /**
   * Additional class names to apply to the Tablist
   */
  className?: string;
  /**
   * Additional styles to apply to the Tablist
   */
  style?: React.CSSProperties;
}>;

export const TabList = ({ children, className, style = {} }: TabListProps) => {
  const tablistElementRef = useRef<HTMLUListElement>(null);
  const { focusedTab, setFocusedTab } = useContext(TabsContext);
  const [scrollValue] = useState<number>(0);

  // Pass the index as a prop to each Tab compoennt
  const tabs = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && (child.type as FCWithName).componentName === 'Tab') {
      return React.cloneElement(child, { index });
    }
    return null;
  });

  // Handle keyboard navigation
  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'ArrowRight') {
      setFocusedTab(Math.min(focusedTab + 1, tabs.length - 1));
    }
    if (event.key === 'ArrowLeft') {
      setFocusedTab(Math.max(focusedTab - 1, 0));
    }
  };

  // Scroll the focused tab into view
  useEffect(() => {
    const tabListElement = tablistElementRef.current;
    const tabElement = tabListElement.children[focusedTab];
    if (tabElement !== null && tabElement instanceof HTMLElement) {
      tabElement.scrollIntoView();
    }
  }, [focusedTab]);

  return (
    <ul
      role="tablist"
      ref={tablistElementRef}
      className={classNames(styles.tablist, className)}
      onKeyDown={onKeyDown}
      style={{ ...style, transform: `translateX(${scrollValue}px)` }}
    >
      {tabs}
    </ul>
  );
};
TabList.componentName = 'TabList';
