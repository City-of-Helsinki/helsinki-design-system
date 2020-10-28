export type NavigationReducerState = {
  /**
   * Flag for whether the user is authenticated
   */
  authenticated?: boolean;
  /**
   * Defines where the navigation row will be displayed.
   * Supported values:
   *
   * `default` - items will be displayed beneath the header
   *
   * `inline` - items will be displayed in the header
   */
  navigationVariant?: NavigationVariant;
};

export type NavigationReducerAction =
  | { type: 'AUTHENTICATED'; value: boolean }
  | { type: 'NAVIGATION_ROW'; value: NavigationVariant };

export type NavigationVariant = 'default' | 'inline';

export type NavigationTheme = 'light' | 'dark' | NavigationCustomTheme;

export interface NavigationCustomTheme {
  '--header-background-color'?: string;
  '--header-color'?: string;
  '--header-divider-color'?: string;
  '--header-focus-outline-color'?: string;
  '--mobile-menu-background-color'?: string;
  '--mobile-menu-color'?: string;
  '--navigation-row-background-color'?: string;
  '--navigation-row-color'?: string;
  '--navigation-row-focus-outline-color'?: string;
}
