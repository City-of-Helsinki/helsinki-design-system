import { createContext, Dispatch } from 'react';

import { NavigationReducerAction } from './Navigation.interface';

export type NavigationContextProps = {
  /**
   * Flag for whether the mobile view is active
   */
  isMobile?: boolean;
  /**
   * dispatch method that is passed down to children
   */
  dispatch?: Dispatch<NavigationReducerAction>;
};

export const NavigationContext = createContext<NavigationContextProps>({});
