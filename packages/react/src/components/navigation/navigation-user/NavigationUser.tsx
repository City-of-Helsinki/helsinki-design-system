import React, { PropsWithChildren, ReactNode, useContext, useEffect } from 'react';

import styles from './NavigationUser.module.css';
import IconSignin from '../../../icons/ui/IconSignin';
import classNames from '../../../utils/classNames';
import NavigationDropdown from '../navigation-dropdown/NavigationDropdown';
import NavigationContext from '../NavigationContext';
import IconUser from '../../../icons/ui/IconUser';
import Button from '../../button/Button';

// TODO: I18N
// TODO: I18N
// TODO: I18N
// TODO: I18N
// TODO: I18N
// TODO: I18N

export type NavigationUserProps = PropsWithChildren<{
  /**
   * Flag for whether the user is authenticated
   */
  // todo: required?
  authenticated?: boolean;
  /**
   * todo
   */
  onSignIn?: () => void;
}>;

const NavigationUser = ({
  authenticated = false,
  children,
  onSignIn = () => {
    // do nothing by default
    // todo: remove
    console.log('NavigationUser - onSignIn');
  },
}: NavigationUserProps) => {
  const { dispatch, isMobile, theme } = useContext(NavigationContext);

  useEffect(() => dispatch({ type: 'AUTHENTICATED', value: authenticated }), [authenticated, dispatch]);

  const userItems: ReactNode = isMobile ? (
    <>
      <span className={styles.userName}>
        <IconUser />
        First name
      </span>
      {children}
    </>
  ) : (
    // todo: add prop for id
    // todo: add prop for label
    <NavigationDropdown id="userDropdown" icon={<IconUser />} label="First name">
      {children}
    </NavigationDropdown>
  );

  return (
    <div className={classNames(styles.navigationUser, styles[`theme-${theme}`])}>
      {authenticated ? (
        userItems
      ) : (
        <Button
          className={styles.signInButton}
          onClick={() => onSignIn()}
          iconLeft={isMobile ? null : <IconSignin />}
          variant={isMobile ? 'primary' : 'supplementary'}
          theme="black"
          fullWidth
        >
          Sign in
        </Button>
      )}
    </div>
  );
};

export default NavigationUser;
