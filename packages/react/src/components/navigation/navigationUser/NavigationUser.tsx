import React, { useContext, useEffect } from 'react';

import styles from './NavigationUser.module.scss';
import { NavigationDropdown } from '../navigationDropdown/NavigationDropdown';
import { NavigationContext } from '../NavigationContext';
import { IconSignin, IconUser } from '../../../icons';
import { Button } from '../../button';
import { MenuButtonProps } from '../../../internal/menuButton/MenuButton';

export type NavigationUserProps = MenuButtonProps & {
  /**
   * Flag for whether the user is authenticated
   */
  authenticated?: boolean;
  /**
   * Label for the "Sign in" button
   */
  label: React.ReactNode;
  /**
   * Callback fired when the "Sign in" button is clicked
   */
  onSignIn?: () => void;
  /**
   * Name of the user displayed in the dropdown
   */
  userName?: React.ReactNode;
};

export const NavigationUser = ({
  authenticated = false,
  children,
  id = 'userDropdown',
  label,
  onSignIn = () => null,
  userName,
  ...dropdownProps
}: NavigationUserProps) => {
  const { dispatch, isMobile } = useContext(NavigationContext);

  // dispatch auth state
  useEffect(() => dispatch({ type: 'AUTHENTICATED', value: authenticated }), [authenticated, dispatch]);

  const userItems: React.ReactNode = isMobile ? (
    <>
      {userName && (
        <span className={styles.userName}>
          <IconUser aria-hidden />
          {userName}
        </span>
      )}
      {children}
    </>
  ) : (
    <NavigationDropdown
      className={styles.userDropdown}
      icon={<IconUser aria-hidden />}
      id={id}
      label={userName}
      menuOffset={10}
      {...dropdownProps}
    >
      {children}
    </NavigationDropdown>
  );

  return (
    <div className={styles.user}>
      {authenticated ? (
        userItems
      ) : (
        <Button
          className={styles.signInButton}
          fullWidth
          iconLeft={isMobile ? null : <IconSignin aria-hidden />}
          onClick={onSignIn}
          theme="black"
          variant={isMobile ? 'primary' : 'supplementary'}
        >
          {label}
        </Button>
      )}
    </div>
  );
};
NavigationUser.componentName = 'NavigationUser';
