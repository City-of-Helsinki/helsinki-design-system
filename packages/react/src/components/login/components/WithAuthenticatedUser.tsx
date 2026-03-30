import React, { isValidElement } from 'react';

import { WithAuthentication } from './WithAuthentication';
import { User } from '../types';
import { getChildrenAsArray } from '../../../utils/getChildren';

type Props = { user: User };
type RenderProp = (props: Props) => React.ReactElement;

export function createChildrenWithUser(children: React.ReactNode | null, user: User): React.ReactNode[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderChild = (child: React.ReactElement<any>, key: string) => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const renderResult = ((child as unknown) as (props: Props) => React.ReactElement)({ user }) as React.ReactElement<any>;
      return renderChild(renderResult, `key-${index}`);
    }
    if (!isValidElement(child)) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return renderChild(child as React.ReactElement<any>, `key-${index}`);
  });
}

/**
 * Renders its children only, if the user is authenticated
 * @param props React.PropsWithChildren<unknown>
 */
export function WithAuthenticatedUser(props: { children?: React.ReactNode | RenderProp | Array<React.ReactNode | RenderProp> }): React.ReactElement | null {
  const AuthorisedComponent = (authProps: React.PropsWithChildren<{ user: User }>) => {
    return <>{createChildrenWithUser(props.children as React.ReactNode, authProps.user)}</>;
  };
  return <WithAuthentication AuthorisedComponent={AuthorisedComponent} />;
}
