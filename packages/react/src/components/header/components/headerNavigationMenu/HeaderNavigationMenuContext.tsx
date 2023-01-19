import React, { PropsWithChildren, createContext, useContext, useState } from 'react';

export type HeaderNavigationMenuContextProps = {
  /**
   * Which navigation item is open.
   */
  openMainNavIndex?: number;
  /**
   * Set index for which navigation item is open.
   */
  setOpenMainNavIndex?: (arg: number) => void;
};

const HeaderNavigationMenuContext = createContext<HeaderNavigationMenuContextProps>({});

export const HeaderNavigationMenuContextProvider = ({
  children,
}: PropsWithChildren<HeaderNavigationMenuContextProps>) => {
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const context: HeaderNavigationMenuContextProps = { openMainNavIndex: openIndex, setOpenMainNavIndex: setOpenIndex };
  return <HeaderNavigationMenuContext.Provider value={context}>{children}</HeaderNavigationMenuContext.Provider>;
};

export function useHeaderNavigationMenuContext() {
  return useContext(HeaderNavigationMenuContext);
}
