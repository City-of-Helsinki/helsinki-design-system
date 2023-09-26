export type HeaderTheme = 'light' | 'dark' | HeaderCustomTheme;

/**
 * Header theme color variables for custom theming
 * --header-background-color: if there´s need for transparent etc. background for header container, default is white
 */
export interface HeaderCustomTheme {
  '--actionbar-background-color'?: string;
  '--color-focus-outline'?: string;
  '--header-background-color'?: string;
  '--header-color'?: string;
  '--lang-selector-dropdown-background-color'?: string;
  '--nav-background-color'?: string;
  '--nav-border-color'?: string;
  '--nav-link-hover-color'?: string;
  '--nav-button-background-color'?: string;
  '--nav-link-dropdown-background-color'?: string;
  '--nav-button-hover-background-color'?: string;
  '--nav-drop-down-icon-color'?: string;
  '--universal-bar-background-color'?: string;
}
