import React, { PropsWithChildren, ReactNode, useContext, useEffect } from 'react';

import styles from './NavigationUser.module.css';
import IconSignin from '../../../icons/ui/IconSignin';
import NavigationDropdown from '../navigation-dropdown/NavigationDropdown';
import NavigationContext from '../NavigationContext';
import IconUser from '../../../icons/ui/IconUser';
import Button from '../../button/Button';

export type NavigationUserProps = PropsWithChildren<{
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
  label: string | ReactNode;
  /**
   * Callback fired when the "Sign in" button is clicked
   */
  onSignIn?: () => void;
  /**
   * Name of the user displayed in the dropdown
   */
  userName?: string | ReactNode;
}>;

const NavigationUser = ({
  animateOpen = true,
  ariaLabel,
  authenticated = false,
  children,
  label,
  onSignIn = () => {
    // do nothing by default
  },
  userName,
}: NavigationUserProps) => {
  const { dispatch, isMobile } = useContext(NavigationContext);

  // dispatch auth state
  useEffect(() => dispatch({ type: 'AUTHENTICATED', value: authenticated }), [authenticated, dispatch]);

  const userItems: ReactNode = isMobile ? (
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
      id="userDropdown"
      icon={<IconUser />}
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
          onClick={onSignIn}
          iconLeft={isMobile ? null : <IconSignin />}
          variant={isMobile ? 'primary' : 'supplementary'}
          theme="black"
          fullWidth
        >
          {label}
        </Button>
      )}
    </div>
  );
};

export default NavigationUser;
