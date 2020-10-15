export type FooterReducerState = {
  /**
   * Defines how the navigation items will be displayed in the footer
   *
   * Supported values:
   *
   * `default` - Items will be displayed beneath the logo and title
   *
   * `minimal` - Items will be displayed inline with the logo and title. Intended to be used with 4 items or less.
   *
   * `sitemap` - Items will be displayed beneath the logo and title as groups with items and sub-items...
   */
  navigationVariant?: FooterNavigationVariant;
};

export type FooterReducerAction = { type: 'NAVIGATION_VARIANT'; value: FooterNavigationVariant };

export type FooterNavigationVariant = 'default' | 'minimal' | 'sitemap';

export type FooterTheme = 'light' | 'dark' | FooterCustomTheme;

export interface FooterCustomTheme {
  '--footer-background'?: string;
  '--footer-color'?: string;
  '--footer-divider-color'?: string;
  '--footer-focus-outline-color'?: string;
}
