export type NavigationReducerState = {
  /**
   * Flag for whether the user is authenticated
   */
  authenticated?: boolean;
  /**
   * Defines where the navigation row will be displayed.
   * Supported values:
   * subNav (default) - items will be displayed beneath the header
   * inline - items will be displayed in the header
   */
  navigationRowDisplay?: NavigationRowDisplay;
};

export type NavigationReducerAction =
  | { type: 'AUTHENTICATED'; value: boolean }
  | { type: 'NAVIGATION_ROW'; value: NavigationRowDisplay };

export type NavigationRowDisplay = 'inline' | 'subNav';
