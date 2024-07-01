export type HeaderTheme = 'light' | 'dark' | HeaderCustomTheme;

/**
 * Header theme variables for custom theming.
 */
export interface HeaderCustomTheme {
  '--actionbar-background-color'?: string;
  '--color-focus-outline'?: string;
  '--header-background-color'?: string;
  '--header-color'?: string;
  '--header-max-width'?: string;
  '--header-z-index'?: string;
  '--lang-selector-dropdown-background-color'?: string;
  '--logo-height'?: string;
  '--nav-background-color'?: string;
  '--nav-border-color'?: string;
  '--nav-link-hover-color'?: string;
  '--nav-button-background-color'?: string;
  '--nav-link-dropdown-background-color'?: string;
  '--nav-button-hover-background-color'?: string;
  '--nav-drop-down-icon-color'?: string;
  '--universal-bar-background-color'?: string;
  '--header-spinner-color'?: string;
}
