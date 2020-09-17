import React from 'react';

import { FooterReducerAction } from './Footer.interface';

export type FooterContextProps = {
  /**
   * dispatch method that is passed down to children
   */
  dispatch?: React.Dispatch<FooterReducerAction>;
};

export const FooterContext = React.createContext<FooterContextProps>({});
