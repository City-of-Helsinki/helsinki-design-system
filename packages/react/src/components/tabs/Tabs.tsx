import React, { useState } from 'react';

// import core base styles
import 'hds-core';
import styles from './Tabs.module.scss';
import classNames from '../../utils/classNames';
import { TabsContext } from './TabsContext';
import { FCWithName } from '../../common/types';
import { useTheme } from '../../hooks/useTheme';
import { TabList } from './TabList';
import { TabPanel } from './TabPanel';
import { Tab } from './Tab';

export interface TabsCustomTheme {
  '--tablist-border-color'?: string;
  '--tablist-border-size'?: string;
  '--tab-color'?: string;
  '--tab-font-size'?: string;
  '--tab-height'?: string;
  '--tab-min-width'?: string;
  '--tab-spacing'?: string;
  '--tab-active-border-size'?: string;
  '--tab-active-border-color'?: string;
  '--tab-focus-outline-size'?: string;
  '--tab-focus-outline-color'?: string;
}

export type TabsProps = React.PropsWithChildren<{
  /**
   * The initially active tab
   */
  initiallyActiveTab?: number;
  /**
   * Use the small variant
   * @default false
   */
  small?: boolean;
  /**
   * Defines the tabs theme
   */
  theme?: TabsCustomTheme;
}>;

export const Tabs = ({ children, initiallyActiveTab = 0, small = false, theme }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(initiallyActiveTab);
  const [focusedTab, setFocusedTab] = useState<number>(null);
  // custom theme class that is applied to the root element
  const customThemeClass = useTheme<TabsCustomTheme>(styles.tabs, theme);

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
      <div className={classNames(styles.tabs, small && styles.small, theme && customThemeClass)}>
        {tabList}
        {tabPanels}
      </div>
    </TabsContext.Provider>
  );
};

// Using the Tabs component and its child components in the same namespace ensures that the group is considered as a single component.
// Tabs components do some child tab component processing and this might break in some preprocessed environments if the components were separate components, for example in mdx environment.
Tabs.TabList = TabList;
Tabs.TabPanel = TabPanel;
Tabs.Tab = Tab;
