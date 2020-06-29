import { createContext, Dispatch } from 'react';

import { NavigationReducerAction } from './Navigation.interface';

export type NavigationContextProps = {
  /**
   * Navigation bar theme
   * Supported values are `white` (default) and `black`
   */
  // todo: type?
  theme?: string;
  /**
   * Whether
   */
  isMobile?: boolean;
  /**
   * todo
   */
  dispatch?: Dispatch<NavigationReducerAction>;
};

export default createContext<NavigationContextProps>({});
