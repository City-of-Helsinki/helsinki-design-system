export type NavigationReducerState = {
  /**
   * Flag for whether the user is authenticated
   */
  // todo: required?
  authenticated?: boolean;
  /**
   * todo
   */
  navigationRowDisplay?: NavigationRowDisplay;
};

export type NavigationReducerAction =
  | { type: 'AUTHENTICATED'; value: boolean }
  | { type: 'NAVIGATION_ROW'; value: NavigationRowDisplay };

export type NavigationRowDisplay = 'inline' | 'fullWidth';
