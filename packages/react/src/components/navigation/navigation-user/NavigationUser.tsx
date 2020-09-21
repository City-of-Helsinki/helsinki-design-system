import React, { useContext, useEffect } from 'react';

import styles from './NavigationUser.module.css';
import { NavigationDropdown } from '../navigation-dropdown/NavigationDropdown';
import { NavigationContext } from '../NavigationContext';
import { IconSignin, IconUser } from '../../../icons';
import { Button } from '../../button';

export type NavigationUserProps = React.PropsWithChildren<{
  /**
   * If `true`, the dropdown will be animated when opened
   * @default true
   */
  animateOpen?: boolean;
  /**
   * aria-label for the user dropdown. Can be used to give additional information to screen readers
   */
  ariaLabel?: string;
  /**
   * Flag for whether the user is authenticated
   */
  authenticated?: boolean;
  /**
   * Label for the "Sign in" button
   */
  label: string | React.ReactNode;
  /**
   * Callback fired when the "Sign in" button is clicked
   */
  onSignIn?: () => void;
  /**
   * Name of the user displayed in the dropdown
   */
  userName?: string | React.ReactNode;
}>;

export const NavigationUser = ({
  animateOpen = true,
  ariaLabel,
  authenticated = false,
  children,
  label,
  onSignIn = () => null,
  userName,
}: NavigationUserProps) => {
  const { dispatch, isMobile } = useContext(NavigationContext);

  // dispatch auth state
  useEffect(() => dispatch({ type: 'AUTHENTICATED', value: authenticated }), [authenticated, dispatch]);

  const userItems: React.ReactNode = isMobile ? (
    <>
      {userName && (
        <span className={styles.userName}>
          <IconUser />
          {userName}
        </span>
      )}
      {children}
    </>
  ) : (
    <NavigationDropdown
      animateOpen={animateOpen}
      ariaLabel={ariaLabel}
      icon={<IconUser />}
      id="userDropdown"
      label={userName}
    >
      {children}
    </NavigationDropdown>
  );

  return (
    <div className={styles.navigationUser}>
      {authenticated ? (
        userItems
      ) : (
        <Button
          className={styles.signInButton}
          fullWidth
          iconLeft={isMobile ? null : <IconSignin />}
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
