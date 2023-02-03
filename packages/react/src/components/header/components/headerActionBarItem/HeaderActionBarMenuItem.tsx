import React, { EventHandler, MouseEvent } from 'react';

import { useHeaderContext, useSetHeaderContext } from '../../HeaderContext';
import { IconCross, IconMenuHamburger } from '../../../../icons';
import { useCallbackIfDefined } from '../../../../utils/useCallback';
import { HeaderActionBarItem } from './HeaderActionBarItem';

export type HeaderActionBarMenuButtonProps = {
  ariaLabel?: string;
  onClick?: EventHandler<MouseEvent>;
};

export const HeaderActionBarMenuItem = ({ ariaLabel, onClick }: HeaderActionBarMenuButtonProps) => {
  const { hasNavigationContent, mobileMenuOpen, isSmallScreen } = useHeaderContext();
  const { setMobileMenuOpen } = useSetHeaderContext();
  const Icon = mobileMenuOpen ? IconCross : IconMenuHamburger;
  const aria = {
    'aria-label': ariaLabel,
    'aria-expanded': mobileMenuOpen,
    'aria-controls': mobileMenuOpen && 'hds-mobile-menu',
  };

  const handleClickCapture = useCallbackIfDefined(onClick);
  const handleClick: EventHandler<MouseEvent> = (event) => {
    if (!event.isPropagationStopped()) setMobileMenuOpen(!mobileMenuOpen);
  };

  if (!hasNavigationContent || !isSmallScreen) return null;

  return (
    <HeaderActionBarItem label="Menu" {...aria} onClick={handleClick} onClickCapture={handleClickCapture} icon={Icon} />
  );
};
