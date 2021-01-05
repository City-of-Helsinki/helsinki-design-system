import React from 'react';

export type TabsContextType = {
  /**
   * The index of the currently active tab
   */
  activeTab: number;
  /**
   * Set the currently active tab
   */
  setActiveTab: (tabIndex: number) => void;
  /**
   * The index of the currently focused tab
   */
  focusedTab: number;
  /**
   * Set the currently focusted tab.
   */
  setFocusedTab: (tabIndex: number) => void;
};

export const TabsContext = React.createContext<TabsContextType>({
  activeTab: 0,
  setActiveTab: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  focusedTab: null,
  setFocusedTab: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});
