export type HeaderTheme = 'light' | 'dark' | HeaderCustomTheme;

export interface HeaderCustomTheme {
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
