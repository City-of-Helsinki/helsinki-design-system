import React, { ElementType, forwardRef } from 'react';

import classNames from '../../../../utils/classNames';

type ButtonAttributes = JSX.IntrinsicElements['button'];

export interface HeaderActionBarItemProps extends ButtonAttributes {
  icon?: ElementType;
  label?: string | JSX.Element;
}

export const HeaderActionBarItem = forwardRef<HTMLButtonElement, HeaderActionBarItemProps>((properties, ref) => {
  const {
    icon: IconClass,
    label,
    className,
    'aria-label': ariaLabel,
    'aria-expanded': ariaExpanded,
    ...props
  } = properties;

  const buttonClassName = classNames('hds-action-bar-link', className);

  const aria = {
    'aria-label': ariaLabel || (typeof label === 'string' && label),
    'aria-haspopup': true,
    'aria-expanded': !!ariaExpanded,
  };

  return (
    <button type="button" {...props} {...aria} className={buttonClassName} ref={ref}>
      {IconClass && (
        <span className="icon">
          <IconClass aria-hidden />
        </span>
      )}
      {label && <span className="title">{label}</span>}
    </button>
  );
});
