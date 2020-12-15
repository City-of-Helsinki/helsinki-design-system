import React, { useContext, useEffect, useRef } from 'react';

// import core base styles
import 'hds-core';

import styles from './Tabs.module.scss';
import classNames from '../../utils/classNames';
import { TabsContext } from './TabsContext';

export type TabProps = React.PropsWithChildren<{
  /**
   * Additional class names to apply to the Tab
   */
  className?: string;
  /**
   * Additional styles to apply to the Tab
   */
  style?: React.CSSProperties;
  index?: number;
}>;

export const Tab = ({ children, className, index, style }: TabProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const { activeTab, focusedTab, setFocusedTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === index;

  /**
   * Focus the tab based on focusedTab provided by the context
   */
  useEffect(() => {
    if (focusedTab === index) {
      ref.current.focus();
    }
  }, [focusedTab, index]);

  /**
   * Set the tab as active when clicked
   */
  const onClick = () => {
    setActiveTab(index);
  };

  /**
   * Set the tab as active when enter is pressed
   * @param event
   */
  const onKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Enter') {
      setActiveTab(index);
    }
  };

  /**
   * Handle the focus event
   */
  const onFocus = () => {
    if (focusedTab !== index) {
      setFocusedTab(index);
    }
  };

  return (
    <li
      role="tab"
      aria-selected={isActive}
      aria-controls={`tab-${index}-panel`}
      tabIndex={isActive ? 0 : -1}
      id={`tab-${index}-button`}
      className={classNames(styles.tab, isActive && styles.active, className)}
      style={style}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      ref={ref}
    >
      <span>{children}</span>
    </li>
  );
};
Tab.componentName = 'Tab';
