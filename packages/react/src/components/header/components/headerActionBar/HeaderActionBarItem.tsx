import React, { ButtonHTMLAttributes, EventHandler, MouseEvent } from 'react';

import classNames from '../../../../utils/classNames';
import { useHeaderContext, useSetHeaderContext } from '../../HeaderContext';
import { IconCross, IconMenuHamburger } from '../../../../icons';

export type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;
export type HeaderActionBarMenuButtonProps = {
  ariaLabel?: string;
  onClick?: EventHandler<MouseEvent>;
};
export interface HeaderActionBarItemProps extends ButtonAttributes {
  icon?: React.ElementType;
  label?: string;
}

export const IconButton = ({
  icon: IconClass,
  label,
  className,
  'aria-label': ariaLabel = label,
  'aria-expanded': ariaExpanded,
  ...props
}: HeaderActionBarItemProps) => {
  const aria = {
    'aria-label': ariaLabel,
    'aria-haspopup': true,
    'aria-expanded': !!ariaExpanded,
  };
  return (
    <button {...props} {...aria} type="button" className={classNames('hds-action-bar-link', className)}>
      {IconClass && (
        <span className="icon">
          <IconClass aria-hidden />
        </span>
      )}
      {label && <span className="title">{label}</span>}
    </button>
  );
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

  const handleClick = (event) => {
    if (typeof onClick === 'function') onClick(event);
    else setMobileMenuOpen(!mobileMenuOpen);
  };

  if (!hasNavigationContent || !isSmallScreen) return null;

  return <IconButton label="Menu" {...aria} onClick={handleClick} icon={Icon} />;
};
