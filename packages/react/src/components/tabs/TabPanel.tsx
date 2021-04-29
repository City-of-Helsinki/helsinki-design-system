import React, { useContext } from 'react';

// import core base styles
import 'hds-core';
import { TabsContext } from './TabsContext';

export type TabPanelProps = React.PropsWithChildren<{
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

export const TabPanel = ({ children, className, index, style }: TabPanelProps) => {
  const { activeTab } = useContext(TabsContext);
  const isActive = activeTab === index;

  return isActive ? (
    <div
      id={`tab-${index}-panel`}
      role="tabpanel"
      aria-labelledby={`tab-${index}-button`}
      className={className}
      style={style}
    >
      {children}
    </div>
  ) : null;
};
TabPanel.componentName = 'TabPanel';
