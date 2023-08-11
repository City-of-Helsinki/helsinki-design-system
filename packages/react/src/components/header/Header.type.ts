export type HeaderTheme = 'light' | 'dark' | HeaderCustomTheme;

export interface HeaderCustomTheme {
  '--color-focus-outline'?: string;
  '--header-color'?: string;
  '--header-focus-outline-color': string;
  '--header-background-color': string;
  '--nav-border-color': string;
  '--nav-link-hover-color': string;
  '--universal-bar-background-color': string;
  '--navigation-link-button-background-color': string;
  '--nav-link-dropdown-background-color': string;
  '--lang-selector-dropdown-background-color': string;
  '--nav-button-background-color': string;
  '--nav-button-hover-background-color': string;
  '--nav-drop-down-icon-color': string;
}
