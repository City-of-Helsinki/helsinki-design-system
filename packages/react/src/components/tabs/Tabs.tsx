import React, { useState } from 'react';

// import core base styles
import 'hds-core';
import styles from './Tabs.module.scss';
import classNames from '../../utils/classNames';
import { TabsContext } from './TabsContext';
import { FCWithName } from '../../common/types';

export type TabsProps = React.PropsWithChildren<{
  /**
   * Use the small variant
   * @default false
   */
  small?: boolean;
}>;

export const Tabs = ({ children, small = false }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [focusedTab, setFocusedTab] = useState<number>(null);

  /**
   * Get the TabList from children
   */
  const tabList = React.Children.toArray(children).filter((child) => {
    return React.isValidElement(child) && (child.type as FCWithName).componentName === 'TabList';
  });

  /**
   * Get TabPanels from children
   */
  const tabPanels = React.Children.toArray(children)
    .filter((child) => {
      return React.isValidElement(child) && (child.type as FCWithName).componentName === 'TabPanel';
    })
    .map((child, index) => {
      if (React.isValidElement(child)) {
        // Pass index prop to the TabPanel
        return React.cloneElement(child, { index });
      }
      return child;
    });

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, focusedTab, setFocusedTab }}>
      <div className={classNames(styles.tabs, small && styles.small)}>
        {tabList}
        {tabPanels}
      </div>
    </TabsContext.Provider>
  );
};
