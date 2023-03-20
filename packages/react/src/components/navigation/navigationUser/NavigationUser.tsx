import React, { useContext, useEffect } from 'react';

import styles from './NavigationUser.module.scss';
import { NavigationContext } from '../NavigationContext';
import { IconSignin, IconUser } from '../../../icons';
import { Button } from '../../button';
import { MenuButton, MenuButtonProps } from '../../../internal/menuButton/MenuButton';
import { Visible } from '../../../internal/visible/Visible';

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

/**
 * NavigationUser will be removed in the next major release. Upcoming Header component will provide the replacement component.
 * @deprecated
 */
export const NavigationUser = ({
  authenticated = false,
  children,
  id = 'userDropdown',
  label,
  onSignIn = () => null,
  userName,
  ...dropdownProps
}: NavigationUserProps) => {
  const { setAuthenticated } = useContext(NavigationContext);

  // dispatch auth state
  useEffect(() => setAuthenticated(authenticated), [setAuthenticated, authenticated]);

  const userItems = (
    <>
      <Visible below="m">
        {userName && (
          <span className={styles.userName}>
            <IconUser aria-hidden />
            {userName}
          </span>
        )}
        {children}
      </Visible>
      <Visible above="m">
        <MenuButton
          className={styles.userDropdown}
          icon={<IconUser aria-hidden />}
          id={id}
          label={userName}
          menuOffset={10}
          {...dropdownProps}
        >
          {children}
        </MenuButton>
      </Visible>
    </>
  );

  const signInButton = (
    <>
      <Visible below="m">
        <Button className={styles.signInButton} fullWidth onClick={onSignIn} theme="black" variant="primary">
          {label}
        </Button>
      </Visible>
      <Visible above="m">
        <Button
          className={styles.signInButton}
          fullWidth
          iconLeft={<IconSignin aria-hidden />}
          onClick={onSignIn}
          theme="black"
          variant="supplementary"
        >
          {label}
        </Button>
      </Visible>
    </>
  );

  return <div className={styles.user}>{authenticated ? userItems : signInButton}</div>;
};
NavigationUser.componentName = 'NavigationUser';
