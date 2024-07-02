import React, { createContext, useContext, useEffect, useState } from 'react';

import { useMediaQueryLessThan } from '../../hooks/useMediaQuery';
import { NotificationProps } from '../notification';

export type HeaderContextType = {
  /**
   * Flag for whether the viewport is under breakpoint value medium.
   */
  isSmallScreen?: boolean;
  mobileMenuOpen?: boolean;
  hasNavigationContent?: boolean;
  navigationContent?: React.ReactNode;
  languageSelectorContent?: React.ReactNode;
  hasUniversalContent?: boolean;
  universalContent?: React.ReactNode;
  /**
   * Which main navigation link with dropdowns is open.
   */
  openMainNavIndex?: number;
  error?: {
    label: string;
    text: string;
    closeButtonAriaLabel: string;
    notificationPosition?: NotificationProps['position'];
    source: string;
  };
};

export type HeaderDispatchContextType = {
  setNavigationContent: (children: React.ReactNode) => void;
  setLanguageSelectorContent: (children: React.ReactNode) => void;
  setMobileMenuOpen: (state: boolean) => void;
  setUniversalContent: (children: React.ReactNode) => void;
  setOpenMainNavIndex: (arg: number) => void;
  setError: (error: HeaderContextType['error']) => void;
};

const HeaderContext = createContext<HeaderContextType>({
  navigationContent: null,
  languageSelectorContent: null,
  universalContent: null,
});
const HeaderDispatchContext = createContext<HeaderDispatchContextType>({
  setNavigationContent() {}, // eslint-disable-line @typescript-eslint/no-empty-function
  setLanguageSelectorContent() {}, // eslint-disable-line @typescript-eslint/no-empty-function
  setMobileMenuOpen() {}, // eslint-disable-line @typescript-eslint/no-empty-function
  setUniversalContent() {}, // eslint-disable-line @typescript-eslint/no-empty-function
  setOpenMainNavIndex() {}, // eslint-disable-line @typescript-eslint/no-empty-function
  setError() {}, // eslint-disable-line @typescript-eslint/no-empty-function
});
HeaderContext.displayName = 'HeaderContext';
HeaderDispatchContext.displayName = 'HeaderDispatchContext';

export const HeaderContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const isSmallScreen = useMediaQueryLessThan('l');
  const [navigationContent, setNavigationContent] = useState(null);
  const [languageSelectorContent, setLanguageSelectorContent] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [universalContent, setUniversalContent] = useState(null);
  const [openMainNavIndex, setOpenMainNavIndex] = useState<number>(-1);
  const [error, setError] = useState<HeaderContextType['error']>(undefined);

  useEffect(() => setMobileMenuOpen(false), [isSmallScreen]);

  const hasNavigationContent = !!navigationContent;
  const hasUniversalContent = !!navigationContent;
  const context: HeaderContextType = {
    isSmallScreen,
    mobileMenuOpen,
    navigationContent,
    hasNavigationContent,
    languageSelectorContent,
    hasUniversalContent,
    universalContent,
    openMainNavIndex,
    error,
  };
  const dispatchContext: HeaderDispatchContextType = {
    setNavigationContent,
    setLanguageSelectorContent,
    setMobileMenuOpen,
    setUniversalContent,
    setOpenMainNavIndex,
    setError,
  };

  return (
    <HeaderContext.Provider value={context}>
      <HeaderDispatchContext.Provider value={dispatchContext}>{children}</HeaderDispatchContext.Provider>
    </HeaderContext.Provider>
  );
};

export function useHeaderContext() {
  const context = useContext(HeaderContext);
  return context;
}

export function useSetHeaderContext() {
  return useContext(HeaderDispatchContext);
}
