import { createContext } from 'react';

export type NavigationContextProps = {
  /**
   * Flag for whether the mobile view is active
   */
  isMobile?: boolean;
  /**
   * dispatch method that is passed down to children
   */
  setAuthenticated?: (authenticated: boolean) => void;
};

export const NavigationContext = createContext<NavigationContextProps>({});
