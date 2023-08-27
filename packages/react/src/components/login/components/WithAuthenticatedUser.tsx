import React, { isValidElement } from 'react';

import { WithAuthentication } from './WithAuthentication';
import { User } from '../types';
import { getChildrenAsArray } from '../../../utils/getChildren';

type Props = { user: User };

export function createChildrenWithUser(children: React.ReactNode | null, user: User): React.ReactNode[] {
  const renderChild = (child: React.FunctionComponentElement<unknown> | React.ReactElement, key: string) => {
    return React.cloneElement(child, { key, ...child.props, user });
  };
  return getChildrenAsArray(children).map((child, index) => {
    if (!child) {
      return null;
    }
    const childType = typeof child;
    if (childType === 'string' || childType === 'number') {
      return child;
    }
    if (childType === 'function') {
      const renderResult = React.cloneElement((child as React.FC<Props>)({ user }) as React.ReactElement);
      return renderChild(renderResult, `key-${index}`);
    }
    if (!isValidElement(child)) {
      return null;
    }
    return renderChild(child as React.ReactElement, `key-${index}`);
  });
}

/**
 * Renders its children only, if the user is authenticated
 * @param props React.PropsWithChildren<unknown>
 */
export function WithAuthenticatedUser(props: React.PropsWithChildren<unknown>): React.ReactElement | null {
  const AuthorisedComponent = (authProps: React.PropsWithChildren<{ user: User }>) => {
    return <>{createChildrenWithUser(props.children, authProps.user)}</>;
  };
  return <WithAuthentication AuthorisedComponent={AuthorisedComponent} />;
}
