import { createContext } from 'react';

import { NavigationVariant } from './Navigation.interface';

export type NavigationContextProps = {
  /**
   * Flag for whether the mobile view is active
   */
  isMobile?: boolean;
  /**
   * Updates authenticated status for the Navigation component
   */
  setAuthenticated?: (authenticated: boolean) => void;

  /**
   * Updates navigation variant for the Navigation component
   */
  setNavigationVariant?: (navigationVariant: NavigationVariant) => void;
};

export const NavigationContext = createContext<NavigationContextProps>({});
