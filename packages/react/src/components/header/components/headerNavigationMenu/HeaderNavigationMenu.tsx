import React, { Children, cloneElement, useContext, useState } from 'react';

// import core base styles
import 'hds-core';
import styles from './HeaderNavigationMenu.module.scss';
import { HeaderContext } from '../../HeaderContext';
import classNames from '../../../../utils/classNames';
import { getChildElementsEvenIfContainerInbetween } from '../../../../utils/getChildren';
import { HeaderNavigationMenuContext, HeaderNavigationMenuContextProps } from './HeaderNavigationMenuContext';

export type HeaderNavigationMenuProps = React.PropsWithChildren<{
  /**
   * aria-label for describing universal bar.
   */
  ariaLabel?: string;
  /**
   * Children are expected to be NavigationLink components or a container with NavigationLink components inside.
   */
  children?: React.ReactNode;
  /**
   * ID of the header element.
   */
  id?: string;
}>;

export const HeaderNavigationMenu = ({ ariaLabel, children, id }: HeaderNavigationMenuProps) => {
  const { isSmallScreen } = useContext(HeaderContext);
  const [openIndex, setOpenIndex] = useState<number>(-1);
  /* On small screen return null for now. Later when ActionBar's first version is done,
  we could see if this component with its contents (altered for small screens) could be 
  sent to HeaderContext and used in ActionBar? */
  if (isSmallScreen) return null;
  const childElements = getChildElementsEvenIfContainerInbetween(children);
  const context: HeaderNavigationMenuContextProps = { openMainNavIndex: openIndex, setOpenMainNavIndex: setOpenIndex };

  return (
    <nav role="navigation" aria-label={ariaLabel} id={id} className={styles.headerNavigationMenu}>
      <ul className={styles.headerNavigationMenuList}>
        <HeaderNavigationMenuContext.Provider value={context}>
          {Children.map(childElements, (child, index) => {
            if (React.isValidElement(child)) {
              const linkContainerClasses = child.props.active
                ? classNames(styles.headerNavigationMenuLinkContent, styles.headerNavigationMenuLinkContentActive)
                : styles.headerNavigationMenuLinkContent;
              return (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index} className={styles.headerNavigationMenuLinkContainer}>
                  <span className={linkContainerClasses}>
                    {cloneElement(child as React.ReactElement, {
                      className: classNames(child.props.className, styles.headerNavigationMenuLink),
                      index,
                    })}
                  </span>
                </li>
              );
            }
            return null;
          })}
        </HeaderNavigationMenuContext.Provider>
      </ul>
    </nav>
  );
};
