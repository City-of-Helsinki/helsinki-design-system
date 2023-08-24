export type HeaderTheme = 'light' | 'dark' | HeaderCustomTheme;

/**
 * Header theme color variables for custom theming
 * --header-base-background-color: if there´s need for transparent etc. background for header container, default is white
 */
export interface HeaderCustomTheme {
  '--color-focus-outline'?: string;
  '--header-color'?: string;
  '--actionbar-background-color'?: string;
  '--navigation-background-color'?: string;
  '--nav-border-color'?: string;
  '--nav-link-hover-color'?: string;
  '--universal-bar-background-color'?: string;
  '--navigation-link-button-background-color'?: string;
  '--nav-link-dropdown-background-color'?: string;
  '--lang-selector-dropdown-background-color'?: string;
  '--nav-button-background-color'?: string;
  '--nav-button-hover-background-color'?: string;
  '--nav-drop-down-icon-color'?: string;
  '--header-base-background-color'?: string;
}
